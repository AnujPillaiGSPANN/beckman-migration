/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-scroll. Base: cards (xwalk container; child model cards-scroll-card:
 * image, imageAlt, text).
 * Source: https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations
 * Selectors (two instances):
 *  - div.brochures.brochure-scroll : 6 x div.brochure.tooltip = cover img + a.tooltiptext "Download"
 *      -> [<!-- field:image --> cover] [<!-- field:text --> download link]
 *  - div.LatestNews.h-scroll-container : 10 x a.LatestNews__Item (whole tile is the link)
 *      -> [<!-- field:image --> figure img] [<!-- field:text --> eyebrow label + bold linked title]
 * Relative hrefs/srcs (e.g. "-/media/....ashx", "www.beckman.com/...") are resolved
 * against https://www.beckman.com/. Root-relative site links are kept as-is.
 */
const BASE = 'https://www.beckman.com/';
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();

function absolutize(url) {
  // a page-relative "-/media/..." resolved by the browser against the page folder
  // (e.g. https://www.beckman.com/liquid-handlers/-/media/...) belongs at the site root
  const u = (url || '').trim()
    .replace(/^((?:https?:)?\/\/(?:www\.)?beckman\.com)\/[^?#]*?\/-\/media\//i, '$1/-/media/')
    .replace(/^(www\.beckman\.com)\/[^?#]*?\/-\/media\//i, '$1/-/media/');
  if (!u || /^(https?:|mailto:|tel:|data:|#|\/|\.\/|\.\.\/)/i.test(u)) return u;
  if (/^\/\//.test(u)) return `https:${u}`;
  if (/^www\./i.test(u)) return `https://${u}`;
  try {
    return new URL(u, BASE).href;
  } catch (e) {
    return u;
  }
}

function imageFragment(document, img, fallbackAlt) {
  if (!img) return '';
  if (!clean(img.getAttribute('alt')) && fallbackAlt) img.setAttribute('alt', fallbackAlt);
  const src = img.getAttribute('src');
  if (src) img.setAttribute('src', absolutize(src));
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(' field:image '));
  frag.appendChild(img);
  return frag;
}

function textFragment(document, nodes) {
  if (!nodes.length) return '';
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(' field:text '));
  nodes.forEach((n) => frag.appendChild(n));
  return frag;
}

export default function parse(element, { document }) {
  const cells = [];

  const brochures = Array.from(element.querySelectorAll('.brochure'));
  const tiles = Array.from(element.querySelectorAll('.LatestNews__Item, .h-scroll-item'))
    .filter((t, i, all) => !all.some((o) => o !== t && o.contains(t)));

  if (brochures.length) {
    brochures.forEach((item) => {
      const img = item.querySelector('img');
      const link = item.querySelector('a.tooltiptext[href]') || item.querySelector('a[href]');
      const nodes = [];
      if (link) {
        const a = document.createElement('a');
        a.setAttribute('href', absolutize(link.getAttribute('href')));
        a.textContent = clean(link.textContent) || 'Download';
        const p = document.createElement('p');
        p.appendChild(a);
        nodes.push(p);
      }
      cells.push([imageFragment(document, img, null), textFragment(document, nodes)]);
    });
  } else {
    tiles.forEach((tile) => {
      const href = tile.tagName === 'A' ? tile.getAttribute('href')
        : (tile.querySelector('a[href]') && tile.querySelector('a[href]').getAttribute('href'));
      const labelEl = tile.querySelector('.LatestNews__Label');
      const bodyEl = tile.querySelector('.LatestNews__Body') || tile.querySelector('strong');
      const label = labelEl ? clean(labelEl.textContent) : '';
      const title = bodyEl ? clean(bodyEl.textContent) : '';

      const nodes = [];
      if (label) {
        const p = document.createElement('p');
        p.textContent = label;
        nodes.push(p);
      }
      if (title) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        if (href) {
          const a = document.createElement('a');
          a.setAttribute('href', absolutize(href));
          a.textContent = title;
          strong.appendChild(a);
        } else {
          strong.textContent = title;
        }
        p.appendChild(strong);
        nodes.push(p);
      }
      const img = tile.querySelector('figure img') || tile.querySelector('img');
      cells.push([imageFragment(document, img, title), textFragment(document, nodes)]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-scroll', cells });
  element.replaceWith(block);
}
