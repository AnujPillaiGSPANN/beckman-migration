/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-workflow. Base: cards (xwalk container; child model cards-workflow-item:
 * image, imageAlt, text).
 * Sources (same div.container-wf markup):
 *  - https://www.mybeckman.in/reagents/centrifugation/density-gradient-reagents
 *      numbered workflow: a.wf-step = div.step-no badge + <b>step name</b> + img + <p>product</p>
 *      -> block "Cards (workflow)" (the block numbers the badges from the row index)
 *  - https://www.beckman.com/cell-counters-and-analyzers/vi-cell-blu ("Integrations")
 *      a.wf-step = <b>integration name</b> + img, no number badges
 *      -> block "Cards (workflow, unnumbered)"
 * Selector: div.container-wf (density: div.bc-rich-text > div.container-wf)
 * One row per a.wf-step (div.line-arrow-container chevrons skipped; the block draws them):
 *   cell 1 = <!-- field:image --> img (empty alt -> product name, else step name)
 *   cell 2 = <!-- field:text -->  <p><strong>step name</strong></p> + <p><a href=step href>product</a></p>
 *            When the tile has no product label (vi-cell-blu), the name itself carries the
 *            link: <p><strong><a href>name</a></strong></p>.
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

export default function parse(element, { document }) {
  let steps = Array.from(element.querySelectorAll(':scope > a.wf-step, :scope > .wf-step'));
  if (!steps.length) steps = Array.from(element.querySelectorAll('.wf-step'));
  const numbered = steps.some((s) => s.querySelector('.step-no'));

  const cells = [];
  steps.forEach((step) => {
    const href = (step.getAttribute('href') || (step.querySelector('a[href]') && step.querySelector('a[href]').getAttribute('href')) || '').trim();
    const nameEl = step.querySelector('b, strong, h1, h2, h3, h4, h5, h6');
    const name = nameEl ? clean(nameEl.textContent) : '';
    const productEl = Array.from(step.querySelectorAll('p')).find((p) => clean(p.textContent) && !(nameEl && p.contains(nameEl)));
    const product = productEl ? clean(productEl.textContent) : '';
    const img = step.querySelector('img');

    let imageCell = '';
    if (img) {
      const pic = document.createElement('img');
      pic.setAttribute('src', img.getAttribute('src'));
      pic.setAttribute('alt', clean(img.getAttribute('alt')) || product || name);
      imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(pic);
    }

    const link = (label) => {
      if (!href) return document.createTextNode(label);
      const a = document.createElement('a');
      a.setAttribute('href', href);
      a.textContent = label;
      return a;
    };
    const parts = [];
    if (name) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.appendChild(product ? document.createTextNode(name) : link(name));
      p.appendChild(strong);
      parts.push(p);
    }
    if (product) {
      const p = document.createElement('p');
      p.appendChild(link(product));
      parts.push(p);
    }
    let textCell = '';
    if (parts.length) {
      textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      parts.forEach((p) => textCell.appendChild(p));
    }
    if (!imageCell && !textCell) return;
    cells.push([imageCell, textCell]);
  });

  const name = numbered ? 'Cards (workflow)' : 'Cards (workflow, unnumbered)';
  const block = WebImporter.Blocks.createBlock(document, {
    name,
    // each row starts with its item component id (the converter picks the row model from it)
    cells: cells.map((row) => ['cards-workflow-item', ...row]),
  });
  element.replaceWith(block);
}
