# carousel

One **Carousel** block with its variants as a block option (Universal Editor: "Variant" select,
stored in `classes`). `carousel.js` calls `scripts/variants.js`, which adds the legacy class names
(`carousel-gallery`, `carousel-gallery-wrapper`, `carousel-gallery-container`, …) and loads
`variants/<variant|default>.{js,css}`.

Rows of imported content may start with an item-id cell (`carousel-item`,
`carousel-gallery-slide`, `carousel-product-card`, `carousel-testimonial-slide`) that tells the
converter which item model a row uses; the block removes it. Empty rows (block-level fields of
other variants, e.g. the testimonial video group) are removed too.

## Carousel (default)

Block Collection carousel: full-width slides with indicators and prev/next buttons.

Authoring: `Carousel`. Item `carousel-item` per slide: (1) background image (`media_image`,
`media_imageAlt`); (2) text (`content_text`).

## Carousel (gallery)

Product image gallery: one large image at a time, prev/next chevrons, clickable thumbnail strip
generated from the slides.

Authoring: `Carousel (gallery)`. Item `carousel-gallery-slide` per image: (1) image (`image`,
`imageAlt`); (2) optional caption (`text`).

## Carousel (product)

Multi-card slider of white bordered product cards with prev/next arrows (5/3/2/1 visible); arrows
hide when all cards fit.

Authoring: `Carousel (product)`. Item `carousel-product-card` per card, same cells as Cards
(product): (1) image, optionally linked (`image`, `imageAlt`); (2) linked title heading +
description / list (`text`).

## Carousel (testimonial)

Wistia testimonial video (5/12) beside a quote slider (7/12): red quote glyph, quote text, centred
italic attribution, prev/next chevrons and dots.

Authoring: `Carousel (testimonial)`. Block fields `video_image`, `video_imageAlt`, `video_uri`
(row 1: optional poster image + Wistia URL or id); then item `carousel-testimonial-slide` per
quote (`text`): quote paragraph(s) + italic attribution paragraph.

## Universal Editor fields

- Block model `carousel`: `classes` (select: Default, gallery, product, testimonial),
  `video_image`, `video_imageAlt`, `video_uri` (testimonial only).
- Item models: `carousel-item`, `carousel-gallery-slide`, `carousel-product-card`,
  `carousel-testimonial-slide` (filter `carousel` allows all of them).
