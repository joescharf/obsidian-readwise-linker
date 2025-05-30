// __mocks__/obsidian.js
module.exports = {
	Plugin: class {
		constructor(app, manifest) {
			this.app = app;
			this.manifest = manifest;
		}
	},
	PluginSettingTab: class {},
	Modal: class {},
	Notice: class {},
	Setting: class {
		setName() {
			return this;
		}
		setDesc() {
			return this;
		}
		addText() {
			return this;
		}
	},
	MarkdownView: class {},
	App: class {},
	TFile: class {},
};
