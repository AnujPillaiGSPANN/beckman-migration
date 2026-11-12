/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq -> block "Accordion (faq)" (blocks/accordion, variant faq; xwalk
 * container; child model accordion-faq-item: summary (text), text (richtext)).
 * Source: https://www.beckman.com/liquid-handlers/echo-acoustic
 * Selector: div.two-columns-holder holding two columns of .yagi-accordion .accordion-item
 * One row per .accordion-item in document order (left column first, then right; the block
 * puts the first half of the rows in the left column again), item-id cell "accordion-faq-item"
 * + 2 cells:
 *   cell 1 = <!-- field:summary --> question text (button.accordion-header p; plus/minus
 *            SVG icons dropped)
 *   cell 2 = <!-- field:text -->    answer paragraphs / lists from .accordion-content
 *            (inline links kept, style attributes and HTML comments dropped)
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

function tidy(document, root) {
  const walker = document.createTreeWalker(root, 128);
  const comments = [];
  while (walker.nextNode()) comments.push(walker.currentNode);
  comments.forEach((c) => c.remove());
  root.querySelectorAll('svg, script, style, button').forEach((n) => n.remove());
  root.querySelectorAll('[style]').forEach((n) => n.removeAttribute('style'));
  root.querySelectorAll('span').forEach((s) => s.replaceWith(...Array.from(s.childNodes)));
}

export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll('.accordion-item'));

  const cells = [];
  items.forEach((item) => {
    const header = item.querySelector('.accordion-header') || item.querySelector('button');
    const qEl = header ? (header.querySelector('p, span, h1, h2, h3, h4, h5, h6') || header) : null;
    const question = qEl ? clean(qEl.textContent) : '';

    const panel = item.querySelector('.accordion-content');
    const answer = [];
    if (panel) {
      tidy(document, panel);
      let pending = null;
      const flush = () => { if (pending && clean(pending.textContent)) answer.push(pending); pending = null; };
      Array.from(panel.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          if (!clean(n.textContent)) return;
          if (!pending) pending = document.createElement('p');
          pending.appendChild(n);
          return;
        }
        if (n.nodeType !== 1) return;
        if (['P', 'UL', 'OL', 'TABLE', 'BLOCKQUOTE', 'H3', 'H4', 'H5', 'H6'].includes(n.tagName)) {
          flush();
          if (clean(n.textContent)) answer.push(n);
          return;
        }
        if (n.tagName === 'DIV') {
          flush();
          Array.from(n.children).forEach((c) => { if (clean(c.textContent)) answer.push(c); });
          return;
        }
        if (n.tagName === 'BR') { flush(); return; }
        if (!pending) pending = document.createElement('p');
        pending.appendChild(n);
      });
      flush();
    }
    if (!question && !answer.length) return;

    let qCell = '';
    if (question) {
      qCell = document.createDocumentFragment();
      qCell.appendChild(document.createComment(' field:summary '));
      qCell.appendChild(document.createTextNode(question));
    }
    let aCell = '';
    if (answer.length) {
      aCell = document.createDocumentFragment();
      aCell.appendChild(document.createComment(' field:text '));
      answer.forEach((n) => aCell.appendChild(n));
    }
    cells.push(['accordion-faq-item', qCell, aCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Accordion (faq)', cells });
  element.replaceWith(block);
}
