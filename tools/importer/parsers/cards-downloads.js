/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-downloads. Base: cards (xwalk container; child model cards-downloads-item:
 * text (richtext)).
 * Source: https://www.beckman.com/cell-counters-and-analyzers/vi-cell-blu
 * Selector: div.resources-container
 * One row per div.resource-item, one cell (<!-- field:text -->):
 *   <p><a href>title</a></p>        (div.resource-title a; source line breaks collapsed)
 *   <p>type label</p>               (div.resource-info > p, e.g. "Application Note")
 *   <p><a href=pdf>PDF</a></p>      (div.resource-download a, optional; the "| " prefix and
 *                                    the Font Awesome download icon are drawn by the block)
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

function linkPara(document, href, label) {
  const p = document.createElement('p');
  const a = document.createElement('a');
  a.setAttribute('href', href.trim());
  a.textContent = label;
  p.appendChild(a);
  return p;
}

export default function parse(element, { document }) {
  let items = Array.from(element.querySelectorAll(':scope > .resource-item'));
  if (!items.length) items = Array.from(element.querySelectorAll('.resource-item'));

  const cells = [];
  items.forEach((item) => {
    const parts = [];
    const titleLink = item.querySelector('.resource-title a[href]');
    const titleEl = item.querySelector('.resource-title');
    if (titleLink && clean(titleLink.textContent)) {
      parts.push(linkPara(document, titleLink.getAttribute('href'), clean(titleLink.textContent)));
    } else if (titleEl && clean(titleEl.textContent)) {
      const p = document.createElement('p');
      p.textContent = clean(titleEl.textContent);
      parts.push(p);
    }

    const info = item.querySelector('.resource-info');
    if (info) {
      Array.from(info.querySelectorAll(':scope > p')).forEach((p) => {
        const label = clean(p.textContent);
        if (!label) return;
        const out = document.createElement('p');
        out.textContent = label;
        parts.push(out);
      });
    }

    const download = item.querySelector('.resource-download a[href]');
    if (download) {
      const label = clean(download.textContent).replace(/^\|\s*/, '') || 'PDF';
      parts.push(linkPara(document, download.getAttribute('href'), label));
    }

    if (!parts.length) return;
    const cell = document.createDocumentFragment();
    cell.appendChild(document.createComment(' field:text '));
    parts.forEach((p) => cell.appendChild(p));
    cells.push([cell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards (downloads)',
    // each row starts with its item component id (the converter picks the row model from it)
    cells: cells.map((row) => ['cards-downloads-item', ...row]),
  });
  element.replaceWith(block);
}
