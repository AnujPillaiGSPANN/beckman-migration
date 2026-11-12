# accordion-rail

Custom **accordion** block. Purpose: Sidebar link tree: blue parent links with a grey chevron toggle on the left that expands/collapses their child links (collapsed by default, animated height); the current page's link is bold dark grey.

## Authoring (Document Authoring)

Model: `collection`

Repeating rows — one row per item. Each item: one row per parent item: (1) parent link (`summary`, richtext holding a single link); (2) child links (`text`, richtext bulleted list of links; empty for a plain link without a chevron). The current page is detected at runtime by href.

## Supported variations

No variations.

## Universal Editor fields

- Content fields derived from the block's decorate contract.
- A separate `-item` model defines one repeated item.
