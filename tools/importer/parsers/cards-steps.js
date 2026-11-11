/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-steps. Base: cards (xwalk container; block model cards-steps: classes
 * (option "exchange"); child model cards-steps-item: image, imageAlt, text).
 * Source: https://www.beckman.com/cell-counters-and-analyzers/vi-cell-blu
 * Selectors (two instances):
 *  - div.sample-analysis-wf : 3 x div.step                       -> block "cards-steps"
 *  - div.carousel-plate     : 2 x div.step + div.arrows-container -> block
 *      "Cards Steps (exchange)" (the block draws the stacked → / ← arrows between the cards;
 *      the source arrow glyphs are not copied)
 * One row per div.step, 2 cells:
 *   cell 1 = <!-- field:image --> img (inline height style dropped, alt kept / step label)
 *   cell 2 = <!-- field:text -->  <p><strong>label</strong></p> (source h4 bar, e.g. FIRST STEP)
 *            + description <p>
 * Bar colours come from the item position in the block CSS.
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

export default function parse(element, { document }) {
  let steps = Array.from(element.querySelectorAll(':scope > .step'));
  if (!steps.length) steps = Array.from(element.querySelectorAll('.step'));
  const exchange = element.classList.contains('carousel-plate') || !!element.querySelector('.arrows-container');

  const cells = [];
  steps.forEach((step) => {
    const labelEl = step.querySelector('.step-name h1, .step-name h2, .step-name h3, .step-name h4, .step-name h5, .step-name h6')
      || step.querySelector('h1, h2, h3, h4, h5, h6');
    const label = labelEl ? clean(labelEl.textContent) : '';
    const img = step.querySelector('img');

    let imageCell = '';
    if (img) {
      const pic = document.createElement('img');
      pic.setAttribute('src', img.getAttribute('src'));
      pic.setAttribute('alt', clean(img.getAttribute('alt')) || label);
      imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(pic);
    }

    const parts = [];
    if (label) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = label;
      p.appendChild(strong);
      parts.push(p);
    }
    Array.from(step.querySelectorAll('p')).forEach((d) => {
      const value = clean(d.textContent);
      if (!value) return;
      const p = document.createElement('p');
      p.textContent = value;
      parts.push(p);
    });
    let textCell = '';
    if (parts.length) {
      textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      parts.forEach((p) => textCell.appendChild(p));
    }
    if (!imageCell && !textCell) return;
    cells.push([imageCell, textCell]);
  });

  const name = exchange ? 'Cards Steps (exchange)' : 'cards-steps';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
