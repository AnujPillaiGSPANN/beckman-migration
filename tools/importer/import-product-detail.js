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
import cardsDoclistParser from './parsers/cards-doclist.js';
import cardsGradientParser from './parsers/cards-gradient.js';
import heroPromoParser from './parsers/hero-promo.js';
import cardsWorkflowParser from './parsers/cards-workflow.js';
import cardsStepsParser from './parsers/cards-steps.js';
import cardsDownloadsParser from './parsers/cards-downloads.js';
import embedParser from './parsers/embed.js';
import cleanupTransformer from './transformers/beckman-cleanup.js';
import sectionsTransformer from './transformers/beckman-sections.js';

const PAGE_TEMPLATE = {
  "name": "product-detail",
  "urls": [
    "https://www.beckman.com/cell-culture-workstation/cydem-vt",
    "https://www.beckman.com/air-particle-counters/met-one-3400-plus",
    "https://www.beckman.com/air-particle-counters/met-one-6000",
    "https://www.beckman.com/air-particle-counters/facility-monitoring-system",
    "https://www.beckman.com/cell-counters-and-analyzers/vi-cell-blu",
    "https://www.mybeckman.in/reagents/centrifugation/density-gradient-reagents",
    "https://www.mybeckman.in/supplies/microbioreactor-supplies/plate-covers/sealing-foil-basic",
    "https://www.mybeckman.in/flow-cytometry/software/cytobank-enterprise",
    "https://www.mybeckman.in/liquid-handlers/software/echo/21-cfr-part-11-compliance-manager"
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
    },
    {
      "name": "cards-doclist",
      "instances": [
        "#product-documentation-wrapper div.content-resource-list-wrapper"
      ]
    },
    {
      "name": "cards-gradient",
      "instances": [
        "div.viblue-cards"
      ]
    },
    {
      "name": "hero-promo",
      "instances": [
        "div.banner-val"
      ]
    },
    {
      "name": "cards-workflow",
      "instances": [
        "div.container-wf",
        "div.bc-rich-text > div.container-wf"
      ]
    },
    {
      "name": "cards-steps",
      "instances": [
        "div.sample-analysis-wf",
        "div.carousel-plate"
      ]
    },
    {
      "name": "cards-downloads",
      "instances": [
        "div.resources-container"
      ]
    },
    {
      "name": "embed",
      "instances": [
        "div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(2) iframe[src*='youtube.com']"
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
  ],
  "pages": {
    "https://www.beckman.com/air-particle-counters/met-one-3400-plus": {
      "blocks": {
        "carousel-gallery": [
          "div.product-intro-wrapper div.lt-holder div.product-gallery-carousel"
        ],
        "cards-doclist": [
          "#product-documentation-wrapper div.content-resource-list-wrapper"
        ],
        "carousel-product": [
          "#related-parts-wrapper"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Promotional banner",
          "selector": [
            "#main > div.main-holder > div.container.custome-container:nth-of-type(1) > #internalPromotionalBanners"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": [
            "#internalPromotionalBanners > a"
          ]
        },
        {
          "id": "section-2",
          "name": "Product intro: gallery beside title, copy, features, benefits, resource links, CTAs, Resources + Tools",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.product-intro-wrapper"
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
          "id": "section-3",
          "name": "In-page jump navigation bar",
          "selector": [
            "#intrenal-page-link-wrapper"
          ],
          "style": "anchor-tabs",
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-4",
          "name": "Content and Resources",
          "selector": [
            "#product-documentation-wrapper"
          ],
          "style": null,
          "blocks": [
            "cards-doclist"
          ],
          "defaultContent": [
            "#product-documentation-wrapper div.product-page-sub-heading-wrapper > h3"
          ]
        },
        {
          "id": "section-5",
          "name": "Technical Documents",
          "selector": [
            "#techdocs-wrapper"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-6",
          "name": "Related Parts slider",
          "selector": [
            "#related-parts-wrapper"
          ],
          "style": null,
          "blocks": [
            "carousel-product"
          ],
          "defaultContent": []
        }
      ]
    },
    "https://www.beckman.com/air-particle-counters/met-one-6000": {
      "blocks": {
        "carousel-gallery": [
          "div.product-intro-wrapper div.lt-holder div.product-gallery-carousel"
        ],
        "feature-modules": [
          "#features-wrapper > div.bc-columns.row"
        ],
        "cards-resource": [
          "div.download-res > div"
        ],
        "cards-doclist": [
          "#product-documentation-wrapper div.content-resource-list-wrapper"
        ],
        "cards-faq": [
          "div.bcls-aeo-faqs"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Product intro: product image beside title, copy, check list, CTAs, Resources + Tools links",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.product-intro-wrapper"
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
          "name": "In-page jump navigation bar",
          "selector": [
            "#intrenal-page-link-wrapper"
          ],
          "style": "anchor-tabs",
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Features",
          "selector": [
            "#features-wrapper"
          ],
          "style": null,
          "blocks": [
            "feature-modules"
          ],
          "defaultContent": [
            "#features-wrapper > div.product-page-sub-heading-wrapper"
          ]
        },
        {
          "id": "section-4",
          "name": "Explore the Full Potential (application note download)",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> div.download-res)"
          ],
          "style": null,
          "blocks": [
            "cards-resource"
          ],
          "defaultContent": [
            "div.bc-rich-text > div.product-page-sub-heading-wrapper"
          ]
        },
        {
          "id": "section-5",
          "name": "Content and Resources",
          "selector": [
            "#product-documentation-wrapper"
          ],
          "style": null,
          "blocks": [
            "cards-doclist"
          ],
          "defaultContent": []
        },
        {
          "id": "section-6",
          "name": "Technical Documents",
          "selector": [
            "#techdocs-wrapper"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-7",
          "name": "FAQ",
          "selector": [
            "div.spotlight-content-wrapper div.bcls-aeo-faqs.container"
          ],
          "style": null,
          "blocks": [
            "cards-faq"
          ],
          "defaultContent": []
        }
      ]
    },
    "https://www.beckman.com/air-particle-counters/facility-monitoring-system": {
      "blocks": {
        "carousel-gallery": [
          "div.product-intro-wrapper div.lt-holder div.product-gallery-carousel"
        ],
        "feature-modules": [
          "#features-wrapper > div.bc-columns.row"
        ],
        "cards-doclist": [
          "#product-documentation-wrapper div.content-resource-list-wrapper"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Product intro: image gallery beside title, description, check list, CTAs and Resources + Tools links",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.product-intro-wrapper"
          ],
          "style": "split",
          "blocks": [
            "carousel-gallery"
          ],
          "defaultContent": [
            "div.product-intro-wrapper div.rt-holder > h1",
            "div.product-intro-wrapper div.rt-holder > div:has(> a.product-table-link-btn)",
            "div.product-intro-wrapper div.resource-tool-table-wrapper"
          ]
        },
        {
          "id": "section-2",
          "name": "In-page jump navigation bar",
          "selector": [
            "#intrenal-page-link-wrapper"
          ],
          "style": "anchor-tabs",
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Features",
          "selector": [
            "#features-wrapper"
          ],
          "style": null,
          "blocks": [
            "feature-modules"
          ],
          "defaultContent": [
            "#features-wrapper > div.product-page-sub-heading-wrapper"
          ]
        },
        {
          "id": "section-4",
          "name": "Content and Resources",
          "selector": [
            "#product-documentation-wrapper"
          ],
          "style": null,
          "blocks": [
            "cards-doclist"
          ],
          "defaultContent": [
            "#product-documentation-wrapper div.product-page-sub-heading-wrapper"
          ]
        },
        {
          "id": "section-5",
          "name": "Technical Documents",
          "selector": [
            "#techdocs-wrapper"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": [
            "#techdocs-wrapper > div.product-page-sub-heading-wrapper"
          ]
        }
      ]
    },
    "https://www.beckman.com/cell-counters-and-analyzers/vi-cell-blu": {
      "blocks": {
        "carousel-gallery": [
          "div.product-intro-wrapper div.lt-holder div.product-gallery-carousel"
        ],
        "embed-wistia": [
          "div.spotlight-content-wrapper > div.embeded-video"
        ],
        "feature-modules": [
          "#features-wrapper > div.bc-columns.row"
        ],
        "cards-gradient": [
          "div.viblue-cards"
        ],
        "hero-promo": [
          "div.banner-val"
        ],
        "carousel-product": [
          "#related-parts-wrapper"
        ],
        "cards-workflow": [
          "div.container-wf"
        ],
        "cards-steps": [
          "div.sample-analysis-wf",
          "div.carousel-plate"
        ],
        "cards-downloads": [
          "div.resources-container"
        ],
        "cards-faq": [
          "div.bcls-aeo-faqs"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Product intro: gallery beside title, copy, check list and CTAs",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.product-intro-wrapper"
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
          "name": "In-page jump navigation bar",
          "selector": [
            "#intrenal-page-link-wrapper"
          ],
          "style": "anchor-tabs",
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Product Overview video",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(2)"
          ],
          "style": null,
          "blocks": [
            "embed-wistia"
          ],
          "defaultContent": []
        },
        {
          "id": "section-4",
          "name": "Features",
          "selector": [
            "#features-wrapper"
          ],
          "style": null,
          "blocks": [
            "feature-modules"
          ],
          "defaultContent": []
        },
        {
          "id": "section-5",
          "name": "Insights and Resources cards",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(6)"
          ],
          "style": null,
          "blocks": [
            "cards-gradient"
          ],
          "defaultContent": []
        },
        {
          "id": "section-6",
          "name": "Vi-CELL BLU 2.0 promo banner",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(7)"
          ],
          "style": null,
          "blocks": [
            "hero-promo"
          ],
          "defaultContent": []
        },
        {
          "id": "section-7",
          "name": "Related Parts slider",
          "selector": [
            "#related-parts-wrapper"
          ],
          "style": null,
          "blocks": [
            "carousel-product"
          ],
          "defaultContent": []
        },
        {
          "id": "section-8",
          "name": "Integrations tiles",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> div.container-wf)"
          ],
          "style": null,
          "blocks": [
            "cards-workflow"
          ],
          "defaultContent": []
        },
        {
          "id": "section-9",
          "name": "How it works: workflow steps",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> div.sample-analysis-wf) > div.product-page-sub-heading-wrapper"
          ],
          "style": null,
          "blocks": [
            "cards-steps"
          ],
          "defaultContent": []
        },
        {
          "id": "section-10",
          "name": "Carousel or plate",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> div.sample-analysis-wf) > h4"
          ],
          "style": "centered",
          "blocks": [
            "cards-steps"
          ],
          "defaultContent": []
        },
        {
          "id": "section-11",
          "name": "Technical Documents",
          "selector": [
            "#techdocs-wrapper"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-12",
          "name": "Content and Resources document list",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> div.resources-container)"
          ],
          "style": null,
          "blocks": [
            "cards-downloads"
          ],
          "defaultContent": []
        },
        {
          "id": "section-13",
          "name": "FAQ",
          "selector": [
            "#main > div.bcls-aeo-faqs.container"
          ],
          "style": null,
          "blocks": [
            "cards-faq"
          ],
          "defaultContent": []
        }
      ]
    },
    "https://www.mybeckman.in/reagents/centrifugation/density-gradient-reagents": {
      "blocks": {
        "carousel-gallery": [
          "div.product-intro-wrapper div.lt-holder div.product-gallery-carousel"
        ],
        "cards-icon": [
          "div.bc-rich-text:has(> a[name='applications']) > div.row"
        ],
        "table-specs": [
          "div.spotlight-content-wrapper > div.bc-rich-text > table:has(th)"
        ],
        "cards-resource": [
          "div.spotlight-content-wrapper > div.bc-rich-text:has(> a[name=\"Resources\"]) div.row:has(img.resources)",
          "div.spotlight-content-wrapper > div.bc-rich-text:has(> a[name=\"Resources\"]) + div.bc-rich-text div.row:has(img.resources)",
          "div.spotlight-content-wrapper > div.bc-rich-text:has(> a[name=\"Resources\"]) + div.bc-rich-text + div.bc-rich-text div.row:has(img.resources)"
        ],
        "cards-workflow": [
          "div.bc-rich-text > div.container-wf"
        ],
        "carousel-product": [
          "#related-parts-wrapper"
        ],
        "cards-faq": [
          "div.bcls-aeo-faqs"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Promotional banner",
          "selector": [
            "#internalPromotionalBanners"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": [
            "#internalPromotionalBanners > a > img"
          ]
        },
        {
          "id": "section-2",
          "name": "Product intro: gallery beside title, description, CTA and Resources + Tools",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.product-intro-wrapper"
          ],
          "style": "split",
          "blocks": [
            "carousel-gallery"
          ],
          "defaultContent": [
            "div.product-intro-wrapper div.rt-holder > h1",
            "div.rt-holder > div.resource-tool-table-wrapper"
          ]
        },
        {
          "id": "section-3",
          "name": "In-page jump navigation bar",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> div.parent)"
          ],
          "style": "anchor-nav",
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-4",
          "name": "Applications",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> a[name='applications'])"
          ],
          "style": "heading-tight",
          "blocks": [
            "cards-icon"
          ],
          "defaultContent": []
        },
        {
          "id": "section-5",
          "name": "Types of Density Gradients",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> a[name='types'])"
          ],
          "style": "heading-tight",
          "blocks": [
            "table-specs"
          ],
          "defaultContent": []
        },
        {
          "id": "section-6",
          "name": "Resources and Protocols",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> a[name='Resources'])"
          ],
          "style": "heading-tight",
          "blocks": [
            "cards-resource"
          ],
          "defaultContent": []
        },
        {
          "id": "section-7",
          "name": "Explore More Solutions for Density Gradient Centrifugation",
          "selector": [
            "div.spotlight-content-wrapper > div.bc-rich-text:has(> a[name='workflow'])"
          ],
          "style": null,
          "blocks": [
            "cards-workflow"
          ],
          "defaultContent": []
        },
        {
          "id": "section-8",
          "name": "Related Products slider",
          "selector": [
            "#related-parts-wrapper"
          ],
          "style": null,
          "blocks": [
            "carousel-product"
          ],
          "defaultContent": []
        },
        {
          "id": "section-9",
          "name": "Technical Documents",
          "selector": [
            "#techdocs-wrapper"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-10",
          "name": "FAQ",
          "selector": [
            "#main > div.main-holder > div.bcls-aeo-faqs.container"
          ],
          "style": null,
          "blocks": [
            "cards-faq"
          ],
          "defaultContent": []
        }
      ]
    },
    "https://www.mybeckman.in/supplies/microbioreactor-supplies/plate-covers/sealing-foil-basic": {
      "blocks": {
        "carousel-gallery": [
          "div.product-intro-wrapper div.lt-holder div.product-gallery-carousel"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Product intro: image gallery beside title, description and CTA",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.product-intro-wrapper"
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
          "name": "In-page jump navigation bar",
          "selector": [
            "#intrenal-page-link-wrapper"
          ],
          "style": "anchor-tabs",
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Technical Documents",
          "selector": [
            "#techdocs-wrapper"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-4",
          "name": "Legacy m2p-labs product detail: product family links, description, datasheet download",
          "selector": [
            "#main > div.main-holder > div.bc-rich-text"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": [
            "div.bc-rich-text div.csc-default.is-header h1",
            "nav.product-detail-nav > ul",
            "a.btn.is-call-to-action.product-detail-action",
            "p.product-detail-teaser",
            "div.product-detail-content > div.download-box-icon"
          ]
        }
      ]
    },
    "https://www.mybeckman.in/flow-cytometry/software/cytobank-enterprise": {
      "blocks": {
        "carousel-gallery": [
          "div.product-intro-wrapper div.lt-holder div.product-gallery-carousel"
        ],
        "feature-modules": [
          "#features-wrapper > div.bc-columns.row"
        ],
        "table-specs": [
          "#product-specification-wrapper div.specification-holder"
        ],
        "cards-doclist": [
          "#product-documentation-wrapper div.content-resource-list-wrapper"
        ],
        "carousel-product": [
          "#related-parts-wrapper > div.related-parts"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Product intro: product image beside title, copy, check list, CTAs, Resources + Tools links",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.product-intro-wrapper"
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
          "name": "In-page jump navigation bar",
          "selector": [
            "#intrenal-page-link-wrapper"
          ],
          "style": "anchor-tabs",
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Features",
          "selector": [
            "#features-wrapper"
          ],
          "style": null,
          "blocks": [
            "feature-modules"
          ],
          "defaultContent": [
            "#features-wrapper > div.product-page-sub-heading-wrapper"
          ]
        },
        {
          "id": "section-4",
          "name": "Specifications",
          "selector": [
            "#product-specification-wrapper"
          ],
          "style": null,
          "blocks": [
            "table-specs"
          ],
          "defaultContent": [
            "#product-specification-wrapper > div.product-page-sub-heading-wrapper"
          ]
        },
        {
          "id": "section-5",
          "name": "Content and Resources",
          "selector": [
            "#product-documentation-wrapper"
          ],
          "style": null,
          "blocks": [
            "cards-doclist"
          ],
          "defaultContent": [
            "#product-documentation-wrapper div.product-page-sub-heading-wrapper"
          ]
        },
        {
          "id": "section-6",
          "name": "Technical Documents",
          "selector": [
            "#techdocs-wrapper"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": [
            "#techdocs-wrapper > div.product-page-sub-heading-wrapper"
          ]
        },
        {
          "id": "section-7",
          "name": "Related Cytobank Products slider + RUO disclaimer",
          "selector": [
            "#related-parts-wrapper"
          ],
          "style": null,
          "blocks": [
            "carousel-product"
          ],
          "defaultContent": [
            "#related-parts-wrapper > div.product-page-sub-heading-wrapper",
            "#related-parts-wrapper + div.bc-rich-text"
          ]
        }
      ]
    },
    "https://www.mybeckman.in/liquid-handlers/software/echo/21-cfr-part-11-compliance-manager": {
      "blocks": {
        "carousel-gallery": [
          "div.product-intro-wrapper div.lt-holder div.product-gallery-carousel"
        ],
        "embed": [
          "div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(2) iframe[src*='youtube.com']"
        ],
        "table-specs": [
          "div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(3) > table.tg"
        ]
      },
      "sections": [
        {
          "id": "section-1",
          "name": "Product intro: product image beside title, subtitle, copy, check list, CTA, Resources + Tools links",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.product-intro-wrapper"
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
          "name": "Software Workflows",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.feature-holder.feature-parent-height > div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(1)"
          ],
          "style": null,
          "blocks": [],
          "defaultContent": []
        },
        {
          "id": "section-3",
          "name": "Webinar video",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.feature-holder.feature-parent-height > div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(2)"
          ],
          "style": null,
          "blocks": [
            "embed"
          ],
          "defaultContent": []
        },
        {
          "id": "section-4",
          "name": "Specifications",
          "selector": [
            "#main > div.main-holder > div.container.custome-container.product-spotlight-wrapper > div.feature-holder.feature-parent-height > div.spotlight-content-wrapper > div.bc-rich-text:nth-of-type(3)"
          ],
          "style": null,
          "blocks": [
            "table-specs"
          ],
          "defaultContent": []
        }
      ]
    }
  }
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
  'cards-doclist': cardsDoclistParser,
  'cards-gradient': cardsGradientParser,
  'hero-promo': heroPromoParser,
  'cards-workflow': cardsWorkflowParser,
  'cards-steps': cardsStepsParser,
  'cards-downloads': cardsDownloadsParser,
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
