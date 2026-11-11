# table-comparison

Custom **table** block. Purpose: Comparison grid: label column + shadowed white model columns, product images in the header rows, row dividers, CTA row.

## Authoring (Document Authoring)

Model: `standalone`

Single block table. Content: rows of [label | model 1 | model 2 | ...]: row 1 model names, row 2 product images, attribute rows, last row CTA links; up to 4 models, empty model columns are dropped.

## Supported variations

No variations.

## Universal Editor fields

Container block (`core/franklin/components/block/v1/block`, filter `table-comparison`) holding `table-comparison-row` items ("Comparison Row"). Each row renders four cells, one per field group `columnN_*` (N = 1 label column, 2..4 models):

- `columnN_text` (rich text): name, value or CTA link.
- `columnN_image` (image) + `columnN_imageAlt` (alt text): product image (image row). Do not link the image; the block links it to the CTA ("Explore ...") in the same column.
