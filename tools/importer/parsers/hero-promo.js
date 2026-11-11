/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-promo. Base: hero (xwalk container with block fields; block model
 * hero-promo: image, imageAlt, text; child model hero-promo-feature: image, imageAlt, text).
 * Source: https://www.beckman.com/cell-counters-and-analyzers/vi-cell-blu
 * Selector: div.banner-val
 * Rows:
 *   1. <!-- field:image --> background picture. The source sets it in CSS
 *      (.banner-title { background-image: url(…/vi-cell-blu/banner-darker) }); the importer
 *      writes computed CSS backgrounds into inline styles after preprocess and the cleanup
 *      gives the extension-less media URL its real extension (.png). Read from the inline
 *      style of the element / its descendants, else from a <style> rule naming
 *      .banner-title / .banner-val. Alt = the heading text (source has none).
 *   2. <!-- field:text --> <p>eyebrow</p> <h2>heading</h2> <p>text</p>
 *      <p><strong><a>CTA</a></strong></p>  (inline styles dropped)
 *   3. (optional) <!-- field:mobileImage --> img.mobile-img (mobile-only artwork shown below
 *      the CTA under 768px; alt from the source, else the heading text)
 *   then one item row per div.feature-item:
 *      [<!-- field:image --> icon img (empty alt -> feature title)]
 *      [<!-- field:text --> <p><strong>title</strong></p> (source h3) + <p>description</p>]
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

function cssUrl(css) {
  const m = /background(?:-image)?\s*:[^;{}]*?url\(\s*(?:&quot;|["'])?([^"')&]+?)(?:&quot;|["'])?\s*\)/i.exec(css || '');
  return m ? m[1].trim() : null;
}

function backgroundUrl(element, document) {
  const styled = [element, ...element.querySelectorAll('[style*="url("]')];
  for (const el of styled) {
    const url = cssUrl(el.getAttribute('style'));
    if (url) return url;
  }
  // stylesheet rule (when <style> elements are still in the document)
  const classes = ['banner-title', 'banner-val'];
  for (const s of Array.from(document.querySelectorAll('style'))) {
    const css = s.textContent || '';
    for (const c of classes) {
      const re = new RegExp(`\\.${c}\\s*\\{([^}]*)\\}`, 'g');
      let m;
      while ((m = re.exec(css))) {
        const url = cssUrl(m[1]);
        if (url) return url;
      }
    }
  }
  return null;
}

function fieldCell(document, field, nodes) {
  if (!nodes.length) return '';
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(` field:${field} `));
  nodes.forEach((n) => frag.appendChild(n));
  return frag;
}

export default function parse(element, { document }) {
  const titleBox = element.querySelector('.banner-title') || element;
  const heading = titleBox.querySelector('h1, h2, h3') || element.querySelector('h1, h2');
  const headingText = heading ? clean(heading.textContent) : '';

  const cells = [];

  // Row 1: background image
  const bg = backgroundUrl(element, document);
  if (bg) {
    const img = document.createElement('img');
    img.setAttribute('src', bg);
    img.setAttribute('alt', headingText || 'Background');
    cells.push([fieldCell(document, 'image', [img])]);
  } else {
    cells.push(['']);
  }

  // Row 2: eyebrow, heading, text, CTA
  const text = [];
  Array.from(titleBox.children).forEach((child) => {
    const value = clean(child.textContent);
    if (!value) return;
    if (/^H[1-6]$/.test(child.tagName)) {
      const h = document.createElement(child === heading ? 'h2' : child.tagName.toLowerCase());
      h.textContent = value;
      text.push(h);
    } else if (child.tagName === 'P' || child.tagName === 'DIV') {
      const p = document.createElement('p');
      p.textContent = value;
      text.push(p);
    }
  });
  const features = Array.from(element.querySelectorAll('.feature-item'));
  const cta = Array.from(element.querySelectorAll('a[href]'))
    .find((a) => clean(a.textContent) && !features.some((f) => f.contains(a)) && !titleBox.contains(a));
  if (cta) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    const a = document.createElement('a');
    a.setAttribute('href', cta.getAttribute('href').trim());
    a.textContent = clean(cta.textContent);
    strong.appendChild(a);
    p.appendChild(strong);
    text.push(p);
  }
  cells.push([fieldCell(document, 'text', text)]);

  // Row 3 (optional): mobile-only artwork, image-only row (block fields mobileImage/mobileImageAlt)
  const mobile = element.querySelector('img.mobile-img');
  if (mobile && mobile.getAttribute('src')) {
    const img = document.createElement('img');
    img.setAttribute('src', mobile.getAttribute('src'));
    img.setAttribute('alt', clean(mobile.getAttribute('alt')) || headingText);
    cells.push([fieldCell(document, 'mobileImage', [img])]);
  }

  // Feature rows: [icon] [title + description]
  features.forEach((item) => {
    const icon = Array.from(item.querySelectorAll('img')).find((img) => !img.classList.contains('mobile-img'));
    const titleEl = item.querySelector('h1, h2, h3, h4, h5, h6, strong, b');
    const title = titleEl ? clean(titleEl.textContent) : '';
    const descs = Array.from(item.querySelectorAll('p'))
      .filter((p) => clean(p.textContent) && !(titleEl && (p.contains(titleEl) || titleEl.contains(p))));

    let imageCell = '';
    if (icon) {
      const img = document.createElement('img');
      img.setAttribute('src', icon.getAttribute('src'));
      img.setAttribute('alt', clean(icon.getAttribute('alt')) || title || headingText);
      imageCell = fieldCell(document, 'image', [img]);
    }
    const parts = [];
    if (title) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = title;
      p.appendChild(strong);
      parts.push(p);
    }
    descs.forEach((d) => {
      const p = document.createElement('p');
      p.textContent = clean(d.textContent);
      parts.push(p);
    });
    if (!imageCell && !parts.length) return;
    cells.push([imageCell, fieldCell(document, 'text', parts)]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-promo', cells });
  element.replaceWith(block);
}
