import { App, Notice, Plugin, PluginSettingTab, Setting } from "obsidian";

// Remember to rename these classes and interfaces!

interface ReadwiseLinkerSettings {
	debugSetting: boolean;
}

const DEFAULT_SETTINGS: ReadwiseLinkerSettings = {
	debugSetting: false,
};

export default class ReadwiseLinker extends Plugin {
	settings: ReadwiseLinkerSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new RWLSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, "click", (evt: MouseEvent) => {
		// 	console.log("click", evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(
		// 	window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
		// );

		// Add hover event for Readwise links
		this.registerDomEvent(
			document,
			"mouseover",
			async (evt: MouseEvent) => {
				const anchor =
					evt.target instanceof HTMLAnchorElement ? evt.target : null;
				if (!anchor || !anchor.href.includes("readwise.io")) return;

				if (this.settings.debugSetting) {
					console.log("Hovered over Readwise link:", anchor.href);
				}
				const articleContent = await this.findReadwiseArticleByUrl(
					anchor.href,
					anchor
				);
				if (articleContent) {
					// this.showHoverPopup(anchor, articleContent);
				}
			}
		);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// Helper to extract highlight text from a line
	extractHighlightFromLine(line: string, url: string): string | null {
		const trimmed = line.trim();
		if (!(trimmed.startsWith("- ") && trimmed.includes(url))) return null;
		let highlight = trimmed.replace(/^-\s*/, "");
		highlight = highlight.replace(/\(\[View Highlight\]\([^)]*\)\).*/, "");
		// Remove all markdown links: [text](url)
		highlight = highlight.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
		// Remove bold, italics, inline code, strikethrough, highlights, and images
		highlight = highlight.replace(/([*_~`=]|!\[[^\]]*\]\([^)]*\))/g, "");
		highlight = highlight.replace(/<[^>]+>/g, "");
		return highlight.trim();
	}

	// Helper to create highlight fragment for URL
	createHighlightFragment(highlight: string): string {
		const highlightWords = highlight.split(/\s+/).filter(Boolean);
		if (highlightWords.length > 10) {
			const start = highlightWords.slice(0, 5).join(" ");
			const end = highlightWords.slice(-5).join(" ");
			return `${encodeURIComponent(start)},${encodeURIComponent(end)}`;
		} else {
			return encodeURIComponent(highlight);
		}
	}

	// Helper to build popup text
	buildPopupText(
		file: { basename: string },
		snippet: string,
		metadata: { title: string | null; url: string | null },
		markdownUrl: string,
		markdownUrlWithHighlight: string
	): string {
		let popupText = `From note: ${file.basename}\n${snippet}`;
		if (metadata.title && metadata.url) {
			popupText += `\n${markdownUrl}`;
			popupText += `\n${markdownUrlWithHighlight}`;
		}
		if (metadata.title) popupText += `\nFull Title: ${metadata.title}`;
		if (metadata.url) popupText += `\nOriginal article: ${metadata.url}`;
		return popupText;
	}

	// Helper to search for Readwise article by URL
	// Add a cancelable clipboard copy with delay
	async findReadwiseArticleByUrl(
		url: string,
		target?: HTMLElement
	): Promise<string | null> {
		// Check if the URL is already in the vault
		if (this.settings.debugSetting) {
			console.log("Searching for Readwise article with URL:", url);
		}
		const files = this.app.vault.getMarkdownFiles();
		for (const file of files) {
			const content = await this.app.vault.read(file);
			if (!content.includes(url)) continue;
			const lines = content.split("\n");
			for (const line of lines) {
				const highlight = this.extractHighlightFromLine(line, url);
				if (!highlight) continue;
				const snippet = highlight.substring(0, 200) + "...";
				const metadata = await this.getMetadataFromNote(file);
				const highlight_start_end =
					this.createHighlightFragment(highlight);
				let markdownUrl = "";
				let markdownUrlWithHighlight = "";
				if (metadata.title && metadata.url) {
					markdownUrl = `[${metadata.title}](${metadata.url})`;
					const urlWithHighlight = `${metadata.url}#:~:text=${highlight_start_end}`;
					markdownUrlWithHighlight = `[${metadata.title}](${urlWithHighlight})`;
					if (target) {
						let metaKeyHeld = false;
						let altKeyHeld = false;
						const mouseMoveHandler = (e: MouseEvent) => {
							metaKeyHeld = e.metaKey;
							altKeyHeld = e.altKey;
						};
						const mouseLeaveHandler = () => {
							clearTimeout(copyTimeout);
							target.removeEventListener(
								"mouseleave",
								mouseLeaveHandler
							);
							target.removeEventListener(
								"mousemove",
								mouseMoveHandler
							);
						};
						target.addEventListener(
							"mouseleave",
							mouseLeaveHandler
						);
						target.addEventListener("mousemove", mouseMoveHandler);
						const copyTimeout = setTimeout(async () => {
							target.removeEventListener(
								"mouseleave",
								mouseLeaveHandler
							);
							target.removeEventListener(
								"mousemove",
								mouseMoveHandler
							);
							if (altKeyHeld && metadata.url) {
								await navigator.clipboard.writeText(
									metadata.url
								);
								new Notice(
									"Original article URL copied to clipboard!"
								);
							} else if (metaKeyHeld && metadata.url) {
								const urlWithHighlight = `${metadata.url}#:~:text=${highlight_start_end}`;
								await navigator.clipboard.writeText(
									urlWithHighlight
								);
								new Notice(
									"URL with highlight fragment copied to clipboard!"
								);
							} else {
								await navigator.clipboard.writeText(
									markdownUrlWithHighlight
								);
								new Notice(
									"Markdown URL with highlight copied to clipboard!"
								);
							}
						}, 500);
					}
					// Log the URLs if debug mode is enabled
					if (this.settings.debugSetting) {
						console.log("Markdown URL:", markdownUrl);
						console.log(
							"Markdown URL with highlight:",
							markdownUrlWithHighlight
						);
					}
				}
				const popupText = this.buildPopupText(
					file,
					snippet,
					metadata,
					markdownUrl,
					markdownUrlWithHighlight
				);
				// Only log if debug mode is enabled
				if (this.settings.debugSetting) {
					console.log("Readwise URL: ", url);
					console.log("File Basename: ", file.basename);
					console.log("Full Title: ", metadata.title);
					console.log("Original URL: ", metadata.url);
					console.log("HighLight URL: ", markdownUrlWithHighlight);
					console.log("Markdown URL: ", markdownUrl);
					console.log("Highlight: ", highlight);
					console.log("Snippet: ", snippet);
				}
				return popupText;
			}
		}
		return null;
	}

	// Helper to get the original article URL and Full Title from the Metadata section
	async getMetadataFromNote(
		file: import("obsidian").TFile
	): Promise<{ url: string | null; title: string | null }> {
		const content = await this.app.vault.read(file);
		const lines = content.split("\n");
		let inMetadata = false;
		let url: string | null = null;
		let title: string | null = null;
		for (const line of lines) {
			const trimmed = line.trim();
			if (!inMetadata && trimmed.toLowerCase() === "## metadata") {
				inMetadata = true;
				continue;
			}
			if (inMetadata) {
				if (
					/^#+ /.test(trimmed) &&
					trimmed.toLowerCase() !== "## metadata"
				)
					break;
				if (!url) {
					const urlMatch = trimmed.match(/^[-*]\s*url:\s*(\S+)/i);
					if (urlMatch) url = urlMatch[1].replace(/^<|>$/g, "");
				}
				if (!title) {
					const titleMatch = trimmed.match(
						/^[-*]\s*full title:\s*(.+)$/i
					);
					if (titleMatch) title = titleMatch[1].trim();
				}
				if (url && title) break;
			}
		}
		return { url, title };
	}

	// Helper to show a hover popup
	showHoverPopup(target: HTMLElement, content: string) {
		// Simple implementation: show a tooltip near the link
		const popup = document.createElement("div");
		popup.className = "readwise-hover-popup";
		popup.textContent = content;
		popup.style.position = "absolute";
		popup.style.background = "#222";
		popup.style.color = "#fff";
		popup.style.padding = "8px";
		popup.style.borderRadius = "6px";
		popup.style.zIndex = "9999";
		const rect = target.getBoundingClientRect();
		popup.style.left = `${rect.left + window.scrollX}px`;
		popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
		document.body.appendChild(popup);

		const removePopup = () => {
			popup.remove();
			target.removeEventListener("mouseleave", removePopup);
		};
		target.addEventListener("mouseleave", removePopup);
	}
}

class RWLSettingTab extends PluginSettingTab {
	plugin: ReadwiseLinker;

	constructor(app: App, plugin: ReadwiseLinker) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Debug Mode?")
			.setDesc("Enable debug mode for verbose logging")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.debugSetting)
					.onChange(async (value) => {
						this.plugin.settings.debugSetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
