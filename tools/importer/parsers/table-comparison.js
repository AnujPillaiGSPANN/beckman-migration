/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-comparison. Base: table (xwalk container; child model
 * table-comparison-row: column1text..column4text).
 * Source: https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations
 * Selector: #Models + div   (div.model-comparison)
 *
 * The source is NOT a table: it is a CSS grid of sibling divs .div1..divN in column order.
 *   label column = div1..div8 (div1/div2 empty, div3-7 attribute labels, div8 CTA)
 *   model k (k = 0..2) = div(9+8k)..div(16+8k): name, linked image, 5 values, CTA
 * The parser transposes this into rows [label | model 1 | model 2 | model 3]
 * (max 4 columns): row 1 names, row 2 images, attribute rows, CTA row.
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
  Array.from(grid.querySelectorAll('[class*="div"]')).forEach((div) => {
    const m = (div.getAttribute('class') || '').match(/(?:^|\s)div(\d+)(?:\s|$)/);
    if (!m) return;
    const n = parseInt(m[1], 10);
    if (!byIndex[n]) byIndex[n] = div;
    maxIndex = Math.max(maxIndex, n);
  });

  const ROWS = 8;
  const modelCount = Math.min(MAX_MODELS, Math.max(0, Math.ceil((maxIndex - ROWS) / ROWS)));
  const modelNames = [];
  for (let k = 0; k < modelCount; k += 1) {
    modelNames.push(clean(byIndex[9 + ROWS * k] ? byIndex[9 + ROWS * k].textContent : ''));
  }

  const cells = [];
  for (let r = 0; r < ROWS; r += 1) {
    const row = [];
    const sources = [byIndex[1 + r]];
    for (let k = 0; k < modelCount; k += 1) sources.push(byIndex[9 + ROWS * k + r]);
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
      if (!nodes.length) {
        row.push('');
        return;
      }
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:column${c + 1}text `));
      nodes.forEach((n) => frag.appendChild(n));
      row.push(frag);
    });
    // pad to a fixed width so every row has the same number of cells
    while (row.length < modelCount + 1) row.push('');
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-comparison', cells });
  element.replaceWith(block);
}
