/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-resource. Base: cards (xwalk container; child model cards-resource-card:
 * image, imageAlt, text).
 * Source: https://www.beckman.com/cell-culture-workstation/cydem-vt
 * Selector: div.spotlight-content-wrapper > div.bc-rich-text:has(> div.row > div.col-md-3)
 * The 3 source div.row containers are flattened into one row per div.col-md-3 card (9):
 *   cell 1 = <!-- field:image --> cover img.resources (empty alt -> card title)
 *   cell 2 = <!-- field:text -->  <p><strong>title</strong></p> + <p><em><a>Read</a></em></p>
 *            (a.redbtn outline button -> emphasised link)
 * Empty <a> to .ashx assets and &nbsp; text are dropped. The "Resources" heading that
 * sits inside the container (outside the cards) is moved before the block.
 * Also product-detail pages:
 *  - MET ONE 6000: div.download-res > div = one card (img above the h4 title + "Download
 *    Application Note" link) -> one row; the h4 stays in the card as the bold title
 *  - Density Gradient Reagents: 3 instances, each a div.row of col-md-6 / col-md-4 cards
 *    (2 / 3 / 2); <br> in the strong title collapsed, image links (one points at an
 *    unrelated asset) dropped, the redbtn label ("Download", "Read", "Download ↓") kept;
 *    multi-line alts / alts with escaped <br /> cleaned.
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();

export default function parse(element, { document }) {
  let cards = Array.from(element.querySelectorAll(':scope > .row > [class*="col-"]'));
  // density: the element is the div.row itself (col-md-6 / col-md-4 cards)
  if (!cards.length) cards = Array.from(element.querySelectorAll(':scope > [class*="col-"]'));
  if (!cards.length) cards = Array.from(element.querySelectorAll('.col-md-3'));
  // MET ONE 6000: the element is a single card (div.download-res > div: img + h4 + link)
  if (!cards.length && element.querySelector('img')) cards = [element];

  // default content inside the container but outside the cards
  const before = [];
  Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6')).forEach((h) => {
    if (cards.some((c) => c.contains(h))) return;
    if (!h.closest('[class*="col-"]') && clean(h.textContent)) before.push(h);
  });

  const cells = [];
  cards.forEach((card) => {
    const titleEl = Array.from(card.querySelectorAll('strong, b, h1, h2, h3, h4, h5, h6'))
      .find((el) => clean(el.textContent) && !el.closest('a'));
    const title = titleEl ? clean(titleEl.textContent) : '';

    const img = card.querySelector('img');
    let imageCell = '';
    if (img) {
      const alt = img.getAttribute('alt') || '';
      if (!clean(alt) && title) img.setAttribute('alt', title);
      // multi-line alts / alts with escaped markup (density: "Using <br />\nthe OptiMATE ...")
      else if (/[<\n\r]/.test(alt)) img.setAttribute('alt', clean(alt.replace(/<br\s*\/?>/gi, ' ')));
      imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);
    }

    // "Read" action: a text link (not the image link, not an empty .ashx anchor)
    const actions = Array.from(card.querySelectorAll('a[href]'))
      .filter((a) => clean(a.textContent) && !(titleEl && titleEl.contains(a)));

    const parts = [];
    if (title) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = title;
      p.appendChild(strong);
      parts.push(p);
    }
    // any further descriptive text in the card
    Array.from(card.querySelectorAll(':scope > p')).forEach((p) => {
      if (titleEl && p.contains(titleEl)) return;
      if (p.querySelector('a') && clean(p.textContent) === clean(p.querySelector('a').textContent)) return;
      if (clean(p.textContent)) parts.push(p);
    });
    actions.forEach((a) => {
      const link = document.createElement('a');
      link.setAttribute('href', a.getAttribute('href'));
      link.textContent = clean(a.textContent);
      const em = document.createElement('em');
      em.appendChild(link);
      const p = document.createElement('p');
      p.appendChild(em);
      parts.push(p);
    });

    let textCell = '';
    if (parts.length) {
      textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      parts.forEach((p) => textCell.appendChild(p));
    }
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-resource', cells });
  before.forEach((h) => element.before(h));
  element.replaceWith(block);
}
