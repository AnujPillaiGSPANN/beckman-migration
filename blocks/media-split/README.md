# media-split

Custom **columns** block. Purpose: Copy (intro, red check-circle list, CTA) beside a large image with an optional caption, ~50/50.

## Authoring (Document Authoring)

Model: `standalone`

Single block table. Content: one row, two cells: (1) rich text (intro, list, optional button); (2) image + optional caption paragraph.

Layout follows the content (no variant class needed):
- No caption: Biomek layout – bootstrap container (720/940/1140px), 50/50 columns from 992px; a list that follows a paragraph gets red check-circle markers.
- Image caption present: Cydem VT layout – auto table layout (cells side by side above 600px), plain bullets, image at 70%/80% with a 12px caption.

## Supported variations

Options (block `classes`, single words, combinable):

- `wrap` – "Media Split (wrap)": long-form article text (headings, paragraphs) wraps around a
  400px screenshot floated right (max 100% of the column), 10px gutter, 2px #efefef image border,
  no bootstrap container, no check-circle list markers. Like the source float, text after the block
  keeps wrapping beside the image. Source: MET ONE 3400+ IT Implementation Guide whitepaper.
- `left` (with `wrap`) – "Media Split (wrap, left)": the screenshot floats left.

The image side is an option, not the cell order: xwalk maps cells to model fields by position,
so the text cell always comes first.

## Universal Editor fields

Container block (`core/franklin/components/block/v1/block`, model `media-split`: `classes` multiselect `wrap`, `left`; filter `media-split`) holding `media-split-row` items. Each row renders two cells:

- `column1` (rich text): intro, list, optional button.
- `column2_*` group (one cell): `column2_image` (image), `column2_imageAlt` (alt text), `column2_text` (rich text caption, optional).
