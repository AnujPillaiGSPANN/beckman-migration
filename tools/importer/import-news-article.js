/* eslint-disable */
/* global WebImporter */
// Import script for the catalog template "news-article" (generated from tools/importer/page-templates.json).

import embedParser from './parsers/embed.js';
import columnsParser from './parsers/columns.js';
import tableParser from './parsers/table.js';
import mediaSplitParser from './parsers/media-split.js';
import cleanupTransformer from './transformers/beckman-cleanup.js';
import sectionsTransformer from './transformers/beckman-sections.js';

const PAGE_TEMPLATE = {
  "name": "news-article",
  "urls": [
    "https://www.mybeckman.in/news/2021-genomics-grant-recipients",
    "https://www.mybeckman.in/news/allegra-v-15r-benchtop-centrifuge-launched",
    "https://www.mybeckman.in/news/apostle-minimax-cfrna-cfnas-kit-launch",
    "https://www.mybeckman.in/news/aquios-cl-flow-cytometer-wins-two-awards-year-in-international-business-awards",
    "https://www.mybeckman.in/news/automated-cell-staining-in-drug-discovery",
    "https://www.mybeckman.in/news/beckman-coulter-and-uganda-national-health-service-pilot",
    "https://www.mybeckman.in/news/beckman-coulter-awards-two-educational-scholarships-to-advanced-analytical-ultracentrifugation",
    "https://www.mybeckman.in/news/beckman-coulter-expands-portfolio-of-standardized-clearllab-ivd-reagents",
    "https://www.mybeckman.in/news/beckman-coulter-launches-the-first-10-colour-ce-ivd-reagent-for-l-and-l-analysis",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-accelerates-drug-discovery-with-launch-of-cydem-vt",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-assets-of-reametrix-india-pvt-ltd",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-blue-ocean-biomedical",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-cytobank",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-and-10x-genomics-partner-to-enable-single-cell-workflow-automation",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-cytoflex-nano-launch",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-expands-3d-digital-campus",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-features-automated-solutions-and-systems-for-ngs",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-aquios-stem-system",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-basophil-activation-test",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-cellmek-sps",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-industry-first-infrared-dye-antibody-conjugates",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-industry-first-modular-spectral-flow-cytometry-solution",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-new-ffpe-isolation-reagent-kit",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-next-generation-cytoflex-srt-benchtop-cell-sorter",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-mobile-demo-lab-highlights-ascb-conference-plans",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-names-joe-fox-president",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-partners-with-fry-laboratories-and-bioid-genomics",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-releases-innovative-assay-to-quantify-antibody-aggregation",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-rolls-out-website-enhancements-that-require-customer-action",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-to-acquire-cytometer-maker-xitogen",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-to-invest-9-million-in-loveland-co",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-transforms-purification-with-the-launch-of-the-optimate-gradient-maker",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-wins-selectscience-award-for-best-new-clinical-instrumentation-of-2020",
    "https://www.mybeckman.in/news/beckman-coulter-premieres-fast-low-sample-volume-analyzer-at-interphex-2016",
    "https://www.mybeckman.in/news/beckman-coulter-to-donate-2500-to-aids-vancouver-at-ias-2015",
    "https://www.mybeckman.in/news/beckman-coulter-unveils-biomek-method-launcher",
    "https://www.mybeckman.in/news/beckman-coulter-unveils-next-generation-analytical-ultracentrifuge-at-analytica-2016",
    "https://www.mybeckman.in/news/beckman-coulters-cytoflex-lx-flow-cytometer-delivers-high-complexity-cellular-analysis",
    "https://www.mybeckman.in/news/biomek-i3-benchtop-liquid-handler",
    "https://www.mybeckman.in/news/bioz-honors-beckman-coulter-life-sciences-as-triple-award-winner-in-2019",
    "https://www.mybeckman.in/news/celebrating-75-years-in-centrifugation",
    "https://www.mybeckman.in/news/clearllab-10c-system-launch",
    "https://www.mybeckman.in/news/clinical-flow-cytometry-product-gains-fda-clearance",
    "https://www.mybeckman.in/news/collaboration-with-fry-laboratories-and-bioid-genomics-for-sars-cov-2-viral-detection",
    "https://www.mybeckman.in/news/commercial-release-of-anti-trbc2-conjugated-antibody-for-flow-cytometry",
    "https://www.mybeckman.in/news/cyto-2019-recap-with-beckman-coulter-life-sciences",
    "https://www.mybeckman.in/news/cytoflex-lx-uv-press-release",
    "https://www.mybeckman.in/news/echo-650-plus-series-acoustic-liquid-handlers",
    "https://www.mybeckman.in/news/evolution-of-flow-cytometry-as-a-drug-screening-platform",
    "https://www.mybeckman.in/news/fda-classifies-field-action-related-to-fc-500-and-epics-as-class-1-recall",
    "https://www.mybeckman.in/news/fda-clears-aquios-stem",
    "https://www.mybeckman.in/news/fda-clears-dxflex-flow-cytometer",
    "https://www.mybeckman.in/news/first-phase-of-colorado-research-and-development-hub",
    "https://www.mybeckman.in/news/first-us-ivd-test-delivering-flow-cytometric-leukemia-and-lymphoma-analysis",
    "https://www.mybeckman.in/news/flownamics-partnership-on-bioprocess-culture-monitoring-solution",
    "https://www.mybeckman.in/news/genetic-engineering-news-democratizing-flow-cytometry",
    "https://www.mybeckman.in/news/global-cares-award-winner-announced-at-ias-2018",
    "https://www.mybeckman.in/news/goodbye-manual-gating-of-flow-cytometry-data",
    "https://www.mybeckman.in/news/grant-awarded-to-indiana-university-school-of-medicine-and-beckman-coulter-life-sciences",
    "https://www.mybeckman.in/news/greg-milosevich-appointed-president",
    "https://www.mybeckman.in/news/hematologic-diagnostics-go-with-the-flow",
    "https://www.mybeckman.in/news/industry-first-reagent-certification-to-help-prepare-labs-for-ivdr",
    "https://www.mybeckman.in/news/inventor-of-beckman-coulter-life-sciences-cytoflex-flow-cytometer-honored",
    "https://www.mybeckman.in/news/investing-in-the-next-generation-of-researchers",
    "https://www.mybeckman.in/news/japan/2020-cytoflex-campaign",
    "https://www.mybeckman.in/news/japan/2020-flow-software-campaign",
    "https://www.mybeckman.in/news/japan/2020-gallios",
    "https://www.mybeckman.in/news/japan/2020apr13-emergency-declaration",
    "https://www.mybeckman.in/news/japan/2020june29-epics-xl",
    "https://www.mybeckman.in/news/japan/delivery-delay-of-repair-202004",
    "https://www.mybeckman.in/news/japan/met-one-3400-plus-press-release",
    "https://www.mybeckman.in/news/japan/rnadvance-viral-xp-reagent-kit-launch",
    "https://www.mybeckman.in/news/kaluza-12-cytometry-software-from-beckman-coulter-provides-world-class-speed-enhanced-ease-of-use",
    "https://www.mybeckman.in/news/kaluza-c-software-launch-for-clinical-labs",
    "https://www.mybeckman.in/news/kaluza-for-gallios-delivers-ease-of-use-analytical-power-for-researchers",
    "https://www.mybeckman.in/news/lab-sustainability-innovation",
    "https://www.mybeckman.in/news/labcyte-acquisition-to-expand-laboratory-automation-business",
    "https://www.mybeckman.in/news/launch-of-optima-auc-advances-protein-analysis-via-analytical-ultracentrifugation",
    "https://www.mybeckman.in/news/leading-cancer-research-lab-announced-as-winner-in-beckman-coulters-200k-cytoflex-contest",
    "https://www.mybeckman.in/news/m2p-labs-acquisition",
    "https://www.mybeckman.in/news/met-one-3400-plus-innov-awards",
    "https://www.mybeckman.in/news/met-one-3400-plus-launch",
    "https://www.mybeckman.in/news/michelle-caron-appointed-cfo",
    "https://www.mybeckman.in/news/microsoft-remote-desktop-protocol-vulnerability",
    "https://www.mybeckman.in/news/moflo-astrios-eq-delivers-simultaneous-high-speed-cell-sorting-and-sub-micron-particle-detection",
    "https://www.mybeckman.in/news/multinational-research-team-granted-eight-million-euros",
    "https://www.mybeckman.in/news/navios-flow-cytometer-from-beckman-coulter-cleared-for-diagnostic-use-in-us-and-china",
    "https://www.mybeckman.in/news/new-5000-ascb-kaluza-prize-supported-by-beckman-to-encourage-creative-graduate-student-research",
    "https://www.mybeckman.in/news/new-aquios-cl-clinical-cytometer-for-routine-applications-in-clinical-lab",
    "https://www.mybeckman.in/news/new-biomek-echo-one-system",
    "https://www.mybeckman.in/news/new-family-of-ffpe-reagent-kits",
    "https://www.mybeckman.in/news/news-articles/global/becls-launches-allegra-c-24r-and-allegra-c-34r-benchtop-centrifuges",
    "https://www.mybeckman.in/news/next-generation-biolector-xt-microbioreactor",
    "https://www.mybeckman.in/news/partners-with-automata-to-accelerate-ai-ready-laboratory-automation",
    "https://www.mybeckman.in/news/perfix-reagent-kits-deliver-probes-antibodies-into-cells",
    "https://www.mybeckman.in/news/powerful-new-cytobank-platform-upgrade-available-from-beckman-coulter-life-sciences",
    "https://www.mybeckman.in/news/rarity-biosciences-ab-partnership",
    "https://www.mybeckman.in/news/research-focused-website",
    "https://www.mybeckman.in/news/revolutionize-nucleic-acid-quantification-and-purification-through-liquid-handling",
    "https://www.mybeckman.in/news/rnadvance-viral-xp-reagent-kit-launch",
    "https://www.mybeckman.in/news/role-expansion-of-aquios-cl-flow-cytometer-in-routine-labs",
    "https://www.mybeckman.in/news/simplify-and-accelerate-your-cell-separation-with-automation",
    "https://www.mybeckman.in/news/supplemental-protocols-for-rna-isolation-from-viral-samples",
    "https://www.mybeckman.in/news/suzanne-foster-appointed-president-of-beckman-coulter-life-sciences",
    "https://www.mybeckman.in/news/valitacell-acquisition",
    "https://www.mybeckman.in/news/vi-cell-blu-vies-for-top-spot-in-cell-viability-analysis",
    "https://www.mybeckman.in/news/vicell-blu-20-software",
    "https://www.mybeckman.in/news/watchmaker-genomics-collaboration",
    "https://www.mybeckman.in/news/cytoflex-srt-benchtop-cell-sorter--wins-selectscience-award",
    "https://www.mybeckman.in/news/solidifying-its-leadership-position-in-clinical-flow-cytometry-bcls-receives-ivdr-certification",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-brightens-flow-cytometry-with-new-supernova-polymer-dyes-portfolio",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-industry-first-microbioreactor-light-array-module",
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-qbd1200plus-total-organic-carbon-analyzer",
    "https://www.mybeckman.in/news/fda-clears-aquios-cl-flow-cytometer-for-routine-immunophenotyping-applications-in-us-clinical-labs",
    "https://www.mybeckman.in/news/seminars-highlight-cyto-2013-offerings"
  ],
  "description": "News article: left rail (col-md-4) beside the article body",
  "blocks": [
    {
      "name": "embed",
      "instances": [],
      "pageInstances": {
        "https://www.mybeckman.in/news/2021-genomics-grant-recipients": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/allegra-v-15r-benchtop-centrifuge-launched": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/apostle-minimax-cfrna-cfnas-kit-launch": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/aquios-cl-flow-cytometer-wins-two-awards-year-in-international-business-awards": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/automated-cell-staining-in-drug-discovery": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-and-uganda-national-health-service-pilot": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-awards-two-educational-scholarships-to-advanced-analytical-ultracentrifugation": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-expands-portfolio-of-standardized-clearllab-ivd-reagents": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-launches-the-first-10-colour-ce-ivd-reagent-for-l-and-l-analysis": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-accelerates-drug-discovery-with-launch-of-cydem-vt": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-assets-of-reametrix-india-pvt-ltd": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-blue-ocean-biomedical": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-cytobank": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-and-10x-genomics-partner-to-enable-single-cell-workflow-automation": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-cytoflex-nano-launch": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-expands-3d-digital-campus": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-features-automated-solutions-and-systems-for-ngs": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-aquios-stem-system": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-basophil-activation-test": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-cellmek-sps": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-industry-first-infrared-dye-antibody-conjugates": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-industry-first-modular-spectral-flow-cytometry-solution": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-new-ffpe-isolation-reagent-kit": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-next-generation-cytoflex-srt-benchtop-cell-sorter": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-mobile-demo-lab-highlights-ascb-conference-plans": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-names-joe-fox-president": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-partners-with-fry-laboratories-and-bioid-genomics": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-releases-innovative-assay-to-quantify-antibody-aggregation": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-rolls-out-website-enhancements-that-require-customer-action": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-to-acquire-cytometer-maker-xitogen": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-to-invest-9-million-in-loveland-co": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-transforms-purification-with-the-launch-of-the-optimate-gradient-maker": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-wins-selectscience-award-for-best-new-clinical-instrumentation-of-2020": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-premieres-fast-low-sample-volume-analyzer-at-interphex-2016": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-to-donate-2500-to-aids-vancouver-at-ias-2015": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-unveils-biomek-method-launcher": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-unveils-next-generation-analytical-ultracentrifuge-at-analytica-2016": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulters-cytoflex-lx-flow-cytometer-delivers-high-complexity-cellular-analysis": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/biomek-i3-benchtop-liquid-handler": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/bioz-honors-beckman-coulter-life-sciences-as-triple-award-winner-in-2019": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/celebrating-75-years-in-centrifugation": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/clearllab-10c-system-launch": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/clinical-flow-cytometry-product-gains-fda-clearance": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/collaboration-with-fry-laboratories-and-bioid-genomics-for-sars-cov-2-viral-detection": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/commercial-release-of-anti-trbc2-conjugated-antibody-for-flow-cytometry": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/cyto-2019-recap-with-beckman-coulter-life-sciences": [
          "#news-detail-sidebar > div > div > div",
          "#news-content-block > div.text-grid > div.wistia_responsive_padding"
        ],
        "https://www.mybeckman.in/news/cytoflex-lx-uv-press-release": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/echo-650-plus-series-acoustic-liquid-handlers": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/evolution-of-flow-cytometry-as-a-drug-screening-platform": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/fda-classifies-field-action-related-to-fc-500-and-epics-as-class-1-recall": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/fda-clears-aquios-stem": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/fda-clears-dxflex-flow-cytometer": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/first-phase-of-colorado-research-and-development-hub": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/first-us-ivd-test-delivering-flow-cytometric-leukemia-and-lymphoma-analysis": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/flownamics-partnership-on-bioprocess-culture-monitoring-solution": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/genetic-engineering-news-democratizing-flow-cytometry": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/global-cares-award-winner-announced-at-ias-2018": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/goodbye-manual-gating-of-flow-cytometry-data": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/grant-awarded-to-indiana-university-school-of-medicine-and-beckman-coulter-life-sciences": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/greg-milosevich-appointed-president": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/hematologic-diagnostics-go-with-the-flow": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/industry-first-reagent-certification-to-help-prepare-labs-for-ivdr": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/inventor-of-beckman-coulter-life-sciences-cytoflex-flow-cytometer-honored": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/investing-in-the-next-generation-of-researchers": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/japan/2020-cytoflex-campaign": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/japan/2020-flow-software-campaign": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/japan/2020-gallios": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/japan/2020apr13-emergency-declaration": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/japan/2020june29-epics-xl": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/japan/delivery-delay-of-repair-202004": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/japan/met-one-3400-plus-press-release": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/japan/rnadvance-viral-xp-reagent-kit-launch": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/kaluza-12-cytometry-software-from-beckman-coulter-provides-world-class-speed-enhanced-ease-of-use": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/kaluza-c-software-launch-for-clinical-labs": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/kaluza-for-gallios-delivers-ease-of-use-analytical-power-for-researchers": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/lab-sustainability-innovation": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/labcyte-acquisition-to-expand-laboratory-automation-business": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/launch-of-optima-auc-advances-protein-analysis-via-analytical-ultracentrifugation": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/leading-cancer-research-lab-announced-as-winner-in-beckman-coulters-200k-cytoflex-contest": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/m2p-labs-acquisition": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/met-one-3400-plus-innov-awards": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/met-one-3400-plus-launch": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/michelle-caron-appointed-cfo": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/microsoft-remote-desktop-protocol-vulnerability": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/moflo-astrios-eq-delivers-simultaneous-high-speed-cell-sorting-and-sub-micron-particle-detection": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/multinational-research-team-granted-eight-million-euros": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/navios-flow-cytometer-from-beckman-coulter-cleared-for-diagnostic-use-in-us-and-china": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/new-5000-ascb-kaluza-prize-supported-by-beckman-to-encourage-creative-graduate-student-research": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/new-aquios-cl-clinical-cytometer-for-routine-applications-in-clinical-lab": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/new-biomek-echo-one-system": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/new-family-of-ffpe-reagent-kits": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/news-articles/global/becls-launches-allegra-c-24r-and-allegra-c-34r-benchtop-centrifuges": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/next-generation-biolector-xt-microbioreactor": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/partners-with-automata-to-accelerate-ai-ready-laboratory-automation": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/perfix-reagent-kits-deliver-probes-antibodies-into-cells": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/powerful-new-cytobank-platform-upgrade-available-from-beckman-coulter-life-sciences": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/rarity-biosciences-ab-partnership": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/research-focused-website": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/revolutionize-nucleic-acid-quantification-and-purification-through-liquid-handling": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/rnadvance-viral-xp-reagent-kit-launch": [
          "#news-detail-sidebar > div > div.signup-block.news-detail-row > div"
        ],
        "https://www.mybeckman.in/news/role-expansion-of-aquios-cl-flow-cytometer-in-routine-labs": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/simplify-and-accelerate-your-cell-separation-with-automation": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/supplemental-protocols-for-rna-isolation-from-viral-samples": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/suzanne-foster-appointed-president-of-beckman-coulter-life-sciences": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/valitacell-acquisition": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/vi-cell-blu-vies-for-top-spot-in-cell-viability-analysis": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/vicell-blu-20-software": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/watchmaker-genomics-collaboration": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/cytoflex-srt-benchtop-cell-sorter--wins-selectscience-award": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/solidifying-its-leadership-position-in-clinical-flow-cytometry-bcls-receives-ivdr-certification": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-brightens-flow-cytometry-with-new-supernova-polymer-dyes-portfolio": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-industry-first-microbioreactor-light-array-module": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-qbd1200plus-total-organic-carbon-analyzer": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/fda-clears-aquios-cl-flow-cytometer-for-routine-immunophenotyping-applications-in-us-clinical-labs": [
          "#news-detail-sidebar > div > div > div"
        ],
        "https://www.mybeckman.in/news/seminars-highlight-cyto-2013-offerings": [
          "#news-detail-sidebar > div > div > div"
        ]
      }
    },
    {
      "name": "columns",
      "instances": [],
      "pageInstances": {
        "https://www.mybeckman.in/news/apostle-minimax-cfrna-cfnas-kit-launch": [
          "#news-content-block > div.text-grid > div.row"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-aquios-stem-system": [
          "#news-content-block > div.text-grid > div.row"
        ],
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-names-joe-fox-president": [
          "#news-content-block > div.text-grid > div.row"
        ],
        "https://www.mybeckman.in/news/biomek-i3-benchtop-liquid-handler": [
          "#news-content-block > div.text-grid > div:nth-child(21)"
        ],
        "https://www.mybeckman.in/news/commercial-release-of-anti-trbc2-conjugated-antibody-for-flow-cytometry": [
          "#news-content-block > div.text-grid > div.row"
        ],
        "https://www.mybeckman.in/news/echo-650-plus-series-acoustic-liquid-handlers": [
          "#news-content-block > div.text-grid > div.row"
        ],
        "https://www.mybeckman.in/news/fda-clears-aquios-stem": [
          "#news-content-block > div.text-grid > div.row"
        ],
        "https://www.mybeckman.in/news/fda-clears-dxflex-flow-cytometer": [
          "#news-content-block > div.text-grid > div.row"
        ],
        "https://www.mybeckman.in/news/goodbye-manual-gating-of-flow-cytometry-data": [
          "#news-content-block > div.text-grid > div:nth-child(15)",
          "#news-content-block > div.text-grid > div:nth-child(16)"
        ],
        "https://www.mybeckman.in/news/grant-awarded-to-indiana-university-school-of-medicine-and-beckman-coulter-life-sciences": [
          "#news-content-block > div.text-grid > div.row"
        ],
        "https://www.mybeckman.in/news/investing-in-the-next-generation-of-researchers": [
          "#news-content-block > div.text-grid > div:nth-child(4)",
          "#news-content-block > div.text-grid > div:nth-child(13)",
          "#news-content-block > div.text-grid > div:nth-child(14)"
        ],
        "https://www.mybeckman.in/news/new-biomek-echo-one-system": [
          "#news-content-block > div.text-grid > div:nth-child(12)",
          "#news-content-block > div.text-grid > div:nth-child(13)"
        ],
        "https://www.mybeckman.in/news/partners-with-automata-to-accelerate-ai-ready-laboratory-automation": [
          "#news-content-block > div.text-grid > div.row"
        ],
        "https://www.mybeckman.in/news/revolutionize-nucleic-acid-quantification-and-purification-through-liquid-handling": [
          "#news-content-block > div.text-grid > div:nth-child(27)"
        ],
        "https://www.mybeckman.in/news/vicell-blu-20-software": [
          "#news-content-block > div.text-grid > div.row"
        ]
      }
    },
    {
      "name": "table",
      "instances": [],
      "pageInstances": {
        "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-cytobank": [
          "#news-content-block > div.text-grid > table"
        ],
        "https://www.mybeckman.in/news/cyto-2019-recap-with-beckman-coulter-life-sciences": [
          "#news-content-block > div.text-grid > table"
        ],
        "https://www.mybeckman.in/news/microsoft-remote-desktop-protocol-vulnerability": [
          "#news-content-block > div.text-grid > table:nth-child(12)",
          "#news-content-block > div.text-grid > table:nth-child(16)",
          "#news-content-block > div.text-grid > table:nth-child(20)",
          "#news-content-block > div.text-grid > table:nth-child(24)",
          "#news-content-block > div.text-grid > table:nth-child(28)",
          "#news-content-block > div.text-grid > table:nth-child(32)"
        ]
      }
    },
    {
      "name": "media-split",
      "instances": [],
      "pageInstances": {
        "https://www.mybeckman.in/news/biomek-i3-benchtop-liquid-handler": [
          "#news-content-block > div.text-grid > div:nth-child(3)"
        ],
        "https://www.mybeckman.in/news/revolutionize-nucleic-acid-quantification-and-purification-through-liquid-handling": [
          "#news-content-block > div.text-grid > div:nth-child(4)",
          "#news-content-block > div.text-grid > div:nth-child(5)",
          "#news-content-block > div.text-grid > div:nth-child(9)"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "news-rail",
      "name": "Email signup rail (left)",
      "selector": [
        "div.news-detail-wrapper > div.row > div.col-md-4",
        "#news-detail-sidebar"
      ],
      "style": "sidebar, left",
      "blocks": [
        "embed"
      ],
      "defaultContent": [
        "#news-detail-sidebar > div > div > strong",
        "#news-detail-sidebar > div > div.news-detail-sidebar-block.news-detail-row"
      ]
    },
    {
      "id": "news-body",
      "name": "News article",
      "selector": [
        "div.news-detail-wrapper > div.row > div.col-md-8",
        "#news-content-block"
      ],
      "style": null,
      "blocks": [
        "embed",
        "columns",
        "table",
        "media-split"
      ],
      "defaultContent": [
        "#news-content-block > div.content-top-bar",
        "#news-content-block > div.text-grid",
        "#news-content-block > div.text-grid > div.quote-card"
      ]
    }
  ],
  "pageCleanup": {
    "https://www.mybeckman.in/news/2021-genomics-grant-recipients": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8697249844244764",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/allegra-v-15r-benchtop-centrifuge-launched": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.430465147210479",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/apostle-minimax-cfrna-cfnas-kit-launch": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5216829715290678",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/aquios-cl-flow-cytometer-wins-two-awards-year-in-international-business-awards": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.010145461208219242",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/automated-cell-staining-in-drug-discovery": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3435758965303036",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-and-uganda-national-health-service-pilot": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.23070390421192521",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-awards-two-educational-scholarships-to-advanced-analytical-ultracentrifugation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.46297230839749204",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-expands-portfolio-of-standardized-clearllab-ivd-reagents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3730147671366282",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-launches-the-first-10-colour-ce-ivd-reagent-for-l-and-l-analysis": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3873909029090865",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-accelerates-drug-discovery-with-launch-of-cydem-vt": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9227231926758639",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-assets-of-reametrix-india-pvt-ltd": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9729146912772181",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-blue-ocean-biomedical": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.29541116683663693",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-acquires-cytobank": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7124251865381797",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-and-10x-genomics-partner-to-enable-single-cell-workflow-automation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.07484269748595695",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-cytoflex-nano-launch": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.45832219732261814",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-expands-3d-digital-campus": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.20929523788551063",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-features-automated-solutions-and-systems-for-ngs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6431388647131151",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-aquios-stem-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6575850756842122",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-basophil-activation-test": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.16962270393518553",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-cellmek-sps": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7591747421091851",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-industry-first-infrared-dye-antibody-conjugates": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.21831386196440428",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-industry-first-modular-spectral-flow-cytometry-solution": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3619409159389656",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-new-ffpe-isolation-reagent-kit": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9126056268479094",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-next-generation-cytoflex-srt-benchtop-cell-sorter": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8619130133442635",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-mobile-demo-lab-highlights-ascb-conference-plans": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.22289362934866774",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-names-joe-fox-president": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.746627564643308",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-partners-with-fry-laboratories-and-bioid-genomics": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.29387359087727727",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-releases-innovative-assay-to-quantify-antibody-aggregation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6768718364026948",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-rolls-out-website-enhancements-that-require-customer-action": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7922010162047874",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-to-acquire-cytometer-maker-xitogen": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8665484212230233",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-to-invest-9-million-in-loveland-co": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5894566225252696",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-transforms-purification-with-the-launch-of-the-optimate-gradient-maker": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8478900357128859",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-wins-selectscience-award-for-best-new-clinical-instrumentation-of-2020": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9246960047327215",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-premieres-fast-low-sample-volume-analyzer-at-interphex-2016": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8913165911174474",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-to-donate-2500-to-aids-vancouver-at-ias-2015": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9406657815976803",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-unveils-biomek-method-launcher": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5554984212449022",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-unveils-next-generation-analytical-ultracentrifuge-at-analytica-2016": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4164858474868941",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulters-cytoflex-lx-flow-cytometer-delivers-high-complexity-cellular-analysis": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3056335070497831",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/biomek-i3-benchtop-liquid-handler": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3260885072087426",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/bioz-honors-beckman-coulter-life-sciences-as-triple-award-winner-in-2019": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6514150259517387",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/celebrating-75-years-in-centrifugation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.233460438896254",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/clearllab-10c-system-launch": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.10956619045347438",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/clinical-flow-cytometry-product-gains-fda-clearance": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4047275899354468",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/collaboration-with-fry-laboratories-and-bioid-genomics-for-sars-cov-2-viral-detection": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3496274107204518",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/commercial-release-of-anti-trbc2-conjugated-antibody-for-flow-cytometry": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9860188578335458",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/cyto-2019-recap-with-beckman-coulter-life-sciences": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8507130222207696",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/cytoflex-lx-uv-press-release": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.08152788195450023",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/echo-650-plus-series-acoustic-liquid-handlers": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1403337689455909",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/evolution-of-flow-cytometry-as-a-drug-screening-platform": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5875455943403295",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/fda-classifies-field-action-related-to-fc-500-and-epics-as-class-1-recall": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3949577998295236",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/fda-clears-aquios-stem": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7650459170238492",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/fda-clears-dxflex-flow-cytometer": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6920206895967876",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/first-phase-of-colorado-research-and-development-hub": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9379972198407206",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/first-us-ivd-test-delivering-flow-cytometric-leukemia-and-lymphoma-analysis": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6097051278101852",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/flownamics-partnership-on-bioprocess-culture-monitoring-solution": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.17822857167737138",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/genetic-engineering-news-democratizing-flow-cytometry": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1637296575439422",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/global-cares-award-winner-announced-at-ias-2018": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5044486877301874",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/goodbye-manual-gating-of-flow-cytometry-data": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6068580490830427",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/grant-awarded-to-indiana-university-school-of-medicine-and-beckman-coulter-life-sciences": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8678073629704031",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/greg-milosevich-appointed-president": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.564789179114243",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/hematologic-diagnostics-go-with-the-flow": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.0624170560500501",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/industry-first-reagent-certification-to-help-prepare-labs-for-ivdr": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.08269253585387915",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/inventor-of-beckman-coulter-life-sciences-cytoflex-flow-cytometer-honored": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.016635253936604477",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/investing-in-the-next-generation-of-researchers": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.10578324421977914",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/japan/2020-cytoflex-campaign": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.047670447600489774",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/japan/2020-flow-software-campaign": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9326905147769495",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/japan/2020-gallios": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.48151248020577864",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/japan/2020apr13-emergency-declaration": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5934132567198812",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/japan/2020june29-epics-xl": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6083700782698875",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/japan/delivery-delay-of-repair-202004": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8546678360836686",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/japan/met-one-3400-plus-press-release": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.366181264178461",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/japan/rnadvance-viral-xp-reagent-kit-launch": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.05830583807151779",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/kaluza-12-cytometry-software-from-beckman-coulter-provides-world-class-speed-enhanced-ease-of-use": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.32935865162609945",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/kaluza-c-software-launch-for-clinical-labs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4095004779536269",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/kaluza-for-gallios-delivers-ease-of-use-analytical-power-for-researchers": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8473819818590151",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/lab-sustainability-innovation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5995564815057703",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/labcyte-acquisition-to-expand-laboratory-automation-business": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.979813966061793",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/launch-of-optima-auc-advances-protein-analysis-via-analytical-ultracentrifugation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9355275656105401",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/leading-cancer-research-lab-announced-as-winner-in-beckman-coulters-200k-cytoflex-contest": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.09106488260578527",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/m2p-labs-acquisition": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6014976759346997",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/met-one-3400-plus-innov-awards": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6874274172965074",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/met-one-3400-plus-launch": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7509884783701151",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/michelle-caron-appointed-cfo": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.562367243115263",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/microsoft-remote-desktop-protocol-vulnerability": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6907309255700713",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/moflo-astrios-eq-delivers-simultaneous-high-speed-cell-sorting-and-sub-micron-particle-detection": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.20848202160998475",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/multinational-research-team-granted-eight-million-euros": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2692784707410504",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/navios-flow-cytometer-from-beckman-coulter-cleared-for-diagnostic-use-in-us-and-china": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6895649820343601",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/new-5000-ascb-kaluza-prize-supported-by-beckman-to-encourage-creative-graduate-student-research": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4810929900723293",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/new-aquios-cl-clinical-cytometer-for-routine-applications-in-clinical-lab": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8811319900833553",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/new-biomek-echo-one-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2886626397072113",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/new-family-of-ffpe-reagent-kits": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3211371798427638",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/news-articles/global/becls-launches-allegra-c-24r-and-allegra-c-34r-benchtop-centrifuges": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.23572325686709605",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/next-generation-biolector-xt-microbioreactor": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3769074358631944",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/partners-with-automata-to-accelerate-ai-ready-laboratory-automation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6678220987511335",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/perfix-reagent-kits-deliver-probes-antibodies-into-cells": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.39947863251394233",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/powerful-new-cytobank-platform-upgrade-available-from-beckman-coulter-life-sciences": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.48758867702551456",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/rarity-biosciences-ab-partnership": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6626348583300098",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/research-focused-website": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.0022662395454235984",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/revolutionize-nucleic-acid-quantification-and-purification-through-liquid-handling": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.024614622633918448",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/rnadvance-viral-xp-reagent-kit-launch": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.45719037983112465",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/role-expansion-of-aquios-cl-flow-cytometer-in-routine-labs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6501294519360516",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/simplify-and-accelerate-your-cell-separation-with-automation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.660991132233158",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/supplemental-protocols-for-rna-isolation-from-viral-samples": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7667843871318779",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/suzanne-foster-appointed-president-of-beckman-coulter-life-sciences": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.15050325608469628",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/valitacell-acquisition": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.13795035093252106",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/vi-cell-blu-vies-for-top-spot-in-cell-viability-analysis": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6444745576614708",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/vicell-blu-20-software": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.19428408458257762",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/watchmaker-genomics-collaboration": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7959502738834813",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/cytoflex-srt-benchtop-cell-sorter--wins-selectscience-award": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9991852021473221",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/solidifying-its-leadership-position-in-clinical-flow-cytometry-bcls-receives-ivdr-certification": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5077601687379116",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-brightens-flow-cytometry-with-new-supernova-polymer-dyes-portfolio": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6294529792442098",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-industry-first-microbioreactor-light-array-module": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9274381766257245",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/beckman-coulter-life-sciences-launches-qbd1200plus-total-organic-carbon-analyzer": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.23277185155427116",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/fda-clears-aquios-cl-flow-cytometer-for-routine-immunophenotyping-applications-in-us-clinical-labs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6545701987581444",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/news/seminars-highlight-cyto-2013-offerings": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.85249845571098",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ]
  }
};

const parsers = {
  'embed': embedParser,
  'columns': columnsParser,
  'table': tableParser,
  'media-split': mediaSplitParser,
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
