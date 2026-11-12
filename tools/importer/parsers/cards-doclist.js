/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-doclist. Base: cards (xwalk container; child model cards-doclist-item:
 * type (select pdf | video), text (richtext)).
 * Sources: https://www.beckman.com/air-particle-counters/met-one-3400-plus,
 *          .../met-one-6000, .../facility-monitoring-system
 * Selector: #product-documentation-wrapper div.content-resource-list-wrapper
 * One row per div.content-resource-list-child, 2 cells:
 *   cell 1 = <!-- field:type --> "pdf" | "video" (from the Font Awesome icon class
 *            <i class="far fa-file-pdf"> -> pdf, <i class="fas fa-video"> -> video, read from
 *            the row's data-excat-icon (set by beckman-cleanup); the block draws the icon and builds
 *            the Resource Type filter from it)
 *   cell 2 = <!-- field:text --> <p><a href>title</a></p> (a.content-resource-list-heading)
 *            + optional <p>description</p> (span.content-resource-list-text, full text;
 *            the one-line ellipsis is CSS)
 * The Coveo filter / pagination UI is not part of the element (removed by the cleanup);
 * hrefs stay as on the source (gated-media {GUID} braces are encoded by the cleanup).
 * Source data bugs in descriptions (Cytobank Enterprise): double-encoded entities shown as text
 * ("20&ndash;color") are decoded, escaped markup shown as text ("<span style=…>…</span>") loses
 * its tags, and a description that only repeats the title is dropped.
 */
const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', reg: '®', trade: '™', deg: '°',
};
function decodeText(s) {
  let out = s || '';
  for (let i = 0; i < 2; i += 1) {
    out = out.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (all, e) => {
      if (e[0] === '#') {
        const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : all;
      }
      const v = ENTITIES[e.toLowerCase()];
      return v !== undefined ? v : all;
    });
  }
  // markup that arrived as text
  return out.replace(/<\/?[a-z][^<>]*>/gi, '');
}
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

function typeOf(item) {
  // the importer removes the empty <i> before transform; beckman-cleanup copies its class to
  // the row (data-excat-icon) in preprocess
  const icon = item.querySelector('.content-resource-list-icon i, .content-resource-list-icon [class*="fa-"], i[class*="fa-"]');
  const cls = item.getAttribute('data-excat-icon') || (icon ? icon.getAttribute('class') || '' : '');
  if (/fa-video|fa-play|fa-film/.test(cls)) return 'video';
  return 'pdf';
}

export default function parse(element, { document }) {
  let items = Array.from(element.querySelectorAll(':scope > .content-resource-list-child'));
  if (!items.length) items = Array.from(element.querySelectorAll('.content-resource-list-child'));

  const cells = [];
  items.forEach((item) => {
    const link = item.querySelector('a.content-resource-list-heading[href]')
      || Array.from(item.querySelectorAll('a[href]')).find((a) => clean(a.textContent));
    const descEl = item.querySelector('.content-resource-list-text');
    const title = link ? clean(link.textContent) : '';
    let desc = descEl ? clean(decodeText(descEl.textContent)) : '';
    if (desc && desc.toLowerCase() === title.toLowerCase()) desc = '';
    if (!title && !desc) return;

    const typeCell = document.createDocumentFragment();
    typeCell.appendChild(document.createComment(' field:type '));
    typeCell.appendChild(document.createTextNode(typeOf(item)));

    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    if (title) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.setAttribute('href', link.getAttribute('href').trim());
      a.textContent = title;
      p.appendChild(a);
      textCell.appendChild(p);
    }
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc;
      textCell.appendChild(p);
    }
    cells.push([typeCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards (doclist)',
    // each row starts with its item component id (the converter picks the row model from it)
    cells: cells.map((row) => ['cards-doclist-item', ...row]),
  });
  element.replaceWith(block);
}
