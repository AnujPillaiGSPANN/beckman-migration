/* eslint-disable */
/* global WebImporter */
// Import script for the catalog template "landing-form-rail" (generated from tools/importer/page-templates.json).

import heroParser from './parsers/hero.js';
import embedParser from './parsers/embed.js';
import mediaSplitParser from './parsers/media-split.js';
import cardsParser from './parsers/cards.js';
import tableParser from './parsers/table.js';
import columnsParser from './parsers/columns.js';
import cleanupTransformer from './transformers/beckman-cleanup.js';
import sectionsTransformer from './transformers/beckman-sections.js';

const PAGE_TEMPLATE = {
  "name": "landing-form-rail",
  "urls": [
    "https://www.mybeckman.in/landing/cell-health/vi-cell-blu-or-cedex-hires",
    "https://www.mybeckman.in/landing/centrifuge/allegra-v15r",
    "https://www.mybeckman.in/landing/centrifuge/intellifuge",
    "https://www.mybeckman.in/landing/centrifuge/straight-up",
    "https://www.mybeckman.in/landing/china/promo-1",
    "https://www.mybeckman.in/landing/genomics/biomek-i7-automated-cosmcprep-plasmid-preparation",
    "https://www.mybeckman.in/landing/in-development/copy-of-moflo-astrios",
    "https://www.mybeckman.in/landing/japan/straight-up",
    "https://www.mybeckman.in/landing/liquidhandling/biomek-i7-pacbio-smrtbell-libary-prep",
    "https://www.mybeckman.in/landing/ppc/flow/aquios-minimize-user-error",
    "https://www.mybeckman.in/landing/ppc/flow/cytoflex",
    "https://www.mybeckman.in/landing/ppc/flow/high-throughput-flow-cytometer",
    "https://www.mybeckman.in/landing/ppc/flow/immunophenotyping",
    "https://www.mybeckman.in/landing/ppc/flow/nanoscale",
    "https://www.mybeckman.in/landing/ppc/flow/the-revolutionary-cytoflex-platform",
    "https://www.mybeckman.in/landing/ppc/part/hiac-9703",
    "https://www.mybeckman.in/landing/ppc/part/total-organic-carbon-analyzers",
    "https://www.mybeckman.in/landing/service/benefits-of-preventive-maintenance",
    "https://www.mybeckman.in/landing/service/pharmspec-upgrade",
    "https://www.mybeckman.in/landing/service/service-plan-benefits",
    "https://www.mybeckman.in/landing/service/warranty",
    "https://www.mybeckman.in/landing/viralvectors/adeno-associated-virus",
    "https://www.mybeckman.in/landing/viralvectors/density-gradients-made-simple",
    "https://www.mybeckman.in/landing/viralvectors/obtaining-high-purity-virus-with-ultracentrifugation",
    "https://www.mybeckman.in/resources/product-applications/cell-based-therapeutics/automated-cellular-analysis/automation-assistant",
    "https://www.mybeckman.in/resources/reading-material/application-notes/preparation-of-mouse-plasma-microsamples-for-lc-ms-ms-analysis",
    "https://www.mybeckman.in/resources/reading-material/application-notes/qbd1200-usp-system-suitability"
  ],
  "description": "Landing page: content column with a narrow right rail (col-md-3) holding a lead form",
  "blocks": [
    {
      "name": "hero",
      "instances": [
        "#content-holder:has(img, picture, [style*='background'])"
      ],
      "pageInstances": {
        "https://www.mybeckman.in/landing/centrifuge/straight-up": [
          "#content-holder"
        ],
        "https://www.mybeckman.in/landing/japan/straight-up": [
          "#content-holder"
        ]
      }
    },
    {
      "name": "embed",
      "instances": [
        "div.two-columns-holder__right div.formassembly-container:has(form, iframe, [class*=mkto])",
        "div.two-columns-holder__left [id^='wistia_grid_'] > div.w-video-wrapper"
      ],
      "pageInstances": {
        "https://www.mybeckman.in/landing/cell-health/vi-cell-blu-or-cedex-hires": [
          "#wistia_grid_45_center > div.w-video-wrapper.w-css-reset",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/centrifuge/allegra-v15r": [
          "#wistia_grid_31_center > div.w-video-wrapper.w-css-reset",
          "#wistia_grid_59_center > div.w-video-wrapper.w-css-reset",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container > div"
        ],
        "https://www.mybeckman.in/landing/centrifuge/intellifuge": [
          "#wistia_grid_59_center > div.w-video-wrapper.w-css-reset",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/centrifuge/straight-up": [
          "#wistia_grid_45_center > div.w-video-wrapper.w-css-reset",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container > div"
        ],
        "https://www.mybeckman.in/landing/genomics/biomek-i7-automated-cosmcprep-plasmid-preparation": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div > div"
        ],
        "https://www.mybeckman.in/landing/in-development/copy-of-moflo-astrios": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3"
        ],
        "https://www.mybeckman.in/landing/japan/straight-up": [
          "#wistia_grid_45_center > div.w-video-wrapper.w-css-reset",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container > div"
        ],
        "https://www.mybeckman.in/landing/liquidhandling/biomek-i7-pacbio-smrtbell-libary-prep": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div > div"
        ],
        "https://www.mybeckman.in/landing/ppc/flow/aquios-minimize-user-error": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3"
        ],
        "https://www.mybeckman.in/landing/ppc/flow/cytoflex": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/ppc/flow/high-throughput-flow-cytometer": [
          "#wistia_grid_31_center > div.w-video-wrapper.w-css-reset",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/ppc/flow/immunophenotyping": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3"
        ],
        "https://www.mybeckman.in/landing/ppc/flow/nanoscale": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3"
        ],
        "https://www.mybeckman.in/landing/ppc/flow/the-revolutionary-cytoflex-platform": [
          "#wistia_grid_31_center > div.w-video-wrapper.w-css-reset",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div > div"
        ],
        "https://www.mybeckman.in/landing/ppc/part/hiac-9703": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/ppc/part/total-organic-carbon-analyzers": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/service/benefits-of-preventive-maintenance": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/service/pharmspec-upgrade": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div:nth-child(2)"
        ],
        "https://www.mybeckman.in/landing/service/service-plan-benefits": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/service/warranty": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/viralvectors/adeno-associated-virus": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/viralvectors/density-gradients-made-simple": [
          "#wistia_grid_31_center > div.w-video-wrapper.w-css-reset",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/landing/viralvectors/obtaining-high-purity-virus-with-ultracentrifugation": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > iframe",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/resources/reading-material/application-notes/preparation-of-mouse-plasma-microsamples-for-lc-ms-ms-analysis": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ],
        "https://www.mybeckman.in/resources/reading-material/application-notes/qbd1200-usp-system-suitability": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__right.col-md-3 > div.formassembly-container"
        ]
      }
    },
    {
      "name": "media-split",
      "instances": [
        "div.two-columns-holder__left div.container-fluid.min-vh-100",
        "div.two-columns-holder__left .bc-rich-text > :is(h2, h3, h4):has(> img[style*='float'])"
      ],
      "pageInstances": {
        "https://www.mybeckman.in/landing/cell-health/vi-cell-blu-or-cedex-hires": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(1) > div.container-fluid.min-vh-100"
        ],
        "https://www.mybeckman.in/landing/genomics/biomek-i7-automated-cosmcprep-plasmid-preparation": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > div:nth-child(2)",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > div:nth-child(4)",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > div:nth-child(5)"
        ],
        "https://www.mybeckman.in/landing/liquidhandling/biomek-i7-pacbio-smrtbell-libary-prep": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > div:nth-child(2)",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > div:nth-child(4)"
        ],
        "https://www.mybeckman.in/landing/ppc/flow/aquios-minimize-user-error": [
          "div.two-columns-holder__left .bc-rich-text > p:has(> img[style*='float'])"
        ],
        "https://www.mybeckman.in/landing/ppc/part/total-organic-carbon-analyzers": [
          "div.two-columns-holder__left .bc-rich-text > p:has(> img[style*='float'])"
        ]
      }
    },
    {
      "name": "cards",
      "instances": [
        "div.two-columns-holder__left div.downloadsArea"
      ],
      "pageInstances": {
        "https://www.mybeckman.in/landing/cell-health/vi-cell-blu-or-cedex-hires": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(3) > div"
        ],
        "https://www.mybeckman.in/landing/centrifuge/straight-up": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(1) > div > div.downloadsArea",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(2) > div"
        ],
        "https://www.mybeckman.in/landing/japan/straight-up": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(1) > div > div.downloadsArea",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(2) > div"
        ]
      }
    },
    {
      "name": "table",
      "instances": [],
      "pageInstances": {
        "https://www.mybeckman.in/landing/cell-health/vi-cell-blu-or-cedex-hires": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(1) > table"
        ],
        "https://www.mybeckman.in/landing/service/service-plan-benefits": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(3)"
        ],
        "https://www.mybeckman.in/landing/viralvectors/adeno-associated-virus": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > div:nth-child(6)",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > div:nth-child(11)"
        ],
        "https://www.mybeckman.in/landing/viralvectors/obtaining-high-purity-virus-with-ultracentrifugation": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > div"
        ]
      }
    },
    {
      "name": "columns",
      "instances": [
        "div.two-columns-holder__left .bc-rich-text > div.row:not(:has(img)):has(> [class*='col-']:nth-child(2))"
      ],
      "pageInstances": {
        "https://www.mybeckman.in/landing/cell-health/vi-cell-blu-or-cedex-hires": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(1) > div:nth-child(7) > div"
        ],
        "https://www.mybeckman.in/landing/centrifuge/allegra-v15r": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(2) > div:nth-child(2) > div"
        ],
        "https://www.mybeckman.in/landing/centrifuge/straight-up": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(1) > div > table > tbody > tr:nth-child(2)"
        ],
        "https://www.mybeckman.in/landing/japan/straight-up": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(1) > div > table > tbody > tr:nth-child(2)"
        ],
        "https://www.mybeckman.in/landing/ppc/flow/nanoscale": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > table > tbody > tr:nth-child(1)",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div > table > tbody > tr:nth-child(2)"
        ],
        "https://www.mybeckman.in/landing/ppc/part/hiac-9703": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(2)",
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(5)"
        ],
        "https://www.mybeckman.in/landing/service/benefits-of-preventive-maintenance": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9"
        ],
        "https://www.mybeckman.in/landing/service/service-plan-benefits": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div:nth-child(1)"
        ],
        "https://www.mybeckman.in/landing/service/warranty": [
          "#main > div > div:nth-child(3) > div.two-columns-holder > div > div.two-columns-holder__left.col-md-9 > div > div.two-columns-holder",
          "#main > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(3) > div:nth-of-type(2)",
          "#main > div > div:nth-of-type(2) > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(5) > div:nth-of-type(2)"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "page-title",
      "name": "Page title / banner",
      "selector": [
        "#content-holder"
      ],
      "style": null,
      "blocks": [
        "hero"
      ],
      "defaultContent": [
        "#content-holder h1",
        "#content-holder p"
      ]
    },
    {
      "id": "main-column",
      "name": "Main column: landing content",
      "selector": [
        "div.main-holder > div.container > div.two-columns-holder > div.row > div.two-columns-holder__left",
        "div.two-columns-holder > div.row > div.two-columns-holder__left",
        "div.two-columns-holder > div > div.two-columns-holder__left"
      ],
      "style": null,
      "blocks": [
        "table",
        "columns",
        "media-split",
        "embed",
        "cards"
      ],
      "defaultContent": [
        "div.two-columns-holder__left h1",
        "div.two-columns-holder__left h2",
        "div.two-columns-holder__left h3",
        "div.two-columns-holder__left p",
        "div.two-columns-holder__left ul",
        "div.two-columns-holder__left ol"
      ]
    },
    {
      "id": "form-rail",
      "name": "Right rail: lead form",
      "selector": [
        "div.main-holder > div.container > div.two-columns-holder > div.row > div.two-columns-holder__right",
        "div.two-columns-holder > div.row > div.two-columns-holder__right",
        "div.two-columns-holder > div > div.two-columns-holder__right"
      ],
      "style": "sidebar, quarter",
      "blocks": [
        "embed"
      ],
      "defaultContent": [
        "div.two-columns-holder__right h2",
        "div.two-columns-holder__right h3",
        "div.two-columns-holder__right p"
      ]
    }
  ],
  "pageCleanup": {
    "https://www.mybeckman.in/landing/cell-health/vi-cell-blu-or-cedex-hires": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.36411730873198167",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/centrifuge/allegra-v15r": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.08292120395639802",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/centrifuge/intellifuge": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7614076646799336",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/centrifuge/straight-up": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3876934125643664",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/china/promo-1": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3934388790335297",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/genomics/biomek-i7-automated-cosmcprep-plasmid-preparation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.904148453486251",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/in-development/copy-of-moflo-astrios": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7212153278361425",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/japan/straight-up": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5987955861918357",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/liquidhandling/biomek-i7-pacbio-smrtbell-libary-prep": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.24152745231748463",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/ppc/flow/aquios-minimize-user-error": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4903309508028725",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/ppc/flow/cytoflex": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.44011632788485955",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/ppc/flow/high-throughput-flow-cytometer": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8613622441940989",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/ppc/flow/immunophenotyping": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.18777655129786408",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/ppc/flow/nanoscale": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5294501856496926",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/ppc/flow/the-revolutionary-cytoflex-platform": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9383115040127593",
      "#teconsent",
      "#ModalPopup"
    ],
    "https://www.mybeckman.in/landing/ppc/part/hiac-9703": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5472239501822564",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/ppc/part/total-organic-carbon-analyzers": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8393039392112918",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/service/benefits-of-preventive-maintenance": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.22194881062846883",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/service/pharmspec-upgrade": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6251226270708748",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/service/service-plan-benefits": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.38828986475182703",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/service/warranty": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7818735810947239",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/viralvectors/adeno-associated-virus": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4875908739939746",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/viralvectors/density-gradients-made-simple": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.46965873264467073",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/landing/viralvectors/obtaining-high-purity-virus-with-ultracentrifugation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8822887785675356",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/resources/product-applications/cell-based-therapeutics/automated-cellular-analysis/automation-assistant": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6045227649285314",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/resources/reading-material/application-notes/preparation-of-mouse-plasma-microsamples-for-lc-ms-ms-analysis": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8884037484176975",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/resources/reading-material/application-notes/qbd1200-usp-system-suitability": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.41797633649880994",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ]
  }
};

const parsers = {
  'hero': heroParser,
  'embed': embedParser,
  'media-split': mediaSplitParser,
  'cards': cardsParser,
  'table': tableParser,
  'columns': columnsParser,
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
