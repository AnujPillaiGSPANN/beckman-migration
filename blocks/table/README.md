# Table

One **Table** block with variants. The variant is the first block option (UE: *Variant* select, `classes`); extra options (UE: *Options* multiselect, `classes_options`) combine with it, e.g. `Table (specs, pairs)`.

- `table.js` dispatches to `variants/<variant>.js` / `variants/<variant>.css` (`default` for plain `Table`) via `scripts/variants.js`.
- A variant block also carries its old block class (e.g. `table-comparison`, with `table-comparison-wrapper` / `table-comparison-container`), so variant CSS and `styles/styles.css` rules keep matching. `variants/default.css` is scoped with `:where(:not(<variant options>))`, so it never styles a variant block on the same page.
- The family has several item components; in imported content every item row starts with a cell holding the item component id (e.g. `table-specs-row`), which the block removes.

| Authoring | Variant file | Old block | Item component | Extra options |
| --- | --- | --- | --- | --- |
| `Table` | variants/default.js | table | `table-row`, `table-col-2`, `table-col-3`, `table-col-4` | `striped`, `bordered`, `no-header` |
| `Table (comparison)` | variants/comparison.js | table-comparison | `table-comparison-row` | – |
| `Table (specs)` | variants/specs.js | table-specs | `table-specs-row` | `pairs`, `striped`, `bordered` |

## Universal Editor fields

Block model `table`: `classes` (select: Default / `comparison` / `specs`), `classes_options` (multiselect: `striped`, `bordered`, `no-header`, `pairs`), `filter` (Default: columns select, boilerplate). Item models (unchanged): `table-row`, `table-col-2`, `table-col-3`, `table-col-4` (`columnNtext`), `table-comparison-row` and `table-specs-row` (`columnN_text`, `columnN_image`, `columnN_imageAlt`, N = 1..4). Filter `table` lists all six; `table-2-columns` .. `table-4-columns` are kept.

Imported item rows: [item id | cells…]; rows of `table-comparison-row` / `table-specs-row` are padded with empty cells to more than 8 cells after the id (the converter only drops the id cell when the row has more cells than the item model has fields, 8); the blocks trim empty trailing columns.

## Table (default)

Authoring: `Table` (formerly block `table`). Item components: `table-row`, `table-col-2`, `table-col-3`, `table-col-4`.

Purpose: Default Block Collection table: the first row is the header row (unless no-header), optional striped rows or cell borders.

Rows: one row per table row (item table-row / table-col-2..4 by column count); one cell per column.

## Table (comparison)

Authoring: `Table (comparison)` (formerly block `table-comparison`). Item component: `table-comparison-row`.

Purpose: Comparison grid: label column + shadowed white model columns, product images in the header rows, row dividers, CTA row.

Rows: rows of [label | model 1 | model 2 | ...]: row 1 model names, row 2 product images, attribute rows, last row CTA links; up to 3 models (4 cells per row), empty model columns are dropped

### Supported variations

No variations.

### Universal Editor fields

Items `table-comparison-row` items ("Comparison Row"). Each row renders four cells, one per field group `columnN_*` (N = 1 label column, 2..4 models):

- `columnN_text` (rich text): name, value or CTA link.
- `columnN_image` (image) + `columnN_imageAlt` (alt text): product image (image row). Do not link the image; the block links it to the CTA ("Explore ...") in the same column.

Use to compare product models side by side. For a 2-column spec sheet use Table (specs).

## Table (specs)

Authoring: `Table (specs)` (formerly block `table-specs`). Item component: `table-specs-row`.

Purpose: Plain two-column specification table: centered, red header underline, grey row rules, vertical column divider.

Rows: rows of [specification | description]; the first row is the header (Specifications | Description); values may be bulleted lists

### Supported variations

- `pairs`: label | value pairs, no header row, two pairs per line from 1024px (e.g. Cytobank Enterprise).
- `striped`: grey borders, alternating rows (e.g. CytExpert software).
- `bordered`: navy header row, black borders (e.g. Echo 21 CFR Part 11).

### Universal Editor fields

Items `table-specs-row`: field groups `columnN_*` (N = 1..4): `columnN_text` (rich text), `columnN_image` + `columnN_imageAlt`. Unused trailing columns are dropped. Rows with 3+ columns get the class `table-specs-multi`.

Use for technical parameters. For multi-model comparisons use Table (comparison).
