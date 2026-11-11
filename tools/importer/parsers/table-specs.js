/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-specs. Base: table (xwalk container; child model table-specs-row:
 * column1text, column2text [, column3text, column4text, column2image..column4image]).
 * Source: https://www.beckman.com/cell-culture-workstation/cydem-vt
 * Selector: div.spotlight-content-wrapper > div.bc-rich-text > table:not(.responsive-table):has(tr:nth-child(2))
 * One row per <tr>, 2 cells:
 *   <!-- field:column1text --> specification label | <!-- field:column2text --> values (lists kept)
 * The first row (th: Specifications | Description) is the header row. Empty <p>, stray
 * <br> inside list items and decorative <span> wrappers are removed.
 *
 * Also product-detail Density Gradient Reagents (table:has(th)): 4 columns
 * (empty corner cell + Rate Zonal | Isopycnic | Equilibrium Zonal header, <strong> labels,
 * last row = empty cell + 3 images). The row width is the widest source row (2 on Cydem VT,
 * max 4); short rows are padded with empty cells. Images never go into a richtext field:
 * an image in column N is emitted as <!-- field:columnNimage --> (reference field, alt kept,
 * inline styles dropped). Whitespace at the edges of inline label markup is trimmed.
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();
const COLS = 2;
const MAX_COLS = 4;

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
    if (n.tagName === 'IMG' || n.tagName === 'PICTURE') {
      // image-only content (density image row): kept apart from the text
      flush();
      out.push(n);
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

/** Trim whitespace at the start / end of inline elements (e.g. "<strong>Advantage\n   </strong>"). */
function trimInline(node) {
  node.querySelectorAll('strong, b, em, i, a').forEach((el) => {
    const first = el.firstChild;
    const last = el.lastChild;
    if (first && first.nodeType === 3) first.textContent = first.textContent.replace(/^\s+/, '');
    if (last && last.nodeType === 3) last.textContent = last.textContent.replace(/\s+$/, '');
  });
}

export default function parse(element, { document }) {
  const table = element.tagName === 'TABLE' ? element : element.querySelector('table');
  const rows = table ? Array.from(table.querySelectorAll(':scope > tbody > tr, :scope > thead > tr, :scope > tr')) : [];
  const cellsOf = (tr) => Array.from(tr.children).filter((c) => c.tagName === 'TD' || c.tagName === 'TH');
  const width = Math.min(MAX_COLS, Math.max(COLS, ...rows.map((tr) => cellsOf(tr).length)));

  const cells = [];
  rows.forEach((tr) => {
    const tds = cellsOf(tr);
    if (!tds.some((td) => clean(td.textContent) || td.querySelector('img'))) return;
    const row = [];
    for (let c = 0; c < width; c += 1) {
      const td = tds[c];
      const nodes = td ? cellNodes(document, td) : [];
      // images -> columnNimage (reference); everything else -> columnNtext (richtext)
      let img = null;
      const text = [];
      nodes.forEach((n) => {
        const found = n.tagName === 'IMG' ? n : (n.querySelector && n.querySelector('img'));
        if (found && !img && (n === found || n.tagName === 'PICTURE' || !clean(n.textContent))) {
          img = found;
          return;
        }
        text.push(n);
      });
      if (width > COLS) text.forEach(trimInline);
      if (!text.length && !img) {
        row.push('');
      } else {
        const frag = document.createDocumentFragment();
        if (text.length) {
          frag.appendChild(document.createComment(` field:column${c + 1}_text `));
          text.forEach((n) => frag.appendChild(n));
        }
        if (img) {
          const pic = document.createElement('img');
          pic.setAttribute('src', img.getAttribute('src'));
          const label = clean(img.getAttribute('alt')) || clean(tds[c] && tds[c].textContent)
            || clean(cellsOf(rows[0])[c] && cellsOf(rows[0])[c].textContent);
          if (label) pic.setAttribute('alt', label);
          frag.appendChild(document.createComment(` field:column${c + 1}_image `));
          frag.appendChild(pic);
        }
        row.push(frag);
      }
    }
    cells.push(row);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-specs', cells });
  element.replaceWith(block);
}
