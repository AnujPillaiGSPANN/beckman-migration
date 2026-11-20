/* eslint-disable */
/* global WebImporter */
import heroBannerParser from './hero-banner.js';

/**
 * Family parser for hero (template landing-form-rail): detects the variant from the DOM and
 * delegates to the variant parser.
 * Source: https://www.mybeckman.in/landing/centrifuge/straight-up (also japan/straight-up)
 * Selector: #content-holder:has(img, picture, [style*='background'])
 *
 * Variants:
 * - banner (catalog v_b8a06617cb02-1): #content-holder > section > div.box > div.top-banner
 *   (background photo set by a class rule in the page's inline <style>) > div.top-banner--text
 *   (h1 + optional h2 subtitle). Delegated to hero-banner.js -> "Hero (banner)": rows
 *   image | (empty media_* row of the merged hero model) | text. hero-banner.js keeps only
 *   the H1 and <p>s, so subtitle headings after the H1 are turned into paragraphs first
 *   (input adaptation only; hero-banner.js itself is unchanged).
 *   The delegate runs on the banner in place (the <style> holding its background rule is
 *   still in the document), then the block takes the place of the whole #content-holder
 *   (its empty .bcls-aeo-published div, <style> and <br> are dropped).
 * Any other hero-like element (inline background or image) is also passed to hero-banner.js,
 * the only hero variant seen on this template.
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

/** The element carrying the banner background: .top-banner, else the first styled background. */
function bannerOf(element) {
  return element.querySelector('.top-banner')
    || element.querySelector('[style*="background"], [data-excat-bg]')
    || element;
}

/** Headings after the title become subtitle paragraphs (hero-banner.js reads <p>s). */
function subtitlesToParagraphs(banner, document) {
  const headings = Array.from(banner.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const title = headings.find((h) => h.tagName === 'H1') || headings[0];
  headings.forEach((h) => {
    if (h === title) return;
    if (!clean(h.textContent)) { h.remove(); return; }
    const p = document.createElement('p');
    p.textContent = clean(h.textContent);
    h.replaceWith(p);
  });
}

/**
 * Template homepage (www.mybeckman.in home, Tailwind markup), new branches detected from the DOM
 * (the landing-form-rail path below is unchanged):
 * (a) curved: div.relative.justify-end > (div > div > img) + div.hero__body (h1 > span > span,
 *     p.hero-intro-animate) -> "Hero (banner, curved)": rows image | (empty media_*) | text
 *     (H1 + intro paragraph), the rows of hero-banner.js.
 * (b) boxed: #about > div > div.border-l-brand-primary (p eyebrow, h2, p, a CTA "… ->") + the
 *     section's img.object-cover background -> "Hero (promo, boxed)": rows image | (empty media_*)
 *     | text (eyebrow, H2, text, CTA as a bold link = primary button), the rows of hero-promo.js
 *     without feature rows. The CTA's "->" arrow is dropped (the variant draws it).
 */
function fieldCell(document, field, nodes) {
  if (!nodes.length) return '';
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(` field:${field} `));
  nodes.forEach((n) => frag.appendChild(n));
  return frag;
}

function imageOf(document, src, alt) {
  const img = document.createElement('img');
  img.setAttribute('src', src);
  img.setAttribute('alt', alt);
  return img;
}

/** Link text without the trailing "->" arrow span. */
function linkLabel(a) {
  const copy = a.cloneNode(true);
  Array.from(copy.querySelectorAll('span')).forEach((s) => {
    if (/^(->|→)$/.test(clean(s.textContent))) s.remove();
  });
  return clean(copy.textContent).replace(/\s*(->|→)$/, '');
}

function curvedHero(element, document) {
  const body = element.querySelector('.hero__body');
  const photo = Array.from(element.querySelectorAll('img')).find((img) => !body.contains(img));
  const h1 = body.querySelector('h1');
  const title = h1 ? clean(h1.textContent) : '';
  const cells = [];
  cells.push([photo ? fieldCell(document, 'image', [imageOf(document, photo.getAttribute('src'), clean(photo.getAttribute('alt')) || title)]) : '']);
  cells.push(['']);
  const text = [];
  if (title) {
    const h = document.createElement('h1');
    h.textContent = title;
    text.push(h);
  }
  Array.from(body.querySelectorAll('p')).forEach((p) => {
    if (!clean(p.textContent)) return;
    const out = document.createElement('p');
    out.textContent = clean(p.textContent);
    text.push(out);
  });
  cells.push([fieldCell(document, 'text', text)]);
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'Hero (banner, curved)', cells }));
}

function boxedHero(element, document) {
  const box = element.querySelector('.border-l-brand-primary') || element.querySelector('h2').parentElement;
  const photo = Array.from(element.querySelectorAll('img')).find((img) => !box.contains(img));
  const heading = box.querySelector('h1, h2, h3');
  const title = heading ? clean(heading.textContent) : '';
  const cells = [];
  cells.push([photo ? fieldCell(document, 'image', [imageOf(document, photo.getAttribute('src'), clean(photo.getAttribute('alt')) || title)]) : '']);
  cells.push(['']);
  const text = [];
  Array.from(box.children).forEach((child) => {
    const value = clean(child.textContent);
    if (!value) return;
    if (child === heading) {
      const h = document.createElement('h2');
      h.textContent = value;
      text.push(h);
    } else if (child.tagName === 'A' && child.getAttribute('href')) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const a = document.createElement('a');
      a.setAttribute('href', child.getAttribute('href').trim());
      a.textContent = linkLabel(child);
      strong.appendChild(a);
      p.appendChild(strong);
      text.push(p);
    } else if (child.tagName === 'P' || child.tagName === 'DIV') {
      const p = document.createElement('p');
      p.textContent = value;
      text.push(p);
    }
  });
  cells.push([fieldCell(document, 'text', text)]);
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'Hero (promo, boxed)', cells }));
}

export default function parse(element, { document, params }) {
  if (element.querySelector('.hero__body')) {
    curvedHero(element, document);
    return;
  }
  if (element.querySelector('.border-l-brand-primary h2') && element.querySelector(':scope > img')) {
    boxedHero(element, document);
    return;
  }

  const banner = bannerOf(element);
  subtitlesToParagraphs(banner, document);

  if (banner === element) {
    heroBannerParser(element, { document, params });
    return;
  }

  // run the delegate on the banner in place, then move its block to the holder's place
  const marker = document.createComment(' hero ');
  banner.before(marker);
  heroBannerParser(banner, { document, params });
  const block = marker.nextSibling;
  marker.remove();
  if (block && block.nodeType === 1) element.replaceWith(block);
}
