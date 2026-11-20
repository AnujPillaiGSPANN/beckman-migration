/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns (template landing-form-rail) -> block "Columns" (standalone, boilerplate
 * xwalk columns: core/franklin/components/columns/v1/columns, cells hold default content: text,
 * image, button, title; no field hints for Columns). No existing parser fits, so this is new
 * extraction code. One block row per source row, one cell per column; rows are padded to the
 * widest row with empty cells.
 *
 * Source shapes (migration-work/block-context/columns, all variant null):
 * - Bootstrap row (vi-cell-blu-or-cedex-hires, v_cebfd6744443): div.row > div.col-md-6 x2
 *   (ul.toplist each) -> 1 row, 2 cells.
 * - Benefit list (allegra-v15r, v_1d05a26e8d2c): div.instrumentBenefits > div x4 (icon image
 *   + list) -> 1 row, 4 cells.
 * - Layout table row (straight-up, nanoscale, v_8cd431163974 / v_cebfd6744443): a <tr> of a
 *   layout table -> the whole enclosing table becomes the block (every row of a layout table
 *   is a columns row), so the other selected rows of that table are already handled
 *   (their parse call finds the row detached and returns). Spacer cells (empty / &nbsp;, e.g.
 *   the 15px gutter <td>) are dropped where they are empty in every row.
 * - Two-column holder (hiac-9703, warranty, service pages, v_cebfd6744443):
 *   div.two-columns-holder > div.row > .two-columns-holder__left / __right (col-md-6) ->
 *   1 row, 2 cells. When the element only *contains* such a holder (e.g. the whole left
 *   column), the block replaces that holder and the rest stays default content.
 * Cell clean-up: <style>/<script> dropped, <a><button>label</button></a> -> plain link,
 * empty links / spans / lists dropped, inline styles removed.
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();
const MEDIA = 'img, picture, video, iframe, svg';
const hasContent = (n) => !!(clean(n.textContent) || (n.nodeType === 1 && (n.matches(MEDIA) || n.querySelector(MEDIA))));
const isCol = (c) => /(^|\s)col-/.test(c.getAttribute('class') || '');

function tidy(document, cell) {
  cell.querySelectorAll('style, script, noscript, link').forEach((n) => n.remove());
  cell.querySelectorAll('a button, button').forEach((btn) => {
    const label = clean(btn.textContent);
    if (label) btn.replaceWith(document.createTextNode(label));
    else btn.remove();
  });
  cell.querySelectorAll('a').forEach((a) => {
    if (!clean(a.textContent) && !a.querySelector(MEDIA)) a.remove();
  });
  // comments (e.g. <!--787--> after "USP<787>")
  const walker = document.createTreeWalker(cell, 128);
  const comments = [];
  while (walker.nextNode()) comments.push(walker.currentNode);
  comments.forEach((c) => c.remove());
  // spans and layout divs are unwrapped (whitespace-only spans keep their space)
  cell.querySelectorAll('span').forEach((s) => {
    if (!hasContent(s)) s.replaceWith(document.createTextNode(/\s/.test(s.textContent) ? ' ' : ''));
    else s.replaceWith(...Array.from(s.childNodes));
  });
  Array.from(cell.querySelectorAll('div')).reverse().forEach((d) => d.replaceWith(...Array.from(d.childNodes)));
  // a list nested directly in a list (invalid) joins the preceding item
  cell.querySelectorAll('ul > ul, ul > ol, ol > ul, ol > ol').forEach((l) => {
    const prev = l.previousElementSibling;
    if (prev && prev.tagName === 'LI') prev.appendChild(l);
  });
  // <br> at the start / end of a paragraph or list item only adds a blank line
  cell.querySelectorAll('p > br, li > br').forEach((br) => {
    const sib = (dir) => {
      let n = br[dir];
      while (n && n.nodeType === 3 && !clean(n.textContent)) n = n[dir];
      return n;
    };
    if (!sib('previousSibling') || !sib('nextSibling')) br.remove();
  });
  // list items outside any list (TOC analyzer "Low cost of ownership": <strong>label</strong>
  // <li>…</li>) get their own list, one per run of adjacent items
  Array.from(cell.querySelectorAll('li')).forEach((li) => {
    if (!li.isConnected || (li.parentElement && /^(UL|OL)$/.test(li.parentElement.tagName))) return;
    const ul = document.createElement('ul');
    li.before(ul);
    let n = li;
    while (n && (n.nodeName === 'LI' || (n.nodeType === 3 && !clean(n.textContent)))) {
      const next = n.nextSibling;
      ul.appendChild(n);
      n = next;
    }
  });
  cell.querySelectorAll('ul, ol, p, li').forEach((l) => { if (!hasContent(l)) l.remove(); });
  // a <br> at the start / end of the cell (source "<br> <img>" in the image column) only adds
  // a blank line above / below the content
  const edge = (dir) => {
    let n = cell[dir];
    while (n && ((n.nodeType === 3 && !clean(n.textContent)) || n.nodeType === 8 || n.nodeName === 'BR')) {
      const next = n[dir === 'firstChild' ? 'nextSibling' : 'previousSibling'];
      if (n.nodeName === 'BR') n.remove();
      n = next;
    }
  };
  edge('firstChild');
  edge('lastChild');
  cell.querySelectorAll('[style]').forEach((n) => n.removeAttribute('style'));
  return cell;
}

/** Cell content as a fragment (the source cell's children, cleaned). */
function cellFrom(document, src) {
  if (!src) return '';
  tidy(document, src);
  if (!hasContent(src)) return '';
  const frag = document.createDocumentFragment();
  Array.from(src.childNodes).forEach((n) => {
    if (n.nodeType === 8) return;
    if (n.nodeType === 3 && !clean(n.textContent)) return;
    frag.appendChild(n);
  });
  return frag;
}

/** Row containers of a layout table, cells per row (spacer columns dropped). */
function tableRows(table) {
  const rows = Array.from(table.querySelectorAll('tr')).filter((tr) => tr.closest('table') === table);
  const grid = rows.map((tr) => Array.from(tr.children).filter((c) => /^(TD|TH)$/.test(c.tagName)));
  const width = Math.max(0, ...grid.map((r) => r.length));
  const keep = [];
  for (let c = 0; c < width; c += 1) {
    if (grid.some((r) => r[c] && hasContent(r[c]))) keep.push(c);
  }
  return grid
    .filter((r) => r.some(hasContent))
    .map((r) => keep.map((c) => r[c]).filter(Boolean));
}

/** The source rows and the node the block replaces. */
function locate(element) {
  // a layout table row: the whole table
  if (element.tagName === 'TR' || element.tagName === 'TBODY' || element.tagName === 'TABLE') {
    const table = element.tagName === 'TABLE' ? element : element.closest('table');
    return { target: table, rows: tableRows(table) };
  }
  // bootstrap row: .col-* children
  const colsOf = (row) => Array.from(row.children).filter(isCol);
  if (colsOf(element).length >= 2) return { target: element, rows: [colsOf(element)] };
  // a holder of one bootstrap row (div.two-columns-holder > div.row), or a container of one
  const row = Array.from(element.querySelectorAll('.row')).find((r) => colsOf(r).length >= 2);
  if (row) {
    const parent = row.parentElement;
    const holder = parent && parent.classList.contains('two-columns-holder') ? parent : row;
    return { target: holder, rows: [colsOf(row)] };
  }
  // a single layout table inside the element
  const tables = element.querySelectorAll('table');
  if (tables.length === 1 && !clean(element.textContent).replace(clean(tables[0].textContent), '')) {
    return { target: element, rows: tableRows(tables[0]) };
  }
  // generic: each child with content is a column (e.g. div.instrumentBenefits > div)
  return { target: element, rows: [Array.from(element.children).filter(hasContent)] };
}

export default function parse(element, { document }) {
  // a row of a layout table already converted with its table (see above)
  if (!element.isConnected) return;

  const { target, rows } = locate(element);
  const cells = rows.map((r) => r.map((c) => cellFrom(document, c)));
  const width = Math.max(1, ...cells.map((r) => r.length));
  cells.forEach((r) => { while (r.length < width) r.push(''); });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns', cells });
  target.replaceWith(block);
}
