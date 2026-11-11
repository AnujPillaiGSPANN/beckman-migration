/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-specs. Base: table (xwalk container; child model table-specs-row:
 * column1text, column2text).
 * Source: https://www.beckman.com/cell-culture-workstation/cydem-vt
 * Selector: div.spotlight-content-wrapper > div.bc-rich-text > table:not(.responsive-table):has(tr:nth-child(2))
 * One row per <tr>, 2 cells:
 *   <!-- field:column1text --> specification label | <!-- field:column2text --> values (lists kept)
 * The first row (th: Specifications | Description) is the header row. Empty <p>, stray
 * <br> inside list items and decorative <span> wrappers are removed.
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();
const COLS = 2;

function cellNodes(document, td) {
  td.querySelectorAll('p').forEach((p) => { if (!clean(p.textContent) && !p.querySelector('img')) p.remove(); });
  td.querySelectorAll('span').forEach((s) => s.replaceWith(...Array.from(s.childNodes)));
  td.querySelectorAll('li br').forEach((br) => br.replaceWith(document.createTextNode(' ')));
  td.querySelectorAll('li').forEach((li) => {
    Array.from(li.childNodes).forEach((n) => { if (n.nodeType === 3) n.textContent = n.textContent.replace(/\s+/g, ' '); });
  });

  const out = [];
  let pending = null;
  const flush = () => { if (pending && clean(pending.textContent)) out.push(pending); pending = null; };
  Array.from(td.childNodes).forEach((n) => {
    if (n.nodeType === 8) return;
    if (n.nodeType === 3) {
      if (!clean(n.textContent)) return;
      if (!pending) pending = document.createElement('p');
      pending.appendChild(document.createTextNode(n.textContent.replace(/\s+/g, ' ').replace(/^\s+/, pending.childNodes.length ? ' ' : '')));
      return;
    }
    if (n.nodeType !== 1) return;
    if (['P', 'UL', 'OL', 'DIV', 'TABLE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(n.tagName)) {
      flush();
      if (clean(n.textContent) || n.querySelector('img')) out.push(n);
      return;
    }
    if (n.tagName === 'BR' && !pending) return;
    if (!pending) pending = document.createElement('p');
    pending.appendChild(n);
  });
  flush();
  // trim trailing whitespace of the last text paragraph
  out.forEach((p) => {
    if (p.tagName === 'P' && p.lastChild && p.lastChild.nodeType === 3) p.lastChild.textContent = p.lastChild.textContent.replace(/\s+$/, '');
  });
  return out;
}

export default function parse(element, { document }) {
  const table = element.tagName === 'TABLE' ? element : element.querySelector('table');
  const rows = table ? Array.from(table.querySelectorAll(':scope > tbody > tr, :scope > thead > tr, :scope > tr')) : [];

  const cells = [];
  rows.forEach((tr) => {
    const tds = Array.from(tr.children).filter((c) => c.tagName === 'TD' || c.tagName === 'TH');
    if (!tds.some((td) => clean(td.textContent) || td.querySelector('img'))) return;
    const row = [];
    for (let c = 0; c < COLS; c += 1) {
      const td = tds[c];
      const nodes = td ? cellNodes(document, td) : [];
      if (!nodes.length) {
        row.push('');
      } else {
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createComment(` field:column${c + 1}text `));
        nodes.forEach((n) => frag.appendChild(n));
        row.push(frag);
      }
    }
    cells.push(row);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-specs', cells });
  element.replaceWith(block);
}
