/*
 * Footer block – renders the site footer from content/footer.plain.html.
 * Fragment sections (top-level divs, in order):
 *   1. intro      – heading + text (newsletter teaser)
 *   2. primary    – list of primary links
 *   3. secondary  – list of secondary links, then a list of icon links (social)
 *   4. back to top – paragraph with icon + label (rendered as a scroll-to-top button)
 *   5. legal      – copyright paragraph, logo link, fine print
 *   6. logos      – list of (linked) brand logos
 * All copy, links and images come from the fragment; this file only builds layout + behaviour.
 */

import { getMetadata } from '../../scripts/aem.js';
import { joinLinkedImages } from '../../scripts/scripts.js';

async function fetchFooter(name = 'footer') {
  // locale area of the page ('/in' for the India pages)
  const match = window.location.pathname.match(/^\/(?:content\/)?(in)(?:\/|$)/);
  const prefix = match ? `/${match[1]}` : '';
  // metadata-independent: /content first (local preview), then root (DA/EDS)
  let resp = await fetch(`/content${prefix}/${name}.plain.html`);
  if (!resp.ok) resp = await fetch(`${prefix}/${name}.plain.html`);
  if (!resp.ok) return null;
  const html = await resp.text();
  const tpl = document.createElement('div');
  tpl.innerHTML = html;
  const base = resp.url.slice(0, resp.url.lastIndexOf('/') + 1);
  // relative media (local images/…, or ./media_… from AEM) resolve against the fragment
  const absolute = (url) => (/^(https?:|\/|data:|about:)/.test(url) ? url : new URL(url, base).href);
  tpl.querySelectorAll('img[src]').forEach((img) => { img.src = absolute(img.getAttribute('src')); });
  tpl.querySelectorAll('source[srcset]').forEach((source) => {
    source.srcset = source.getAttribute('srcset').split(',')
      .map((part) => part.trim().replace(/^\S+/, (u) => absolute(u))).join(', ');
  });
  // AEM stores a linked logo as an image + a paragraph with its bare link
  joinLinkedImages(tpl);
  // AEM marks images lazy; logos that size from their image (wrapping mobile row) stay
  // 0px wide and never load. The footer itself loads late, so load its images directly.
  tpl.querySelectorAll('img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
  return tpl;
}

/** Swap an SVG <img> for the inline SVG so it can follow currentColor (hover colour). */
async function inlineSvg(img, className) {
  try {
    const resp = await fetch(img.src);
    const text = await resp.text();
    if (!text.includes('<svg')) return;
    const holder = document.createElement('span');
    holder.innerHTML = text.slice(text.indexOf('<svg'));
    const svg = holder.querySelector('svg');
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('class', className);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    if (img.alt) {
      const link = img.closest('a');
      if (link && !link.getAttribute('aria-label')) link.setAttribute('aria-label', img.alt);
    }
    (img.closest('picture') || img).replaceWith(svg);
  } catch (e) {
    // keep the <img> if the SVG cannot be fetched
  }
}

function el(tag, className, ...children) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  node.append(...children);
  return node;
}

function buildBackToTop(section) {
  const button = el('button', 'footer-top');
  button.type = 'button';
  // icon first, then label (AEM may split them into separate paragraphs, in either order)
  const media = [...section.querySelectorAll('picture, img')].filter((m) => !m.closest('picture') || m.tagName === 'PICTURE');
  const label = section.textContent.trim();
  button.append(...media);
  if (label) button.append(document.createTextNode(label));
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  return button;
}

function buildLegal(section) {
  const legal = el('div', 'footer-legal');
  const inner = el('div', 'footer-legal-inner');
  const paragraphs = [...section.querySelectorAll(':scope > p')];
  // the logo paragraph is a lone link (its image may be missing if the asset failed)
  const logoP = paragraphs.find((p) => p.querySelector('img')
    || (p.children.length === 1 && p.firstElementChild.tagName === 'A' && !p.textContent.trim()));
  const textPs = paragraphs.filter((p) => p !== logoP);
  const row1 = el('div', 'footer-legal-row');
  if (textPs[0]) row1.append(textPs[0]);
  if (logoP) {
    const link = logoP.querySelector('a') || logoP.querySelector('img');
    link.classList.add('footer-legal-logo');
    row1.append(link);
  }
  inner.append(row1);
  if (textPs.length > 1) {
    const row2 = el('div', 'footer-legal-row');
    textPs.slice(1).forEach((p) => {
      p.classList.add('footer-fineprint');
      row2.append(p);
    });
    inner.append(row2);
  }
  legal.append(inner);
  return legal;
}

/**
 * Campaign footer (page metadata "footer: ppc", from footer-ppc.plain.html in the page's area).
 * Sections: 1. logo, address, legal links  2. copyright, social icon links  3. regulatory notes.
 */
async function buildCampaign(block, fragment) {
  const [brand, copyright, regulatory] = [...fragment.children];
  const parts = [];
  if (brand) {
    const [logo, ...rest] = [...brand.children];
    logo?.classList.add('footer-ppc-logo');
    rest.find((n) => n.tagName === 'P')?.classList.add('footer-ppc-address');
    brand.querySelector(':scope > ul')?.classList.add('footer-ppc-legal');
    parts.push(el('div', 'footer-ppc-brand', ...brand.childNodes));
  }
  if (copyright) {
    copyright.querySelector(':scope > ul')?.classList.add('footer-social', 'footer-ppc-social');
    parts.push(el('div', 'footer-ppc-copyright', ...copyright.childNodes));
  }
  const inner = el('div', 'footer-ppc-inner', ...parts);
  const sections = [inner];
  if (regulatory) sections.push(el('div', 'footer-ppc-regulatory', ...regulatory.childNodes));
  await Promise.all([...inner.querySelectorAll('.footer-social img')]
    .map((img) => inlineSvg(img, 'footer-social-icon')));
  sections.forEach((part) => part.querySelectorAll('a[href^="http"]').forEach((a) => {
    if (new URL(a.href).origin !== window.location.origin) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  }));
  block.closest('footer')?.classList.add('footer-ppc');
  block.append(...sections);
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const campaign = getMetadata('footer').toLowerCase() === 'ppc';
  const fragment = await fetchFooter(campaign ? 'footer-ppc' : 'footer');
  block.textContent = '';
  if (!fragment) return;
  if (campaign) {
    await buildCampaign(block, fragment);
    return;
  }
  const [intro, primary, secondary, backTop, legal, logos] = [...fragment.children];

  const inner = el('div', 'footer-inner');
  if (intro) inner.append(el('section', 'footer-intro', ...intro.childNodes));

  const columns = el('div', 'footer-columns');
  if (primary) {
    const list = primary.querySelector('ul');
    list?.classList.add('footer-links', 'footer-links-primary');
    columns.append(el('section', 'footer-column footer-column-primary', ...primary.childNodes));
  }
  if (secondary) {
    const [links, icons] = [...secondary.querySelectorAll(':scope > ul')];
    links?.classList.add('footer-links', 'footer-links-secondary');
    icons?.classList.add('footer-social');
    const wrap = el('div', 'footer-column-body', ...secondary.childNodes);
    columns.append(el('section', 'footer-column footer-column-secondary', wrap));
  }
  inner.append(columns);
  if (backTop) inner.append(buildBackToTop(backTop));

  const parts = [inner];
  if (legal) parts.push(buildLegal(legal));
  if (logos) {
    const list = logos.querySelector('ul');
    list?.classList.add('footer-logos');
    list?.querySelectorAll(':scope > li > a').forEach((a) => {
      const img = a.querySelector('img');
      if (img?.alt) a.setAttribute('aria-label', img.alt);
    });
    // unlinked logos get the same sizing wrapper as linked ones
    // (a bare <img> locally, a <picture> from AEM)
    list?.querySelectorAll(':scope > li > img, :scope > li > picture').forEach((media) => {
      const span = el('span', 'footer-logo-static');
      span.setAttribute('aria-label', media.querySelector('img')?.alt || media.alt || '');
      media.replaceWith(span);
      span.append(media);
    });
    parts.push(el('div', 'footer-brands', ...logos.childNodes));
  }

  // icons that change colour on hover are inlined
  await Promise.all([
    ...[...inner.querySelectorAll('.footer-social img')].map((img) => inlineSvg(img, 'footer-social-icon')),
    ...[...inner.querySelectorAll('.footer-top img')].map((img) => inlineSvg(img, 'footer-top-icon')),
  ]);

  // external links open in a new tab, like the source
  parts.forEach((part) => part.querySelectorAll('a[href^="http"]').forEach((a) => {
    if (new URL(a.href).origin !== window.location.origin) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  }));

  block.append(...parts);
}
