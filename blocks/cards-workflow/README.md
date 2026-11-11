# cards-workflow

Custom **cards** block. Purpose: One row of numbered workflow steps with grey chevrons between them: coloured number badge + step name, product image, product name; whole tile links to the product with a grey hover; stacks on mobile.

## Authoring (Document Authoring)

Model: `collection`

Repeating rows — one row per item. Each item: one row per step: (1) product image (`image`/`imageAlt`); (2) rich text `text`: bold step name paragraph + product name link paragraph. The block numbers the steps.

## Supported variations

No variations.

## Universal Editor fields

- Content fields derived from the block's decorate contract.
- A separate `-item` model defines one repeated item.

## Options

- `unnumbered` (Vi-CELL BLU integrations): no number badges and no chevrons; bordered 33% tiles, 40vh tall, centred blue name above a contained image, no hover. The name may itself be the link: `<p><strong><a href>name</a></strong></p>`.
