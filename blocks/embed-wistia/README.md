# embed-wistia

Custom **embed** block. Purpose: Standalone Wistia player, 16:9, ~83% of the content width, centered; lazy-loaded, or click-to-play with a poster.

## Authoring (Document Authoring)

Model: `standalone`

Single block table. Content: one cell: optional poster image + Wistia URL (fast.wistia.net/embed/iframe/<id>) or media id.

## Supported variations

- `narrow`: 8 of 12 columns (66.67% of the content width, source `.embeded-video--col-8`, e.g. Vi-CELL BLU). Default is 10 of 12 (83.33%, `--col-10`, e.g. Cydem VT).

## Universal Editor fields

- Content fields derived from the block's decorate contract.
