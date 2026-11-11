/* eslint-disable */
/* global WebImporter */

import introBoxParser from './parsers/intro-box.js';
import cardsProductParser from './parsers/cards-product.js';
import cardsFaqParser from './parsers/cards-faq.js';
import cleanupTransformer from './transformers/beckman-cleanup.js';
import sectionsTransformer from './transformers/beckman-sections.js';

const PAGE_TEMPLATE = {
  "name": "air-particle-counters",
  "urls": [
    "https://www.beckman.com/air-particle-counters",
    "https://www.mybeckman.in/particle-size-analyzers",
    "https://www.mybeckman.in/flow-cytometry"
  ],
  "representativeUrl": "https://www.beckman.com/air-particle-counters",
  "description": "Product category landing page: H1 + intro (optionally with applications callout box), grid of linked product series cards on a grey band, then FAQ or link lists.",
  "blocks": [
    {
      "name": "intro-box",
      "instances": [
        "div.product-heading-wrap > div.intro-container",
        ".intro-container"
      ]
    },
    {
      "name": "cards-product",
      "instances": [
        "div.product-series-callouts",
        ".product-series-callouts"
      ]
    },
    {
      "name": "cards-faq",
      "instances": [
        "div.bcls-aeo-faqs.container",
        ".bcls-aeo-faqs"
      ]
    }
  ],
  "urlPattern": "/*",
  "sections": [
    {
      "id": "section-0",
      "name": "Promotional banner",
      "selector": [
        "#internalPromotionalBanners"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": [
        "#internalPromotionalBanners > a"
      ]
    },
    {
      "id": "section-1",
      "name": "Intro with Common Applications box",
      "selector": [
        "div.product-series-selector-wrapper > div.product-content-wrap",
        ".product-content-wrap"
      ],
      "style": null,
      "blocks": [
        "intro-box"
      ],
      "defaultContent": [
        "div.product-heading-wrap > h1"
      ]
    },
    {
      "id": "section-2",
      "name": "Product series callout grid",
      "selector": [
        "div.product-series-selector-wrapper > div:has(> .product-series-callouts)",
        ".product-series-callouts"
      ],
      "style": "light-grey",
      "blocks": [
        "cards-product"
      ],
      "defaultContent": []
    },
    {
      "id": "section-3",
      "name": "FAQ on Air Particle Counters",
      "selector": [
        "div.bcls-aeo-faqs.container",
        ".bcls-aeo-faqs"
      ],
      "style": null,
      "blocks": [
        "cards-faq"
      ],
      "defaultContent": [
        "div.bcls-aeo-faqs > h2"
      ]
    },
    {
      "id": "section-4",
      "name": "Link lists (Applications / Resources / Technologies)",
      "selector": [
        "#main > div.main-holder > div.bc-rich-text"
      ],
      "style": "centered",
      "blocks": [],
      "defaultContent": [
        "div.bc-rich-text"
      ]
    }
  ]
};

const parsers = {
  'intro-box': introBoxParser,
  'cards-product': cardsProductParser,
  'cards-faq': cardsFaqParser,
};
// Late transformers change the DOM (section <hr> markers, shared fragments), so their beforeTransform
// runs after block discovery.
const sectionTransformers = [sectionsTransformer];
const fragmentTransformers = [];
const lateTransformers = [...sectionTransformers, ...fragmentTransformers];
const transformers = [cleanupTransformer, ...lateTransformers];
const earlyTransformers = transformers.filter((fn) => !lateTransformers.includes(fn));
// Catalog selectors (pageInstances, pageCleanup) count the <script> and <hr> elements the importer
// removes before transform, so a catalog template finds its targets in preprocess.
const CATALOG = Boolean(PAGE_TEMPLATE.pageCleanup || PAGE_TEMPLATE.blocks.some((b) => b.pageInstances));

function executeTransformers(hookName, element, payload, list = transformers) {
  const enhancedPayload = { ...payload, template: payload.params?.targets?.template || PAGE_TEMPLATE };
  list.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template, url) {
  const pageBlocks = [];
  const pageKey = (u) => {
    try { const { origin, pathname } = new URL(u); return `${origin}${pathname.replace(/\/$/, '')}`; }
    catch { return u; }
  };
  const key = pageKey(url);
  const claim = (blockDef, selector) => {
    let matches = [];
    try { matches = document.querySelectorAll(selector); } catch { return; }
    matches.forEach((element) => {
      if (pageBlocks.some((b) => b.element === element || b.element.contains(element) || element.contains(b.element))) return;
      pageBlocks.push({ name: blockDef.name, selector, element });
    });
  };
  template.blocks.forEach((blockDef) => {
    const entry = Object.entries(blockDef.pageInstances || {}).find(([u]) => pageKey(u) === key);
    (entry ? entry[1] : []).forEach((selector) => claim(blockDef, selector));
  });
  template.blocks.forEach((blockDef) => (blockDef.instances || []).forEach((selector) => claim(blockDef, selector)));
  return pageBlocks;
}

// Runs the early transformers, then marks each block and section target with an attribute: the
// importer re-creates the body before transform, so only attributes survive, not element references.
function markPageTargets(payload) {
  const { document, params } = payload;
  executeTransformers('beforeTransform', document.body, payload, earlyTransformers);
  const blocks = findBlocksOnPage(document, PAGE_TEMPLATE, params.originalURL).map(({ name, selector, element }, i) => {
    element.setAttribute('data-excat-block', String(i));
    return { name, selector };
  });
  const sections = (PAGE_TEMPLATE.sections || []).map((section, i) => {
    const target = (section.selector || []).map((s) => { try { return document.querySelector(s); } catch { return null; } }).find(Boolean);
    if (!target) return section;
    target.setAttribute('data-excat-section', String(i));
    return { ...section, selector: [`[data-excat-section="${i}"]`] };
  });
  params.targets = { blocks, template: { ...PAGE_TEMPLATE, sections } };
}

export default {
  preprocess: (payload) => {
    executeTransformers('preprocess', payload.document.body, payload, earlyTransformers);
    if (CATALOG) markPageTargets(payload);
  },
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;
    params.fragments = [];

    if (!params.targets) markPageTargets(payload);
    const pageBlocks = params.targets.blocks
      .map((block, i) => ({ ...block, element: document.querySelector(`[data-excat-block="${i}"]`) }))
      .filter((block) => block.element);
    executeTransformers('beforeTransform', main, { ...payload, pageBlocks }, lateTransformers);

    pageBlocks.forEach((block) => {
      if (!main.contains(block.element)) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    // India pages (mybeckman.in) live under /in/: keep their site-relative links in that area
    const LOCALES = { 'www.mybeckman.in': '/in' };
    const locale = LOCALES[new URL(params.originalURL).hostname] || '';
    if (locale) {
      main.querySelectorAll('a[href^="/"]').forEach((a) => {
        const h = a.getAttribute('href');
        if (!h.startsWith('//') && !h.startsWith(`${locale}/`)) a.setAttribute('href', `${locale}${h}`);
      });
    }

    main.appendChild(document.createElement('hr'));
    WebImporter.rules.createMetadata(main, document);
    // page template -> body class (aem.js decorateTemplateAndTheme)
    const metaTable = [...main.querySelectorAll('table')].find((t) => (t.querySelector('th, td')?.textContent || '').trim().toLowerCase() === 'metadata');
    if (metaTable) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td>template</td><td></td>';
      tr.lastElementChild.textContent = PAGE_TEMPLATE.name;
      (metaTable.tBodies[0] || metaTable).append(tr);
    }
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    params.fragments.forEach(({ element }) => {
      executeTransformers('afterTransform', element, payload, earlyTransformers);
      WebImporter.rules.transformBackgroundImages(element, document);
      WebImporter.rules.adjustImageUrls(element, url, params.originalURL);
    });

    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(`${locale}${rawPath === '' ? '/index' : rawPath}`);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }, ...params.fragments];
  },
};
