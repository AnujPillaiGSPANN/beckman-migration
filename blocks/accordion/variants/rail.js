import { moveInstrumentation } from '../../../scripts/scripts.js';

let idCounter = 0;

/**
 * Normalize a path for "is this the current page" checks: drop a .html extension, an AEM
 * /content/<site> prefix, the /in locale prefix and a trailing slash, so links written as
 * https://www.mybeckman.in/x/y, /in/x/y or /x/y/ all compare equal.
 * @param {string} path
 * @returns {string}
 */
function normalizePath(path) {
  const p = path
    .replace(/\.html$/i, '')
    .replace(/^\/content\/[^/]+/, '')
    .replace(/^\/in(?=\/|$)/, '')
    .replace(/\/+$/, '')
    .toLowerCase();
  return p || '/';
}

function isCurrent(a) {
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#')) return false;
  try {
    const url = new URL(href, window.location.href);
    return normalizePath(url.pathname) === normalizePath(window.location.pathname);
  } catch (e) {
    return false;
  }
}

// links stay plain links: undo decorateButtons on the authored cells
function unbutton(root) {
  root.querySelectorAll('a.button').forEach((a) => a.classList.remove('button', 'primary', 'secondary'));
  root.querySelectorAll('.button-container').forEach((el) => el.classList.remove('button-container'));
}

function markCurrent(li, a) {
  if (!isCurrent(a)) return false;
  li.classList.add('accordion-rail-current');
  a.setAttribute('aria-current', 'page');
  return true;
}

/**
 * Child list from the `text` cell: the authored <ul> when there is one (keeps its
 * instrumentation), else every link in the cell, one <li> each.
 * @param {Element} cell
 * @returns {HTMLUListElement|null}
 */
function buildChildren(cell) {
  if (!cell) return null;
  const links = [...cell.querySelectorAll('a[href]')];
  if (!links.length) return null;
  const list = document.createElement('ul');
  list.className = 'accordion-rail-children';
  links.forEach((a) => {
    const li = document.createElement('li');
    li.className = 'accordion-rail-child';
    a.className = 'accordion-rail-link';
    a.removeAttribute('title');
    li.append(a);
    markCurrent(li, a);
    list.append(li);
  });
  return list;
}

function setOpen(item, open) {
  const toggle = item.querySelector(':scope > .accordion-rail-row > .accordion-rail-toggle');
  const panel = item.querySelector(':scope > .accordion-rail-panel');
  toggle.setAttribute('aria-expanded', String(open));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    item.classList.toggle('accordion-rail-open', open);
    panel.style.height = open ? 'auto' : '';
    return;
  }
  // height: auto is not animatable: pin the start height, reflow, then go to the target
  panel.style.height = `${open ? 0 : panel.scrollHeight}px`;
  panel.getBoundingClientRect();
  item.classList.toggle('accordion-rail-open', open);
  panel.style.height = `${open ? panel.scrollHeight : 0}px`;
}

function buildItem(row) {
  idCounter += 1;
  const [summaryCell, textCell] = [...row.children];
  const item = document.createElement('li');
  item.className = 'accordion-rail-item';
  moveInstrumentation(row, item);

  const line = document.createElement('div');
  line.className = 'accordion-rail-row';

  // parent link: the first link of the `summary` cell (plain text when there is no link)
  let parent = summaryCell?.querySelector('a[href]');
  if (!parent) {
    parent = document.createElement('span');
    parent.textContent = summaryCell?.textContent.trim() || '';
  }
  parent.classList.remove('button', 'primary', 'secondary');
  parent.classList.add('accordion-rail-link');
  parent.removeAttribute('title');
  if (summaryCell) moveInstrumentation(summaryCell, line);
  const label = parent.textContent.replace(/\s+/g, ' ').trim();
  if (parent.tagName === 'A') markCurrent(item, parent);

  if (textCell) unbutton(textCell);
  const children = buildChildren(textCell);

  if (children) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'accordion-rail-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', `${label} pages`);

    const panel = document.createElement('div');
    panel.className = 'accordion-rail-panel';
    panel.id = `accordion-rail-panel-${idCounter}`;
    toggle.setAttribute('aria-controls', panel.id);
    moveInstrumentation(textCell, panel);
    panel.append(children);

    panel.addEventListener('transitionend', (e) => {
      if (e.target !== panel || e.propertyName !== 'height') return;
      panel.style.height = item.classList.contains('accordion-rail-open') ? 'auto' : '';
    });
    toggle.addEventListener('click', () => {
      setOpen(item, toggle.getAttribute('aria-expanded') !== 'true');
    });

    line.append(toggle, parent);
    item.append(line, panel);
  } else {
    const spacer = document.createElement('span');
    spacer.className = 'accordion-rail-spacer';
    line.append(spacer, parent);
    item.append(line);
  }
  return item;
}

/**
 * Accordion (rail): sidebar link tree. Each row is a parent link with a chevron toggle on
 * its left that expands/collapses its child links (collapsed by default); a row without
 * child links is a plain link. The link for the current page is highlighted.
 * Row cells: [summary: parent link] [text: list of child links, may be empty].
 * @param {Element} block
 */
export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'accordion-rail-list';
  [...block.children].forEach((row) => list.append(buildItem(row)));
  block.replaceChildren(list);
}
