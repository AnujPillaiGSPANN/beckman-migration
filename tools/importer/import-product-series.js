/* eslint-disable */
/* global WebImporter */

import heroVideoParser from './parsers/hero-video.js';
import introVideoParser from './parsers/intro-video.js';
import accordionIconGridParser from './parsers/accordion-icon-grid.js';
import tableComparisonParser from './parsers/table-comparison.js';
import mediaSplitParser from './parsers/media-split.js';
import cardsScrollParser from './parsers/cards-scroll.js';
import carouselProductParser from './parsers/carousel-product.js';
import embedMarketoParser from './parsers/embed-marketo.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import carouselTestimonialParser from './parsers/carousel-testimonial.js';
import tableSpecsParser from './parsers/table-specs.js';
import accordionRailParser from './parsers/accordion-rail.js';
import heroBannerParser from './parsers/hero-banner.js';
import embedWistiaParser from './parsers/embed-wistia.js';
import cardsTilesParser from './parsers/cards-tiles.js';
import cleanupTransformer from './transformers/beckman-cleanup.js';
import sectionsTransformer from './transformers/beckman-sections.js';

const PAGE_TEMPLATE = {
  "name": "product-series",
  "urls": [
    "https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations",
    "https://www.beckman.com/liquid-handlers/echo-acoustic",
    "https://www.mybeckman.in/flow-cytometry/research-flow-cytometers/cytoflex/software",
    "https://www.mybeckman.in/resources/reading-material/whitepapers/gmp-cleanrooms-classification-and-routine-environmental-monitoring",
    "https://www.mybeckman.in/resources/reading-material/whitepapers/met-one-3400-plus-it-implementation-guide",
    "https://www.mybeckman.in/resources/technologies/analytical-ultracentrifugation"
  ],
  "description": "Product series page: video hero, intro with video, benefits icon accordion, model comparison, custom automation media columns, brochure and application scroll strips, related products slider, Marketo contact form.",
  "blocks": [
    {
      "name": "hero-video",
      "instances": [
        "div.bc-rich-text:has(.eCardContainer)"
      ]
    },
    {
      "name": "intro-video",
      "instances": [
        "div.two-columns-holder"
      ]
    },
    {
      "name": "accordion-icon-grid",
      "instances": [
        "#Benefits + div"
      ]
    },
    {
      "name": "table-comparison",
      "instances": [
        "#Models + div"
      ]
    },
    {
      "name": "media-split",
      "instances": [
        "div.containercustom:has(ul.cusautolist) > div.row"
      ]
    },
    {
      "name": "cards-scroll",
      "instances": [
        "div.brochures.brochure-scroll",
        "div.LatestNews.h-scroll-container"
      ]
    },
    {
      "name": "carousel-product",
      "instances": [
        "#related-parts-wrapper"
      ]
    },
    {
      "name": "embed-marketo",
      "instances": [
        "div.formassembly-container.marketo-two-column"
      ]
    },
    {
      "name": "accordion-faq",
      "instances": [
        "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder:nth-of-type(5)"
      ]
    },
    {
      "name": "carousel-testimonial",
      "instances": [
        "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder:nth-of-type(7)"
      ]
    },
    {
      "name": "table-specs",
      "instances": [
        "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > table:nth-of-type(1)",
        "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > table:nth-of-type(2)"
      ]
    },
    {
      "name": "accordion-rail",
      "instances": [
        "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__right > div.rail-navigation"
      ]
    },
    {
      "name": "hero-banner",
      "instances": [
        "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.bc-rich-text:nth-of-type(2) > div.outimg > div.top-banner"
      ]
    },
    {
      "name": "embed-wistia",
      "instances": [
        "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.embeded-video.embeded-video--center.embeded-video--col-6:nth-of-type(4)",
        "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.embeded-video.embeded-video--center.embeded-video--col-6:nth-of-type(7) > div.embeded-video__wrapper"
      ]
    },
    {
      "name": "cards-tiles",
      "instances": [
        "#applications > div.copy > div.cards-row",
        "#methods > div.copy:nth-of-type(2) > div.cards-row:nth-of-type(1)",
        "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.row:nth-of-type(9)"
      ]
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "name": "Hero",
      "selector": [
        "div.bc-test-layout:has(.eCardContainer)"
      ],
      "style": null,
      "blocks": [
        "hero-video"
      ],
      "defaultContent": []
    },
    {
      "id": "section-2",
      "name": "Intro with video",
      "selector": [
        "div.two-columns-holder"
      ],
      "style": null,
      "blocks": [
        "intro-video"
      ],
      "defaultContent": []
    },
    {
      "id": "section-3",
      "name": "Benefits / Models / Custom automation / Brochures",
      "selector": [
        "div.bc-test-layout:has(#Benefits)"
      ],
      "style": "centered",
      "blocks": [
        "accordion-icon-grid",
        "table-comparison",
        "media-split",
        "cards-scroll"
      ],
      "defaultContent": [
        "#Benefits",
        "#Models",
        "div.containercustom:has(ul.cusautolist) > h2",
        "div.containercustom:has(.brochures) > h2",
        "div.containercustom:has(.brochures) > p"
      ]
    },
    {
      "id": "section-4",
      "name": "Used together with / Explore applications",
      "selector": [
        "div.bc-test-layout:has(#related-parts-wrapper)"
      ],
      "style": "centered",
      "blocks": [
        "carousel-product",
        "cards-scroll"
      ],
      "defaultContent": [
        "div.bc-rich-text:has(+ #related-parts-wrapper) h2",
        "div.containercustom:has(.LatestNews) > h2"
      ]
    },
    {
      "id": "section-5",
      "name": "Contact us",
      "selector": [
        "div.bc-rich-text:has(+ div.formassembly-container)"
      ],
      "style": "light-grey, centered",
      "blocks": [
        "embed-marketo"
      ],
      "defaultContent": [
        "div.bc-rich-text:has(+ div.formassembly-container)",
        "div.formassembly-container + div.bc-rich-text"
      ]
    }
  ],
  "pages": {
    "https://www.beckman.com/liquid-handlers/echo-acoustic": {
      "blocks": {
        "hero-video": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(2)"
        ],
        "intro-video": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder:nth-of-type(3)"
        ],
        "accordion-icon-grid": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(4) > div.block > div.bc-rich-text:nth-of-type(1) > div.containercustom"
        ],
        "table-comparison": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(4) > div.block > div.bc-rich-text:nth-of-type(2) > div.containercustom > div.comparison-table-large"
        ],
        "media-split": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(4) > div.block > div.bc-rich-text:nth-of-type(4) > div.containercustom > div.row"
        ],
        "cards-scroll": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(4) > div.block > div.bc-rich-text:nth-of-type(5) > div.containercustom > div.brochures",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(8) > div.block > div.bc-rich-text:nth-of-type(3) > div.containercustom > div.LatestNews"
        ],
        "accordion-faq": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder:nth-of-type(5)"
        ],
        "carousel-testimonial": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder:nth-of-type(7)"
        ],
        "carousel-product": [
          "#related-parts-wrapper"
        ],
        "embed-marketo": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(8) > div.block > div.formassembly-container.marketo-two-column"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Hero with looping background video",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(2)"
          ],
          "style": null,
          "blocks": [
            "hero-video"
          ],
          "defaultContent": []
        },
        {
          "id": "section-2",
          "name": "Intro copy beside lab image",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder:nth-of-type(3)"
          ],
          "style": null,
          "blocks": [
            "intro-video"
          ],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Benefits, model comparison, custom automation, brochures",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(4) > div.block > div.bc-rich-text:nth-of-type(1)"
          ],
          "style": "centered",
          "blocks": [
            "accordion-icon-grid",
            "table-comparison",
            "media-split",
            "cards-scroll"
          ],
          "defaultContent": []
        },
        {
          "id": "section-4",
          "name": "FAQ accordion",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(4) > div.block > div.bc-rich-text:nth-of-type(6)"
          ],
          "style": "centered",
          "blocks": [
            "accordion-faq"
          ],
          "defaultContent": []
        },
        {
          "id": "section-5",
          "name": "Customer testimonials",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(6) > div.block > div.bc-rich-text:nth-of-type(2)"
          ],
          "style": "centered",
          "blocks": [
            "carousel-testimonial"
          ],
          "defaultContent": []
        },
        {
          "id": "section-6",
          "name": "Related products and applications",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(8) > div.block > div.bc-rich-text:nth-of-type(1)"
          ],
          "style": "centered",
          "blocks": [
            "carousel-product",
            "cards-scroll"
          ],
          "defaultContent": []
        },
        {
          "id": "section-7",
          "name": "Contact Us form",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout:nth-of-type(8) > div.block > div.bc-rich-text:nth-of-type(4)"
          ],
          "style": "light-grey, centered",
          "blocks": [
            "embed-marketo"
          ],
          "defaultContent": []
        }
      ]
    },
    "https://www.mybeckman.in/flow-cytometry/research-flow-cytometers/cytoflex/software": {
      "blocks": {
        "table-specs": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > table:nth-of-type(1)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > table:nth-of-type(2)"
        ],
        "accordion-rail": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__right > div.rail-navigation"
        ],
        "embed-marketo": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__right > div.formassembly-container"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Page title",
          "selector": [
            "#content-holder"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-2",
          "name": "Main column: intro, acquisition functions, analysis features, computer requirements",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left"
          ],
          "style": null,
          "blocks": [
            "table-specs",
            "table-specs"
          ],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Right sidebar: platform rail navigation and CytExpert software request form",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__right"
          ],
          "style": "sidebar",
          "blocks": [
            "accordion-rail",
            "embed-marketo"
          ],
          "defaultContent": []
        }
      ]
    },
    "https://www.mybeckman.in/resources/reading-material/whitepapers/gmp-cleanrooms-classification-and-routine-environmental-monitoring": {
      "blocks": {
        "embed-marketo": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__right > div.formassembly-container"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Page title",
          "selector": [
            "#content-holder"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-2",
          "name": "Main column: whitepaper article",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Right sidebar: gated-content form, helpful links, brochure",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__right"
          ],
          "style": "sidebar, quarter, centered",
          "blocks": [
            "embed-marketo"
          ],
          "defaultContent": []
        }
      ]
    },
    "https://www.mybeckman.in/resources/reading-material/whitepapers/met-one-3400-plus-it-implementation-guide": {
      "blocks": {
        "media-split": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(3)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(9)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(11)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(13)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(14)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > p:nth-of-type(31)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > p:nth-of-type(33)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(15)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(16)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(18)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(19)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(20)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left > div.block > div.bc-rich-text > h2:nth-of-type(21)"
        ],
        "embed-marketo": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__right > div.formassembly-container"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Page title",
          "selector": [
            "#content-holder"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-2",
          "name": "Main column: whitepaper body (wired/wireless connectivity, users, LDAP, name services, machine groups, barcode, web browser, network shares/printing, firmware, logs, audit trail, database)",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__left"
          ],
          "style": null,
          "blocks": [
            "media-split",
            "media-split",
            "media-split",
            "media-split",
            "media-split",
            "media-split",
            "media-split",
            "media-split",
            "media-split",
            "media-split",
            "media-split",
            "media-split",
            "media-split"
          ],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Right sidebar: request-info form and whitepaper PDF download",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.two-columns-holder > div.row > div.two-columns-holder__right"
          ],
          "style": "sidebar, quarter, centered",
          "blocks": [
            "embed-marketo"
          ],
          "defaultContent": []
        }
      ]
    },
    "https://www.mybeckman.in/resources/technologies/analytical-ultracentrifugation": {
      "blocks": {
        "hero-banner": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.bc-rich-text:nth-of-type(2) > div.outimg > div.top-banner"
        ],
        "embed-wistia": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.embeded-video.embeded-video--center.embeded-video--col-6:nth-of-type(4)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.embeded-video.embeded-video--center.embeded-video--col-6:nth-of-type(7) > div.embeded-video__wrapper"
        ],
        "media-split": [
          "#benefits > div.copy.row",
          "#methods > div.copy.row"
        ],
        "cards-tiles": [
          "#applications > div.copy > div.cards-row",
          "#methods > div.copy:nth-of-type(2) > div.cards-row:nth-of-type(1)",
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.row:nth-of-type(9)"
        ],
        "embed-marketo": [
          "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.formassembly-container.marketo-two-column"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Hero banner",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.bc-rich-text:nth-of-type(2)"
          ],
          "style": null,
          "blocks": [
            "hero-banner"
          ],
          "defaultContent": []
        },
        {
          "id": "section-2",
          "name": "Contents jump bar",
          "selector": [
            "#quick-nav"
          ],
          "style": "anchor-contents",
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Introduction and AUC video",
          "selector": [
            "#introduction"
          ],
          "style": null,
          "blocks": [
            "embed-wistia"
          ],
          "defaultContent": []
        },
        {
          "id": "section-4",
          "name": "Key benefits",
          "selector": [
            "#benefits"
          ],
          "style": null,
          "blocks": [
            "media-split"
          ],
          "defaultContent": []
        },
        {
          "id": "section-5",
          "name": "Applications",
          "selector": [
            "#applications"
          ],
          "style": "light-grey",
          "blocks": [
            "cards-tiles"
          ],
          "defaultContent": []
        },
        {
          "id": "section-6",
          "name": "Methods",
          "selector": [
            "#methods"
          ],
          "style": null,
          "blocks": [
            "media-split",
            "cards-tiles"
          ],
          "defaultContent": []
        },
        {
          "id": "section-7",
          "name": "Testimonial video and related content",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.embeded-video.embeded-video--center.embeded-video--col-6:nth-of-type(7)"
          ],
          "style": "centered",
          "blocks": [
            "embed-wistia",
            "cards-tiles"
          ],
          "defaultContent": []
        },
        {
          "id": "section-8",
          "name": "Talk to an Expert form",
          "selector": [
            "#main > div.main-holder > div.container:nth-of-type(2) > div.bc-test-layout > div.block > div.bc-rich-text:nth-of-type(11)"
          ],
          "style": "light-grey, centered",
          "blocks": [
            "embed-marketo"
          ],
          "defaultContent": []
        }
      ]
    }
  }
};

const parsers = {
  'hero-video': heroVideoParser,
  'intro-video': introVideoParser,
  'accordion-icon-grid': accordionIconGridParser,
  'table-comparison': tableComparisonParser,
  'media-split': mediaSplitParser,
  'cards-scroll': cardsScrollParser,
  'carousel-product': carouselProductParser,
  'embed-marketo': embedMarketoParser,
  'accordion-faq': accordionFaqParser,
  'carousel-testimonial': carouselTestimonialParser,
  'table-specs': tableSpecsParser,
  'accordion-rail': accordionRailParser,
  'hero-banner': heroBannerParser,
  'embed-wistia': embedWistiaParser,
  'cards-tiles': cardsTilesParser,
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

// Per-page block + section selectors (template.pages[url]) for pages whose layout differs from the
// template's shared selectors. Pages without an entry use the shared blocks[].instances / sections.
function pageMapping(template, url) {
  const key = (u) => {
    try { const { origin, pathname } = new URL(u); return `${origin}${pathname.replace(/\/$/, '')}`; }
    catch { return u; }
  };
  const entry = Object.entries(template.pages || {}).find(([u]) => key(u) === key(url));
  return entry ? entry[1] : null;
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
  // a page mapped on its own (template.pages) uses only its own selectors
  const own = pageMapping(template, url);
  if (own) {
    template.blocks.forEach((blockDef) => (own.blocks[blockDef.name] || []).forEach((selector) => claim(blockDef, selector)));
    return pageBlocks;
  }
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
  const own = pageMapping(PAGE_TEMPLATE, params.originalURL);
  const sections = ((own && own.sections) || PAGE_TEMPLATE.sections || []).map((section, i) => {
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
    if (CATALOG || pageMapping(PAGE_TEMPLATE, payload.params.originalURL)) markPageTargets(payload);
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
    // local image copies (content/images/pim/…, see beckman-cleanup) stay site-root paths
    main.querySelectorAll('img[src]').forEach((img) => {
      const local = img.getAttribute('src').match(/^https?:\/\/[^/]+(\/images\/pim\/[^?#]+)/);
      if (local) img.setAttribute('src', local[1]);
    });

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
