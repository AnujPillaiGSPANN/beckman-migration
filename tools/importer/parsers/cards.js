/* eslint-disable */
/* global WebImporter */
import cardsGradientParser from './cards-gradient.js';
import cardsProductParser from './cards-product.js';

/**
 * Family parser for cards (template landing-form-rail): detects the variant from the DOM and
 * delegates to the variant parser (whose output - block name, item id cell, field hints - is
 * kept as is). Source markup that the variant parser does not read directly is first rebuilt
 * into the markup it does read (an adapter container replaces the element; the delegate then
 * replaces the adapter with its block).
 *
 * Variants (migration-work/block-context/cards/variants.json):
 * - gradient (v_6f96e7ca3e0e, vi-cell-blu-or-cedex-hires): div.content-area > div.cards-row >
 *   a.card (badge-resources label, card-image img, text-container h4). -> cards-gradient.js
 *   ("Cards (gradient)", item cards-gradient-item, one richtext cell): each card becomes a
 *   div.viblue-card: h3 title, the image (in a <p>, kept in the richtext), the badge label
 *   paragraph and the card link as the outline button, labelled "View <badge>".
 *   div.viblue-cards (the delegate's own source) is passed through unchanged.
 * - product (v_9f11660cd5ed, straight-up pages): div.downloadsArea > div (linked cover image +
 *   a.btn "Download …"). -> cards-product.js ("Cards (product)", item cards-product-card,
 *   cells image | text): image, h3 title = the button label linked to its href.
 * - product (v_65c0325f97c4, straight-up pages): div.productCards > div.productCard (img,
 *   h3, div.productSpecs label column + value column, a.btn "Get More Info") -> cards-product.js:
 *   image, unlinked h3 title, the label column and the value column as two lists (shown side
 *   by side, like the source), the CTA as a link paragraph (rendered as a button).
 *   div.product-series-callouts (the delegate's own source) is passed through unchanged.
 * Anything else falls back to the gradient adapter when it holds a.card items, else to the
 * product adapter on its direct children.
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

function el(document, tag, cls) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
}

function textEl(document, tag, text) {
  const n = document.createElement(tag);
  n.textContent = text;
  return n;
}

/** a.card (badge, image, h4 title) -> div.viblue-card for cards-gradient.js. */
function gradientCard(document, card) {
  const out = el(document, 'div', 'viblue-card');
  const titleEl = card.querySelector('h1, h2, h3, h4, h5, h6, .text-container');
  const title = titleEl ? clean(titleEl.textContent) : '';
  const badgeEl = card.querySelector('.badge-resources');
  const badge = badgeEl ? clean(badgeEl.textContent) : '';
  if (title) out.appendChild(textEl(document, 'h3', title));
  // the gradient item is one rich text cell, and AEM rich text cannot hold an image: the cover
  // thumbnail is left out (as cards-gradient.js does); the badge label stays as a paragraph
  if (badge) out.appendChild(textEl(document, 'p', badge));
  const link = card.matches('a[href]') ? card : card.querySelector('a[href]');
  if (link) {
    const a = textEl(document, 'a', badge ? `View ${badge}` : 'Learn more');
    a.setAttribute('href', link.getAttribute('href'));
    out.appendChild(a);
  }
  return out;
}

/** A product card (image, title, link, specs) -> div.product-series-callouts__item. */
function productItem(document, { img, title, href, specs = [], tag = 'h3' }) {
  const item = el(document, 'div', 'product-series-callouts__item');
  if (img) {
    if (!clean(img.getAttribute('alt')) && title) img.setAttribute('alt', title);
    item.appendChild(img);
  }
  const desc = el(document, 'div', 'product-series-callouts__description');
  if (title) {
    const h = el(document, tag);
    if (href) {
      const a = textEl(document, 'a', title);
      a.setAttribute('href', href);
      h.appendChild(a);
    } else h.textContent = title;
    desc.appendChild(h);
  }
  if (specs.length) {
    const ul = el(document, 'ul');
    specs.forEach((s) => ul.appendChild(textEl(document, 'li', s)));
    desc.appendChild(ul);
  }
  item.appendChild(desc);
  return item;
}

/** div.downloadsArea > div: linked cover image + "Download …" button. */
function downloadItem(document, div) {
  const img = div.querySelector('img');
  const links = Array.from(div.querySelectorAll('a[href]'));
  const btn = links.find((a) => !a.querySelector('img') && clean(a.textContent));
  const imgLink = links.find((a) => a.querySelector('img'));
  const href = (btn || imgLink) ? (btn || imgLink).getAttribute('href') : '';
  const title = btn ? clean(btn.textContent) : clean(img && img.getAttribute('alt'));
  return productItem(document, { img, title, href });
}

/** A spec column (div > p…) -> ul, one li per paragraph; inline markup (e.g. <em>g</em>) kept. */
function specList(document, col) {
  const ul = el(document, 'ul');
  Array.from(col.querySelectorAll('p')).filter((p) => clean(p.textContent)).forEach((p) => {
    const li = el(document, 'li');
    li.innerHTML = p.innerHTML.replace(/&nbsp;| /g, ' ').trim();
    ul.appendChild(li);
  });
  return ul.children.length ? ul : null;
}

/**
 * div.productCard: image, h3 name, label / value spec columns, CTA ->
 * image | unlinked title, spec labels list, spec values list (the two source columns, laid out
 * side by side by the block CSS), "Get More Info" link paragraph (rendered as a button).
 */
function productCardItem(document, card) {
  const item = el(document, 'div', 'product-series-callouts__item');
  const img = card.querySelector('img');
  const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
  const title = heading ? clean(heading.textContent) : '';
  if (img) {
    if (!clean(img.getAttribute('alt')) && title) img.setAttribute('alt', title);
    item.appendChild(img);
  }
  const desc = el(document, 'div', 'product-series-callouts__description');
  if (title) desc.appendChild(textEl(document, heading.tagName.toLowerCase(), title));
  const specCols = Array.from(card.querySelectorAll('.productSpecs > div'));
  (specCols.length ? specCols : Array.from(card.querySelectorAll('.productSpecs'))).forEach((col) => {
    const ul = specList(document, col);
    if (ul) desc.appendChild(ul);
  });
  const cta = Array.from(card.querySelectorAll('a[href]')).find((a) => clean(a.textContent));
  if (cta) {
    const p = el(document, 'p');
    const a = textEl(document, 'a', clean(cta.textContent));
    a.setAttribute('href', cta.getAttribute('href'));
    p.appendChild(a);
    desc.appendChild(p);
  }
  item.appendChild(desc);
  return item;
}

/** Replace the element with an adapter container, then let the delegate replace that. */
function delegate(element, adapter, parser, ctx) {
  element.replaceWith(adapter);
  parser(adapter, ctx);
}

/**
 * Template homepage (www.mybeckman.in home, Tailwind markup), new branches detected from the DOM
 * (the paths below are unchanged). Item id cell first in every row, like the variant parsers:
 * - resource, option insights ("Fresh insights", #latest > div.grid > a.group: image, red
 *   category p, description p) -> "Cards (resource, insights)", rows cards-resource-card |
 *   image | text: category paragraph + description paragraph linked to the card's href
 *   (line breaks kept).
 * - tiles, option side ("Popular topics", div.gradient-section-background > #topics: h2 + p
 *   on the left, grid of a tiles with a "->" arrow) -> the h2 and subline as default content
 *   before "Cards (tiles, side)", rows cards-tiles-card | (no image) | <p><a>title</a></p>.
 * - icons, option side ("Service & technical support", #service: eyebrow p, h2, p, "Service ->"
 *   link on the left; grid of a cards with an inline SVG icon, h3, p, "->") -> the intro as
 *   default content (link without its arrow) before "Cards (icons, side)", rows cards-icon-card
 *   | (no image) | text: icon paragraph (icon notation ":user-plus:" etc.: the inline SVG glyphs
 *   are project icons, /icons/*.svg, rendered as <span class="icon">), bold linked title,
 *   description.
 */
const SERVICE_ICONS = [
  ['M6.25 6.375', 'user-plus'],
  ['M12 6.75a5.25', 'wrench-screwdriver'],
  ['M9.315 7.584', 'rocket-launch'],
  ['M17.303 5.197', 'cursor-arrow-ripple'],
];

function fieldFrag(document, name, nodes) {
  if (!nodes.length) return '';
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(` field:${name} `));
  nodes.forEach((n) => frag.appendChild(n));
  return frag;
}

/** Link text without a trailing "->" arrow. */
function arrowless(text) {
  return clean(text).replace(/\s*(->|→)$/, '');
}

/** Paragraph copy keeping <br> line breaks (text only). */
function linesParagraph(document, source, href) {
  const p = el(document, 'p');
  const target = href ? textEl(document, 'a', '') : p;
  if (href) target.setAttribute('href', href);
  const lines = [];
  let line = '';
  const walk = (node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) line += n.textContent;
      else if (n.nodeType === 1 && n.tagName === 'BR') { lines.push(line); line = ''; } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(source);
  lines.push(line);
  lines.map(clean).filter(Boolean).forEach((t, i) => {
    if (i) target.appendChild(el(document, 'br'));
    target.appendChild(document.createTextNode(t));
  });
  if (href) p.appendChild(target);
  return p;
}

function insightsCards(element, document) {
  const rows = [];
  Array.from(element.querySelectorAll(':scope > a')).forEach((card) => {
    const img = card.querySelector('img');
    const paras = Array.from(card.querySelectorAll(':scope > p')).filter((p) => clean(p.textContent));
    const label = paras[0] ? clean(paras[0].textContent) : '';
    const text = [];
    if (label) text.push(textEl(document, 'p', label));
    if (paras[1]) text.push(linesParagraph(document, paras[1], card.getAttribute('href')));
    let image = '';
    if (img) {
      const copy = el(document, 'img');
      copy.setAttribute('src', img.getAttribute('src'));
      copy.setAttribute('alt', clean(img.getAttribute('alt')) || label);
      image = fieldFrag(document, 'image', [copy]);
    }
    if (!image && !text.length) return;
    rows.push(['cards-resource-card', image, fieldFrag(document, 'text', text)]);
  });
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'Cards (resource, insights)', cells: rows }));
}

/** Intro column (eyebrow / heading / text / link) -> default content nodes. */
function introNodes(document, intro) {
  const out = [];
  Array.from(intro.children).forEach((child) => {
    const value = clean(child.textContent);
    if (!value) return;
    if (/^H[1-6]$/.test(child.tagName)) {
      out.push(textEl(document, 'h2', value));
    } else if (child.tagName === 'A' && child.getAttribute('href')) {
      const p = el(document, 'p');
      const a = textEl(document, 'a', arrowless(child.textContent));
      a.setAttribute('href', child.getAttribute('href'));
      p.appendChild(a);
      out.push(p);
    } else {
      out.push(textEl(document, 'p', value));
    }
  });
  return out;
}

function sideTiles(element, document) {
  const root = element.querySelector('#topics') || element;
  const grid = Array.from(root.children).find((c) => c.querySelector(':scope > a[href]'));
  const intro = Array.from(root.children).find((c) => c !== grid && c.querySelector('h1, h2, h3'));
  const rows = [];
  Array.from(grid.querySelectorAll(':scope > a[href]')).forEach((tile) => {
    const titleEl = tile.querySelector(':scope > div') || tile;
    const title = clean(titleEl.textContent);
    if (!title) return;
    const p = el(document, 'p');
    const a = textEl(document, 'a', title);
    a.setAttribute('href', tile.getAttribute('href'));
    p.appendChild(a);
    rows.push(['cards-tiles-card', '', fieldFrag(document, 'text', [p])]);
  });
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards (tiles, side)', cells: rows });
  element.replaceWith(...(intro ? introNodes(document, intro) : []), block);
}

function iconName(svg) {
  const d = svg && svg.querySelector('path') ? svg.querySelector('path').getAttribute('d') || '' : '';
  const hit = SERVICE_ICONS.find(([prefix]) => d.startsWith(prefix));
  return hit ? hit[1] : '';
}

function sideIcons(element, document) {
  const root = Array.from(element.querySelectorAll('div')).find((d) => d.children.length >= 2
    && Array.from(d.children).some((c) => c.querySelector(':scope > a[href] svg'))) || element;
  const grid = Array.from(root.children).find((c) => c.querySelector(':scope > a[href] svg'));
  const intro = Array.from(root.children).find((c) => c !== grid && c.querySelector('h1, h2, h3'));
  const rows = [];
  Array.from(grid.querySelectorAll(':scope > a[href]')).forEach((card) => {
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    const title = heading ? clean(heading.textContent) : '';
    const text = [];
    const icon = iconName(card.querySelector('svg'));
    if (icon) {
      text.push(textEl(document, 'p', `:${icon}:`));
    }
    if (title) {
      const p = el(document, 'p');
      const strong = el(document, 'strong');
      const a = textEl(document, 'a', title);
      a.setAttribute('href', card.getAttribute('href'));
      strong.appendChild(a);
      p.appendChild(strong);
      text.push(p);
    }
    Array.from(card.querySelectorAll('p')).forEach((d) => {
      if (clean(d.textContent)) text.push(textEl(document, 'p', clean(d.textContent)));
    });
    if (!text.length) return;
    rows.push(['cards-icon-card', '', fieldFrag(document, 'text', text)]);
  });
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards (icons, side)', cells: rows });
  element.replaceWith(...(intro ? introNodes(document, intro) : []), block);
}

export default function parse(element, { document, params }) {
  const ctx = { document, params };

  // template homepage (Tailwind markup)
  if (element.matches('.grid') && element.querySelector(':scope > a.group img') && element.closest('#latest')) {
    insightsCards(element, document);
    return;
  }
  if (element.matches('.gradient-section-background') || element.querySelector(':scope > #topics')) {
    sideTiles(element, document);
    return;
  }
  if (element.id === 'service' && element.querySelector('a[href] svg')) {
    sideIcons(element, document);
    return;
  }

  // delegates' own source markup
  if (element.matches('.viblue-cards') || element.querySelector('.viblue-card')) {
    cardsGradientParser(element, ctx);
    return;
  }
  if (element.querySelector('.product-series-callouts__item')) {
    cardsProductParser(element, ctx);
    return;
  }

  // product: div.productCards > div.productCard
  const productCards = Array.from(element.querySelectorAll('.productCard'));
  if (productCards.length) {
    const adapter = el(document, 'div', 'product-series-callouts');
    productCards.forEach((card) => adapter.appendChild(productCardItem(document, card)));
    delegate(element, adapter, cardsProductParser, ctx);
    return;
  }

  // product: div.downloadsArea > div (cover image + download button)
  const area = element.matches('.downloadsArea') ? element : element.querySelector('.downloadsArea');
  if (area) {
    const adapter = el(document, 'div', 'product-series-callouts');
    Array.from(area.children)
      .filter((d) => d.querySelector('img') || d.querySelector('a[href]'))
      .forEach((d) => adapter.appendChild(downloadItem(document, d)));
    delegate(element, adapter, cardsProductParser, ctx);
    return;
  }

  // gradient: div.cards-row > a.card (and fallback: any a.card / div.card items)
  let cards = Array.from(element.querySelectorAll('.cards-row > .card'));
  if (!cards.length) cards = Array.from(element.querySelectorAll('a.card, div.card'));
  if (cards.length) {
    const adapter = el(document, 'div', 'viblue-cards');
    cards.forEach((card) => adapter.appendChild(gradientCard(document, card)));
    delegate(element, adapter, cardsGradientParser, ctx);
    return;
  }

  // fallback: each direct child with content becomes a product card
  const adapter = el(document, 'div', 'product-series-callouts');
  Array.from(element.children)
    .filter((c) => clean(c.textContent) || c.querySelector('img'))
    .forEach((c) => {
      const heading = c.querySelector('h1, h2, h3, h4, h5, h6');
      const link = c.querySelector('a[href]');
      adapter.appendChild(productItem(document, {
        img: c.querySelector('img'),
        title: heading ? clean(heading.textContent) : clean(link && link.textContent),
        href: link ? link.getAttribute('href') : '',
      }));
    });
  delegate(element, adapter, cardsProductParser, ctx);
}
