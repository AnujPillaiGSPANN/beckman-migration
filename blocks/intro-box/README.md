# intro-box

Custom **columns** block. Purpose: page intro copy beside a boxed callout (heading + bulleted list).

## Authoring (Document Authoring)

Model: `standalone`

Single block table. Content: one row with two cells: (1) intro paragraphs with inline links, (2) a heading (h3) followed by a bulleted list, rendered as a grey callout box with a red left accent; ~60/40 split on desktop, stacked on mobile.

## Supported variations

No variations.

## Universal Editor fields

Container block (`core/franklin/components/block/v1/block`, filter `intro-box`) holding `intro-box-row` items. Each row renders two cells:

- `column1` (rich text): intro paragraphs.
- `column2` (rich text): box heading + list.
