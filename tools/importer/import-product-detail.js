/* eslint-disable */
/* global WebImporter */

import carouselGalleryParser from './parsers/carousel-gallery.js';
import featureModulesParser from './parsers/feature-modules.js';
import embedWistiaParser from './parsers/embed-wistia.js';
import cardsIconParser from './parsers/cards-icon.js';
import mediaSplitParser from './parsers/media-split.js';
import cardsResourceParser from './parsers/cards-resource.js';
import carouselProductParser from './parsers/carousel-product.js';
import tableSpecsParser from './parsers/table-specs.js';
import cardsFaqParser from './parsers/cards-faq.js';
import cleanupTransformer from './transformers/beckman-cleanup.js';
import sectionsTransformer from './transformers/beckman-sections.js';

const PAGE_TEMPLATE = {
  "name": "product-detail",
  "urls": [
    "https://www.beckman.com/cell-culture-workstation/cydem-vt"
  ],
  "description": "Product detail (spotlight) page: image gallery + intro, jump-link bar, features modules, Wistia video, icon cards, media columns, resource cards, reagent slider, spec table, views, technical documents, FAQ.",
  "blocks": [
    {
      "name": "carousel-gallery",
      "instances": [
        "div.product-gallery-carousel"
      ]
    },
    {
      "name": "feature-modules",
      "instances": [
        "#features-wrapper div.bc-columns.row",
        "div.spotlight-content-wrapper div.bc-rich-text > table.responsive-table"
      ]
    },
    {
      "name": "embed-wistia",
      "instances": [
        "div.spotlight-content-wrapper > div.embeded-video"
      ]
    },
    {
      "name": "cards-icon",
      "instances": [
        "div.spotlight-content-wrapper > div.bc-rich-text > div.row:has(> div.col-sm-3)"
      ]
    },
    {
      "name": "media-split",
      "instances": [
        "div.spotlight-content-wrapper div.Section > div.responsive-table"
      ]
    },
    {
      "name": "cards-resource",
      "instances": [
        "div.spotlight-content-wrapper > div.bc-rich-text:has(> div.row > div.col-md-3)"
      ]
    },
    {
      "name": "carousel-product",
      "instances": [
        "#related-parts-wrapper"
      ]
    },
    {
      "name": "table-specs",
      "instances": [
        "div.spotlight-content-wrapper > div.bc-rich-text > table:not(.responsive-table):has(tr:nth-child(2))"
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
  "sections": [
    {
      "id": "section-1",
      "name": "Product intro (gallery + text)",
      "selector": [
        "div.product-intro-wrapper"
      ],
      "style": "split",
      "blocks": [
        "carousel-gallery"
      ],
      "defaultContent": [
        "div.product-intro-wrapper div.rt-holder"
      ]
    },
    {
      "id": "section-2",
      "name": "Jump links",
      "selector": [
        "div.spotlight-content-wrapper > div.bc-rich-text:has(div.parent) div.parent"
      ],
      "style": "anchor-nav",
      "blocks": [],
      "defaultContent": [
        "div.parent"
      ]
    },
    {
      "id": "section-3",
      "name": "Features, video, benefits, 3-day operation",
      "selector": [
        "#features-wrapper"
      ],
      "style": null,
      "blocks": [
        "feature-modules",
        "embed-wistia",
        "cards-icon",
        "media-split"
      ],
      "defaultContent": [
        "#features-wrapper > div.product-page-sub-heading-wrapper",
        "#features-wrapper > p"
      ]
    },
    {
      "id": "section-4",
      "name": "Resources",
      "selector": [
        "div.spotlight-content-wrapper > div.bc-rich-text:has(> div.row > div.col-md-3)"
      ],
      "style": null,
      "blocks": [
        "cards-resource"
      ],
      "defaultContent": []
    },
    {
      "id": "section-5",
      "name": "Reagents and consumables",
      "selector": [
        "div.spotlight-content-wrapper > #related-parts-wrapper",
        "#related-parts-wrapper"
      ],
      "style": null,
      "blocks": [
        "carousel-product"
      ],
      "defaultContent": []
    },
    {
      "id": "section-6",
      "name": "Technical instrument parameters",
      "selector": [
        "div.spotlight-content-wrapper > div.bc-rich-text:has(> div.product-page-sub-heading-wrapper):has(+ div.bc-rich-text > table)"
      ],
      "style": null,
      "blocks": [
        "table-specs",
        "feature-modules"
      ],
      "defaultContent": []
    },
    {
      "id": "section-7",
      "name": "Technical documents",
      "selector": [
        "div.spotlight-content-wrapper > div:has(#product-table-wrapper)"
      ],
      "style": null,
      "blocks": [],
      "defaultContent": []
    },
    {
      "id": "section-8",
      "name": "FAQ",
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
    }
  ]
};

const parsers = {
  'carousel-gallery': carouselGalleryParser,
  'feature-modules': featureModulesParser,
  'embed-wistia': embedWistiaParser,
  'cards-icon': cardsIconParser,
  'media-split': mediaSplitParser,
  'cards-resource': cardsResourceParser,
  'carousel-product': carouselProductParser,
  'table-specs': tableSpecsParser,
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
