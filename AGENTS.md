# Project rules — Beckman migration (AEM Edge Delivery, xwalk / Universal Editor)

## Blocks: families with variants (required)

Blocks are organised as **families with variants**. A new look of an existing kind of block is a
**variant of its family**, never a block of its own and never a page-specific block.
`npm run lint:blocks` (part of `npm run lint`) enforces this.

| Family | Variants (block option) | Extra options |
|---|---|---|
| `cards` | default, product, faq, icons, resource, scroll, doclist, downloads, gradient, steps, workflow, tiles | compact, cover, exchange, unnumbered, panels |
| `carousel` | default, gallery, product, testimonial | |
| `accordion` | default, faq, icons, rail | |
| `table` | default, comparison, specs | striped, bordered, no-header, pairs |
| `hero` | default, motion, promo, banner | |
| `embed` | default, marketo, wistia | narrow, left |

Authors pick the variant in the block's "Variant" select; documents/imports write it as
`Cards (faq)`, `Table (specs, pairs)`, `Embed (wistia, narrow)`. The default look keeps the
plain name (`Cards`).

**Standalone blocks** (not families): `intro-box`, `intro-video`, `media-split`,
`feature-modules` and `columns` (Columns-based: AEM drops the name of blocks starting with
"columns", so they cannot be family variants; they take options, e.g. `Media Split (wrap)`),
plus `header`, `footer`, `form`, `fragment`, `modal`, `quote`, `search`, `tabs`, `video`.

### Adding a new look

1. Find the family it belongs to (cards for repeated items, carousel for slides, accordion for
   expandable items, table for tabular data, hero for page-top banners, embed for third-party
   media and forms). Only if it genuinely fits no family and no standalone block, create a new
   standalone block: ask the project owner first, then add it to `STANDALONE` in
   `tools/check-block-families.mjs` and to the list above.
2. Name the variant with **one lower-case word** (AEM splits hyphenated options into separate
   classes): `whitepaper`, not `white-paper`.
3. Add `blocks/<family>/variants/<variant>.js` (default export `decorate(block)`) and
   `<variant>.css`. Imports are three levels up: `../../../scripts/aem.js`.
4. Register it in `blocks/<family>/<family>.js`: `VARIANTS` maps the option to its class name
   (`whitepaper: 'cards-whitepaper'`); add any new item component id to `ITEMS`.
   `scripts/variants.js` adds that class to the block (plus `-wrapper` / `-container` on its
   wrapper and section), removes the item-id cell and empty rows, then loads the variant files.
   Scope variant CSS with that class (`.cards-whitepaper …`).
5. Model (`blocks/<family>/_<family>.json`, one block definition per family): add the variant to
   the `classes` select, new extra options to `classes_options`, item models (keep the ids) and
   list new items in the family filter. Max 4 cells per model (xwalk lint). Run
   `npm run build:json`.
6. Document it in `blocks/<family>/README.md` and `blocks/<family>/metadata.json`.
7. Importer parsers (`tools/importer/parsers/`) output the family name with the variant:
   `Cards (whitepaper)`; in families with several item types every item row starts with a cell
   holding the item component id (e.g. `cards-whitepaper-card`) so the converter picks the right
   model.

Never copy a family into a new folder (e.g. `blocks/cards-whitepaper/`), and never make a
block for one page: a page-specific look is a variant (or a section style in
`models/_section.json` + `styles/styles.css` when it is about the section, not the block).

## Other rules learned on this project

- Content changes are local unless the owner explicitly asks to upload, preview or publish.
- AEM differences to keep in mind: it drops the `<p>` around single-paragraph cells
  (`wrapInlineCells`), stores linked images as image + bare link (`joinLinkedImages`), turns
  text URLs into links (`unlinkTextUrls`), stores headings as plain text (no `<br>`), renders
  every model field as a row (empty ones too) and ends pages with an empty section.
- Checks before handing over: `npm run lint`, the xwalk JCR conversion check, and the render
  regression (`migration-work/tools/render-baseline.cjs compare`) for pages using what changed.
