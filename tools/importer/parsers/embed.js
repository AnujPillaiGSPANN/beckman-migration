/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed (Block Collection embed) -> block "Embed" (family embed, default variant).
 * xwalk simple block, model embed (shared with the marketo / wistia variants): classes (variant),
 * classes_options ("narrow", "left"), embed_placeholder, embed_placeholderAlt, embed_uri
 * (embed_* -> one grouped cell), then the marketo fields (baseUrl, munchkinId, formId: no rows).
 * Source: https://www.mybeckman.in/liquid-handlers/software/echo/21-cfr-part-11-compliance-manager
 * Selector: div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(2) iframe[src*='youtube.com']
 * Embed convention: block name row, then ONE row with a single cell holding the URL of the
 * external content; an optional poster image sits above the link in the same cell:
 *   [<!-- field:embed_placeholder --> poster img, if the source has one]
 *   <!-- field:embed_uri --> <p><a href="https://www.youtube.com/watch?v=<id>">…</a></p>
 * (blocks/embed/embed.js reads the link and builds the YouTube player). The block replaces the
 * paragraph that held the iframe when the iframe is its only content.
 * Options per page (source iframe width / alignment): Echo 21CFR11 = 1200px of ~1800px content
 * width, flush left -> "Embed (narrow, left)".
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

const PAGE_OPTIONS = {
  '/liquid-handlers/software/echo/21-cfr-part-11-compliance-manager': ['narrow', 'left'],
};

function videoUrl(src) {
  const s = (src || '').trim().replace(/^\/\//, 'https://');
  let m = s.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/i)
    || s.match(/youtube\.com\/watch\?(?:.*&)?v=([\w-]{6,})/i)
    || s.match(/youtu\.be\/([\w-]{6,})/i);
  if (m) return `https://www.youtube.com/watch?v=${m[1]}`;
  m = s.match(/player\.vimeo\.com\/video\/(\d+)/i);
  if (m) return `https://vimeo.com/${m[1]}`;
  return /^https?:\/\//.test(s) ? s : '';
}

function pathOf(u) {
  try { return new URL(u).pathname.replace(/\/$/, ''); } catch (e) { return ''; }
}

export default function parse(element, { document, params }) {
  const iframe = element.tagName === 'IFRAME' ? element : element.querySelector('iframe');
  const url = videoUrl(iframe && (iframe.getAttribute('src') || iframe.getAttribute('data-src')));

  // single cell: optional poster above the link
  const cell = document.createDocumentFragment();
  const poster = element.tagName === 'IFRAME' ? null : element.querySelector('img');
  if (poster) {
    cell.appendChild(document.createComment(' field:embed_placeholder '));
    cell.appendChild(poster);
  }
  if (url) {
    cell.appendChild(document.createComment(' field:embed_uri '));
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.textContent = url;
    p.appendChild(a);
    cell.appendChild(p);
  }

  const options = PAGE_OPTIONS[pathOf(params && params.originalURL)] || [];
  const name = options.length ? `Embed (${options.join(', ')})` : 'Embed';
  const block = WebImporter.Blocks.createBlock(document, { name, cells: [[(poster || url) ? cell : '']] });

  // an iframe alone in its paragraph: the block takes the paragraph's place
  const host = element.parentElement;
  const alone = host && host.tagName === 'P' && !clean(host.textContent)
    && Array.from(host.children).every((c) => c === element || c.tagName === 'BR');
  (alone ? host : element).replaceWith(block);
}
