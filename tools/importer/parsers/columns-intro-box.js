/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-intro-box. Base: columns (xwalk; Columns blocks take no field hints).
 * Source: https://www.beckman.com/air-particle-counters
 * Selector: div.product-heading-wrap > div.intro-container
 * Layout: 1 row, 2 cells.
 *   col1 = intro paragraphs from div.intro-text (inline links preserved)
 *   col2 = div.application-box h3 + ul
 */
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

  const cells = [[col1.length ? col1 : '', col2.length ? col2 : '']];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-intro-box', cells });
  element.replaceWith(block);
}
