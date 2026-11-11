/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-comparison. Base: table (xwalk container; child model
 * table-comparison-row; each cell is the field group columnN_* for N = 1..4:
 * columnN_text (richtext), columnN_image (reference, alt -> columnN_imageAlt)).
 * Source: https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations
 * Selector: #Models + div   (div.model-comparison)
 *
 * The source is NOT a table: it is a CSS grid of sibling divs .div1..divN in column order.
 *   label column = div1..div8 (div1/div2 empty, div3-7 attribute labels, div8 CTA)
 *   model k (k = 0..2) = div(9+8k)..div(16+8k): name, linked image, 5 values, CTA
 * The parser transposes this into rows [label | model 1 | model 2 | model 3]
 * (max 4 columns): row 1 names, row 2 images, attribute rows, CTA row.
 * Images go to the columnN_image field without their link (a richtext field would store a
 * linked image as escaped HTML); the block JS re-links them with the column's CTA href.
 * <a><button> CTAs are unwrapped into plain links. Image alts that name the wrong model
 * (source bug: i3 image alt reads "Biomek i5") are corrected from the model name.
 */
const MAX_MODELS = 3;
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();

function cellContent(document, div) {
  const nodes = [];
  if (!div) return nodes;
  // unwrap <button> inside links (and stray buttons wrapping a link label)
  div.querySelectorAll('a').forEach((a) => {
    const btn = a.querySelector('button');
    if (btn) {
      const label = clean(a.textContent);
      a.textContent = label;
    }
  });
  div.querySelectorAll('button').forEach((btn) => {
    const label = clean(btn.textContent);
    if (label) btn.replaceWith(document.createTextNode(label));
    else btn.remove();
  });

  let pending = null;
  const flush = () => { if (pending) nodes.push(pending); pending = null; };
  Array.from(div.childNodes).forEach((n) => {
    if (n.nodeType === 8) return;
    if (n.nodeType === 3) {
      if (!clean(n.textContent)) return;
      if (!pending) pending = document.createElement('p');
      pending.appendChild(document.createTextNode(clean(n.textContent)));
      return;
    }
    if (n.nodeType !== 1) return;
    if (['P', 'UL', 'OL', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TABLE'].includes(n.tagName)) {
      flush();
      if (clean(n.textContent) || n.querySelector('img, picture')) nodes.push(n);
      return;
    }
    if (!clean(n.textContent) && !n.querySelector('img, picture') && n.tagName !== 'IMG') return;
    if (!pending) pending = document.createElement('p');
    pending.appendChild(n);
  });
  flush();
  return nodes;
}

export default function parse(element, { document }) {
  const grid = element.matches('.model-comparison') ? element
    : (element.querySelector('.model-comparison') || element);

  const byIndex = {};
  let maxIndex = 0;
  // Biomek: .div1….divN (8 rows per column); Echo (div.comparison-table-large): .ct1….ctN
  const prefix = grid.querySelector('[class*="div"]') && Array.from(grid.querySelectorAll('[class*="div"]'))
    .some((d) => /(?:^|\s)div\d+(?:\s|$)/.test(d.getAttribute('class') || '')) ? 'div' : 'ct';
  const re = new RegExp(`(?:^|\\s)${prefix}(\\d+)(?:\\s|$)`);
  Array.from(grid.querySelectorAll(`[class*="${prefix}"]`)).forEach((div) => {
    const m = (div.getAttribute('class') || '').match(re);
    if (!m) return;
    const n = parseInt(m[1], 10);
    if (!byIndex[n]) byIndex[n] = div;
    maxIndex = Math.max(maxIndex, n);
  });

  // rows per column: 8 on Biomek; otherwise the index before the first model-name cell
  // (a bold-only cell after the label column, e.g. Echo .ct13 "<strong>Echo 650 Plus Series</strong>")
  let ROWS = 8;
  if (prefix !== 'div') {
    const nameIdx = Object.keys(byIndex).map(Number).sort((a, b) => a - b).find((n) => {
      const d = byIndex[n];
      const s = d.querySelector('strong, b');
      return n > 1 && s && !d.querySelector('a, img') && clean(s.textContent) === clean(d.textContent);
    });
    if (nameIdx) ROWS = nameIdx - 1;
  }
  const modelCount = Math.min(MAX_MODELS, Math.max(0, Math.ceil((maxIndex - ROWS) / ROWS)));
  const modelNames = [];
  for (let k = 0; k < modelCount; k += 1) {
    modelNames.push(clean(byIndex[ROWS + 1 + ROWS * k] ? byIndex[ROWS + 1 + ROWS * k].textContent : ''));
  }

  const cells = [];
  for (let r = 0; r < ROWS; r += 1) {
    const row = [];
    const sources = [byIndex[1 + r]];
    for (let k = 0; k < modelCount; k += 1) sources.push(byIndex[ROWS + 1 + ROWS * k + r]);
    // rows commented out on the source (Echo: .ct3 / .ct7 and their model cells) are skipped
    if (sources.every((s) => !s)) continue;
    sources.forEach((div, c) => {
      // correct mismatched model image alts
      if (div && c > 0 && modelNames[c - 1]) {
        div.querySelectorAll('img').forEach((img) => {
          const alt = img.getAttribute('alt') || '';
          if (!alt.toLowerCase().includes(modelNames[c - 1].toLowerCase())) {
            img.setAttribute('alt', alt.replace(/Biomek\s+i\d+/i, modelNames[c - 1]) || modelNames[c - 1]);
          }
        });
      }
      const nodes = cellContent(document, div);
      // split into text and the (first) image; the image link is dropped
      let img = null;
      const text = [];
      nodes.forEach((n) => {
        const found = n.tagName === 'IMG' ? n : n.querySelector('img');
        if (found && !img) {
          img = found;
          (found.closest('picture') || found).remove();
          if (n !== found && clean(n.textContent)) text.push(n);
          return;
        }
        if (clean(n.textContent)) text.push(n);
      });
      if (!text.length && !img) {
        row.push('');
        return;
      }
      const frag = document.createDocumentFragment();
      if (text.length) {
        frag.appendChild(document.createComment(` field:column${c + 1}_text `));
        text.forEach((n) => frag.appendChild(n));
      }
      if (img) {
        const picture = img.closest('picture') || document.createElement('picture');
        if (!picture.contains(img)) picture.appendChild(img);
        frag.appendChild(document.createComment(` field:column${c + 1}_image `));
        frag.appendChild(picture);
      }
      row.push(frag);
    });
    // pad to a fixed width so every row has the same number of cells
    while (row.length < modelCount + 1) row.push('');
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-comparison', cells });
  element.replaceWith(block);
}
