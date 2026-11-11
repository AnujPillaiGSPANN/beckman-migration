# feature-modules

Custom **columns** block. Purpose: Three equal columns, each a short heading/label followed by a bulleted list or an image; stacks on mobile.

## Authoring (Document Authoring)

Model: `standalone`

Single block table. Content: one row, three cells: heading + bulleted list, or label + image.

## Supported variations

No variations.

## Universal Editor fields

Container block (`core/franklin/components/block/v1/block`, filter `feature-modules`) holding `feature-modules-row` items. Each row renders up to three cells, one per field group `columnN_*` (N = 1..3):

- `columnN_text` (rich text): heading/label + list.
- `columnN_image` (image) + `columnN_imageAlt` (alt text): optional image shown below the label.
