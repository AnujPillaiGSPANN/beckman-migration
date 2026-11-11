/*
 * Header block – renders the site header from the nav fragment (content/nav.plain.html).
 * Fragment sections (top-level divs, in order):
 *   1. brand   – logo link
 *   2. search  – placeholder text for the site search field
 *   3. tools   – top-row links; a <strong> link renders as the primary CTA
 *   4. menu    – top-level menu items. Each item's nested list is either
 *                - columns: every child starts with a <strong> title + list of links, or
 *                - cascade: links whose nested lists open further panels on hover
 *   5. utility – icon triggers (first paragraph image) + drop-panel content
 * All copy, links and images come from the fragment; this file only builds behaviour.
 */

// source switches from the drawer menu to the horizontal bar at 1120px
const isDesktop = window.matchMedia('(min-width: 1120px)');

/** Locale area of the current page ('/in' for the India pages, '' otherwise). */
export function localePrefix() {
  const match = window.location.pathname.match(/^\/(?:content\/)?(in)(?:\/|$)/);
  return match ? `/${match[1]}` : '';
}

async function fetchNav() {
  // metadata-independent: /content first (local preview), then root (DA/EDS)
  const prefix = localePrefix();
  let resp = await fetch(`/content${prefix}/nav.plain.html`);
  if (!resp.ok) resp = await fetch(`${prefix}/nav.plain.html`);
  if (!resp.ok) return null;
  const html = await resp.text();
  const tpl = document.createElement('div');
  tpl.innerHTML = html;
  // fragment image paths are relative to the fragment location
  const base = resp.url.slice(0, resp.url.lastIndexOf('/') + 1);
  tpl.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    if (!/^(https?:|\/|data:)/.test(src)) img.src = new URL(src, base).href;
  });
  return tpl;
}

/** Replace an <img> pointing at an SVG with the inline SVG so it can take currentColor. */
async function inlineIcon(img, className) {
  const span = document.createElement('span');
  span.className = className;
  span.setAttribute('aria-hidden', 'true');
  try {
    const resp = await fetch(img.src);
    const text = await resp.text();
    if (text.includes('<svg')) {
      span.innerHTML = text.slice(text.indexOf('<svg'));
      const svg = span.querySelector('svg');
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.querySelectorAll('[fill]').forEach((el) => el.setAttribute('fill', 'currentColor'));
      svg.setAttribute('fill', 'currentColor');
    } else {
      span.append(img.cloneNode());
    }
  } catch (e) {
    span.append(img.cloneNode());
  }
  return span;
}

function closest(el, selector) {
  return el instanceof Element ? el.closest(selector) : null;
}

/* ---------- utility: buttons inside panels ---------- */
function decoratePanelButtons(container) {
  container.querySelectorAll('strong > a, em > a').forEach((a) => {
    const wrapper = a.parentElement;
    if (wrapper.childNodes.length !== 1) return;
    a.classList.add('button', wrapper.tagName === 'STRONG' ? 'primary' : 'secondary');
    wrapper.replaceWith(a);
  });
}

/* ---------- top row ---------- */
function buildBrand(section) {
  const brand = document.createElement('div');
  brand.className = 'nav-brand';
  const link = section.querySelector('a');
  if (link) {
    link.className = 'nav-logo';
    const img = link.querySelector('img');
    if (img) link.setAttribute('aria-label', img.alt);
    brand.append(link);
  }
  return brand;
}

function buildSearch(section) {
  const wrap = document.createElement('div');
  wrap.className = 'nav-search';
  const placeholder = section ? section.textContent.trim() : '';
  const form = document.createElement('form');
  form.setAttribute('role', 'search');
  form.action = '/search';
  const input = document.createElement('input');
  input.type = 'search';
  input.name = 'q';
  input.placeholder = placeholder;
  input.setAttribute('aria-label', 'Search');
  input.autocomplete = 'off';
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'nav-search-button';
  button.setAttribute('aria-label', 'Search');
  button.innerHTML = '<span class="icon-search" aria-hidden="true"></span>';
  form.append(button, input);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    window.location.href = q ? `/search#q=${encodeURIComponent(q)}` : '/search';
  });
  wrap.append(form);
  return wrap;
}

function buildTools(section) {
  const tools = document.createElement('div');
  tools.className = 'nav-tools';
  section.querySelectorAll(':scope li').forEach((li) => {
    const a = li.querySelector('a');
    if (!a) return;
    if (li.querySelector('strong')) a.className = 'nav-cta';
    else a.className = 'nav-tool-link';
    tools.append(a);
  });
  return tools;
}

/* ---------- megamenu ---------- */
function isTitleItem(li) {
  return !li.querySelector(':scope > a') && li.querySelector(':scope > strong') && !li.querySelector(':scope > ul');
}

function isColumnsMenu(list) {
  const items = [...list.children];
  return items.length > 0 && items.every((li) => li.querySelector(':scope > strong') && li.querySelector(':scope > ul'));
}

function buildColumns(list) {
  const panel = document.createElement('div');
  panel.className = 'nav-panel nav-panel-columns';
  [...list.children].forEach((li) => {
    const col = document.createElement('div');
    col.className = 'nav-column';
    const ul = document.createElement('ul');
    const title = document.createElement('li');
    title.className = 'nav-title';
    title.textContent = li.querySelector(':scope > strong').textContent;
    ul.append(title);
    [...li.querySelector(':scope > ul').children].forEach((item) => {
      if (isTitleItem(item)) {
        item.className = 'nav-title';
        item.textContent = item.textContent.trim();
      } else item.className = 'nav-link';
      ul.append(item);
    });
    col.append(ul);
    panel.append(col);
  });
  return panel;
}

function buildLevel(list, depth, parentLabel, backLabel, parentLink) {
  const level = document.createElement('div');
  level.className = `nav-level nav-level-${depth}`;
  const ul = document.createElement('ul');
  if (backLabel) {
    // drawer only: back to the previous view
    const back = document.createElement('li');
    back.className = 'nav-back';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = backLabel;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const owner = level.closest('.has-sub');
      owner.classList.remove('is-open');
      owner.querySelector(':scope > a').setAttribute('aria-expanded', 'false');
    });
    back.append(btn);
    ul.append(back);
  }
  [...list.children].forEach((li, i) => {
    if (isTitleItem(li)) {
      li.className = 'nav-title';
      li.textContent = li.textContent.trim();
      // a sub-level that opens with its parent's name: heading used by the mobile drawer only
      if (i === 0 && parentLabel && li.textContent === parentLabel) {
        li.classList.add('nav-title-parent');
        ul.append(li);
        if (parentLink) {
          // drawer only: overview link to the parent page (source "hidden-lg" item)
          const overview = document.createElement('li');
          overview.className = 'nav-link nav-overview';
          const a = document.createElement('a');
          a.href = parentLink.getAttribute('href');
          a.textContent = parentLink.textContent.trim();
          a.insertAdjacentHTML('beforeend', '<span class="nav-overview-arrow" aria-hidden="true"></span>');
          overview.append(a);
          ul.append(overview);
        }
        return;
      }
      ul.append(li);
      return;
    }
    const sub = li.querySelector(':scope > ul');
    li.className = 'nav-link';
    if (sub) {
      const a = li.querySelector(':scope > a');
      li.classList.add('has-sub');
      a.setAttribute('aria-haspopup', 'true');
      a.setAttribute('aria-expanded', 'false');
      sub.replaceWith(buildLevel(sub, depth + 1, a.textContent.trim(), parentLabel, a));
    }
    ul.append(li);
  });
  level.prepend(ul);
  return level;
}

function setCascadeDepth(panel) {
  const open = panel.querySelectorAll('.nav-link.has-sub.is-open').length;
  panel.style.setProperty('--open-levels', open + 1);
}

function openSubItem(li) {
  const list = li.parentElement;
  list.querySelectorAll(':scope > .has-sub.is-open').forEach((other) => {
    if (other === li) return;
    other.classList.remove('is-open');
    other.querySelector(':scope > a').setAttribute('aria-expanded', 'false');
    other.querySelectorAll('.has-sub.is-open').forEach((nested) => nested.classList.remove('is-open'));
  });
  li.classList.add('is-open');
  li.querySelector(':scope > a').setAttribute('aria-expanded', 'true');
  const panel = li.closest('.nav-panel');
  setCascadeDepth(panel);
  // drawer: the sub-level slides in at the top of the flyout
  if (!isDesktop.matches) panel.scrollTop = 0;
}

function buildCascade(list, label) {
  const panel = document.createElement('div');
  panel.className = 'nav-panel nav-panel-cascade';
  panel.append(buildLevel(list, 1, label));
  panel.addEventListener('mouseover', (e) => {
    if (!isDesktop.matches) return;
    const li = closest(e.target, '.nav-link');
    if (!li || !panel.contains(li)) return;
    if (li.classList.contains('has-sub')) openSubItem(li);
    else {
      // hovering a plain link closes sibling sub-panels at that level
      li.parentElement.querySelectorAll(':scope > .has-sub.is-open').forEach((other) => {
        other.classList.remove('is-open');
        other.querySelectorAll('.has-sub.is-open').forEach((nested) => nested.classList.remove('is-open'));
      });
      setCascadeDepth(panel);
    }
  });
  // drawer: tapping a category slides to its sub-level instead of navigating
  panel.addEventListener('click', (e) => {
    if (isDesktop.matches) return;
    const a = closest(e.target, '.nav-link.has-sub > a');
    if (!a || !panel.contains(a)) return;
    e.preventDefault();
    openSubItem(a.parentElement);
  });
  return panel;
}

function closeMenus(nav, except) {
  nav.querySelectorAll('.nav-menu > li.is-open, .nav-utility > li.is-open').forEach((li) => {
    if (li === except) return;
    li.classList.remove('is-open');
    const trigger = li.querySelector(':scope > .nav-trigger, :scope > .nav-util-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    li.querySelectorAll('.has-sub.is-open').forEach((s) => s.classList.remove('is-open'));
    const panel = li.querySelector('.nav-panel-cascade');
    if (panel) setCascadeDepth(panel);
  });
}

function openMenu(nav, li) {
  closeMenus(nav, li);
  li.classList.add('is-open');
  li.querySelector(':scope > .nav-trigger, :scope > .nav-util-trigger')?.setAttribute('aria-expanded', 'true');
}

function buildMenu(section, nav) {
  const menu = document.createElement('ul');
  menu.className = 'nav-menu nav-list';
  const source = section.querySelector(':scope > ul');
  if (!source) return menu;
  [...source.children].forEach((item) => {
    const list = item.querySelector(':scope > ul');
    const label = [...item.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join('').trim()
      || item.querySelector(':scope > a, :scope > strong')?.textContent.trim() || '';
    const li = document.createElement('li');
    li.className = 'nav-item';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'nav-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = '<span class="nav-label"></span><span class="nav-chevron" aria-hidden="true"></span>';
    trigger.querySelector('.nav-label').textContent = label;
    li.append(trigger);
    if (list) {
      const panel = isColumnsMenu(list) ? buildColumns(list) : buildCascade(list, label);
      li.append(panel);
    }
    trigger.addEventListener('click', () => {
      if (li.classList.contains('is-open')) closeMenus(nav);
      else openMenu(nav, li);
    });
    li.addEventListener('mouseenter', () => { if (isDesktop.matches) openMenu(nav, li); });
    li.addEventListener('mouseleave', () => { if (isDesktop.matches) closeMenus(nav); });
    menu.append(li);
  });
  return menu;
}

/* ---------- utility icons + drop panels ---------- */
function buildSelects(panel) {
  // "label paragraph" followed by a list of plain options -> label + select
  [...panel.querySelectorAll(':scope > p')].forEach((p) => {
    const list = p.nextElementSibling;
    if (p.querySelector('a, img') || !list || list.tagName !== 'UL' || list.querySelector('a')) return;
    const field = document.createElement('div');
    field.className = 'nav-field';
    const id = `nav-select-${Math.random().toString(36).slice(2, 8)}`;
    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = p.textContent.trim();
    const select = document.createElement('select');
    select.id = id;
    [...list.children].forEach((li) => {
      const option = document.createElement('option');
      option.textContent = li.textContent.trim();
      select.append(option);
    });
    const caret = document.createElement('span');
    caret.className = 'nav-select-caret';
    caret.setAttribute('aria-hidden', 'true');
    field.append(label, select, caret);
    p.replaceWith(field);
    list.remove();
  });
}

async function buildUtility(section, nav) {
  const util = document.createElement('ul');
  util.className = 'nav-utility';
  const source = section.querySelector(':scope > ul');
  if (!source) return util;
  const items = await Promise.all([...source.children].map(async (item) => {
    const first = item.querySelector(':scope > p');
    const img = first?.querySelector('img');
    if (!img) return null;
    const li = document.createElement('li');
    // panel styles key off the icon name (Contact, Cart, Account, …), not the position
    li.className = `nav-util-${img.alt.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    const link = first.querySelector('a');
    const trigger = document.createElement('a');
    trigger.className = 'nav-util-trigger';
    trigger.href = link ? link.href : '#';
    trigger.setAttribute('aria-label', img.alt);
    trigger.title = img.alt;
    trigger.append(await inlineIcon(img, 'nav-util-icon'));
    li.append(trigger);
    first.remove();
    if (item.children.length) {
      const panel = document.createElement('div');
      panel.className = 'nav-drop-panel';
      const body = document.createElement('div');
      body.className = 'nav-drop-body';
      body.append(...item.childNodes);
      decoratePanelButtons(body);
      buildSelects(body);
      const heading = body.querySelector(':scope > p:first-child > strong:only-child');
      if (heading) heading.parentElement.classList.add('nav-drop-title');
      panel.append(body);
      li.append(panel);
      li.classList.add('has-panel');
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', (e) => {
        if (link && li.classList.contains('is-open')) return; // second click follows the link
        e.preventDefault();
        if (li.classList.contains('is-open')) closeMenus(nav);
        else openMenu(nav, li);
      });
    }
    return li;
  }));
  // keep fragment order (icons load in parallel)
  util.append(...items.filter(Boolean));
  return util;
}

/* ---------- mobile drawer toggle ---------- */
function toggleDrawer(nav, force) {
  const open = force ?? nav.getAttribute('aria-expanded') !== 'true';
  nav.setAttribute('aria-expanded', open ? 'true' : 'false');
  nav.querySelector('.nav-hamburger button')?.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflowY = open && !isDesktop.matches ? 'hidden' : '';
  if (!open) closeMenus(nav);
}

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const fragment = await fetchNav();
  block.textContent = '';
  if (!fragment) return;
  const [brandSec, searchSec, toolsSec, menuSec, utilSec] = [...fragment.children];

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');
  nav.setAttribute('aria-label', 'Main');

  const top = document.createElement('div');
  top.className = 'nav-top';
  if (brandSec) top.append(buildBrand(brandSec));
  top.append(buildSearch(searchSec));
  if (toolsSec) top.append(buildTools(toolsSec));

  const bar = document.createElement('div');
  bar.className = 'nav-bar';
  // drawer toggle (below the desktop breakpoint): "☰ Menu"
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = '<button type="button" aria-controls="nav" aria-expanded="false"><span class="nav-hamburger-icon" aria-hidden="true"></span><span class="nav-hamburger-label">Menu</span></button>';
  hamburger.querySelector('button').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDrawer(nav);
  });
  bar.append(hamburger);
  if (menuSec) bar.append(buildMenu(menuSec, nav));
  if (utilSec) bar.append(await buildUtility(utilSec, nav));

  // dimmed page behind the open drawer; tapping it closes the drawer
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.addEventListener('click', () => toggleDrawer(nav, false));

  nav.append(top, bar, overlay);

  // close on outside click / Escape
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeMenus(nav);
  });
  nav.addEventListener('mouseleave', () => { if (isDesktop.matches) closeMenus(nav); });
  window.addEventListener('keydown', (e) => {
    if (e.code !== 'Escape') return;
    if (nav.querySelector('.is-open')) closeMenus(nav);
    else if (!isDesktop.matches) toggleDrawer(nav, false);
  });

  // viewport changes: reset drawer + open panels when crossing the breakpoint
  isDesktop.addEventListener('change', () => {
    closeMenus(nav);
    toggleDrawer(nav, false);
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';
  wrapper.append(nav);
  block.append(wrapper);
}
