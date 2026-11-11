# carousel-testimonial

Custom **carousel** block. Purpose: Wistia testimonial video (5/12) beside a quote slider (7/12): red quote glyph, quote text, centred italic attribution, prev/next chevrons and dots.

## Authoring (Document Authoring)

Model: `collection`

Repeating rows — one row per item. Each item: row 1 (block fields video_*): optional poster image + Wistia URL or id; then one row per quote (item `text`): quote paragraph(s) + italic attribution paragraph.

## Supported variations

No variations.

## Universal Editor fields

- Content fields derived from the block's decorate contract.
- A separate `-item` model defines one repeated item.
