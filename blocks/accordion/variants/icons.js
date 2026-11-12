import { moveInstrumentation } from '../../../scripts/scripts.js';

let uid = 0;

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Opens or closes one tile, animating the panel's max-height like the source
 * (.transition-maxheight.duration-500.ease-out).
 * @param {Element} item tile
 * @param {boolean} open
 */
function setOpen(item, open) {
  const button = item.querySelector('.accordion-icon-grid-toggle');
  const panel = item.querySelector('.accordion-icon-grid-panel');
  if (item.classList.contains('accordion-icon-grid-open') === open) return;
  button.setAttribute('aria-expanded', String(open));
  item.classList.toggle('accordion-icon-grid-open', open);

  if (reduceMotion()) {
    panel.hidden = !open;
    panel.style.maxHeight = open ? 'none' : '0px';
    return;
  }
  if (open) {
    panel.hidden = false;
    panel.style.maxHeight = '0px';
    // render the collapsed state first, otherwise leaving display:none skips the transition
    panel.getBoundingClientRect();
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  } else {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    // flush the start value so the collapse animates
    panel.getBoundingClientRect();
    panel.style.maxHeight = '0px';
  }
}

/**
 * Tiles per row, sized by the tile count like the source grids:
 * 4 tiles -> .col-md-3.col-sm-6 (Biomek), 6 tiles -> .col-md-4 (Echo).
 * @param {number} count
 * @returns {number}
 */
function tilesPerRow(count) {
  if (count % 4 === 0) return 4;
  if (count % 3 === 0) return 3;
  return Math.min(count, 4) || 1;
}

/**
 * Accordion (icon-grid): rows of icon tiles that reveal their bullet lists.
 * Like the source (each .row shares one .accordion-content-N class), clicking a
 * tile opens or closes every tile of its row together.
 * Row cells: [icon image + title] [content (bulleted list)].
 * @param {Element} block
 */
export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'accordion-icon-grid-items';

  [...block.children].forEach((row) => {
    uid += 1;
    const [label, body] = row.children;
    const item = document.createElement('li');
    item.className = 'accordion-icon-grid-item';
    moveInstrumentation(row, item);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'accordion-icon-grid-toggle';
    button.id = `accordion-icon-grid-toggle-${uid}`;
    button.setAttribute('aria-expanded', 'false');

    const icon = label?.querySelector('picture');
    if (icon) {
      const iconWrap = document.createElement('span');
      iconWrap.className = 'accordion-icon-grid-icon';
      iconWrap.append(icon);
      icon.querySelector('img')?.setAttribute('alt', '');
      button.append(iconWrap);
    }
    const title = document.createElement('span');
    title.className = 'accordion-icon-grid-title';
    title.textContent = label?.textContent.trim() || '';
    const chevron = document.createElement('span');
    chevron.className = 'accordion-icon-grid-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    button.append(title, chevron);

    const panel = document.createElement('div');
    panel.className = 'accordion-icon-grid-panel';
    panel.id = `accordion-icon-grid-panel-${uid}`;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', button.id);
    panel.hidden = true;
    panel.style.maxHeight = '0px';
    if (body) {
      moveInstrumentation(body, panel);
      panel.append(...body.childNodes);
    }
    // drop empty nested lists left over from the source
    panel.querySelectorAll('ul, ol').forEach((ul) => { if (!ul.textContent.trim()) ul.remove(); });
    // reference footnotes start with their <sup> number (source p style="font-size: 75%")
    panel.querySelectorAll('p').forEach((p) => {
      const first = [...p.childNodes]
        .find((n) => n.nodeType !== Node.TEXT_NODE || n.textContent.trim());
      if (first?.nodeName === 'SUP') p.classList.add('accordion-icon-grid-footnote');
    });
    button.setAttribute('aria-controls', panel.id);

    panel.addEventListener('transitionend', (e) => {
      if (e.target !== panel || e.propertyName !== 'max-height') return;
      if (item.classList.contains('accordion-icon-grid-open')) panel.style.maxHeight = 'none';
      else panel.hidden = true;
    });

    item.append(button, panel);
    list.append(item);
  });

  const items = [...list.children];
  const perRow = tilesPerRow(items.length);
  block.classList.add(`accordion-icon-grid-cols-${perRow}`);
  items.forEach((item, i) => { item.dataset.row = String(Math.floor(i / perRow)); });

  list.addEventListener('click', (e) => {
    const button = e.target.closest('.accordion-icon-grid-toggle');
    if (!button) return;
    const open = button.getAttribute('aria-expanded') !== 'true';
    const { row } = button.closest('.accordion-icon-grid-item').dataset;
    items.filter((item) => item.dataset.row === row).forEach((item) => setOpen(item, open));
  });

  block.replaceChildren(list);
}
