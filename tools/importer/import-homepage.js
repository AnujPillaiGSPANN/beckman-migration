/* eslint-disable */
/* global WebImporter */
// Import script for the catalog template "homepage" (generated from tools/importer/page-templates.json).

import heroParser from './parsers/hero.js';
import cardsParser from './parsers/cards.js';
import embedParser from './parsers/embed.js';
import cleanupTransformer from './transformers/beckman-cleanup.js';
import sectionsTransformer from './transformers/beckman-sections.js';

const PAGE_TEMPLATE = {
  "name": "homepage",
  "urls": [
    "https://www.mybeckman.in/",
    "https://www.mybeckman.in/landing/liquidhandling/wksc-discount-10",
    "https://www.mybeckman.in/landing/liquidhandling/wksc-discount-20"
  ],
  "description": "Homepage-style page that opens with a full-width photo banner followed by promo and card rows",
  "blocks": [
    {
      "name": "hero",
      "instances": [],
      "pageInstances": {
        "https://www.mybeckman.in/": [
          "#main > div > div.relative.justify-end.sm\\:flex",
          "#about"
        ]
      }
    },
    {
      "name": "cards",
      "instances": [],
      "pageInstances": {
        "https://www.mybeckman.in/": [
          "#latest > div",
          "#main > div > div.gradient-section-background",
          "#service"
        ]
      }
    },
    {
      "name": "embed",
      "instances": [],
      "pageInstances": {
        "https://www.mybeckman.in/landing/liquidhandling/wksc-discount-10": [
          "#main > div > div:nth-child(3) > div.bc-test-layout > div > div.formassembly-container.marketo-two-column"
        ],
        "https://www.mybeckman.in/landing/liquidhandling/wksc-discount-20": [
          "#main > div > div:nth-child(3) > div.bc-test-layout > div > div.formassembly-container.marketo-two-column"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "home-hero",
      "name": "Hero banner",
      "selector": [
        "#main > div.main-holder > div.relative.justify-end"
      ],
      "style": null,
      "blocks": [
        "hero"
      ],
      "defaultContent": []
    },
    {
      "id": "home-jump",
      "name": "Jump links",
      "selector": [
        "#main > div.main-holder > div.jump-links"
      ],
      "style": "anchor-tabs",
      "blocks": [],
      "defaultContent": [
        "#main > div.main-holder > div.jump-links"
      ]
    },
    {
      "id": "home-latest",
      "name": "Fresh insights",
      "selector": [
        "#main > div.main-holder > div:has(> #latest)",
        "#latest"
      ],
      "style": null,
      "blocks": [
        "cards"
      ],
      "defaultContent": [
        "#latest > h2"
      ]
    },
    {
      "id": "home-topics",
      "name": "Popular topics",
      "selector": [
        "#main > div.main-holder > div.gradient-section-background"
      ],
      "style": "light-grey",
      "blocks": [
        "cards"
      ],
      "defaultContent": []
    },
    {
      "id": "home-diagnostics",
      "name": "Diagnostics note",
      "selector": [
        "#main > div.main-holder > div.mx-auto.bg-brand-gray-50"
      ],
      "style": "light-grey",
      "blocks": [],
      "defaultContent": [
        "#main > div.main-holder > div.mx-auto.bg-brand-gray-50"
      ]
    },
    {
      "id": "home-service",
      "name": "Service and technical support",
      "selector": [
        "#service"
      ],
      "style": "light-grey",
      "blocks": [
        "cards"
      ],
      "defaultContent": []
    },
    {
      "id": "home-about",
      "name": "Our company",
      "selector": [
        "#about"
      ],
      "style": null,
      "blocks": [
        "hero"
      ],
      "defaultContent": []
    },
    {
      "id": "promo-body",
      "name": "Promotion page body (discount landing pages)",
      "selector": [
        "#main > div.main-holder > div.container:has(.bc-test-layout)"
      ],
      "style": null,
      "blocks": [
        "embed"
      ],
      "defaultContent": [
        "#content-holder",
        "#main > div.main-holder > div.container:has(.bc-test-layout) div.bc-test-layout"
      ]
    }
  ],
  "pageCleanup": {
    "https://www.mybeckman.in/": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3496151677141527",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/liquidhandling/wksc-discount-10": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.07222292621517512",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/liquidhandling/wksc-discount-20": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.32170938833776197",
      "#teconsent",
      "#ModalPopup"
    ]
  }
};

const parsers = {
  'hero': heroParser,
  'cards': cardsParser,
  'embed': embedParser,
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
    // a source header without links is the logo-only header of campaign / landing pages
    const nav = payload.document.querySelector('#mainNav');
    payload.params.minimalHeader = Boolean(nav) && !nav.querySelector('a[href]');
    // campaign (PPC) pages use the short campaign footer
    payload.params.campaignFooter = Boolean(payload.document.querySelector('footer.ppc-template'));
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

    // Sitecore media links written relative to the page (-/media/x.ashx) resolve under the page's
    // folder; the media handler lives at the site root
    main.querySelectorAll('a[href*="-/media/"]').forEach((a) => {
      const h = a.getAttribute('href');
      const m = h.match(/^(?:https?:\/\/([^/]+))?[^?#]*?\/?(-\/media\/.*)$/);
      if (!m || /^https?:\/\/media\./.test(h)) return;
      const host = m[1] || new URL(params.originalURL).hostname;
      a.setAttribute('href', `https://${host}/${m[2]}`);
    });

    main.appendChild(document.createElement('hr'));
    WebImporter.rules.createMetadata(main, document);
    // page template -> body class (aem.js decorateTemplateAndTheme)
    const metaTable = [...main.querySelectorAll('table')].find((t) => (t.querySelector('th, td')?.textContent || '').trim().toLowerCase() === 'metadata');
    if (metaTable) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td>template</td><td></td>';
      tr.lastElementChild.textContent = PAGE_TEMPLATE.name;
      (metaTable.tBodies[0] || metaTable).append(tr);
      if (params.minimalHeader) {
        const hr = document.createElement('tr');
        hr.innerHTML = '<td>header</td><td>minimal</td>';
        (metaTable.tBodies[0] || metaTable).append(hr);
      }
      if (params.campaignFooter) {
        const fr = document.createElement('tr');
        fr.innerHTML = '<td>footer</td><td>ppc</td>';
        (metaTable.tBodies[0] || metaTable).append(fr);
      }
    }
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
    // local image copies (content/images/pim/…, see beckman-cleanup) stay site-root paths
    main.querySelectorAll('img[src]').forEach((img) => {
      const local = img.getAttribute('src').match(/^https?:\/\/[^/]+(\/images\/pim\/[^?#]+)/);
      if (local) img.setAttribute('src', local[1]);
    });

    // A fragment's nodes left `main` before afterTransform: finalize it the same way, without the
    // page-only section breaks and metadata.
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
