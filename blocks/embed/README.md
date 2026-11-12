# Embed

One **Embed** block with variants. The variant is the first block option (UE: *Variant* select, `classes`); extra options (UE: *Options* multiselect, `classes_options`) combine with it, e.g. `Embed (wistia, narrow)`.

- `embed.js` dispatches to `variants/<variant>.js` / `variants/<variant>.css` (`default` for plain `Embed`) via `scripts/variants.js`.
- A variant block also carries its old block class (e.g. `embed-marketo`, with `embed-marketo-wrapper` / `embed-marketo-container`), so variant CSS and `styles/styles.css` rules keep matching. `variants/default.css` is scoped with `:where(:not(<variant options>))`, so it never styles a variant block on the same page.
- No item components. Block fields of the other variants arrive as empty rows and are removed.

| Authoring | Variant file | Old block | Item component | Extra options |
| --- | --- | --- | --- | --- |
| `Embed` | variants/default.js | embed | – | `narrow`, `left` |
| `Embed (marketo)` | variants/marketo.js | embed-marketo | – | – |
| `Embed (wistia)` | variants/wistia.js | embed-wistia | – | `narrow` |

## Universal Editor fields

Block model `embed` (rows in this order; a variant leaves the other variants' fields empty): `classes` (select: Default / `marketo` / `wistia`), `classes_options` (multiselect: `narrow`, `left`), `embed_placeholder` + `embed_placeholderAlt` + `embed_uri` (Default, Wistia; one cell), `formId` (Marketo). The Marketo base URL and Munchkin ID are not authored: always the Beckman instance (https://pages.beckman.com, 682-XWP-826), set in variants/marketo.js. Four cells at most (xwalk/max-cells).

## Embed (default)

Authoring: `Embed` (formerly block `embed`).

Purpose: Block Collection embed: YouTube / Vimeo / Twitter player from a URL, lazy-loaded, or click-to-play with a placeholder image. Options: narrow (fixed 1200 x 674 player, scaled down to fit), left (flush left).

Rows: block field group `embed_*`: one cell with an optional placeholder image (`embed_placeholder`) and the URL (`embed_uri`).

## Embed (marketo)

Authoring: `Embed (marketo)` (formerly block `embed-marketo`).

Purpose: Marketo-hosted form (forms2) rendered from the Beckman Marketo instance, red Submit button, single column on mobile.

Rows: block field `formId` (e.g. 3101), after the (empty) `embed_*` row. The block finds the form id by its value (digits), so older content with base URL / Munchkin ID rows still works.

### Supported variations

No variations.

### Universal Editor fields

- `formId` (base URL / Munchkin ID: the Beckman instance, set in the block code).

Use for any Marketo contact / lead form. Base URL and Munchkin ID default to the Beckman instance.

## Embed (wistia)

Authoring: `Embed (wistia)` (formerly block `embed-wistia`).

Purpose: Standalone Wistia player, 16:9, ~83% of the content width, centered; lazy-loaded, or click-to-play with a poster.

Rows: one cell: optional poster image + Wistia URL (fast.wistia.net/embed/iframe/<id>) or media id

### Supported variations

- `narrow`: 8 of 12 columns (66.67% of the content width, source `.embeded-video--col-8`, e.g. Vi-CELL BLU). Default is 10 of 12 (83.33%, `--col-10`, e.g. Cydem VT).

### Universal Editor fields

- field group `embed_*`: `embed_placeholder` + `embed_placeholderAlt` (poster), `embed_uri` (Wistia URL or media id).

Use for any standalone Wistia video. Wistia inside a layout uses intro-video or Hero (motion).
