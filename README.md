# Obsidian Readwise Linker

Obsidian Readwise Linker enhances workflow by making exported Readwise highlights more actionable and accessible.

Importing Readwise highlights into Obsidian is a great way to keep notes and research organized. However, sharing and citing highlights with links to the original articles can be cumbersome. In many workflows, highlights from Readwise are included in notes and research reports using the `![[Article^highlight]]` or `![[Article#section]]` syntax. This plugin allows quick citation of the original source of highlights in footnotes and links without having to navigate to the original Readwise note.

## Features

-   Detects Readwise links in notes and creates links to the original article URL in different formats.
-   On hover of a Readwise `(View Highlight)` link, quickly copy:
    -   The original article URL
    -   A URL with a text fragment highlighting the selected passage
    -   A Markdown link to the article with the highlight fragment
-   Works automatically as notes are browsed.

## Example

Here is a sample Readwise export note of highlights made on the [MDN Text fragments](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments) page from the MDN Web Docs.

---

### Metadata

-   Author: [[MDN Web Docs]]
-   Full Title: Text Fragments - MDN Web Docs
-   Category: #articles
-   Summary: Text fragments allow linking directly to a specific portion of text in a web document, without requiring the author to annotate it with an ID, using particular syntax in the URL fragment. Supporting browsers are free to choose how to draw attention to the linked text, e.g., with a color highlight and/or scrolling to the content on the page. This is useful because it allows web content authors to deep-link to other content they don't control, without relying on the presence of IDs to make that possible. Building on top of that, it could be used to generate more effective content-sharing links for users to pass to one another.
-   URL: <https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments>

### Highlighted on [[2025-05-30]] at 1:06 PM

-   **Text fragments** allow linking directly to a specific portion of text in a web document, without requiring the author to annotate it with an ID, using particular syntax in the URL fragment. ([View Highlight](https://read.readwise.io/read/...))
-   If the ID is changed or removed, the document fragment is ignored, and the link just links through to the top of the page. ([View Highlight](https://read.readwise.io/read/...))
-   **Text fragments** make this a reality — they allow link authors to specify text content to link to, rather than document fragments, in a flexible manner. ([View Highlight](https://read.readwise.io/read/...)) ^6e28cb
-   **Note:** If the provided text fragment does not match any text in the linked document, or if the browser does not support text fragments, the whole text fragment is ignored and the top of the document is linked. ([View Highlight](https://read.readwise.io/read/...))

---

### How it works

When hovering over the `(View Highlight)` links, useful links can be quickly copied to the clipboard. For example, for the first highlight:

1.  Hover over the link: `(View Highlight)` and a markdown-formatted link with the original article URL and text fragment is copied to the clipboard. This is useful for citing the original source with a link that highlights the specific passage.

`[MDN Text fragments](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments#:~:text=Text%20fragments%20allow%20linking%20directly,annotate%20it%20with%20an%20ID.)`

2.  If **Cmd (Mac) / Ctrl (Windows)** is held while hovering, a URL with a text fragment that highlights the selected passage is copied. This link can be pasted into a browser to see the highlight in action.

`https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments#:~:text=Text%20fragments%20make%20this%20a,fragments%2C%20in%20a%20flexible%20manner.`

3.  If **Alt** is held while hovering, the original article URL is copied to the clipboard.

    `https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments`

## How to Use

1. **Install the plugin** in the Obsidian vault.
2. **Open any note** containing Readwise highlights (typically, these are lists of highlight entries that end with `(View Highlight)` that contain a link to readwise.io).
3. **Hover over a Readwise link**. After a short delay, the plugin will:
    - Search the vault for the corresponding Readwise Highlight Note (the note exported from Readwise containing the article metadata and highlight text).
    - Copy a useful link or snippet to the clipboard, depending on which modifier keys are held:
        - **Cmd (Mac) / Ctrl (Windows)**: Copy the article URL with a highlight fragment
        - **Alt**: Copy the original article URL
        - **No modifier**: Copy a Markdown link to the article with the highlight fragment
    - (Optionally) Show a popup with the article title, URL, and highlight snippet.

## Limitations

-   Some websites may not support text fragments, in which case the fragment will be ignored, and the link will point to the top of the page.
-   The plugin doesn't trigger when hovering over a Readwise Highlight Note link in **editing** mode. It will trigger when hovering over the link in **reading** mode. This may have something to do with how Obsidian processes view events, and I'm looking into this.

## Settings

-   Debug mode can be enabled or disabled to see additional information in the developer console.

## Requirements

-   Readwise highlights must be imported into the Obsidian vault as Markdown files.

## Why use this?

-   Quickly cite or revisit the original source of highlights.
-   Share precise highlight links with others or in personal research.
-   Save time copying and formatting links for notes and writing.

---

For questions or issues, see the [GitHub repo](https://github.com/joescharf/obsidian-readwise-linker).
