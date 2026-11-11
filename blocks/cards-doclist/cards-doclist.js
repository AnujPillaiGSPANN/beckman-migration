import { moveInstrumentation } from '../../scripts/scripts.js';

// source: #resource-table-pagination (client-side pagination of the resource list)
const PAGE_SIZE = 10;

const SVG_NS = 'http://www.w3.org/2000/svg';

// outline icons drawn in currentColor (source: Font Awesome far fa-file-pdf / fas fa-video)
const ICONS = {
  pdf: {
    label: 'PDF',
    viewBox: '0 0 24 32',
    paths: [
      { d: 'M4 1.5h11.5L22.5 8.5V28a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 28V4A2.5 2.5 0 0 1 4 1.5Z', stroke: true },
      { d: 'M15 1.5V9h7.5', stroke: true },
      { d: 'M6.5 25c2-1.6 3.6-4.6 4.8-8.4.5-1.7.3-3.8-.7-3.8-1.2 0-1.1 2.4-.2 4.4 1.3 2.8 3.6 5 6.2 5.7 1.6.4 2.4-.6 1.6-1.3-1-.9-4.6-.4-7.5.6-2.3.8-4.4 1.8-4.2 2.8Z', stroke: true },
    ],
  },
  video: {
    label: 'Video',
    viewBox: '0 0 36 32',
    paths: [
      { d: 'M3.5 6h18A3.5 3.5 0 0 1 25 9.5v13a3.5 3.5 0 0 1-3.5 3.5h-18A3.5 3.5 0 0 1 0 22.5v-13A3.5 3.5 0 0 1 3.5 6Z' },
      { d: 'M27 12.5 34.2 7.6A1.2 1.2 0 0 1 36 8.6v14.8a1.2 1.2 0 0 1-1.8 1L27 19.5Z' },
    ],
  },
  document: {
    label: 'Document',
    viewBox: '0 0 24 32',
    paths: [
      { d: 'M4 1.5h11.5L22.5 8.5V28a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 28V4A2.5 2.5 0 0 1 4 1.5Z', stroke: true },
      { d: 'M15 1.5V9h7.5M6.5 16h11M6.5 20.5h11M6.5 25h7', stroke: true },
    ],
  },
};

function normaliseType(text) {
  const value = (text || '').trim().toLowerCase();
  if (!value) return '';
  if (/pdf/.test(value)) return 'pdf';
  if (/video|webinar|wistia/.test(value)) return 'video';
  return value.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function typeLabel(type) {
  if (ICONS[type]) return ICONS[type].label;
  return type.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function createIcon(type) {
  const icon = ICONS[type] || ICONS.document;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', icon.viewBox);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  icon.paths.forEach(({ d, stroke }) => {
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    if (stroke) {
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '2.4');
      path.setAttribute('stroke-linejoin', 'round');
    } else {
      path.setAttribute('fill', 'currentColor');
    }
    svg.append(path);
  });
  const span = document.createElement('span');
  span.className = `cards-doclist-icon cards-doclist-icon-${ICONS[type] ? type : 'document'}`;
  span.append(svg);
  return span;
}

/**
 * Splits an authored row into its type token and its body cell.
 * The type cell holds only a short word ("pdf", "video"), never a link.
 */
function readRow(row) {
  const cells = [...row.children];
  const typeCell = cells.length > 1
    ? cells.find((c) => !c.querySelector('a, picture, img') && c.textContent.trim().split(/\s+/).length <= 2)
    : null;
  const bodyCell = cells.find((c) => c !== typeCell && c.querySelector('a'))
    || cells.find((c) => c !== typeCell);
  return { type: normaliseType(typeCell?.textContent), bodyCell };
}

function buildItem(row) {
  const { type, bodyCell } = readRow(row);
  const li = document.createElement('li');
  li.className = 'cards-doclist-item';
  li.dataset.type = type || 'document';
  moveInstrumentation(row, li);

  const body = document.createElement('div');
  body.className = 'cards-doclist-body';
  if (bodyCell) body.append(...bodyCell.childNodes);

  // inline-only text without a wrapping paragraph
  [...body.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) node.remove();
  });
  body.querySelectorAll('p').forEach((p) => {
    if (!p.textContent.trim() && !p.querySelector('img, picture')) p.remove();
  });

  // title: first link (block-level links stay plain links, not buttons)
  body.querySelectorAll('a.button').forEach((a) => a.classList.remove('button', 'primary', 'secondary'));
  body.querySelectorAll('.button-container').forEach((p) => p.classList.remove('button-container'));
  const link = body.querySelector('a[href]');
  if (link) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const title = link.closest('p, h1, h2, h3, h4, h5, h6') || link;
    title.classList.add('cards-doclist-title');
    link.classList.add('cards-doclist-link');
    [...body.children].filter((el) => el !== title && !el.contains(link))
      .forEach((el) => el.classList.add('cards-doclist-description'));
  }

  li.append(createIcon(type), body);
  return li;
}

function buildFilter(types, onChange) {
  const filter = document.createElement('div');
  filter.className = 'cards-doclist-filter';

  const heading = document.createElement('span');
  heading.className = 'cards-doclist-filter-heading';
  heading.textContent = 'Filter by:';

  const dropdown = document.createElement('div');
  dropdown.className = 'cards-doclist-dropdown';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'cards-doclist-dropdown-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Resource Type';

  const panel = document.createElement('div');
  panel.className = 'cards-doclist-dropdown-panel';
  panel.hidden = true;
  const panelId = `cards-doclist-filter-${Math.random().toString(36).slice(2, 8)}`;
  panel.id = panelId;
  toggle.setAttribute('aria-controls', panelId);

  const options = document.createElement('div');
  options.className = 'cards-doclist-dropdown-options';
  options.setAttribute('role', 'group');
  options.setAttribute('aria-label', 'Resource Type');
  types.forEach((type) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = type;
    input.addEventListener('change', () => {
      onChange([...options.querySelectorAll('input:checked')].map((i) => i.value));
    });
    label.append(input, document.createTextNode(typeLabel(type)));
    options.append(label);
  });

  const done = document.createElement('button');
  done.type = 'button';
  done.className = 'cards-doclist-dropdown-done';
  done.textContent = 'Done';

  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(panel.hidden));
  done.addEventListener('click', () => { setOpen(false); toggle.focus(); });
  dropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', (e) => { if (!dropdown.contains(e.target)) setOpen(false); });

  panel.append(options, done);
  dropdown.append(toggle, panel);
  filter.append(heading, dropdown);
  return filter;
}

function pageButton(text, className, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

/**
 * Cards (doclist): one-column list of documents, each a type icon, a linked title
 * (new tab) and an optional one-line description. A "Resource Type" filter is built
 * from the distinct row types (always shown, like the source) and the list is paginated
 * (pagination hidden for a single page).
 * Row cells: [type ("pdf" | "video")] [title link paragraph + optional description paragraph].
 * @param {Element} block
 */
export default function decorate(block) {
  const list = document.createElement('ul');
  list.className = 'cards-doclist-list';
  const items = [...block.children].map((row) => buildItem(row));
  list.append(...items);

  const pagination = document.createElement('nav');
  pagination.className = 'cards-doclist-pagination';
  pagination.setAttribute('aria-label', 'Pagination');

  const empty = document.createElement('p');
  empty.className = 'cards-doclist-empty';
  empty.textContent = 'No records found';
  empty.hidden = true;

  let selected = [];
  let page = 0;

  const render = () => {
    const visible = items.filter((li) => !selected.length || selected.includes(li.dataset.type));
    const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    page = Math.min(page, pages - 1);
    items.forEach((li) => { li.hidden = true; });
    visible.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).forEach((li) => { li.hidden = false; });
    empty.hidden = visible.length > 0;

    pagination.replaceChildren();
    pagination.hidden = pages <= 1;
    if (pages <= 1) return;
    const go = (n) => () => { page = n; render(); };
    const prev = pageButton('Previous', 'cards-doclist-page-prev', go(page - 1));
    prev.disabled = page === 0;
    const numbers = document.createElement('span');
    numbers.className = 'cards-doclist-page-numbers';
    for (let i = 0; i < pages; i += 1) {
      const num = pageButton(String(i + 1), 'cards-doclist-page-number', go(i));
      if (i === page) num.setAttribute('aria-current', 'page');
      numbers.append(num);
    }
    const next = pageButton('Next', 'cards-doclist-page-next', go(page + 1));
    next.disabled = page === pages - 1;
    pagination.append(prev, numbers, next);
  };

  // the source always shows the "Filter by: Resource Type" bar above the list
  const types = [...new Set(items.map((li) => li.dataset.type))];
  const children = [];
  if (items.length) {
    children.push(buildFilter(types, (values) => { selected = values; page = 0; render(); }));
  }
  children.push(list, empty, pagination);
  block.replaceChildren(...children);
  render();
}
