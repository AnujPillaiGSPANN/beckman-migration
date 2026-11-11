# cards-downloads

Custom **cards** block. Purpose: Two-column grid of white bordered rows: title link on the left, resource type label and "| PDF" download link with a red download icon on the right.

## Authoring (Document Authoring)

Model: `collection`

Repeating rows — one row per item. Each item: one row per document, one rich text cell `text`: title link paragraph + type label paragraph (e.g. "Application Note") + optional link-only paragraph "PDF" pointing at the PDF.

## Supported variations

No variations.

## Universal Editor fields

- Content fields derived from the block's decorate contract.
- A separate `-item` model defines one repeated item.
