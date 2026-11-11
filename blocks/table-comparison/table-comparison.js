import { moveInstrumentation } from '../../scripts/scripts.js';

const isEmpty = (cell) => !cell || (!cell.textContent.trim() && !cell.querySelector('picture, img'));

/**
 * Table (comparison): models (columns) vs attributes (rows).
 * Authored as rows: [label | model 1 | model 2 | ...]; row 1 = model names,
 * a row of images, attribute rows, and an optional CTA row.
 * Rendered column-wise on a CSS grid (subgrid rows) so every model column is
 * its own card while row heights stay aligned.
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const colCount = Math.max(0, ...rows.map((r) => r.children.length));

  // keep the label column, drop model columns that are empty in every row
  const keep = [...Array(colCount).keys()]
    .filter((c) => c === 0 || rows.some((r) => !isEmpty(r.children[c])));

  const grid = document.createElement('div');
  grid.className = 'table-comparison-grid';
  grid.style.setProperty('--table-comparison-rows', rows.length);
  grid.style.setProperty('--table-comparison-models', keep.length - 1);
  // the source uses a different table per model count (2 models: .comparison-table-large)
  block.classList.add(`table-comparison-${keep.length - 1}-models`);

  const columns = keep.map((c) => {
    const col = document.createElement('div');
    col.className = c === 0 ? 'table-comparison-labels' : 'table-comparison-model';
    return col;
  });

  rows.forEach((row, r) => {
    const cells = [...row.children];
    let kind = 'value';
    if (r === 0) kind = 'name';
    else if (cells.slice(1).some((cell) => cell.querySelector('picture'))
      && cells.slice(1).every((cell) => isEmpty(cell) || !cell.textContent.trim())) kind = 'image';
    else if (r === rows.length - 1
      && cells.every((cell) => isEmpty(cell) || (cell.querySelectorAll('a').length === 1
        && cell.textContent.trim() === cell.querySelector('a').textContent.trim()))) kind = 'cta';

    keep.forEach((c, i) => {
      const src = cells[c];
      const cell = document.createElement('div');
      cell.className = `table-comparison-cell table-comparison-${kind}`;
      if (src) {
        moveInstrumentation(src, cell);
        cell.append(...src.childNodes);
      }
      // check-mark values (source .ct16-style cells: red, 125%)
      if (kind === 'value' && i > 0 && /^[\u2713\u2714]\ufe0e?$/.test(cell.textContent.trim())) {
        cell.classList.add('table-comparison-check');
      }
      if (r === 0 && i > 0 && cell.textContent.trim()) {
        cell.setAttribute('role', 'heading');
        cell.setAttribute('aria-level', '3');
      }
      columns[i].append(cell);
    });
  });

  // images are authored without a link (image field): link them to their column's CTA
  columns.slice(1).forEach((col) => {
    const href = col.querySelector('.table-comparison-cta a[href]')?.getAttribute('href');
    if (!href) return;
    col.querySelectorAll('.table-comparison-image picture').forEach((pic) => {
      if (pic.closest('a')) return;
      const link = document.createElement('a');
      link.href = href;
      pic.replaceWith(link);
      link.append(pic);
    });
  });

  grid.append(...columns);
  block.replaceChildren(grid);
}
