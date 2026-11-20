/* eslint-disable */
/* global WebImporter */
import tableComparisonParser from './table-comparison.js';
import columnsParser from './columns.js';

/**
 * Family parser for table (template landing-form-rail): detects the variant from the DOM.
 *
 * Variants (migration-work/block-context/table/variants.json):
 * - default (v_e646417827f1: vi-cell-blu-or-cedex-hires instrument comparison, adeno-associated-
 *   virus / ultracentrifugation resource tables): a data <table> (or a wrapper such as
 *   div[style*=overflow-x] holding one) -> "Table". New extraction (no existing parser emits the
 *   default table): one block row per <tr>, colspan / rowspan expanded into empty cells so every
 *   row has the same width; at most 4 columns (item models table-col-2..4; more source columns are
 *   merged into the 4th). Every row starts with its item id (table-row for 1 column, else
 *   table-col-N) and each non-empty cell carries the hint columnNtext. Wistia / YouTube
 *   iframes in cells become links to the video (iframes are removed later by the cleanup).
 * - comparison (v_69d009871b86, service-plan-benefits "plan tiers"): several small layout tables,
 *   one per plan (banner image row + description / list row, 15px spacer cells), laid out by
 *   nested div.two-columns-holder grids. table-comparison.js reads the Biomek / Echo CSS grid
 *   (.divN / .ctN cells), which this markup does not have, so it is handled here in the same
 *   output format: "Table (comparison)", rows [table-comparison-row | label | plan 1..3] padded
 *   to 8 cells after the id, fields columnN_text / columnN_image; the label column stays empty;
 *   row 1 = plan banner images, row 2 = description + list.
 *   A .model-comparison / .divN / .ctN grid (table-comparison.js's own source) is delegated to it.
 * - Layout tables (a <tr> whose cells are an image and text, every row) are Columns, not tables:
 *   delegated to columns.js.
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();
const MEDIA = 'img, picture, video, iframe, svg';
const hasContent = (n) => !!(n && (clean(n.textContent) || n.querySelector(MEDIA)));
const ITEM_FIELDS = 8;
const MAX_COLS = 4;

const ownRows = (table) => Array.from(table.querySelectorAll('tr')).filter((tr) => tr.closest('table') === table);
const ownCells = (tr) => Array.from(tr.children).filter((c) => /^(TD|TH)$/.test(c.tagName));

/** Video iframes -> link paragraphs; styles / empty wrappers removed. */
function tidy(document, cell) {
  cell.querySelectorAll('style, script, noscript').forEach((n) => n.remove());
  cell.querySelectorAll('iframe').forEach((f) => {
    const src = (f.getAttribute('src') || f.getAttribute('data-src') || '').replace(/^\/\//, 'https://');
    const m = src.match(/wistia\.(?:net|com)\/embed\/(?:iframe|medias)\/([a-z0-9]{10})/i);
    const y = src.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/i);
    let href = '';
    if (m) href = `https://fast.wistia.net/embed/iframe/${m[1]}`;
    else if (y) href = `https://www.youtube.com/watch?v=${y[1]}`;
    else if (/^https?:\/\//.test(src)) href = src;
    if (!href) { f.remove(); return; }
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.textContent = clean(f.getAttribute('title')) || href;
    p.appendChild(a);
    f.replaceWith(p);
  });
  cell.querySelectorAll('a button, button').forEach((btn) => {
    const label = clean(btn.textContent);
    if (label) btn.replaceWith(document.createTextNode(label));
    else btn.remove();
  });
  cell.querySelectorAll('a').forEach((a) => { if (!clean(a.textContent) && !a.querySelector(MEDIA)) a.remove(); });
  cell.querySelectorAll('span').forEach((s) => {
    if (!hasContent(s)) s.replaceWith(document.createTextNode(/\s/.test(s.textContent) ? ' ' : ''));
    else s.replaceWith(...Array.from(s.childNodes));
  });
  // <br> at the edges of a cell / paragraph / strong only adds a blank line
  cell.querySelectorAll('br').forEach((br) => {
    const sib = (dir) => {
      let n = br[dir];
      while (n && ((n.nodeType === 3 && !clean(n.textContent)) || (n.nodeType === 1 && n.tagName === 'BR'))) n = n[dir];
      return n;
    };
    if (!sib('previousSibling') || !sib('nextSibling')) br.remove();
  });
  cell.querySelectorAll('strong, b, em, p').forEach((n) => { if (!hasContent(n)) n.remove(); });
  // bold / italic wrappers holding only an image are unwrapped
  cell.querySelectorAll('strong, b, em').forEach((n) => {
    if (!clean(n.textContent) && n.querySelector('img, picture')) n.replaceWith(...Array.from(n.childNodes));
  });
  cell.querySelectorAll('[style]').forEach((n) => n.removeAttribute('style'));
  return cell;
}

/** Cell content (children of the source cell) as a fragment, or null when empty. */
function content(document, src) {
  if (!src) return null;
  tidy(document, src);
  if (!hasContent(src)) return null;
  const nodes = Array.from(src.childNodes).filter((n) => n.nodeType !== 8);
  // trim edge whitespace / &nbsp;
  while (nodes.length && nodes[0].nodeType === 3 && !clean(nodes[0].textContent)) nodes.shift();
  while (nodes.length && nodes[nodes.length - 1].nodeType === 3 && !clean(nodes[nodes.length - 1].textContent)) nodes.pop();
  if (nodes.length && nodes[0].nodeType === 3) nodes[0].textContent = nodes[0].textContent.replace(/^[\s ]+/, '');
  const last = nodes[nodes.length - 1];
  if (last && last.nodeType === 3) last.textContent = last.textContent.replace(/[\s ]+$/, '');
  const frag = document.createDocumentFragment();
  nodes.forEach((n) => frag.appendChild(n));
  return frag;
}

/** Table rows expanded into a grid (colspan / rowspan -> null placeholders). */
function grid(table) {
  const out = [];
  ownRows(table).forEach((tr, r) => {
    out[r] = out[r] || [];
    let c = 0;
    ownCells(tr).forEach((cell) => {
      while (out[r][c] !== undefined) c += 1;
      const cs = Math.max(1, parseInt(cell.getAttribute('colspan'), 10) || 1);
      const rs = Math.max(1, parseInt(cell.getAttribute('rowspan'), 10) || 1);
      for (let i = 0; i < rs; i += 1) {
        out[r + i] = out[r + i] || [];
        for (let j = 0; j < cs; j += 1) out[r + i][c + j] = (i === 0 && j === 0) ? cell : null;
      }
      c += cs;
    });
  });
  return out.map((row) => Array.from(row, (x) => x || null));
}

const imageOnly = (c) => !!(c && c.querySelector('img, picture') && !clean(c.textContent));
const textOnly = (c) => !!(c && clean(c.textContent) && !c.querySelector('img, picture'));

/** Layout table: every row with content holds an image-only cell and a text cell. */
function isLayoutTable(table) {
  const rows = ownRows(table).map((tr) => ownCells(tr).filter(hasContent)).filter((r) => r.length);
  return rows.length > 0 && rows.every((r) => r.length >= 2 && r.some(imageOnly) && r.some(textOnly));
}

/** Plan tier tables: >= 2 tables, each with at most one non-empty cell per row. */
function planTables(element) {
  const tables = Array.from(element.querySelectorAll('table')).filter((t) => !t.parentElement.closest('table'));
  if (tables.length < 2) return null;
  const single = tables.every((t) => ownRows(t).every((tr) => ownCells(tr).filter(hasContent).length <= 1)
    && t.querySelector('img'));
  return single ? tables : null;
}

function planComparison(element, document, tables) {
  const ITEM_ID = 'table-comparison-row';
  const plans = tables.slice(0, 3).map((t) => {
    const cells = ownRows(t).map((tr) => ownCells(tr).find(hasContent)).filter(Boolean);
    const imgCell = cells.find(imageOnly);
    const img = imgCell ? imgCell.querySelector('img') : null;
    const textCells = cells.filter((c) => c !== imgCell);
    return { img, textCells };
  });
  const imageRow = plans.map((p, i) => {
    if (!p.img) return '';
    ['style', 'width', 'height'].forEach((a) => p.img.removeAttribute(a));
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:column${i + 2}_image `));
    const pic = document.createElement('picture');
    pic.appendChild(p.img);
    frag.appendChild(pic);
    return frag;
  });
  const textRow = plans.map((p, i) => {
    const frag = document.createDocumentFragment();
    let any = false;
    p.textCells.forEach((c) => {
      const f = content(document, c);
      if (!f) return;
      if (!any) frag.appendChild(document.createComment(` field:column${i + 2}_text `));
      any = true;
      frag.appendChild(f);
    });
    return any ? frag : '';
  });
  const pad = (row) => {
    const r = ['', ...row];
    while (r.length < ITEM_FIELDS) r.push('');
    return [ITEM_ID, ...r];
  };
  const cells = [imageRow, textRow].filter((r) => r.some((c) => c)).map(pad);
  const block = WebImporter.Blocks.createBlock(document, { name: 'Table (comparison)', cells });
  element.replaceWith(block);
}

function plainTable(element, document, table) {
  const g = grid(table);
  // drop rows and columns that are empty everywhere
  const width = Math.max(0, ...g.map((r) => r.length));
  const keepCols = [];
  for (let c = 0; c < width; c += 1) if (g.some((r) => hasContent(r[c]))) keepCols.push(c);
  const rows = g.filter((r) => r.some(hasContent)).map((r) => keepCols.map((c) => r[c] || null));
  const cols = Math.max(1, Math.min(MAX_COLS, keepCols.length));
  const itemId = cols === 1 ? 'table-row' : `table-col-${cols}`;

  const cells = rows.map((r) => {
    const out = [];
    for (let c = 0; c < cols; c += 1) {
      const srcs = c === cols - 1 ? r.slice(c) : [r[c]];
      const frag = document.createDocumentFragment();
      let any = false;
      srcs.forEach((s) => {
        const f = content(document, s);
        if (!f) return;
        if (!any) frag.appendChild(document.createComment(` field:column${c + 1}text `));
        else frag.appendChild(document.createTextNode(' '));
        any = true;
        frag.appendChild(f);
      });
      out.push(any ? frag : '');
    }
    return [itemId, ...out];
  });
  const block = WebImporter.Blocks.createBlock(document, { name: 'Table', cells });
  element.replaceWith(block);
}

export default function parse(element, { document, params }) {
  const ctx = { document, params };

  // table-comparison.js's own source (CSS grid of .divN / .ctN cells)
  if (element.matches('.model-comparison') || element.querySelector('.model-comparison')) {
    tableComparisonParser(element, ctx);
    return;
  }

  // plan tiers: one small layout table per plan
  const plans = planTables(element);
  if (plans) {
    planComparison(element, document, plans);
    return;
  }

  const table = element.tagName === 'TABLE' ? element : element.querySelector('table');
  if (!table) {
    // a layout grid without a <table>: Columns
    columnsParser(element, ctx);
    return;
  }
  // a layout table (image + text cells in every row) is Columns, not a table
  if (isLayoutTable(table)) {
    columnsParser(table === element ? element : table, ctx);
    if (element !== table && element.isConnected && !hasContent(element)) element.remove();
    return;
  }
  plainTable(element, document, table);
}
