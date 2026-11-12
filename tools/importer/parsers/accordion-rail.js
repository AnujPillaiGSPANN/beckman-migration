/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-rail -> block "Accordion (rail)" (blocks/accordion, variant rail; xwalk
 * container; child model accordion-rail-item: summary (richtext), text (richtext)).
 * Source: https://www.mybeckman.in/flow-cytometry/research-flow-cytometers/cytoflex/software
 * Selector: div.two-columns-holder__right > div.rail-navigation
 * Accordion convention: block name row, then one row per accordion item with 2 cells
 * (title cell, content cell), led by the item-id cell "accordion-rail-item". Here one row per
 * top-level <li> of the rail list:
 *   title cell   = <!-- field:summary --> <p><a href>parent label</a></p>
 *   content cell = <!-- field:text -->    <ul><li><a href>child label</a></li>…</ul>; left EMPTY
 *                  when the parent has no children (blocks/accordion/README.md, Accordion (rail): the block
 *                  then renders a plain link without a chevron)
 * The rail title (h3.rail-navigation__title) is moved before the block as default content.
 * The chevron <i> icons and li classes are dropped; the current page is detected by the block
 * at runtime (the source's li.active-nav link to the site root is re-pointed at the page itself
 * by beckman-cleanup before this runs).
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

function link(document, a) {
  const out = document.createElement('a');
  out.setAttribute('href', (a.getAttribute('href') || '').trim());
  out.textContent = clean(a.textContent);
  return out;
}

export default function parse(element, { document }) {
  const before = [];
  const title = element.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > h4, .rail-navigation__title');
  if (title && clean(title.textContent)) {
    const h = document.createElement(title.tagName.toLowerCase());
    h.textContent = clean(title.textContent);
    before.push(h);
  }

  const list = element.querySelector(':scope > ul') || element.querySelector('ul');
  const items = list ? Array.from(list.children).filter((li) => li.tagName === 'LI') : [];

  const cells = [];
  items.forEach((li) => {
    const parent = li.querySelector(':scope > a[href]');
    if (!parent || !clean(parent.textContent)) return;
    // title cell
    const titleCell = document.createDocumentFragment();
    titleCell.appendChild(document.createComment(' field:summary '));
    const p = document.createElement('p');
    p.appendChild(link(document, parent));
    titleCell.appendChild(p);

    // content cell (empty for a parent without children)
    const childLinks = Array.from(li.querySelectorAll(':scope > ul > li > a[href]'))
      .filter((a) => clean(a.textContent));
    let contentCell = '';
    if (childLinks.length) {
      contentCell = document.createDocumentFragment();
      contentCell.appendChild(document.createComment(' field:text '));
      const ul = document.createElement('ul');
      childLinks.forEach((a) => {
        const item = document.createElement('li');
        item.appendChild(link(document, a));
        ul.appendChild(item);
      });
      contentCell.appendChild(ul);
    }
    cells.push(['accordion-rail-item', titleCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Accordion (rail)', cells });
  before.forEach((n) => element.before(n));
  element.replaceWith(block);
}
