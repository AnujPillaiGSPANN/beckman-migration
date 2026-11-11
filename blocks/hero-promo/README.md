# hero-promo

Custom **hero** block. Purpose: Mid-page content-width dark promo banner: background photo behind a pink eyebrow, very large H2 and text, a 4-up bordered icon feature strip and a centred red CTA.

## Authoring (Document Authoring)

Model: `collection`

Repeating rows — one row per item. Each item: block fields: (1) background image (`image`/`imageAlt`); (2) rich text `text`: eyebrow paragraph + H2 + paragraph + CTA link (strong-wrapped); (3) optional mobile image (`mobileImage`/`mobileImageAlt`, source `.mobile-img`: shown under the CTA below 768px only); then one row per feature (item hero-promo-feature): icon image (`image`/`imageAlt`) + rich text `text` (bold title paragraph + description).

## Supported variations

No variations.

## Universal Editor fields

- Content fields derived from the block's decorate contract.
- A separate `-item` model defines one repeated item.
