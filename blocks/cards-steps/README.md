# cards-steps

Custom **cards** block. Purpose: Centred bordered step cards: photo on top, full-width coloured label bar (purple, navy, cyan by position), short description; "exchange" option draws → / ← arrows between two cards.

## Authoring (Document Authoring)

Model: `collection`

Repeating rows — one row per item. Each item: one row per card: (1) image (`image`/`imageAlt`); (2) rich text `text`: bold label paragraph (e.g. FIRST STEP) + description paragraph.

## Supported variations

| Variation | Option class |
| --- | --- |
| Exchange arrows | `exchange` |

## Universal Editor fields

- Content fields derived from the block's decorate contract.
- `classes` select for options: Exchange arrows.
- A separate `-item` model defines one repeated item.
