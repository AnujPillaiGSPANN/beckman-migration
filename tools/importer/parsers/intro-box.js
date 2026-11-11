/* eslint-disable */
/* global WebImporter */

/**
 * Parser for intro-box. Base: columns (xwalk block/v1/block + item model intro-box-row).
 * Source: https://www.beckman.com/air-particle-counters
 * Selector: div.product-heading-wrap > div.intro-container
 * Layout: 1 row, 2 cells.
 *   col1 (field:column1) = intro paragraphs from div.intro-text (inline links preserved)
 *   col2 (field:column2) = div.application-box h3 + ul
 */
/** Cell content prefixed with an xwalk field hint (empty string when there is no content). */
function fieldCell(document, field, nodes) {
  if (!nodes.length) return '';
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(` field:${field} `));
  nodes.forEach((n) => frag.appendChild(n));
  return frag;
}

export default function parse(element, { document }) {
  const introText = element.querySelector(':scope > .intro-text') || element.querySelector('.intro-text');
  const appBox = element.querySelector(':scope > .application-box') || element.querySelector('.application-box');

  const col1 = [];
  if (introText) {
    Array.from(introText.children).forEach((child) => {
      if (child.textContent.trim() || child.querySelector('img, picture')) col1.push(child);
    });
  }

  const col2 = [];
  if (appBox) {
    const heading = appBox.querySelector('h1, h2, h3, h4, h5, h6');
    const list = appBox.querySelector('ul, ol');
    if (heading) col2.push(heading);
    if (list) col2.push(list);
  }

  const cells = [[fieldCell(document, 'column1', col1), fieldCell(document, 'column2', col2)]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'intro-box', cells });
  element.replaceWith(block);
}
