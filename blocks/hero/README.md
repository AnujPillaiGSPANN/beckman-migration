# Hero

One **Hero** block with variants. The variant is the first block option (UE: *Variant* select, `classes`).

- `hero.js` dispatches to `variants/<variant>.js` / `variants/<variant>.css` (`default` for plain `Hero`) via `scripts/variants.js`.
- A variant block also carries its old block class (e.g. `hero-video`, with `hero-video-wrapper` / `hero-video-container`), so variant CSS and `styles/styles.css` rules keep matching. `variants/default.css` is scoped with `:where(:not(<variant options>))`, so it never styles a variant block on the same page.
- Only the promo variant has items (`hero-promo-feature`, the only item component of the family, so its rows carry no item id cell). Block fields of the other variants arrive as empty rows and are removed.

| Authoring | Variant file | Old block | Item component | Extra options |
| --- | --- | --- | --- | --- |
| `Hero` | variants/default.js | hero | – | – |
| `Hero (motion)` | variants/motion.js | hero-video | – | – |
| `Hero (promo)` | variants/promo.js | hero-promo | `hero-promo-feature` | – |
| `Hero (banner)` | variants/banner.js | hero-banner | – | – |

## Universal Editor fields

Block model `hero` (rows in this order; a variant leaves the other variants' fields empty): `classes` (select: Default / `motion` / `promo` / `banner`), `image` + `imageAlt` (Default, Promo, Banner: background image), `media_image` + `media_imageAlt` + `media_video` (one cell; Motion: poster + Wistia URL, Promo: mobile image in `media_image`/`media_imageAlt`), `text` (all variants). Four cells at most (xwalk/max-cells). Item model `hero-promo-feature`: `image`, `imageAlt`, `text`. Filter `hero`: `hero-promo-feature`.

## Hero (default)

Authoring: `Hero` (formerly block `hero`).

Purpose: Default boilerplate hero: background image behind an H1.

Rows: block fields: (1) image (`image`/`imageAlt`); (2) rich text `text`.

## Hero (motion)

Authoring: `Hero (motion)` (formerly block `hero-video`).

Purpose: Full-width hero with a muted, looping Wistia background video (no controls) under a dark overlay, a centered H1 and pill CTAs.

Rows: block fields: (1) field group `media_*`: Wistia video URL (`media_video`), optional poster image (`media_image`/`media_imageAlt`); (2) rich text `text`: H1 + CTA links (bold links render as buttons).

### Supported variations

No variations.

### Universal Editor fields

- `media_image`, `media_imageAlt`, `media_video`, `text` (see the merged field list above).

Use for top-of-page banners whose background is a looping video. For an image background use Hero.

## Hero (promo)

Authoring: `Hero (promo)` (formerly block `hero-promo`). Item component: `hero-promo-feature`.

Purpose: Mid-page content-width dark promo banner: background photo behind a pink eyebrow, very large H2 and text, a 4-up bordered icon feature strip and a centred red CTA.

Rows: block fields: (1) background image (`image`/`imageAlt`); (2) optional mobile image (`media_image`/`media_imageAlt`, shown under the CTA below 768px only; empty row if none); (3) rich text `text`: eyebrow paragraph + H2 + paragraph + CTA link (strong-wrapped); then one row per feature (item hero-promo-feature): icon image (`image`/`imageAlt`) + rich text `text` (bold title paragraph + description)

### Supported variations

No variations.

### Universal Editor fields

- `image`, `imageAlt`, `media_image`, `media_imageAlt` (mobile image), `text`; items `hero-promo-feature` (`image`, `imageAlt`, `text`).

Use for in-page product/software promos on a dark background. For a page-top video hero use Hero (motion).

## Hero (banner)

Authoring: `Hero (banner)`. No items.

Purpose: Page-top full-width dark banner: a background photo (cover, anchored at 15% 0) under a 70% black overlay, a centred 60px H1 and an 18px light subtitle, 500px tall at every width. The photo never sizes the banner.

Rows: block fields: (1) background image (`image`/`imageAlt`, decorative: alt may be empty); (2) rich text `text`: H1 + subtitle paragraph(s) (bold runs stay bold). The `media_*` row stays empty.

### Supported variations

No variations.

### Universal Editor fields

- `image`, `imageAlt`, `text`.

Use for technology / landing page title banners on a photo. For a video background use Hero (motion); for a mid-page promo with a feature strip use Hero (promo).
