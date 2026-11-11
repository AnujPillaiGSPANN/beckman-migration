/* eslint-disable */
/* global WebImporter */

/**
 * Parser for intro-video. Base: columns (xwalk block/v1/block + item model intro-video-row).
 * Source: https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations
 * Selector: div.two-columns-holder
 * Layout: 1 row, 2 cells.
 *   col1 (field:column1) = intro paragraphs from .two-columns-holder__left .bc-rich-text (first one is boxed)
 *   col2 (field:column2) = Wistia video link https://fast.wistia.net/embed/iframe/<id> (+ caption if any)
 * The rendered Wistia player chrome is not copied; the id is read from the
 * wistia_async_<id> class (or an iframe/medias URL). A non-empty video heading is kept
 * as default content before the block; empty h2 / caption are dropped.
 * Also product-series Echo Acoustic: the right column is a photo (no Wistia media) ->
 *   <!-- field:column2image --> img (needs a column2image reference field in the model);
 *   the left column's <a><button> CTA becomes <p><strong><a>label</a></strong></p>.
 */
/** Cell content prefixed with an xwalk field hint (empty string when there is no content). */
function fieldCell(document, field, nodes) {
  if (!nodes.length) return '';
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(` field:${field} `));
  nodes.forEach((n) => frag.appendChild(n));
  return frag;
}

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
      // Echo: CTA paragraph "<p style=…><a href><button class='btn btn-red'>label</button></a></p>"
      // -> primary button paragraph <p><strong><a href>label</a></strong></p>
      const btnLink = child.querySelector('a[href] > button') && child.querySelector('a[href] > button').parentElement;
      if (btnLink && clean(child.textContent) === clean(btnLink.textContent)) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        const a = document.createElement('a');
        a.setAttribute('href', btnLink.getAttribute('href').trim());
        a.textContent = clean(btnLink.textContent);
        strong.appendChild(a);
        p.appendChild(strong);
        col1.push(p);
        return;
      }
      if (clean(child.textContent) || child.querySelector('img, picture')) col1.push(child);
    });
  }

  // Column 2: video link + optional caption
  const col2 = [];
  const before = [];
  let photo = null;
  if (right && !wistiaId(right)) {
    // Echo: the right column is a photo, not a video. Images never go into the richtext
    // column2: the photo is emitted as its own reference field (column2image, alt kept).
    const img = right.querySelector('img');
    if (img) {
      photo = document.createElement('img');
      photo.setAttribute('src', img.getAttribute('src'));
      photo.setAttribute('alt', clean(img.getAttribute('alt')) || clean(left && left.textContent).slice(0, 120));
    }
  }
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

  // column 2 is a field group (column2_text + column2_image) so it stays ONE cell in AEM
  let col2Cell = fieldCell(document, 'column2_text', col2);
  if (photo) {
    col2Cell = col2Cell || document.createDocumentFragment();
    col2Cell.appendChild(document.createComment(' field:column2_image '));
    col2Cell.appendChild(photo);
  }
  const cells = [[fieldCell(document, 'column1', col1), col2Cell]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'intro-video', cells });
  before.forEach((h) => element.before(h));
  element.replaceWith(block);
}
