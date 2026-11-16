/**
 * Cards (finder): live product filter ("Explore … Models"), fed by the site's Coveo for Sitecore
 * search endpoint: result count, a column of filters (facets) with counts, a grid of product
 * cards (placeholder image, title, product number, Add to Quote) and a pager.
 *
 * The block holds settings only, one row per setting (item cards-finder-setting):
 * [name] [value]. Names:
 * - endpoint: search URL (…/coveo/rest/search/v2?sitecoreItemUri=…&siteName=…)
 * - token: token URL (default: <endpoint origin>/coveo/rest/token); the search is sent without
 *   a token when none is issued
 * - query: advanced query (aq), e.g. the product taxonomy / region filter of the source page
 * - scope: constant query (cq), e.g. language and index source
 * - pipeline, hub (search hub), locale, results (per page, default 8)
 * - facet (repeatable): "Title | @field" (source field name; translated to the index name)
 * - product link: card link; {id} = product number (default: the result's own URL)
 * - quote link / quote label: the card button (label default "Add to Quote")
 * - image: placeholder image URL (default /icons/image-not-available.svg)
 *
 * The data is live only. Like the source, the section is hidden when the search returns no
 * product or cannot be reached (the endpoint answers only pages on the Beckman domain), and the
 * page's jump links to it are hidden too. In the Universal Editor the settings stay visible.
 * @param {Element} block
 */

const PAGE_NUMBERS = 5;
const FACET_VALUES = 5;
const PLACEHOLDER = '/icons/image-not-available.svg';

/** Coveo for Sitecore index field names: lower case, characters other than a-w, y, 0-9 → zNx. */
export function coveoField(name) {
  const raw = name.trim().replace(/^@/, '').toLowerCase();
  return `@${[...raw].map((c) => (/[a-wy0-9]/.test(c) ? c : `z${c.charCodeAt(0)}x`)).join('')}`;
}

const quote = (v) => `"${String(v).replace(/"/g, '\\"')}"`;

function readSettings(block) {
  const settings = { facets: [] };
  [...block.children].forEach((row) => {
    const [nameCell, valueCell] = row.children;
    const name = nameCell?.textContent.trim().toLowerCase();
    if (!name || !valueCell) return;
    const link = valueCell.querySelector('a[href]');
    const text = valueCell.textContent.trim();
    if (name === 'facet') {
      const [title, field] = text.split('|').map((s) => s.trim());
      if (title && field) settings.facets.push({ title, field: coveoField(field) });
    } else {
      // a link's target, unless the text is a URL pattern ({id}), which links cannot keep
      settings[name] = link && !text.includes('{') ? link.getAttribute('href') : text;
    }
  });
  return settings;
}

function isAuthoring() {
  return document.documentElement.classList.contains('adobe-ue-edit')
    || document.documentElement.classList.contains('adobe-ue-preview')
    || Boolean(document.querySelector('[data-aue-resource]'));
}

async function fetchToken(settings) {
  let url = settings.token;
  if (!url) {
    try {
      url = `${new URL(settings.endpoint, window.location.href).origin}/coveo/rest/token`;
    } catch (e) {
      return '';
    }
  }
  try {
    const resp = await fetch(url, { credentials: 'include' });
    if (!resp.ok) return '';
    return (await resp.json()).token || '';
  } catch (e) {
    return '';
  }
}

function selectionQuery(state, except) {
  return state.facets
    .filter((f) => f !== except && f.selected.size)
    .map((f) => `(${f.field}==(${[...f.selected].map(quote).join(',')}))`)
    .join(' ');
}

async function search(state) {
  const { settings } = state;
  const base = settings.query || '';
  const aq = [base, selectionQuery(state)].filter(Boolean).join(' ');
  const body = new URLSearchParams({
    q: '',
    aq,
    cq: settings.scope || '',
    searchHub: settings.hub || settings.pipeline || '',
    pipeline: settings.pipeline || '',
    locale: settings.locale || document.documentElement.lang || 'en',
    firstResult: String(state.page * state.perPage),
    numberOfResults: String(state.perPage),
    sortCriteria: 'relevancy',
    enableDidYouMean: 'false',
    enableDuplicateFiltering: 'false',
    allowQueriesWithoutKeywords: 'true',
    retrieveFirstSentences: 'false',
    excerptLength: '200',
    maximumAge: '900000',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    groupBy: JSON.stringify(state.facets.map((f) => ({
      field: f.field,
      maximumNumberOfValues: f.expanded ? 100 : FACET_VALUES + 1,
      sortCriteria: 'occurrences',
      injectionDepth: 1000,
      completeFacetWithStandardValues: true,
      allowedValues: [],
      // a facet counts its values without its own selection (selecting more values widens)
      advancedQueryOverride: [base, selectionQuery(state, f)].filter(Boolean).join(' ') || '@uri',
    }))),
  });
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  const resp = await fetch(settings.endpoint, { method: 'POST', headers, body });
  if (!resp.ok) throw new Error(`search ${resp.status}`);
  return resp.json();
}

const el = (tag, className, text) => {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
};

function productLink(settings, result, id) {
  if (settings['product link']) return settings['product link'].replace(/\{id\}/g, encodeURIComponent(id));
  return result.clickUri || '#';
}

function renderCard(settings, result) {
  const raw = result.raw || {};
  const id = raw.z95xname || raw.partz32xnumber || raw.metaz32xtitle || '';
  const title = raw.itemtitle || result.title || id;
  const href = productLink(settings, result, id);

  const li = el('li', 'cards-finder-result');
  const card = el('div', 'cards-finder-card');

  const image = el('div', 'cards-finder-image');
  const imageLink = el('a');
  imageLink.href = href;
  imageLink.tabIndex = -1;
  imageLink.setAttribute('aria-hidden', 'true');
  const img = el('img');
  img.src = settings.image || PLACEHOLDER;
  img.alt = '';
  img.loading = 'lazy';
  img.width = 125;
  img.height = 125;
  imageLink.append(img);
  image.append(imageLink);

  const content = el('div', 'cards-finder-content');
  const h = el('h4', 'cards-finder-title');
  const a = el('a', '', title);
  a.href = href;
  h.append(a);
  content.append(h, el('p', 'cards-finder-number', `Product No: ${id}`));

  card.append(image, content);
  if (settings['quote link']) {
    const footer = el('div', 'cards-finder-footer');
    const q = el('a', 'cards-finder-quote', settings['quote label'] || 'Add to Quote');
    q.href = settings['quote link'].replace(/\{id\}/g, encodeURIComponent(id));
    q.dataset.productnumber = id;
    footer.append(q);
    card.append(footer);
  }
  li.append(card);
  return li;
}

function renderFacet(state, facet, values) {
  const box = el('div', 'cards-finder-facet');
  box.classList.toggle('cards-finder-facet-collapsed', facet.collapsed);
  const header = el('div', 'cards-finder-facet-header');
  const title = el('h4', 'cards-finder-facet-title', facet.title);
  header.append(title);
  if (facet.selected.size) {
    const clear = el('button', 'cards-finder-facet-clear');
    clear.type = 'button';
    clear.setAttribute('aria-label', `Clear ${facet.title}`);
    clear.addEventListener('click', () => { facet.selected.clear(); state.page = 0; state.run(); });
    header.append(clear);
  }
  const toggle = el('button', 'cards-finder-facet-toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', String(!facet.collapsed));
  toggle.setAttribute('aria-label', `${facet.collapsed ? 'Expand' : 'Collapse'} ${facet.title}`);
  toggle.addEventListener('click', () => {
    facet.collapsed = !facet.collapsed;
    box.classList.toggle('cards-finder-facet-collapsed', facet.collapsed);
    toggle.setAttribute('aria-expanded', String(!facet.collapsed));
    toggle.setAttribute('aria-label', `${facet.collapsed ? 'Expand' : 'Collapse'} ${facet.title}`);
  });
  header.append(toggle);
  box.append(header);

  const body = el('div', 'cards-finder-facet-body');
  const list = el('ul', 'cards-finder-facet-values');
  const filter = facet.filter.toLowerCase();
  const shown = values
    .filter((v) => !filter || v.value.toLowerCase().includes(filter))
    .slice(0, facet.expanded ? undefined : FACET_VALUES);
  shown.forEach((v) => {
    const li = el('li', 'cards-finder-facet-value');
    const label = el('label');
    const input = el('input');
    input.type = 'checkbox';
    input.checked = facet.selected.has(v.value);
    input.addEventListener('change', () => {
      if (input.checked) facet.selected.add(v.value);
      else facet.selected.delete(v.value);
      state.page = 0;
      state.run();
    });
    label.append(input, el('span', 'cards-finder-facet-caption', v.value), el('span', 'cards-finder-facet-count', String(v.numberOfResults)));
    label.title = v.value;
    li.append(label);
    list.append(li);
  });
  body.append(list);

  if (values.length > FACET_VALUES || facet.expanded) {
    // facet search: filters the facet's values (all of them are requested while it is open)
    const searchRow = el('div', 'cards-finder-facet-search');
    if (facet.searching) {
      const input = el('input');
      input.type = 'search';
      input.placeholder = 'Search';
      input.setAttribute('aria-label', `Search ${facet.title}`);
      input.value = facet.filter;
      input.addEventListener('input', () => {
        facet.filter = input.value;
        state.render(state.last, { focus: facet });
      });
      searchRow.append(input);
    } else {
      const open = el('button', 'cards-finder-facet-search-open', 'Search');
      open.type = 'button';
      open.addEventListener('click', () => {
        facet.searching = true;
        facet.expanded = true;
        state.run({ focus: facet });
      });
      searchRow.append(open);
    }
    body.append(searchRow);
    const more = el('button', 'cards-finder-facet-more');
    more.type = 'button';
    more.classList.toggle('cards-finder-facet-less', facet.expanded);
    more.setAttribute('aria-label', `${facet.expanded ? 'Collapse' : 'Expand'} ${facet.title} facet`);
    more.addEventListener('click', () => {
      facet.expanded = !facet.expanded;
      if (!facet.expanded) { facet.searching = false; facet.filter = ''; }
      state.run();
    });
    body.append(more);
  }
  box.append(body);
  return box;
}

function renderPager(state, total) {
  const pages = Math.ceil(total / state.perPage);
  const nav = el('nav', 'cards-finder-pager');
  nav.setAttribute('aria-label', 'Results pages');
  if (pages < 2) return nav;
  const ul = el('ul');
  const item = (label, page, cls, aria) => {
    const li = el('li', cls);
    const b = el('button', '', label);
    b.type = 'button';
    if (aria) b.setAttribute('aria-label', aria);
    if (page === state.page) b.setAttribute('aria-current', 'page');
    b.addEventListener('click', () => {
      state.page = page;
      state.run({ scroll: true });
    });
    li.append(b);
    ul.append(li);
  };
  let first = Math.max(0, state.page - Math.floor(PAGE_NUMBERS / 2));
  const last = Math.min(pages - 1, first + PAGE_NUMBERS - 1);
  first = Math.max(0, last - PAGE_NUMBERS + 1);
  if (state.page > 0) item('', state.page - 1, 'cards-finder-pager-prev', 'Previous');
  for (let p = first; p <= last; p += 1) {
    item(String(p + 1), p, p === state.page ? 'cards-finder-pager-active' : '', `Page ${p + 1}`);
  }
  if (state.page < pages - 1) item('', state.page + 1, 'cards-finder-pager-next', 'Next');
  nav.append(ul);
  return nav;
}

function hideSection(block) {
  const section = block.closest('.section');
  if (!section) { block.hidden = true; return; }
  section.hidden = true;
  // jump links to the section's heading (anchor bars, intro buttons) go with it
  section.querySelectorAll('h1[id], h2[id], h3[id], h4[id]').forEach((h) => {
    document.querySelectorAll(`main a[href="#${CSS.escape(h.id)}"]`).forEach((a) => {
      const holder = a.closest('p, li') || a;
      if (!section.contains(holder)) holder.hidden = true;
    });
  });
}

function showSettings(block, settings) {
  const note = el('div', 'cards-finder-authoring');
  note.append(el('p', '', 'Product finder: the products load live from the Coveo search on the Beckman site and are not shown here.'));
  const dl = el('dl');
  Object.entries(settings).forEach(([k, v]) => {
    if (k === 'facets') return;
    dl.append(el('dt', '', k), el('dd', '', v));
  });
  settings.facets.forEach((f) => dl.append(el('dt', '', 'facet'), el('dd', '', `${f.title} | ${f.field}`)));
  note.append(dl);
  block.append(note);
}

export default async function decorate(block) {
  const settings = readSettings(block);
  const authoring = isAuthoring();
  const rows = [...block.children];

  if (!settings.endpoint) {
    if (authoring) {
      rows.forEach((r) => r.remove());
      showSettings(block, settings);
    } else {
      hideSection(block);
    }
    return;
  }

  const state = {
    settings,
    perPage: Math.max(1, parseInt(settings.results, 10) || 8),
    page: 0,
    token: '',
    last: null,
    facets: settings.facets.map((f) => ({
      ...f, selected: new Set(), collapsed: false, expanded: false, searching: false, filter: '',
    })),
  };

  const summary = el('p', 'cards-finder-summary');
  summary.setAttribute('aria-live', 'polite');
  const facetColumn = el('div', 'cards-finder-facets');
  const results = el('div', 'cards-finder-results');
  const list = el('ul', 'cards-finder-list');
  const pagerHolder = el('div', 'cards-finder-pager-holder');
  results.append(list, pagerHolder);
  const main = el('div', 'cards-finder-main');
  main.append(facetColumn, results);

  state.render = (data, { focus, scroll } = {}) => {
    state.last = data;
    const total = data.totalCount || 0;
    const from = total ? state.page * state.perPage + 1 : 0;
    const to = Math.min(total, (state.page + 1) * state.perPage);
    summary.innerHTML = '';
    summary.append('Results ', el('strong', '', String(from)), '-', el('strong', '', String(to)), ' of ', el('strong', '', String(total)));

    const groups = new Map((data.groupByResults || [])
      .map((g) => [g.field.toLowerCase(), g.values || []]));
    facetColumn.innerHTML = '';
    state.facets.forEach((f) => {
      const values = (groups.get(f.field.slice(1)) || groups.get(f.field) || [])
        .map((v) => ({ value: v.value, numberOfResults: v.numberOfResults }));
      // a selected value keeps its row even when the other filters leave it no product
      f.selected.forEach((s) => {
        if (!values.some((v) => v.value === s)) values.unshift({ value: s, numberOfResults: 0 });
      });
      if (!values.length) return;
      const box = renderFacet(state, f, values);
      facetColumn.append(box);
      if (focus === f) box.querySelector('input[type="search"]')?.focus();
    });
    facetColumn.hidden = !facetColumn.children.length;

    list.replaceChildren(...(data.results || []).map((r) => renderCard(settings, r)));
    pagerHolder.replaceChildren(renderPager(state, total));
    if (scroll) block.closest('.section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  state.run = async (opts = {}) => {
    block.classList.add('cards-finder-loading');
    try {
      const data = await search(state);
      if (!state.last && !(data.totalCount > 0)) throw new Error('no products');
      state.render(data, opts);
    } catch (e) {
      if (!state.last) {
        if (authoring) {
          rows.forEach((r) => r.remove());
          showSettings(block, settings);
        } else {
          hideSection(block);
        }
      }
    } finally {
      block.classList.remove('cards-finder-loading');
    }
  };

  // the rows only hold settings
  rows.forEach((r) => { r.hidden = true; });
  state.token = await fetchToken(settings);
  await state.run();
  if (state.last) {
    rows.forEach((r) => r.remove());
    block.append(summary, main);
  }
}
