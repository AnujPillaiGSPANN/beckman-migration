/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

import { moveInstrumentation } from '../../../scripts/scripts.js';

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const header = !block.classList.contains('no-header');

  [...block.children].forEach((row, i) => {
    const tr = document.createElement('tr');
    moveInstrumentation(row, tr);

    [...row.children].forEach((cell) => {
      const td = document.createElement(i === 0 && header ? 'th' : 'td');

      if (i === 0) td.setAttribute('scope', 'column');
      td.innerHTML = cell.innerHTML;
      tr.append(td);
    });
    if (i === 0 && header) thead.append(tr);
    else tbody.append(tr);
  });

  // AEM cannot author colspan: in a body row with 3+ cells whose only empty cell is the
  // last one, the cell before it spans it (source: "21 CFR Part 11" spans both products)
  const isEmpty = (cell) => !cell.textContent.trim() && !cell.querySelector('img, picture');
  [...tbody.rows].forEach((tr) => {
    const cells = [...tr.cells];
    if (cells.length < 3 || !isEmpty(cells.at(-1))) return;
    if (cells.slice(0, -1).some(isEmpty)) return;
    cells.at(-2).colSpan = 2;
    cells.at(-1).remove();
  });
  table.append(thead, tbody);
  block.replaceChildren(table);
}
