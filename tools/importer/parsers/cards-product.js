/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product. Base: cards (xwalk container; child model cards-product-card).
 * Sources: https://www.beckman.com/air-particle-counters,
 *          https://www.mybeckman.in/particle-size-analyzers,
 *          https://www.mybeckman.in/flow-cytometry
 * Selector: div.product-series-callouts
 * One row per .product-series-callouts__item:
 *   cell 1 (field:image) = card image (one copy; duplicates dropped). Alt text falls back
 *                          to the card title when empty or not Latin script (e.g. Chinese).
 *   cell 2 (field:text)  = h4 title linked to the card href, description paragraph(s), list
 *
 * Structural variations handled:
 * - Usual card: a.product-series-callouts__block wraps image holder + description.
 * - Wrapper is a plain div with an empty image holder and empty h4; the image sits in the
 *   description (p > a > img) and the link sits on an inner title (h4 > a[href]).
 * - Description is bare text inside div.hidden-xs.display-print (no <p>): wrapped in a <p>.
 */
const BLOCK_TAGS = ['P', 'UL', 'OL', 'DIV', 'TABLE', 'BLOCKQUOTE', 'SECTION', 'FIGURE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();
const isLatinAlt = (alt) => !/[^\u0000-ɏḀ-ỿ -⁯℀-⅏°-ÿ]/.test(alt);

export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll('.product-series-callouts__item'));
  const cells = [];

  items.forEach((item) => {
    const desc = item.querySelector('.product-series-callouts__description') || item;

    // Title: first heading with text (empty h4 placeholders are skipped)
    const headings = Array.from(desc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const heading = headings.find((h) => clean(h.textContent));
    const titleText = heading ? clean(heading.textContent) : '';

    // Link: block anchor, else title link, else any linked image
    const blockAnchor = item.querySelector('a.product-series-callouts__block[href]');
    const titleLink = heading ? heading.querySelector('a[href]') : null;
    const imgLink = Array.from(item.querySelectorAll('a[href]')).find((a) => a.querySelector('img'));
    const href = (blockAnchor || titleLink || imgLink)
      ? (blockAnchor || titleLink || imgLink).getAttribute('href') : null;

    // Image: one copy; prefer the copy that has a non-empty alt
    const imgs = Array.from(item.querySelectorAll('img'));
    const img = imgs.find((i) => (i.getAttribute('alt') || '').trim()) || imgs[0] || null;
    if (img) {
      const alt = (img.getAttribute('alt') || '').trim();
      if ((!alt || !isLatinAlt(alt)) && titleText) img.setAttribute('alt', titleText);
    }
    // detach every image copy so none leaks into the text cell
    imgs.forEach((i) => { if (i !== img) i.remove(); });

    const imageCell = document.createDocumentFragment();
    if (img) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);
    }

    // Text cell: title + description content in document order
    const parts = [];
    if (heading) {
      const h = document.createElement(heading.tagName.toLowerCase());
      if (href) {
        const link = document.createElement('a');
        link.setAttribute('href', href);
        link.textContent = titleText;
        h.appendChild(link);
      } else {
        h.textContent = titleText;
      }
      parts.push(h);
    }

    const collect = (container) => {
      let pending = null;
      const flush = () => {
        if (pending && clean(pending.textContent)) parts.push(pending);
        pending = null;
      };
      Array.from(container.childNodes).forEach((node) => {
        if (node.nodeType === 8) return; // comments
        if (node.nodeType === 3) {
          if (!clean(node.textContent)) {
            if (pending) pending.appendChild(node);
            return;
          }
          if (!pending) pending = document.createElement('p');
          pending.appendChild(node);
          return;
        }
        if (node.nodeType !== 1) return;
        const tag = node.tagName;
        if (!BLOCK_TAGS.includes(tag)) {
          if (tag === 'BR' && !pending) return;
          if (!clean(node.textContent)) return; // empty inline (e.g. image link emptied above)
          if (!pending) pending = document.createElement('p');
          pending.appendChild(node);
          return;
        }
        flush();
        if (/^H[1-6]$/.test(tag)) return; // title handled above
        if (tag === 'DIV' || tag === 'SECTION' || tag === 'FIGURE') {
          collect(node);
          return;
        }
        if (!clean(node.textContent)) return;
        parts.push(node);
      });
      flush();
    };
    collect(desc);

    const textCell = document.createDocumentFragment();
    if (parts.length) {
      textCell.appendChild(document.createComment(' field:text '));
      parts.forEach((p) => textCell.appendChild(p));
    }

    cells.push([img ? imageCell : '', parts.length ? textCell : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-product', cells });
  element.replaceWith(block);
}
