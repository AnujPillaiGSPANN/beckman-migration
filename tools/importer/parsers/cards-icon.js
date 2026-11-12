/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-icon. Base: cards (xwalk container; child model cards-icon-card:
 * image, imageAlt, text).
 * Source: https://www.beckman.com/cell-culture-workstation/cydem-vt
 * Selector: div.spotlight-content-wrapper > div.bc-rich-text > div.row:has(> div.col-sm-3)
 * One row per div.col-sm-3 tile:
 *   cell 1 = <!-- field:image --> icon img from the first <p> (empty alt -> tile title)
 *   cell 2 = <!-- field:text -->  <p><strong>title</strong></p> + description <p>
 *            (inline markup such as <sub>2</sub> and <br> kept)
 * Tiles whose titles are all plain paragraphs (Density Gradient Reagents "Applications")
 * emit "Cards (icons, compact)"; the others "Cards (icons)".
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();

export default function parse(element, { document }) {
  let tiles = Array.from(element.querySelectorAll(':scope > [class*="col-"]'));
  if (!tiles.length) tiles = Array.from(element.querySelectorAll('.col-sm-3'));

  const cells = [];
  let plainTitles = 0;
  tiles.forEach((tile) => {
    const img = tile.querySelector('img');
    let titleEl = Array.from(tile.querySelectorAll('strong, b, h1, h2, h3, h4, h5, h6'))
      .find((el) => clean(el.textContent));
    // Density Gradient Reagents: the title is a plain (inline-styled) first text paragraph;
    // it becomes the bold title and its inline styles / edge whitespace are dropped
    const plainTitle = !titleEl;
    if (plainTitle) {
      plainTitles += 1;
      titleEl = Array.from(tile.children).find((c) => clean(c.textContent) && !c.querySelector('img')) || null;
    }
    const title = titleEl ? clean(titleEl.textContent) : '';

    let imageCell = '';
    if (img) {
      if (!clean(img.getAttribute('alt')) && title) img.setAttribute('alt', title);
      imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(img);
    }

    const parts = [];
    if (title) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = title;
      p.appendChild(strong);
      parts.push(p);
    }
    const titleBlock = titleEl ? titleEl.closest('p, h1, h2, h3, h4, h5, h6') : null;
    Array.from(tile.children).forEach((child) => {
      if (child === titleBlock || (titleBlock && child.contains(titleBlock))) return;
      if (!clean(child.textContent)) return; // image-only / empty paragraphs
      if (child.tagName === 'P' || child.tagName === 'UL' || child.tagName === 'OL') {
        parts.push(child);
      } else {
        const p = document.createElement('p');
        Array.from(child.childNodes).forEach((n) => p.appendChild(n));
        parts.push(p);
      }
    });

    if (plainTitle) {
      parts.forEach((p) => {
        [p, ...p.querySelectorAll('[style]')].forEach((n) => n.removeAttribute('style'));
        if (p.firstChild && p.firstChild.nodeType === 3) p.firstChild.textContent = p.firstChild.textContent.replace(/^\s+/, '');
        if (p.lastChild && p.lastChild.nodeType === 3) p.lastChild.textContent = p.lastChild.textContent.replace(/\s+$/, '');
      });
    }

    let textCell = '';
    if (parts.length) {
      textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      parts.forEach((p) => textCell.appendChild(p));
    }
    cells.push([imageCell, textCell]);
  });

  // Density Gradient Reagents layout (plain title paragraphs, 100px icons, 13px descriptions)
  // -> option "compact"; Cydem VT's bold-title tiles keep the default
  const compact = tiles.length > 0 && plainTitles === tiles.length;
  const block = WebImporter.Blocks.createBlock(document, {
    name: compact ? 'Cards (icons, compact)' : 'Cards (icons)',
    // each row starts with its item component id (the converter picks the row model from it)
    cells: cells.map((row) => ['cards-icon-card', ...row]),
  });
  element.replaceWith(block);
}
