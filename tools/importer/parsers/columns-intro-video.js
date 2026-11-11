/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-intro-video. Base: columns (xwalk Columns: no field hints).
 * Source: https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations
 * Selector: div.two-columns-holder
 * Layout: 1 row, 2 cells.
 *   col1 = intro paragraphs from .two-columns-holder__left .bc-rich-text (first one is boxed)
 *   col2 = Wistia video link https://fast.wistia.net/embed/iframe/<id> (+ caption if any)
 * The rendered Wistia player chrome is not copied; the id is read from the
 * wistia_async_<id> class (or an iframe/medias URL). A non-empty video heading is kept
 * as default content before the block; empty h2 / caption are dropped.
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();

function wistiaId(root) {
  const values = [];
  root.querySelectorAll('[class*="wistia_async_"], iframe[src], a[href], source[src]').forEach((el) => {
    values.push(el.getAttribute('class') || '', el.getAttribute('src') || '', el.getAttribute('href') || '');
  });
  for (const v of values) {
    const m = v.match(/wistia_async_([a-z0-9]{10})/i)
      || v.match(/wistia\.(?:net|com)\/(?:embed\/)?(?:iframe|medias)\/([a-z0-9]{10})/i);
    if (m) return m[1];
  }
  return null;
}

export default function parse(element, { document }) {
  const left = element.querySelector('.two-columns-holder__left') || element.querySelector('.col-md-6');
  const right = element.querySelector('.two-columns-holder__right')
    || Array.from(element.querySelectorAll('.col-md-6')).find((c) => c !== left);

  // Column 1: rich text
  const col1 = [];
  if (left) {
    const rt = left.querySelector('.bc-rich-text') || left;
    Array.from(rt.children).forEach((child) => {
      if (['STYLE', 'SCRIPT'].includes(child.tagName)) return;
      if (clean(child.textContent) || child.querySelector('img, picture')) col1.push(child);
    });
  }

  // Column 2: video link + optional caption
  const col2 = [];
  const before = [];
  if (right) {
    const heading = right.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading && clean(heading.textContent)) before.push(heading);
    const id = wistiaId(right);
    if (id) {
      const url = `https://fast.wistia.net/embed/iframe/${id}`;
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.textContent = url;
      p.appendChild(a);
      col2.push(p);
    }
    const caption = right.querySelector('.embeded-video__caption');
    if (caption && clean(caption.textContent)) {
      const p = document.createElement('p');
      p.textContent = clean(caption.textContent);
      col2.push(p);
    }
  }

  const cells = [[col1.length ? col1 : '', col2.length ? col2 : '']];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-intro-video', cells });
  before.forEach((h) => element.before(h));
  element.replaceWith(block);
}
