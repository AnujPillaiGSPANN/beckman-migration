/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-product -> block "Carousel (product)" (blocks/carousel, variant product;
 * xwalk container; child model carousel-product-card: image, imageAlt, text).
 * Sources:
 *  - product-series (Biomek): #related-parts-wrapper, 6 slides
 *  - product-detail (Cydem VT): #related-parts-wrapper, 4 slides
 * Selector: #related-parts-wrapper
 * Slides: .slick-track > .related-part (excluding .slick-cloned).
 * One row per slide, led by the item-id cell "carousel-product-card":
 *   cell 1 = <!-- field:image --> .related-part__img img (empty alt -> slide title)
 *   cell 2 = <!-- field:text -->  h3 > a title link + description split out of the h3:
 *            a.related-part__desc is unwrapped; bare text -> <p>, p/ul kept, and a
 *            disclaimer after <br><br> becomes its own paragraph.
 * The wrapper sub-heading (.product-page-sub-heading-wrapper h3) is moved before the
 * block as default content (Cydem "Reagents and Consumables"), unless the page already
 * shows a heading right before the wrapper (Biomek: hidden duplicate "Related Products").
 * Slick arrows are dropped.
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();
const BLOCK = ['P', 'UL', 'OL', 'DIV', 'TABLE', 'BLOCKQUOTE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

/** Split mixed inline content into paragraphs at <br><br> and block boundaries. */
function toParagraphs(document, container) {
  const out = [];
  let pending = null;
  let brRun = 0;
  const flush = () => {
    if (pending) {
      // trim trailing single <br>
      while (pending.lastChild && (pending.lastChild.nodeName === 'BR'
        || (pending.lastChild.nodeType === 3 && !clean(pending.lastChild.textContent)))) {
        pending.lastChild.remove();
      }
      if (clean(pending.textContent)) out.push(pending);
    }
    pending = null;
  };
  Array.from(container.childNodes).forEach((n) => {
    if (n.nodeType === 8) return;
    if (n.nodeType === 1 && n.tagName === 'BR') {
      brRun += 1;
      if (brRun >= 2) flush();
      else if (pending) pending.appendChild(n);
      return;
    }
    if (n.nodeType === 3 && !clean(n.textContent)) {
      if (pending) pending.appendChild(n);
      return;
    }
    brRun = 0;
    if (n.nodeType === 1 && BLOCK.includes(n.tagName)) {
      flush();
      if (n.tagName === 'DIV') out.push(...toParagraphs(document, n));
      else if (clean(n.textContent)) out.push(n);
      return;
    }
    if (!pending) pending = document.createElement('p');
    pending.appendChild(n);
  });
  flush();
  return out;
}

function lastTextElement(el) {
  const all = Array.from(el.querySelectorAll('*')).filter((e) => clean(e.textContent));
  return all.length ? all[all.length - 1] : null;
}

export default function parse(element, { document }) {
  // wrapper sub-heading (default content)
  const before = [];
  const subWrap = element.querySelector('.product-page-sub-heading-wrapper');
  if (subWrap) {
    const sub = subWrap.querySelector('h1, h2, h3, h4, h5, h6');
    let prev = element.previousElementSibling;
    while (prev && !clean(prev.textContent)) prev = prev.previousElementSibling;
    const last = prev ? lastTextElement(prev) : null;
    const headingBefore = last && last.closest('h1, h2, h3, h4, h5, h6');
    const hidden = /display\s*:\s*none/i.test(subWrap.getAttribute('style') || '')
      || /(^|\s)(hidden|d-none|sr-only)(\s|$)/.test(subWrap.getAttribute('class') || '');
    if (sub && clean(sub.textContent) && !headingBefore && !hidden) before.push(sub);
    subWrap.remove();
  }

  let slides = Array.from(element.querySelectorAll('.slick-track > .related-part'));
  if (!slides.length) slides = Array.from(element.querySelectorAll('.related-part'));
  slides = slides.filter((s) => !s.classList.contains('slick-cloned'));

  const cells = [];
  slides.forEach((slide) => {
    const titleEl = slide.querySelector('.related-part__title') || slide.querySelector('h1, h2, h3, h4, h5, h6');
    const descLink = slide.querySelector('.related-part__desc');
    const titleLink = titleEl
      ? Array.from(titleEl.querySelectorAll('a')).find((a) => a !== descLink && !a.classList.contains('related-part__desc') && clean(a.textContent))
      : null;
    const titleText = clean(titleLink ? titleLink.textContent : (titleEl ? Array.from(titleEl.childNodes)
      .filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ') : ''));
    const imgLink = slide.querySelector('a.related-part__img-link[href]');
    const href = (titleLink && titleLink.getAttribute('href')) || (imgLink && imgLink.getAttribute('href'))
      || (descLink && descLink.getAttribute('href')) || null;

    // image
    const img = slide.querySelector('.related-part__img img') || slide.querySelector('img');
    let imageCell = '';
    if (img) {
      if (!clean(img.getAttribute('alt')) && titleText) img.setAttribute('alt', titleText);
      imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);
    }

    // text: title heading + description
    const parts = [];
    if (titleText) {
      const h = document.createElement('h3');
      if (href) {
        const a = document.createElement('a');
        a.setAttribute('href', href);
        a.textContent = titleText;
        h.appendChild(a);
      } else {
        h.textContent = titleText;
      }
      parts.push(h);
    }
    let descSource = descLink;
    if (!descSource && titleEl) {
      // description without a wrapper link: whatever follows the title link in the heading
      descSource = document.createElement('div');
      let n = titleLink ? titleLink.nextSibling : null;
      while (n) {
        const next = n.nextSibling;
        descSource.appendChild(n);
        n = next;
      }
    }
    if (descSource) parts.push(...toParagraphs(document, descSource));
    // any extra content in the slide outside the heading (rare)
    Array.from(slide.children).forEach((c) => {
      if (c === titleEl || c.classList.contains('related-part__img') || c.contains(img)) return;
      if (clean(c.textContent)) parts.push(...toParagraphs(document, c));
    });

    let textCell = '';
    if (parts.length) {
      textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      parts.forEach((p) => textCell.appendChild(p));
    }
    cells.push(['carousel-product-card', imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel (product)', cells });
  before.forEach((h) => element.before(h));
  element.replaceWith(block);
}
