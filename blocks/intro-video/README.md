# intro-video

Custom **columns** block. Purpose: Intro copy (first paragraph in a grey box) beside a click-to-play Wistia video, 50/50.

## Authoring (Document Authoring)

Model: `standalone`

Single block table. Content: one row, two cells: (1) rich text, first paragraph boxed; (2) Wistia video URL (+ optional caption).

## Supported variations

No variations.

## Universal Editor fields

Container block (`core/franklin/components/block/v1/block`, filter `intro-video`) holding `intro-video-row` items. Each row renders two cells:

- `column1` (rich text): intro copy (first paragraph is boxed).
- `column2` (rich text): Wistia link (`https://fast.wistia.net/embed/iframe/<id>`) + optional caption.
