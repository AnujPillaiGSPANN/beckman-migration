# cards-doclist

Custom **cards** block. Purpose: One-column list of documents: type icon (PDF / video), bold blue title link opening in a new tab, optional one-line ellipsis description; Resource Type filter and pagination built from the rows.

## Authoring (Document Authoring)

Model: `collection`

Repeating rows — one row per item. Each item: one row per document: (1) type cell: "pdf" or "video" (select field `type`); (2) rich text `text`: title link paragraph + optional description paragraph.

## Supported variations

No variations.

## Universal Editor fields

- Content fields derived from the block's decorate contract.
- A separate `-item` model defines one repeated item.
