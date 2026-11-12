import { moveInstrumentation, trimEmptyColumns } from '../../../scripts/scripts.js';

/**
 * Table (specs): specification sheet (attribute | values), or a comparison table
 * with any number of columns. The first row is the header row (e.g. Specifications |
 * Description), the first cell of each body row is its row header. Option "pairs" has no
 * header row.
 * @param {Element} block
 */
export default function decorate(block) {
  trimEmptyColumns(block); // AEM renders unused column groups as empty cells
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  // option "pairs": a label | value spec grid, every row is data (no header row)
  const hasHeader = !block.classList.contains('pairs');

  [...block.children].forEach((row, i) => {
    const tr = document.createElement('tr');
    moveInstrumentation(row, tr);
    [...row.children].forEach((cell, c) => {
      let el;
      if (i === 0 && hasHeader) {
        el = document.createElement('th');
        el.scope = 'col';
      } else if (c === 0) {
        el = document.createElement('th');
        el.scope = 'row';
      } else {
        el = document.createElement('td');
      }
      moveInstrumentation(cell, el);
      el.append(...cell.childNodes);
      tr.append(el);
    });
    (i === 0 && hasHeader ? thead : tbody).append(tr);
  });

  if (thead.rows.length) table.append(thead);
  table.append(tbody);
  block.replaceChildren(table);

  // comparison tables (3+ columns, e.g. Density Gradient Media) share one centred,
  // full-width layout; the two-column spec sheet keeps its own
  const cols = Math.max(0, ...[...table.rows].map((tr) => tr.cells.length));
  if (cols > 2) block.classList.add('table-specs-multi');
}
