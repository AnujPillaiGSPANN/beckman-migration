/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-video. Base: hero (xwalk simple block, model hero-video).
 * Source: https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations
 * Selector: div.bc-rich-text:has(.eCardContainer)
 * Rows (model field groups):
 *   1. media group: <!-- field:media_video --> Wistia URL link (background video).
 *      media_image (poster) is not present in the source, so it is skipped via the hint.
 *   2. <!-- field:text --> H1 + CTA paragraphs (p > strong > a).
 * Quirks: the first CTA has a large/small screen duplicate (keep one copy per href),
 * <a><button> CTAs are unwrapped, the colour overlay / empty #subhead are dropped.
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();

function wistiaId(root) {
  const candidates = [];
  root.querySelectorAll('iframe[src], [class*="wistia_async_"], a[href*="wistia"]').forEach((el) => {
    candidates.push(el.getAttribute('src') || '', el.getAttribute('class') || '', el.getAttribute('href') || '');
  });
  for (const value of candidates) {
    const m = value.match(/wistia_async_([a-z0-9]{10})/i)
      || value.match(/wistia\.(?:net|com)\/(?:embed\/)?(?:iframe|medias)\/([a-z0-9]{10})/i);
    if (m) return m[1];
  }
  return null;
}

export default function parse(element, { document }) {
  const cells = [];

  // Row 1: background video
  const id = wistiaId(element);
  if (id) {
    const url = `https://fast.wistia.net/embed/iframe/${id}`;
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.textContent = url;
    p.appendChild(a);
    const media = document.createDocumentFragment();
    media.appendChild(document.createComment(' field:media_video '));
    media.appendChild(p);
    cells.push([media]);
  } else {
    cells.push(['']);
  }

  // Row 2: heading + CTAs
  const parts = [];
  const heading = element.querySelector('h1') || element.querySelector('h2, h3');
  if (heading && clean(heading.textContent)) parts.push(heading);

  const seen = new Set();
  const links = Array.from(element.querySelectorAll('a[href]'))
    .filter((a) => !/wistia/i.test(a.getAttribute('href')) && !(heading && heading.contains(a)));
  links.forEach((a) => {
    const href = a.getAttribute('href').trim();
    // prefer the large-screen copy of duplicated CTAs
    if (a.closest('.smallscreenbutton')) {
      const twin = links.find((o) => o !== a && o.getAttribute('href').trim() === href && !o.closest('.smallscreenbutton'));
      if (twin) return;
    }
    if (seen.has(href)) return;
    const label = clean(a.textContent);
    if (!label) return;
    seen.add(href);
    const link = document.createElement('a');
    link.setAttribute('href', href);
    link.textContent = label; // unwraps any <button> inside the link
    const strong = document.createElement('strong');
    strong.appendChild(link);
    const p = document.createElement('p');
    p.appendChild(strong);
    parts.push(p);
  });

  // other copy (e.g. a sub-heading paragraph) if present
  Array.from(element.querySelectorAll('#subhead, p')).forEach((el) => {
    if (el.querySelector('a') || el.closest('.eCardContainer')) return;
    if (clean(el.textContent) && !parts.includes(el)) parts.splice(1, 0, el);
  });

  if (parts.length) {
    const text = document.createDocumentFragment();
    text.appendChild(document.createComment(' field:text '));
    parts.forEach((p) => text.appendChild(p));
    cells.push([text]);
  } else {
    cells.push(['']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-video', cells });
  element.replaceWith(block);
}
