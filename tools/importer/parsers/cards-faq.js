/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-faq. Base: cards (xwalk container; child model cards-faq-card).
 * Source: https://www.beckman.com/air-particle-counters
 * Selector: div.bcls-aeo-faqs.container
 * The container also holds the default-content H2 ("FAQ on Air Particle Counters");
 * it is moved out and placed immediately before the block.
 * One row per div.bcls-aeo-faq, single cell (field:text): h6 question + answer paragraph(s).
 * Also used by product-detail (Cydem VT): empty <p> spacers and HTML comments are dropped.
 */
export default function parse(element, { document }) {
  // Preserve section heading(s) that are direct children as default content before the block
  const headings = Array.from(element.querySelectorAll(':scope > h1, :scope > h2, :scope > h3'));

  const faqs = Array.from(element.querySelectorAll(':scope > .bcls-aeo-faq'));
  const items = faqs.length ? faqs : Array.from(element.querySelectorAll('.bcls-aeo-faq'));

  const cells = [];
  items.forEach((faq) => {
    const parts = [];
    Array.from(faq.children).forEach((child) => {
      const tag = child.tagName;
      if (/^H[1-6]$/.test(tag)) {
        if (child.textContent.trim()) parts.push(child);
      } else if (['P', 'UL', 'OL', 'TABLE', 'BLOCKQUOTE'].includes(tag)) {
        if (child.textContent.replace(/ /g, ' ').trim()) parts.push(child);
      } else if (child.querySelector('p, ul, ol, a') && child.textContent.trim()) {
        parts.push(child);
      }
    });

    // drop HTML comments nested inside the kept nodes (e.g. Cydem VT "<!--Answer-->")
    parts.forEach((p) => {
      const walker = document.createTreeWalker(p, 128);
      const comments = [];
      while (walker.nextNode()) comments.push(walker.currentNode);
      comments.forEach((c) => c.remove());
      // inline styles (e.g. Vi-CELL BLU <p style="text-align: left;">) are not authored
      [p, ...p.querySelectorAll('[style]')].forEach((n) => n.removeAttribute('style'));
    });

    if (parts.length) {
      const cell = document.createDocumentFragment();
      cell.appendChild(document.createComment(' field:text '));
      parts.forEach((p) => cell.appendChild(p));
      cells.push([cell]);
    } else {
      cells.push(['']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards (faq)',
    // each row starts with its item component id (the converter picks the row model from it)
    cells: cells.map((row) => ['cards-faq-card', ...row]),
  });
  headings.forEach((h) => element.before(h));
  element.replaceWith(block);
}
