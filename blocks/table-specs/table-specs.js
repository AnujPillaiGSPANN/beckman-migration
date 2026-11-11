import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Table (specs): two-column specification sheet (attribute | values).
 * The first row is the header row (e.g. Specifications | Description).
 * @param {Element} block
 */
export default function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  [...block.children].forEach((row, i) => {
    const tr = document.createElement('tr');
    moveInstrumentation(row, tr);
    [...row.children].forEach((cell, c) => {
      let el;
      if (i === 0) {
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
    (i === 0 ? thead : tbody).append(tr);
  });

  table.append(thead, tbody);
  block.replaceChildren(table);
}
