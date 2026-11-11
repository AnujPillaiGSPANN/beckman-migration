# accordion-faq

Custom **accordion** block. Purpose: FAQ question bars (#f0f0f0, plus/minus icon on the left) split into two columns; each item expands independently with an animated height.

## Authoring (Document Authoring)

Model: `collection`

Repeating rows — one row per item. Each item: one row per question: (1) question text (`summary`); (2) answer rich text (`text`). The block puts the first half of the rows in the left column.

## Supported variations

No variations.

## Universal Editor fields

- Content fields derived from the block's decorate contract.
- A separate `-item` model defines one repeated item.
