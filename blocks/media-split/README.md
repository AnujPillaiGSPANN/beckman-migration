# media-split

Custom **columns** block. Purpose: Copy (intro, red check-circle list, CTA) beside a large image with an optional caption, ~50/50.

## Authoring (Document Authoring)

Model: `standalone`

Single block table. Content: one row, two cells: (1) rich text (intro, list, optional button); (2) image + optional caption paragraph.

Layout follows the content (no variant class needed):
- No caption: Biomek layout – bootstrap container (720/940/1140px), 50/50 columns from 992px; a list that follows a paragraph gets red check-circle markers.
- Image caption present: Cydem VT layout – auto table layout (cells side by side above 600px), plain bullets, image at 70%/80% with a 12px caption.

## Supported variations

No variations.

## Universal Editor fields

Container block (`core/franklin/components/block/v1/block`, filter `media-split`) holding `media-split-row` items. Each row renders two cells:

- `column1` (rich text): intro, list, optional button.
- `column2_*` group (one cell): `column2_image` (image), `column2_imageAlt` (alt text), `column2_text` (rich text caption, optional).
