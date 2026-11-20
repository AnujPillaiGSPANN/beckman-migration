/* eslint-disable */
/* global WebImporter */
import embedMarketoParser from './embed-marketo.js';
import embedWistiaParser from './embed-wistia.js';

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

/**
 * Catalog template landing-form-rail: the family name "embed" also covers its Marketo form
 * and Wistia video instances, which go to the variant parsers. Checked before the default path;
 * every other input (YouTube / Vimeo iframes) keeps the default code below.
 * (a) Marketo: div.formassembly-container (or an element inside it / holding it, e.g. the rail
 *     div.two-columns-holder__right.col-md-3 or div.formWrapper.marketo-form-wrapper) with a
 *     Marketo form -> embed-marketo.js on the formassembly-container ("Embed (marketo)").
 * (b) Wistia: div.w-video-wrapper inside #wistia_grid_* (the rendered player) -> embed-wistia.js
 *     on the player's div.embeded-video wrapper (else .wistia-video__wrapper / .wistia_embed),
 *     so the whole Wistia chrome is replaced ("Embed (wistia)").
 */
const MARKETO_FORM = 'form[id^="mktoForm_"], form.mktoForm, .marketo-form-wrapper';

function marketoTarget(element) {
  const inside = element.closest('.formassembly-container');
  if (inside && inside.querySelector(MARKETO_FORM)) return inside;
  if (element.matches('.marketo-form-wrapper') || element.matches('form.mktoForm')) return element;
  const holders = Array.from(element.querySelectorAll('.formassembly-container'))
    .filter((c) => c.querySelector(MARKETO_FORM));
  if (holders.length === 1) return holders[0];
  if (!holders.length) {
    const wrappers = element.querySelectorAll('.marketo-form-wrapper');
    if (wrappers.length === 1) return wrappers[0];
  }
  return null;
}

function wistiaTarget(element) {
  // (c) a Wistia iframe embed (<iframe class="wistia_embed" src="…fast.wistia.net/embed/iframe/<id>">):
  //     embed-wistia.js reads the id from it; the migrated pages only send YouTube / Vimeo iframes here
  const frame = element.matches('iframe') ? element : element.querySelector(':scope > iframe');
  if (frame && /wistia\.(net|com)\/embed\//.test(frame.getAttribute('src') || '')) {
    // only the video's own wrapper, never the surrounding rich text (the iframe often sits in it)
    return frame.closest('.embeded-video') || frame.closest('.wistia_responsive_padding') || frame.closest('.wistia_responsive_wrapper') || frame;
  }
  const player = element.matches('.w-video-wrapper') ? element : null;
  if (!player || !player.closest('[id^="wistia_grid_"]')) return null;
  return player.closest('.embeded-video') || player.closest('.wistia-video__wrapper')
    || player.closest('.wistia_embed') || player;
}

export default function parse(element, { document, params }) {
  const marketo = marketoTarget(element);
  if (marketo) {
    // landing pages title the form inside its panel (h3.formassembly-title): keep it as a
    // heading just before the block (only landing pages have this title) and mark the block
    // "Embed (marketo, titled)": the option draws that heading in the form's grey panel (a
    // rail heading outside .formassembly-container stays above the panel)
    const title = marketo.querySelector('h3.formassembly-title');
    const text = title && clean(title.textContent);
    if (title) title.remove();
    if (text) {
      const heading = document.createElement('h3');
      heading.textContent = text;
      marketo.before(heading);
    }
    // template homepage (WKSC discount pages): the form sits in a grey box (.bc-test-layout,
    // .marketo-two-column) under a grey rich-text box holding its heading and text
    // (div[style*="#f0f0f0"]) -> "Embed (marketo, boxed)"; the heading box stays default
    // content right before the block (the option draws both as one box)
    const prev = marketo.previousElementSibling;
    const boxed = marketo.matches('.marketo-two-column') && Boolean(marketo.closest('.bc-test-layout'))
      && Boolean(prev && prev.matches('.bc-rich-text') && prev.querySelector('div[style*="#f0f0f0"] h1, div[style*="#f0f0f0"] h2'));
    const options = [boxed && 'boxed', text && 'titled'].filter(Boolean);
    const marker = options.length ? document.createComment(' embed ') : null;
    if (marker) marketo.before(marker);
    embedMarketoParser(marketo, { document, params });
    if (marker) {
      const block = marker.nextSibling;
      marker.remove();
      const nameCell = block && block.nodeType === 1 ? block.querySelector('th, td') : null;
      if (nameCell && clean(nameCell.textContent) === 'Embed (marketo)') nameCell.textContent = `Embed (marketo, ${options.join(', ')})`;
    }
    return;
  }
  const wistia = wistiaTarget(element);
  if (wistia) {
    embedWistiaParser(wistia, { document, params });
    return;
  }

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
