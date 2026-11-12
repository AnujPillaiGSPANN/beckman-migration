# accordion

One **Accordion** block with its variants as a block option (Universal Editor: "Variant" select,
stored in `classes`). `accordion.js` calls `scripts/variants.js`, which adds the legacy class names
(`accordion-faq`, `accordion-faq-wrapper`, `accordion-faq-container`, …) and loads
`variants/<variant|default>.{js,css}`.

Rows of imported content may start with an item-id cell (`accordion-item`, `accordion-faq-item`,
`accordion-icon-grid-item`, `accordion-rail-item`) that tells the converter which item model a
row uses; the block removes it.

## Accordion (default)

Block Collection accordion: stacked `<details>` items.

Authoring: `Accordion`. Item `accordion-item` per item: (1) `summary`; (2) `text`.

## Accordion (faq)

FAQ question bars (#f0f0f0, plus/minus icon on the left) split into two columns; each item expands
independently with an animated height.

Authoring: `Accordion (faq)`. Item `accordion-faq-item` per question: (1) question text
(`summary`); (2) answer rich text (`text`). The block puts the first half of the rows in the left
column.

## Accordion (icons)

Row of grey icon tiles (4/2/1 per row) that reveal their bullet lists below the tiles, red chevron
indicator. As on the source (all tiles share one toggle function), clicking any tile opens or
closes every tile of its row together, with a 500ms ease-out max-height transition.
(Formerly the `accordion-icon-grid` block.)

Authoring: `Accordion (icons)`. Item `accordion-icon-grid-item` per tile: (1) icon image + title
(`label_image`, `label_imageAlt`, `label_summary`); (2) content, bulleted list (`content_text`).

## Accordion (rail)

Sidebar link tree: blue parent links with a grey chevron toggle on the left that expands/collapses
their child links (collapsed by default, animated height); the current page's link is bold dark
grey.

Authoring: `Accordion (rail)`. Item `accordion-rail-item` per parent item: (1) parent link
(`summary`, richtext holding a single link); (2) child links (`text`, richtext bulleted list of
links; empty for a plain link without a chevron). The current page is detected at runtime by href.

## Universal Editor fields

- Block model `accordion`: `classes` (select: Default, faq, icons, rail).
- Item models: `accordion-item`, `accordion-faq-item`, `accordion-icon-grid-item`,
  `accordion-rail-item` (filter `accordion` allows all of them).
