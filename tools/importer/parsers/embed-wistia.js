/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed-wistia. Base: embed (xwalk simple block, model embed-wistia:
 * embed_placeholder, embed_placeholderAlt, embed_uri -> one grouped row).
 * Source: https://www.beckman.com/cell-culture-workstation/cydem-vt
 * Selector: div.spotlight-content-wrapper > div.embeded-video
 * Row 1 (embed group): [<!-- field:embed_placeholder --> poster img, if any]
 *                      <!-- field:embed_uri --> https://fast.wistia.net/embed/iframe/<id>
 * The media id is read from the wistia_async_<id> class (or an iframe/medias URL);
 * the rendered Wistia chrome / blob video is not copied. A source div.embeded-video--col-8
 * (Vi-CELL BLU) emits "embed-wistia (narrow)". A non-empty heading is kept
 * before the block and a non-empty caption after it (default content); empty ones dropped.
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();

function wistiaId(root) {
  const values = [];
  if (root.getAttribute) values.push(root.getAttribute('class') || '');
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
  const before = [];
  const after = [];
  const heading = element.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > h4');
  if (heading && clean(heading.textContent)) before.push(heading);
  const caption = element.querySelector('.embeded-video__caption');
  if (caption && clean(caption.textContent)) {
    const p = document.createElement('p');
    p.textContent = clean(caption.textContent);
    after.push(p);
  }

  // poster: an authored (non-Wistia-chrome) image, if present
  const poster = Array.from(element.querySelectorAll('img'))
    .find((img) => !img.closest('.wistia_embed, .w-chrome') && !/^data:/i.test(img.getAttribute('src') || ''));

  const id = wistiaId(element);
  const cell = document.createDocumentFragment();
  if (poster) {
    cell.appendChild(document.createComment(' field:embed_placeholder '));
    cell.appendChild(poster);
  }
  if (id) {
    const url = `https://fast.wistia.net/embed/iframe/${id}`;
    cell.appendChild(document.createComment(' field:embed_uri '));
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.textContent = url;
    p.appendChild(a);
    cell.appendChild(p);
  }

  const cells = [[(poster || id) ? cell : '']];
  // 8-of-12-column video (Vi-CELL BLU) -> option "narrow"; default is 10 of 12 (Cydem VT)
  const narrow = element.classList.contains('embeded-video--col-8');
  const block = WebImporter.Blocks.createBlock(document, { name: narrow ? 'embed-wistia (narrow)' : 'embed-wistia', cells });
  before.forEach((n) => element.before(n));
  after.reverse().forEach((n) => element.after(n));
  element.replaceWith(block);
}
