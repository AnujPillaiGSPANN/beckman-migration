/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gradient. Base: cards (xwalk container; child model cards-gradient-item:
 * text (richtext)).
 * Source: https://www.beckman.com/cell-counters-and-analyzers/vi-cell-blu
 * Selector: div.viblue-cards
 * One row per div.viblue-card, one cell (<!-- field:text -->):
 *   <h3>title</h3> + description <p>(s) + <p><em><a href>label</a></em></p>
 *   (a.redbtn outline button -> emphasised link; inline styles dropped)
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

export default function parse(element, { document }) {
  let cards = Array.from(element.querySelectorAll(':scope > .viblue-card'));
  if (!cards.length) cards = Array.from(element.querySelectorAll('.viblue-card'));

  const cells = [];
  cards.forEach((card) => {
    const parts = [];
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading && clean(heading.textContent)) {
      const h = document.createElement('h3');
      h.textContent = clean(heading.textContent);
      parts.push(h);
    }
    Array.from(card.querySelectorAll('p')).forEach((p) => {
      if (!clean(p.textContent)) return;
      p.removeAttribute('style');
      parts.push(p);
    });
    const links = Array.from(card.querySelectorAll('a[href]'))
      .filter((a) => clean(a.textContent) && !a.closest('p') && !(heading && heading.contains(a)));
    links.forEach((link) => {
      const a = document.createElement('a');
      a.setAttribute('href', link.getAttribute('href').trim());
      a.textContent = clean(link.textContent);
      const em = document.createElement('em');
      em.appendChild(a);
      const p = document.createElement('p');
      p.appendChild(em);
      parts.push(p);
    });
    if (!parts.length) return;
    const cell = document.createDocumentFragment();
    cell.appendChild(document.createComment(' field:text '));
    parts.forEach((n) => cell.appendChild(n));
    cells.push([cell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gradient', cells });
  element.replaceWith(block);
}
