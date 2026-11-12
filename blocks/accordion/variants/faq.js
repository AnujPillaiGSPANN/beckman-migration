import { moveInstrumentation } from '../../../scripts/scripts.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
let idCounter = 0;

// plus / minus outline icons (source: two inline 24x24 SVGs in the source header button)
function createIcon() {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', 'accordion-faq-icon');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  [['accordion-faq-icon-vertical', 'M12 6v12'], ['accordion-faq-icon-horizontal', 'M18 12H6']]
    .forEach(([cls, d]) => {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('class', cls);
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      svg.append(path);
    });
  return svg;
}

function setOpen(item, open) {
  const header = item.querySelector('.accordion-faq-header');
  const panel = item.querySelector('.accordion-faq-panel');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  header.setAttribute('aria-expanded', String(open));

  if (reduceMotion) {
    item.classList.toggle('accordion-faq-open', open);
    panel.style.height = open ? 'auto' : '';
    return;
  }

  // animate the height between 0 and the content height (auto is not animatable: pin the
  // start value and force a reflow first), then release it to auto on transitionend
  panel.style.height = `${open ? 0 : panel.scrollHeight}px`;
  panel.getBoundingClientRect();
  item.classList.toggle('accordion-faq-open', open);
  const target = open ? panel.scrollHeight : 0;
  panel.style.height = `${target}px`;
  // nothing to animate (empty answer): settle immediately
  if (open && !target) panel.style.height = 'auto';
}

function buildItem(row) {
  idCounter += 1;
  const [labelCell, bodyCell] = [...row.children];
  const item = document.createElement('div');
  item.className = 'accordion-faq-item';
  moveInstrumentation(row, item);

  const header = document.createElement('button');
  header.type = 'button';
  header.className = 'accordion-faq-header';
  header.id = `accordion-faq-header-${idCounter}`;
  header.setAttribute('aria-expanded', 'false');

  const label = document.createElement('span');
  label.className = 'accordion-faq-label';
  if (labelCell) {
    moveInstrumentation(labelCell, label);
    const paragraphs = labelCell.querySelectorAll(':scope > p, :scope > :is(h2, h3, h4, h5, h6)');
    if (paragraphs.length) {
      paragraphs.forEach((p, i) => {
        if (i) label.append(' ');
        if (!i) moveInstrumentation(p, label);
        label.append(...p.childNodes);
      });
    } else {
      label.append(...labelCell.childNodes);
    }
    // source titles carry &nbsp; between words: let them wrap
    const walker = document.createTreeWalker(label, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      walker.currentNode.textContent = walker.currentNode.textContent.replace(/\u00a0/g, ' ');
    }
  }
  header.append(createIcon(), label);

  const panel = document.createElement('div');
  panel.className = 'accordion-faq-panel';
  panel.id = `accordion-faq-panel-${idCounter}`;
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', header.id);
  header.setAttribute('aria-controls', panel.id);

  const content = document.createElement('div');
  content.className = 'accordion-faq-content';
  if (bodyCell) {
    moveInstrumentation(bodyCell, content);
    content.append(...bodyCell.childNodes);
  }
  // answer links stay inline links, not buttons
  content.querySelectorAll('a.button').forEach((a) => a.classList.remove('button', 'primary', 'secondary'));
  content.querySelectorAll('.button-container').forEach((p) => p.classList.remove('button-container'));
  // reference footnotes start with their <sup> number (source p style="font-size: 75%")
  content.querySelectorAll('p').forEach((p) => {
    const first = [...p.childNodes]
      .find((n) => n.nodeType !== Node.TEXT_NODE || n.textContent.trim());
    if (first?.nodeName === 'SUP') p.classList.add('accordion-faq-footnote');
  });
  panel.append(content);

  panel.addEventListener('transitionend', (e) => {
    if (e.target !== panel || e.propertyName !== 'height') return;
    if (item.classList.contains('accordion-faq-open')) panel.style.height = 'auto';
    else panel.style.height = '';
  });
  header.addEventListener('click', () => {
    setOpen(item, header.getAttribute('aria-expanded') !== 'true');
  });

  item.append(header, panel);
  return item;
}

/**
 * Accordion (faq): grey question bars in two columns (first half left), plus icon
 * on the left that turns into a minus; each item toggles independently with an
 * animated height.
 * Row cells: [question text] [answer rich text].
 * @param {Element} block
 */
export default function decorate(block) {
  const items = [...block.children].map((row) => buildItem(row));
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)]
    .filter((group) => group.length)
    .map((group) => {
      const col = document.createElement('div');
      col.className = 'accordion-faq-column';
      col.append(...group);
      return col;
    });
  block.replaceChildren(...columns);
}
