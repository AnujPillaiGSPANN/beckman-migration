/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-tiles -> block "Cards (tiles)" / "Cards (tiles, panels)" (family cards,
 * variant option "tiles"). xwalk container; child model cards-tiles-card: image, imageAlt, text.
 * Each row starts with its item component id cell (the converter picks the row model from it);
 * an image cell may be empty but is always present.
 * Source: https://www.mybeckman.in/resources/technologies/analytical-ultracentrifugation
 * Selectors (three instances):
 *  - #applications > div.copy > div.cards-row: 5 x a.card (whole tile is the link). The image
 *      is the CSS background of div.card-image.<class>, set by class rules in the page's inline
 *      <style> (.auc-mabs { background-image: url(…/auc-pages/mabs) }). Read from data-excat-bg
 *      (cleanup cssBackgrounds rule: class -> URL map built in preprocess, extension fixed),
 *      else the inline style (importer-computed background), else the <style> class rules.
 *      -> [cards-tiles-card] [<!-- field:image --> img] [<!-- field:text --> <p><a>title</a></p>]
 *  - #methods > div.copy:nth-of-type(2) > div.cards-row:nth-of-type(1): 4 x a.card with
 *      .badge-resources <p> (e.g. "Whitepaper") + .card-image img
 *      -> [cards-tiles-card] [img] [<p>badge</p><p><a>title</a></p>]
 *  - … div.block > div.row:nth-of-type(9) "Related Content": div.panel-wrapper > div.panel
 *      (panel > a > img + .panel-content a h4). The panels span this row and the next sibling
 *      div.row (1 panel + 3 empty div.panel-noborder grid fillers): the parser takes the
 *      panels of both, drops the empty ones and removes the sibling row.
 *      -> "Cards (tiles, panels)", rows [cards-tiles-card] [img] [<p><a>title</a></p>]
 * The image is never wrapped in a link (the title link makes the whole tile clickable).
 * Alt: empty or placeholder ("testing") source alts become the tile title.
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();
const PLACEHOLDER_ALT = /^(testing|test|image|img|alt|placeholder)$/i;

function cssUrl(css) {
  const m = /background(?:-image)?\s*:[^;{}]*?url\(\s*(?:&quot;|["'])?([^"')&]+?)(?:&quot;|["'])?\s*\)/i.exec(css || '');
  return m ? m[1].trim() : null;
}

/** { class: url } from single-class background rules in the document's <style>s. */
function classRules(document) {
  const map = {};
  Array.from(document.querySelectorAll('style')).forEach((s) => {
    const css = (s.textContent || '').replace(/\/\*[\s\S]*?\*\//g, '');
    const rule = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = rule.exec(css))) {
      const url = cssUrl(m[2]);
      if (!url || /^data:/i.test(url)) continue;
      m[1].split(',').map((x) => x.trim()).forEach((sel) => {
        const c = /^\.([\w-]+)$/.exec(sel);
        if (c) map[c[1]] = url;
      });
    }
  });
  return map;
}

function backgroundUrl(el, rules) {
  if (!el) return null;
  const attr = el.getAttribute('data-excat-bg') || cssUrl(el.getAttribute('style'));
  if (attr) return attr;
  const cls = Array.from(el.classList || []).find((c) => rules[c]);
  return cls ? rules[cls] : null;
}

function field(document, name, nodes) {
  if (!nodes.length) return '';
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(` field:${name} `));
  nodes.forEach((n) => frag.appendChild(n));
  return frag;
}

function image(document, src, alt, title) {
  if (!src) return null;
  const img = document.createElement('img');
  img.setAttribute('src', src.trim());
  const a = clean(alt);
  img.setAttribute('alt', !a || PLACEHOLDER_ALT.test(a) ? title : a);
  return img;
}

function titleParagraph(document, title, href) {
  const p = document.createElement('p');
  if (href) {
    const a = document.createElement('a');
    a.setAttribute('href', href.trim());
    a.textContent = title;
    p.appendChild(a);
  } else {
    p.textContent = title;
  }
  return p;
}

export default function parse(element, { document }) {
  const rules = classRules(document);
  const rows = [];
  let panels = false;

  const panelWrapper = element.querySelector('.panel-wrapper') || (element.matches('.panel-wrapper') ? element : null);
  if (panelWrapper) {
    // Related Content: this row + the next sibling row (rest of the grid, with empty fillers)
    panels = true;
    const items = Array.from(element.querySelectorAll('.panel'));
    const next = element.nextElementSibling;
    if (next && next.matches('div.row') && next.querySelector('.panel-wrapper')
      && !next.hasAttribute('data-excat-block') && !next.querySelector('[data-excat-block]')) {
      items.push(...Array.from(next.querySelectorAll('.panel')));
      next.remove();
    }
    items.forEach((panel) => {
      const link = panel.querySelector('.panel-content a[href]') || panel.querySelector('a[href]');
      const title = clean((panel.querySelector('h1, h2, h3, h4, h5, h6') || link || panel).textContent);
      const src = panel.querySelector('img');
      if (!title && !src) return; // empty grid filler (div.panel-noborder)
      const img = src ? image(document, src.getAttribute('src'), src.getAttribute('alt'), title) : null;
      rows.push([
        img ? field(document, 'image', [img]) : '',
        field(document, 'text', title ? [titleParagraph(document, title, link && link.getAttribute('href'))] : []),
      ]);
    });
  } else {
    const cards = Array.from(element.querySelectorAll(':scope > a.card, :scope > .card'));
    cards.forEach((card) => {
      const href = card.tagName === 'A' ? card.getAttribute('href')
        : (card.querySelector('a[href]') && card.querySelector('a[href]').getAttribute('href'));
      const title = clean((card.querySelector('.text-container') || card.querySelector('h1, h2, h3, h4, h5, h6') || card).textContent);
      const box = card.querySelector('.card-image');
      const badge = card.querySelector('.badge-resources');
      const badgeText = badge ? clean(badge.textContent) : '';
      const srcImg = box && box.querySelector('img');
      const src = srcImg ? srcImg.getAttribute('src') : (backgroundUrl(box, rules) || backgroundUrl(card, rules));
      const img = image(document, src, srcImg && srcImg.getAttribute('alt'), title);
      const text = [];
      if (badgeText) {
        const p = document.createElement('p');
        p.textContent = badgeText;
        text.push(p);
      }
      if (title) text.push(titleParagraph(document, title, href));
      if (!img && !text.length) return;
      rows.push([img ? field(document, 'image', [img]) : '', field(document, 'text', text)]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: panels ? 'Cards (tiles, panels)' : 'Cards (tiles)',
    cells: rows.map((row) => ['cards-tiles-card', ...row]),
  });
  element.replaceWith(block);
}
