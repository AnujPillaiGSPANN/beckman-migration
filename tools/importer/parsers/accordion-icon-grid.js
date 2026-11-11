/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-icon-grid. Base: accordion (xwalk container; child model
 * accordion-icon-grid-item: label_image, label_imageAlt, label_summary, content_text).
 * Source: https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations
 * Selector: #Benefits + div   (div.row of 4 x .col-md-3 > .yagi-accordion .accordion-item)
 * One row per .accordion-item, 2 cells:
 *   cell 1 (label group) = <!-- field:label_image --> icon img (p.icon img)
 *                          <!-- field:label_summary --> title text (p.font-bold)
 *   cell 2 (content group) = <!-- field:content_text --> bulleted list from [class*=accordion-content]
 * The two chevron images/SVGs in the header button and empty nested lists are dropped.
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();
const isChevron = (img) => /^data:image\/svg/i.test(img.getAttribute('src') || '') || /chevron|arrow/i.test(img.getAttribute('class') || '');

function pruneEmptyLists(root) {
  Array.from(root.querySelectorAll('ul, ol')).reverse().forEach((list) => {
    if (!clean(list.textContent)) list.remove();
  });
  Array.from(root.querySelectorAll('li')).forEach((li) => {
    if (!clean(li.textContent) && !li.querySelector('img')) li.remove();
  });
}

export default function parse(element, { document }) {
  let items = Array.from(element.querySelectorAll('.accordion-item'));
  if (!items.length) items = Array.from(element.querySelectorAll(':scope > [class*="col-"]'));

  const cells = [];
  items.forEach((item) => {
    const header = item.querySelector('.accordion-header') || item;

    // icon: first non-chevron image in the header
    const icon = Array.from(header.querySelectorAll('img')).find((img) => !isChevron(img));
    const titleEl = header.querySelector('p.font-bold') || Array.from(header.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6'))
      .find((el) => clean(el.textContent));
    const title = titleEl ? clean(titleEl.textContent) : clean(header.textContent);

    const label = document.createDocumentFragment();
    let hasLabel = false;
    if (icon) {
      label.appendChild(document.createComment(' field:label_image '));
      label.appendChild(icon);
      hasLabel = true;
    }
    if (title) {
      label.appendChild(document.createComment(' field:label_summary '));
      const p = document.createElement('p');
      p.textContent = title;
      label.appendChild(p);
      hasLabel = true;
    }

    // content: lists / paragraphs from the collapsible panel
    const panel = item.querySelector('[class*="accordion-content"]')
      || Array.from(item.children).find((c) => c !== header);
    const content = document.createDocumentFragment();
    let hasContent = false;
    if (panel) {
      pruneEmptyLists(panel);
      const nodes = Array.from(panel.children).filter((c) => clean(c.textContent) || c.querySelector('img'));
      // inline styles in the panel copy are not authored (Echo footnotes: <p style="font-size: 75%">)
      nodes.forEach((n) => [n, ...n.querySelectorAll('[style]')].forEach((s) => s.removeAttribute('style')));
      if (nodes.length) {
        content.appendChild(document.createComment(' field:content_text '));
        nodes.forEach((n) => content.appendChild(n));
        hasContent = true;
      }
    }

    cells.push([hasLabel ? label : '', hasContent ? content : '']);
  });

  // Echo: the element is the div.containercustom that also holds the section heading
  // ("Echo Acoustic Liquid Handler Benefits"): keep it as default content before the block
  const before = Array.from(element.querySelectorAll(':scope > h1, :scope > h2, :scope > h3'))
    .filter((h) => clean(h.textContent));
  before.forEach((h) => h.removeAttribute('style'));

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-icon-grid', cells });
  before.forEach((h) => element.before(h));
  element.replaceWith(block);
}
