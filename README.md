# Obsidian Readwise Linker

Obsidian Readwise Linker enhances your workflow by making your Readwise highlights in Obsidian more actionable and accessible.

Importing Readwise highlights into Obsidian is a great way to keep your notes and research organized. However, sharing and citing highlights with links to the original articles can be cumbersome.

## Features

-   Detects Readwise links in your notes and surfaces the original article URL and full title.
-   On hover of a Readwise `View Highlight` link, quickly copy:
    -   The original article URL
    -   A URL with a text fragment highlighting your selected passage
    -   A Markdown link to the article with the highlight fragment
-   Works automatically as you browse your notes.

## Example

Here are some sample highlights of the [MDN Text fragments](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments) page from the MDN Web Docs.

### Highlighted on [[2025-05-30]] at 1:06 PM

-   **Text fragments** allow linking directly to a specific portion of text in a web document, without requiring the author to annotate it with an ID, using particular syntax in the URL fragment. ([View Highlight](https://read.readwise.io/read/...))
-   If the ID is changed or removed, the document fragment is ignored, and the link just links through to the top of the page. ([View Highlight](https://read.readwise.io/read/...))
-   **Text fragments** make this a reality — they allow link authors to specify text content to link to, rather than document fragments, in a flexible manner. ([View Highlight](https://read.readwise.io/read/...)) ^6e28cb
-   **Note:** If the provided text fragment does not match any text in the linked document, or if the browser does not support text fragments, the whole text fragment is ignored and the top of the document is linked. ([View Highlight](https://read.readwise.io/read/...))

### How it works

When I hover over the `View Highlight` links, I can quickly copy useful links to my clipboard, for example - the first highlight:

1.  Hover over the link: `View Highlight` and a markdown-formatted link with the original article URL with text fragment is copied to the clipboard. This is useful for citing the original source with a link that highlights the specific passage.

`[MDN Text fragments](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments#:~:text=Text%20fragments%20allow%20linking%20directly,annotate%20it%20with%20an%20ID.)`

2.  If I hold **Cmd (Mac) / Ctrl (Windows)** while hovering, it copies a URL with a text fragment that highlights the selected passage. You can paste this link into a browser to see the highlight in action.

`https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments#:~:text=Text%20fragments%20make%20this%20a,fragments%2C%20in%20a%20flexible%20manner.`

3.  If I hold **Alt** while hovering, it copies the original article URL to the clipboard.

    `https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments`

## How to Use

1. **Install the plugin** in your Obsidian vault.
2. **Open any note** containing Readwise highlights (typically, these are list items with a link to readwise.io).
3. **Hover over a Readwise link**. After a short delay, the plugin will:
    - Search your vault for the corresponding highlight and its metadata.
    - Copy a useful link or snippet to your clipboard, depending on which modifier keys you hold:
        - **Cmd (Mac) / Ctrl (Windows)**: Copy the article URL with a highlight fragment
        - **Alt**: Copy the original article URL
        - **No modifier**: Copy a Markdown link to the article with the highlight fragment
    - (Optionally) Show a popup with the article title, URL, and highlight snippet.

## Settings

-   You can configure plugin settings from the Obsidian settings tab (currently only a placeholder setting).

## Requirements

-   You must have Readwise highlights imported into your Obsidian vault as Markdown files.

## Why use this?

-   Quickly cite or revisit the original source of your highlights.
-   Share precise highlight links with others or in your own research.
-   Save time copying and formatting links for your notes and writing.

---

For questions or issues, see the [GitHub repo](https://github.com/joescharf/obsidian-readwise-linker).
