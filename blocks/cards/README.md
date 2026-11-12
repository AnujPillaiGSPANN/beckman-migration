# Cards

One **Cards** block with variants. The variant is the first block option (UE: *Variant* select, `classes`); extra options (UE: *Options* multiselect, `classes_options`) combine with it, e.g. `Cards (icons, compact)`.

- `cards.js` dispatches to `variants/<variant>.js` / `variants/<variant>.css` (`default` for plain `Cards`) via `scripts/variants.js`.
- A variant block also carries its old block class (e.g. `cards-faq`, with `cards-faq-wrapper` / `cards-faq-container`), so variant CSS and `styles/styles.css` rules keep matching.
- Each variant has its own item component; in imported content every item row starts with a cell holding the item component id (e.g. `cards-faq-card`), which the block removes.

| Authoring | Variant file | Old block | Item component | Extra options |
| --- | --- | --- | --- | --- |
| `Cards` | variants/default.js | cards | `card` | – |
| `Cards (product)` | variants/product.js | cards-product | `cards-product-card` | – |
| `Cards (faq)` | variants/faq.js | cards-faq | `cards-faq-card` | – |
| `Cards (icons)` | variants/icons.js | cards-icon | `cards-icon-card` | `compact` |
| `Cards (resource)` | variants/resource.js | cards-resource | `cards-resource-card` | – |
| `Cards (scroll)` | variants/scroll.js | cards-scroll | `cards-scroll-card` | `cover` |
| `Cards (doclist)` | variants/doclist.js | cards-doclist | `cards-doclist-item` | – |
| `Cards (downloads)` | variants/downloads.js | cards-downloads | `cards-downloads-item` | – |
| `Cards (gradient)` | variants/gradient.js | cards-gradient | `cards-gradient-item` | – |
| `Cards (steps)` | variants/steps.js | cards-steps | `cards-steps-item` | `exchange` |
| `Cards (workflow)` | variants/workflow.js | cards-workflow | `cards-workflow-item` | `unnumbered` |
| `Cards (tiles)` | variants/tiles.js | cards-tiles | `cards-tiles-card` | `panels` |

## Cards (default)

Authoring: `Cards` (formerly block `cards`). Item component: `card`.

Purpose: Default Block Collection cards: grid of bordered cards, image (4:3, cover) above a text body.

Rows: one row per card: (1) image; (2) rich text body.

## Cards (product)

Authoring: `Cards (product)` (formerly block `cards-product`). Item component: `cards-product-card`.

Purpose: Grid of product or service cards, each with an image, a linked title, a short description and a feature list. The whole card links to the title link target.

Rows: two cells: (1) product image (contained, centered, not cropped), (2) title heading wrapping a link to the detail page, a description paragraph and a bulleted feature list; the title link makes the whole card clickable.

Use for product series / category listings that link to detail pages. For text-only boxes use Cards (faq).

## Cards (faq)

Authoring: `Cards (faq)` (formerly block `cards-faq`). Item component: `cards-faq-card`.

Purpose: Stacked full-width grey boxes, each holding one question heading and its answer.

Rows: one cell: a question heading (bold) followed by one or more answer paragraphs (inline links allowed); no image.

Use for static FAQ lists where every answer is always visible. For collapsible Q&A use accordion.

## Cards (icons)

Authoring: `Cards (icons)` (formerly block `cards-icon`). Item component: `cards-icon-card`.

Purpose: Static, borderless, centered benefit tiles: red line icon, bold title, short description; 4 across desktop, 2x2 mobile.

Rows: one row per tile: (1) icon image; (2) bold title paragraph + description.

Options:

- `compact` (Density Gradient Media "Applications"): 100px icons at their own aspect ratio, title weight 500, 13px / 1.1 descriptions. Author as `Cards (icons, compact)`.

Use for benefit/feature icon rows. For tiles that expand use accordion-icon-grid.

## Cards (resource)

Authoring: `Cards (resource)` (formerly block `cards-resource`). Item component: `cards-resource-card`.

Purpose: Wrapping 4/2/1 grid of document cards: bold title above a bordered cover thumbnail, red outline "Read" button.

Rows: one row per card: (1) cover image (optionally linked); (2) bold title paragraph + "Read" link.

Use for application notes / resource listings. For a horizontal strip use Cards (scroll).

## Cards (scroll)

Authoring: `Cards (scroll)` (formerly block `cards-scroll`). Item component: `cards-scroll-card`.

Purpose: Single-row horizontal scroll strip: brochure covers with a hover "Download" overlay link, or application tiles (landscape image, red eyebrow, bold linked title).

Rows: one row per tile: (1) image; (2) a single download link, or eyebrow paragraph + linked title.

Options:

- `cover` (Echo "Explore Applications"): tile images fill the image area (object-fit: cover). Author as `Cards (scroll, cover)`.

Use for brochure/download strips and linked tile strips. For a wrapping grid use Cards (product) or Cards (resource).

## Cards (doclist)

Authoring: `Cards (doclist)` (formerly block `cards-doclist`). Item component: `cards-doclist-item`.

Purpose: One-column list of documents: type icon (PDF / video), bold blue title link opening in a new tab, optional one-line ellipsis description; Resource Type filter and pagination built from the rows.

Rows: one row per document: (1) type cell: "pdf" or "video" (select field `type`); (2) rich text `text`: title link paragraph + optional description paragraph.

Use for product-page "Content and Resources" document lists. For a cover-image grid use Cards (resource); for a two-column bordered download list use Cards (downloads).

## Cards (downloads)

Authoring: `Cards (downloads)` (formerly block `cards-downloads`). Item component: `cards-downloads-item`.

Purpose: Two-column grid of white bordered rows: title link on the left, resource type label and "| PDF" download link with a red download icon on the right.

Rows: one row per document, one rich text cell `text`: title link paragraph + type label paragraph (e.g. "Application Note") + optional link-only paragraph "PDF" pointing at the PDF.

Use for application-note / document download lists without images. For a single-column filterable list use Cards (doclist).

## Cards (gradient)

Authoring: `Cards (gradient)` (formerly block `cards-gradient`). Item component: `cards-gradient-item`.

Purpose: 2x2 grid of grey text cards with a 4px red-to-purple gradient top border, heading, text and a right-aligned red outline button; hover lift.

Rows: one row per card, one rich text cell `text`: heading (h3) + paragraph(s) + em-wrapped link (outline button).

Use for 2-up "explore more" link cards without images. For static Q&A boxes use Cards (faq).

## Cards (steps)

Authoring: `Cards (steps)` (formerly block `cards-steps`). Item component: `cards-steps-item`.

Purpose: Centred bordered step cards: photo on top, full-width coloured label bar (purple, navy, cyan by position), short description; "exchange" option draws → / ← arrows between two cards.

Rows: one row per card: (1) image (`image`/`imageAlt`); (2) rich text `text`: bold label paragraph (e.g. FIRST STEP) + description paragraph.

Options:

- `exchange`: two cards with a stacked → / ← arrow pair drawn between them (bars purple then cyan). Author as `Cards (steps, exchange)`.

Use for short illustrated process steps. Add the Exchange option for a two-card swap (bars purple then cyan). For linked numbered product steps use Cards (workflow).

## Cards (workflow)

Authoring: `Cards (workflow)` (formerly block `cards-workflow`). Item component: `cards-workflow-item`.

Purpose: One row of numbered workflow steps with grey chevrons between them: coloured number badge + step name, product image, product name; whole tile links to the product with a grey hover; stacks on mobile.

Rows: one row per step: (1) product image (`image`/`imageAlt`); (2) rich text `text`: bold step name paragraph + product name link paragraph. The block numbers the steps.

Options:

- `unnumbered` (Vi-CELL BLU integrations): no number badges and no chevrons; bordered 33% tiles, centred blue name above a contained image, no hover. The name may itself be the link: `<p><strong><a href>name</a></strong></p>`. Author as `Cards (workflow, unnumbered)`.

Use for linked product workflows (step 1..n). For unlinked photo step cards use Cards (steps).

## Cards (tiles)

Authoring: `Cards (tiles)` or `Cards (tiles, panels)`. Item component: `cards-tiles-card`.

Purpose: Bordered tiles, each linking to a detail page: image on top, centred title below; the whole tile is clickable through its title link. Tiles share one row (equal widths, 16px gap) from 768px and stack at 80% width below. A tile whose text starts with an eyebrow paragraph shows it as a grey badge over a red gradient image area with a contained thumbnail (resource tiles: Whitepaper, Application Note...).

Rows: one row per tile (item cards-tiles-card): (1) image (`image`/`imageAlt`); (2) rich text `text`: optional eyebrow paragraph (badge) + title paragraph holding the link.

### Supported variations

- `panels`: Related Content grid: four tiles across from 768px (wrapping, 1% / 30px gaps, 1020px max), one per row below; grayscale photos cropped to the row height, bold 14px black titles, square #c2c4c4 borders.

### Universal Editor fields

- Items `cards-tiles-card`: `image`, `imageAlt`, `text`.

Use for rows of linked application / resource tiles. For a horizontal scroll strip use Cards (scroll); for document cards with a Read button use Cards (resource).
