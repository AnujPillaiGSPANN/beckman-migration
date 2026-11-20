/* eslint-disable */
/* global WebImporter */
// Import script for the catalog template "faq-article" (generated from tools/importer/page-templates.json).

import mediaSplitParser from './parsers/media-split.js';
import cleanupTransformer from './transformers/beckman-cleanup.js';
import sectionsTransformer from './transformers/beckman-sections.js';

const PAGE_TEMPLATE = {
  "name": "faq-article",
  "urls": [
    "https://www.mybeckman.in/support/faq/careers/are-interns-paid",
    "https://www.mybeckman.in/support/faq/careers/background-check-and-drug-test-requirements",
    "https://www.mybeckman.in/support/faq/careers/college-interns-graduates-positions",
    "https://www.mybeckman.in/support/faq/careers/company-recruiting",
    "https://www.mybeckman.in/support/faq/careers/do-interns-receive-benefits",
    "https://www.mybeckman.in/support/faq/careers/duration-of-internship",
    "https://www.mybeckman.in/support/faq/careers/how-do-i-apply-for-a-position",
    "https://www.mybeckman.in/support/faq/careers/international-students",
    "https://www.mybeckman.in/support/faq/careers/internship-opportunities",
    "https://www.mybeckman.in/support/faq/careers/job-application-process",
    "https://www.mybeckman.in/support/faq/careers/job-application-received",
    "https://www.mybeckman.in/support/faq/careers/onsite-interviews",
    "https://www.mybeckman.in/support/faq/careers/summer-interns-college-graduate-recruitment",
    "https://www.mybeckman.in/support/faq/careers/unpaid-or-volunteer-opportunities",
    "https://www.mybeckman.in/support/faq/careers/when-do-college-interns-and-graduates-start-work",
    "https://www.mybeckman.in/support/faq/ecommerce/attaching-a-pdf-file-during-checkout",
    "https://www.mybeckman.in/support/faq/ecommerce/back-order-notification",
    "https://www.mybeckman.in/support/faq/ecommerce/billing-and-shipping-address-not-on-file",
    "https://www.mybeckman.in/support/faq/ecommerce/different-address-for-one-order",
    "https://www.mybeckman.in/support/faq/ecommerce/different-billing-or-shipping-address-from-registration",
    "https://www.mybeckman.in/support/faq/ecommerce/how-can-i-use-a-credit-card",
    "https://www.mybeckman.in/support/faq/ecommerce/how-can-i-use-a-purchase-order",
    "https://www.mybeckman.in/support/faq/ecommerce/how-do-i-see-contract-prices",
    "https://www.mybeckman.in/support/faq/ecommerce/incomplete-checkout-process",
    "https://www.mybeckman.in/support/faq/ecommerce/no-prices-in-the-catalog",
    "https://www.mybeckman.in/support/faq/ecommerce/online-store-availability",
    "https://www.mybeckman.in/support/faq/ecommerce/pricing-for-a-specific-contract",
    "https://www.mybeckman.in/support/faq/ecommerce/purchase-supplies-online-with-contract",
    "https://www.mybeckman.in/support/faq/ecommerce/register-for-online-ordering",
    "https://www.mybeckman.in/support/faq/ecommerce/shopping-online-with-a-contract",
    "https://www.mybeckman.in/support/faq/ecommerce/some-items-not-showing-catalog-price",
    "https://www.mybeckman.in/support/faq/industry-standards/21-cfr-11-and-training-requirements",
    "https://www.mybeckman.in/support/faq/industry-standards/21501-4-calibration-certificate",
    "https://www.mybeckman.in/support/faq/industry-standards/additional-asr-resources",
    "https://www.mybeckman.in/support/faq/industry-standards/aspects-of-manufacturing-under-cgmp",
    "https://www.mybeckman.in/support/faq/industry-standards/asr-offering-ous",
    "https://www.mybeckman.in/support/faq/industry-standards/asr-regulation-for-consistency-of-product",
    "https://www.mybeckman.in/support/faq/industry-standards/beckman-coulter-ensures-asr-product-quality",
    "https://www.mybeckman.in/support/faq/industry-standards/benefits-of-cgmp-manufacturing",
    "https://www.mybeckman.in/support/faq/industry-standards/calibration-certificate-requirements",
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-for-air-particle-cleanliness",
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-an-organization-and-personnel",
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-buildings-and-facilities",
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-documentation",
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-equipment",
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-production-process",
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-raw-material-control",
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-the-laboratory",
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-warehousing",
    "https://www.mybeckman.in/support/faq/industry-standards/changes-on-product-specifications-and-performance-post-ivdr",
    "https://www.mybeckman.in/support/faq/industry-standards/cleanroom-data-from-cro-to-fda",
    "https://www.mybeckman.in/support/faq/industry-standards/consistency-of-the-product",
    "https://www.mybeckman.in/support/faq/industry-standards/contemporaneously-meaning-from-the-fda",
    "https://www.mybeckman.in/support/faq/industry-standards/creating-an-audit-trail",
    "https://www.mybeckman.in/support/faq/industry-standards/difference-between-cgmp-and-gpm",
    "https://www.mybeckman.in/support/faq/industry-standards/electronic-documents-subject-to-part-11",
    "https://www.mybeckman.in/support/faq/industry-standards/electronic-format-for-cleanroom-records",
    "https://www.mybeckman.in/support/faq/industry-standards/flow-rate-for-instrument-calibration-and-measurement",
    "https://www.mybeckman.in/support/faq/industry-standards/format-for-electronic-records",
    "https://www.mybeckman.in/support/faq/industry-standards/gxp-cleanroom-monitoring",
    "https://www.mybeckman.in/support/faq/industry-standards/impacts-to-periodic-classification",
    "https://www.mybeckman.in/support/faq/industry-standards/iso-21501-4-and-compliance",
    "https://www.mybeckman.in/support/faq/industry-standards/iso-21501-calibration-test-elements",
    "https://www.mybeckman.in/support/faq/industry-standards/issue-for-silicone-oil-being-present",
    "https://www.mybeckman.in/support/faq/industry-standards/ivdr-implications-for-individual-clinical-laboratories",
    "https://www.mybeckman.in/support/faq/industry-standards/key-changes-to-sampling-classification",
    "https://www.mybeckman.in/support/faq/industry-standards/liquid-particle-counters-operating-characteristics",
    "https://www.mybeckman.in/support/faq/industry-standards/main-sections-of-usp-1787",
    "https://www.mybeckman.in/support/faq/industry-standards/meaning-of-changes-for-pharma",
    "https://www.mybeckman.in/support/faq/industry-standards/nanoscale-particles",
    "https://www.mybeckman.in/support/faq/industry-standards/national-institute-of-standards-and-technology",
    "https://www.mybeckman.in/support/faq/industry-standards/nist-traceable-standards",
    "https://www.mybeckman.in/support/faq/industry-standards/offsite-databases-over-onsite",
    "https://www.mybeckman.in/support/faq/industry-standards/particle-count-measurements",
    "https://www.mybeckman.in/support/faq/industry-standards/particle-counter-calibration-guidance",
    "https://www.mybeckman.in/support/faq/industry-standards/particle-counting-efficiency",
    "https://www.mybeckman.in/support/faq/industry-standards/particle-sizing-and-measurement",
    "https://www.mybeckman.in/support/faq/industry-standards/pharma-cleanroom-monitoring",
    "https://www.mybeckman.in/support/faq/industry-standards/protein-based-challenges",
    "https://www.mybeckman.in/support/faq/industry-standards/risk-based-approach-for-21-cfr-11",
    "https://www.mybeckman.in/support/faq/industry-standards/status-of-hydraulic-fluids-in-an-active-system",
    "https://www.mybeckman.in/support/faq/industry-standards/threshold-noise-level",
    "https://www.mybeckman.in/support/faq/industry-standards/usp-1787-and-usp-787",
    "https://www.mybeckman.in/support/faq/industry-standards/validation-of-cleanroom-workflow",
    "https://www.mybeckman.in/support/faq/industry-standards/what-are-extractables",
    "https://www.mybeckman.in/support/faq/industry-standards/what-are-leachables",
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-a-coincidence-error",
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-an-analyte-specific-reagent",
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-cgmp",
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-consensus-standard",
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-iso-11171",
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-srm-2806",
    "https://www.mybeckman.in/support/faq/industry-standards/when-will-part-11-update",
    "https://www.mybeckman.in/support/faq/other/2d-gs1-data-matrix-bar-code",
    "https://www.mybeckman.in/support/faq/other/additional-charges-for-service-engineers",
    "https://www.mybeckman.in/support/faq/other/aging-instruments",
    "https://www.mybeckman.in/support/faq/other/bar-code-reading-system-not-provided",
    "https://www.mybeckman.in/support/faq/other/bar-code-reading-system-recommendations",
    "https://www.mybeckman.in/support/faq/other/bar-code-reading-systems-for-labs",
    "https://www.mybeckman.in/support/faq/other/changes-to-our-product-specifications",
    "https://www.mybeckman.in/support/faq/other/contract-manufacturing-services-availability",
    "https://www.mybeckman.in/support/faq/other/direct-calls-to-my-service-engineer",
    "https://www.mybeckman.in/support/faq/other/direction-for-contract-cleaners",
    "https://www.mybeckman.in/support/faq/other/escalating-a-problem",
    "https://www.mybeckman.in/support/faq/other/establish-a-scheduled-delivery",
    "https://www.mybeckman.in/support/faq/other/finding-my-system-id-number",
    "https://www.mybeckman.in/support/faq/other/help-with-cap-or-fda-audit",
    "https://www.mybeckman.in/support/faq/other/installation-upgrades-for-my-instrument",
    "https://www.mybeckman.in/support/faq/other/instrument-service-in-biohazard-areas",
    "https://www.mybeckman.in/support/faq/other/is-there-assistance-with-titrations",
    "https://www.mybeckman.in/support/faq/other/linear-bar-codes",
    "https://www.mybeckman.in/support/faq/other/mission-vision",
    "https://www.mybeckman.in/support/faq/other/negotiate-a-discount-on-my-labor-rate",
    "https://www.mybeckman.in/support/faq/other/new-bar-code-change",
    "https://www.mybeckman.in/support/faq/other/number-to-request-material-safety-data-sheets",
    "https://www.mybeckman.in/support/faq/other/one-study-and-flow-cytometry",
    "https://www.mybeckman.in/support/faq/other/order-length",
    "https://www.mybeckman.in/support/faq/other/preventative-maintenance-coverage",
    "https://www.mybeckman.in/support/faq/other/preventative-maintenance-done-early",
    "https://www.mybeckman.in/support/faq/other/product-labeling-and-bar-codes",
    "https://www.mybeckman.in/support/faq/other/reading-the-new-bar-code",
    "https://www.mybeckman.in/support/faq/other/reagents-bar-codes",
    "https://www.mybeckman.in/support/faq/other/register-my-instrument",
    "https://www.mybeckman.in/support/faq/other/risk-based-sample-site-selection",
    "https://www.mybeckman.in/support/faq/other/sampling-changes-and-mega-size-cleanrooms",
    "https://www.mybeckman.in/support/faq/other/save-with-contact-management-services",
    "https://www.mybeckman.in/support/faq/other/service-agreement-pricing",
    "https://www.mybeckman.in/support/faq/other/service-agreements-from-third-parties",
    "https://www.mybeckman.in/support/faq/other/service-engineer-repair-capabilities",
    "https://www.mybeckman.in/support/faq/other/service-representative-tasks",
    "https://www.mybeckman.in/support/faq/other/services-and-warranties",
    "https://www.mybeckman.in/support/faq/other/services-for-lab-use",
    "https://www.mybeckman.in/support/faq/other/system-id-and-instruments",
    "https://www.mybeckman.in/support/faq/other/system-id-number-generated-the-wrong-instrument",
    "https://www.mybeckman.in/support/faq/other/technical-support-by-phone",
    "https://www.mybeckman.in/support/faq/other/training-for-field-engineers",
    "https://www.mybeckman.in/support/faq/other/what-is-system-id",
    "https://www.mybeckman.in/support/faq/other/which-engineer-will-respond-to-my-call",
    "https://www.mybeckman.in/support/faq/other/why-a-beckman-coulter-service-agreement",
    "https://www.mybeckman.in/support/faq/other/why-the-new-bar-code-standard",
    "https://www.mybeckman.in/support/faq/other/will-reagents-bar-codes-change",
    "https://www.mybeckman.in/support/faq/product/accuracy-of-sedimentation-and-diffusion-coefficient-calculations",
    "https://www.mybeckman.in/support/faq/product/acid-and-persulphate-not-oxidizing-organics",
    "https://www.mybeckman.in/support/faq/product/adding-parameters-to-navios",
    "https://www.mybeckman.in/support/faq/product/air-displacement",
    "https://www.mybeckman.in/support/faq/product/amount-of-cfdna-present-in-1ml-normal-plasma",
    "https://www.mybeckman.in/support/faq/product/ampure-xp-dry-step-following-ethanol-removal",
    "https://www.mybeckman.in/support/faq/product/ampure-xp-room-temperature",
    "https://www.mybeckman.in/support/faq/product/ampure-xp-technical-documents",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-applications",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-automate-repetitive-tasks",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-barcoded-reagents",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-customer-testimonials",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-how-it-works",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-lis-connectivity",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-load-and-go-flow-cytometry",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-running-user-defined-assays",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-sample-tubes",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-throughput",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-user-friendly-easy-to-learn",
    "https://www.mybeckman.in/support/faq/product/are-bubbles-around-the-neck-of-the-polypropylene-bottle-normal-and-will-they-affect-performance",
    "https://www.mybeckman.in/support/faq/product/auc-analysis",
    "https://www.mybeckman.in/support/faq/product/auc-rotors",
    "https://www.mybeckman.in/support/faq/product/bead-carryover-downstream-pcr",
    "https://www.mybeckman.in/support/faq/product/beads-and-binding",
    "https://www.mybeckman.in/support/faq/product/binding-capacity-of-beads",
    "https://www.mybeckman.in/support/faq/product/calibration-toc-analysis-records-qbd1200-memory-can-hold",
    "https://www.mybeckman.in/support/faq/product/can-ampure-xp-be-used-to-purify-rna",
    "https://www.mybeckman.in/support/faq/product/can-i-still-purchase-ampure",
    "https://www.mybeckman.in/support/faq/product/carrier-gas-amount-used-to-sample-1-vial",
    "https://www.mybeckman.in/support/faq/product/centrifuge-and-accessories-documentation",
    "https://www.mybeckman.in/support/faq/product/centrifuge-and-rotor-serial-numbers",
    "https://www.mybeckman.in/support/faq/product/certification-for-centrifuges",
    "https://www.mybeckman.in/support/faq/product/clearllab-ifu-and-sample-types",
    "https://www.mybeckman.in/support/faq/product/clearllab-intended-use",
    "https://www.mybeckman.in/support/faq/product/cost-for-each-toc-analysis",
    "https://www.mybeckman.in/support/faq/product/counterbalance-configuration-for-auc",
    "https://www.mybeckman.in/support/faq/product/customer-quotes-for-the-aquios-cl",
    "https://www.mybeckman.in/support/faq/product/cytoflex-vssc",
    "https://www.mybeckman.in/support/faq/product/difference-between-auc-and-other-centrifuges",
    "https://www.mybeckman.in/support/faq/product/difference-between-static-and-dynamic-light-scattering",
    "https://www.mybeckman.in/support/faq/product/duraclone-additional-liquid-antibodies",
    "https://www.mybeckman.in/support/faq/product/duraclone-analyzing-complex-data",
    "https://www.mybeckman.in/support/faq/product/duraclone-compensation-for-pre-formulated-panels",
    "https://www.mybeckman.in/support/faq/product/duraclone-dura-innovations-different-from-lyophilization",
    "https://www.mybeckman.in/support/faq/product/duraclone-dura-innovations-in-clinical-labs",
    "https://www.mybeckman.in/support/faq/product/duraclone-dura-innovations-limit-on-materials",
    "https://www.mybeckman.in/support/faq/product/duraclone-if-cd8-not-included",
    "https://www.mybeckman.in/support/faq/product/duraclone-if-cytokine-expression-t-helper-cell-type",
    "https://www.mybeckman.in/support/faq/product/duraclone-if-inducing-cytokine-expression",
    "https://www.mybeckman.in/support/faq/product/duraclone-if-sample-types",
    "https://www.mybeckman.in/support/faq/product/duraclone-if-single-step-staining",
    "https://www.mybeckman.in/support/faq/product/duraclone-if-why-alexafluor700-750",
    "https://www.mybeckman.in/support/faq/product/duraclone-im-sample-material-use",
    "https://www.mybeckman.in/support/faq/product/duraclone-im-what-is-one-study",
    "https://www.mybeckman.in/support/faq/product/duraclone-overcoming-limitations-with-acq-software",
    "https://www.mybeckman.in/support/faq/product/duraclone-sample-volume",
    "https://www.mybeckman.in/support/faq/product/duraclone-staining-characteristics",
    "https://www.mybeckman.in/support/faq/product/duractive-and-brefeldin-a",
    "https://www.mybeckman.in/support/faq/product/duractive-environmental-cleanliness-reqs",
    "https://www.mybeckman.in/support/faq/product/duractive-heparinized-whole-blood",
    "https://www.mybeckman.in/support/faq/product/duractive-lps-compound",
    "https://www.mybeckman.in/support/faq/product/duractive-stimulant-mixes-vs-liquid-formulations",
    "https://www.mybeckman.in/support/faq/product/ethernet-connection-qbd1200-networked-printer",
    "https://www.mybeckman.in/support/faq/product/expected-recovery-for-ampure-xp",
    "https://www.mybeckman.in/support/faq/product/expected-recovery-for-spriselect",
    "https://www.mybeckman.in/support/faq/product/expected-recovery-with-rnaclean-xp",
    "https://www.mybeckman.in/support/faq/product/filling-procedure-analytical-sample-cell",
    "https://www.mybeckman.in/support/faq/product/forces-on-solute-particle-in-gravitational-field",
    "https://www.mybeckman.in/support/faq/product/fringe-displacement-calculated",
    "https://www.mybeckman.in/support/faq/product/fringe-patterns-from-interference-testing",
    "https://www.mybeckman.in/support/faq/product/frozen-genomic-reagent-beads",
    "https://www.mybeckman.in/support/faq/product/how-can-i-purchase-kaluza-software",
    "https://www.mybeckman.in/support/faq/product/how-do-coulter-counters-work",
    "https://www.mybeckman.in/support/faq/product/how-does-the-network-license-work",
    "https://www.mybeckman.in/support/faq/product/how-does-the-qbd1200-avoid-interferences-from-tic",
    "https://www.mybeckman.in/support/faq/product/how-is-kaluza-licensed",
    "https://www.mybeckman.in/support/faq/product/how-much-thicker-is-the-new-polypropylene-bottle-than-the-previous-version",
    "https://www.mybeckman.in/support/faq/product/how-our-rna-extraction-kits-differ-from-existing-kits",
    "https://www.mybeckman.in/support/faq/product/interference-detected-by-auc",
    "https://www.mybeckman.in/support/faq/product/kaluza-analysis-v2-and-kaluza-for-gallios",
    "https://www.mybeckman.in/support/faq/product/kaluza-fcs-file-compatibility",
    "https://www.mybeckman.in/support/faq/product/kaluza-name-origin",
    "https://www.mybeckman.in/support/faq/product/kaluza-new-features",
    "https://www.mybeckman.in/support/faq/product/kaluza-recommended-computer-specifications",
    "https://www.mybeckman.in/support/faq/product/keyboard-mouse-connection-to-qbd1200",
    "https://www.mybeckman.in/support/faq/product/lab-productivity-with-aquios-cl",
    "https://www.mybeckman.in/support/faq/product/major-components-analytical-sample-cell",
    "https://www.mybeckman.in/support/faq/product/minimum-elution-volume",
    "https://www.mybeckman.in/support/faq/product/more-kaluza-performance",
    "https://www.mybeckman.in/support/faq/product/navios-acquisition-speed",
    "https://www.mybeckman.in/support/faq/product/navios-barcode-reader",
    "https://www.mybeckman.in/support/faq/product/navios-electronic-processing-capabilities",
    "https://www.mybeckman.in/support/faq/product/navios-fluorochromes",
    "https://www.mybeckman.in/support/faq/product/navios-optical-filters",
    "https://www.mybeckman.in/support/faq/product/navios-versus-navios-ex",
    "https://www.mybeckman.in/support/faq/product/new-rna-extraction-solution-for-researchers",
    "https://www.mybeckman.in/support/faq/product/obtaining-schematics-for-a-centrifuge",
    "https://www.mybeckman.in/support/faq/product/one-reagent-needed-for-64-vials",
    "https://www.mybeckman.in/support/faq/product/qbd1200-auto-range-function",
    "https://www.mybeckman.in/support/faq/product/qbd1200-avoid-interference-residual-trace-amounts-co2",
    "https://www.mybeckman.in/support/faq/product/qbd1200-avoid-sample-to-sample-carry-over",
    "https://www.mybeckman.in/support/faq/product/qbd1200-control-amount-of-sample-drawn-in-analysis-dilution",
    "https://www.mybeckman.in/support/faq/product/qbd1200-uv-lamp-last",
    "https://www.mybeckman.in/support/faq/product/rayleigh-interferometer",
    "https://www.mybeckman.in/support/faq/product/rna-extraction-kit-manufacturing-outputs",
    "https://www.mybeckman.in/support/faq/product/rna-extraction-kit-virus-detection-research-workflows",
    "https://www.mybeckman.in/support/faq/product/rnaclean-xp-bind-single-stranded-and-double-stranded-rna",
    "https://www.mybeckman.in/support/faq/product/rnaclean-xp-technical-documents",
    "https://www.mybeckman.in/support/faq/product/rnaclean-xp-to-purify-mirna",
    "https://www.mybeckman.in/support/faq/product/rnaclean-xp-tube-format",
    "https://www.mybeckman.in/support/faq/product/rnadvance-viral-xp-product-supplies",
    "https://www.mybeckman.in/support/faq/product/sample-water-required-each-vial-analyzed",
    "https://www.mybeckman.in/support/faq/product/service-calibration-interval-for-qbd1200",
    "https://www.mybeckman.in/support/faq/product/size-range-for-rnaclean-xp",
    "https://www.mybeckman.in/support/faq/product/spriplate-96-super-magnet-plate",
    "https://www.mybeckman.in/support/faq/product/toc-allowable-in-water-to-make-up-the-one-reagent",
    "https://www.mybeckman.in/support/faq/product/upper-size-limit-nucleic-acid-recovery",
    "https://www.mybeckman.in/support/faq/product/vials-analyzed-with-1-bottle-one-reagent-stock-solution",
    "https://www.mybeckman.in/support/faq/product/vials-analyzed-with-1litre-diluted-one-reagent",
    "https://www.mybeckman.in/support/faq/product/was-there-any-change-in-the-wall-thickness-with-the-new-polycarbonate-bottle-design",
    "https://www.mybeckman.in/support/faq/product/what-is-a-particle-counter",
    "https://www.mybeckman.in/support/faq/product/what-is-hiac",
    "https://www.mybeckman.in/support/faq/product/what-is-kaluza",
    "https://www.mybeckman.in/support/faq/product/what-is-pids-technology",
    "https://www.mybeckman.in/support/faq/product/what-is-the-difference-between-rnadvance-viral-xp-and-rnadvance-viral",
    "https://www.mybeckman.in/support/faq/product/where-are-our-rna-extraction-kits-manufactured",
    "https://www.mybeckman.in/support/faq/product/why-doesnt-the-qbd1200-report-tic",
    "https://www.mybeckman.in/support/faq/research/about-immunotherapy-clinical-trials",
    "https://www.mybeckman.in/support/faq/research/active-immunotherapy-and-passive-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/adeno-associated-viruses-used-as-vectors",
    "https://www.mybeckman.in/support/faq/research/adenoviruses-used-as-vectors",
    "https://www.mybeckman.in/support/faq/research/agent-type-affect-biologics-production",
    "https://www.mybeckman.in/support/faq/research/antigen-specific-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/are-all-immunotherapies-cell-based",
    "https://www.mybeckman.in/support/faq/research/biological-agent-type-affect-regulatory-standards",
    "https://www.mybeckman.in/support/faq/research/biologics-differ-from-traditional-pharmaceuticals",
    "https://www.mybeckman.in/support/faq/research/biologics-drive-antibody-directed-targeting",
    "https://www.mybeckman.in/support/faq/research/biologics-organ-tissue-transplantation-regenerative-medicine",
    "https://www.mybeckman.in/support/faq/research/biologics-used-act",
    "https://www.mybeckman.in/support/faq/research/biomarkers-for-diagnostic-screening-in-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/cancer-cells-bypass-tcr-mediated-t-cell-recognition",
    "https://www.mybeckman.in/support/faq/research/car-receptor-introduced-to-the-t-cell",
    "https://www.mybeckman.in/support/faq/research/car-t-cell-target-antigens",
    "https://www.mybeckman.in/support/faq/research/car-t-cells-for-therapeutic-purposes",
    "https://www.mybeckman.in/support/faq/research/car-t-cells-side-effects",
    "https://www.mybeckman.in/support/faq/research/cells-for-cell-based-immunotherapies",
    "https://www.mybeckman.in/support/faq/research/chimeric-antigen-receptor-components-and-domains",
    "https://www.mybeckman.in/support/faq/research/considerations-to-optimizing-viral-vector-production",
    "https://www.mybeckman.in/support/faq/research/considerations-when-selecting-a-viral-vector-candidate",
    "https://www.mybeckman.in/support/faq/research/considered-approaches-to-improve-therapeutic-safety",
    "https://www.mybeckman.in/support/faq/research/crispr-enhancing-improved-therapeutic-agents",
    "https://www.mybeckman.in/support/faq/research/crispr-gene-therapy-impact-on-medicine",
    "https://www.mybeckman.in/support/faq/research/crispr-impact-gene-alterations-function",
    "https://www.mybeckman.in/support/faq/research/crispr-mediated-genetic-engineering-impact-industrial-productivity-nature",
    "https://www.mybeckman.in/support/faq/research/crispr-rnai-difference",
    "https://www.mybeckman.in/support/faq/research/crispr-talens-difference",
    "https://www.mybeckman.in/support/faq/research/crispr-zfns-difference",
    "https://www.mybeckman.in/support/faq/research/cytokines-boost-the-immune-system",
    "https://www.mybeckman.in/support/faq/research/deliver-foreign-nucleic-acids-into-a-cell",
    "https://www.mybeckman.in/support/faq/research/difference-between-chemotherapy-radiation-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/different-crispr-associated-system-proteins",
    "https://www.mybeckman.in/support/faq/research/different-t-cell-types",
    "https://www.mybeckman.in/support/faq/research/different-types-biologic-agents-researched",
    "https://www.mybeckman.in/support/faq/research/different-types-of-gene-therapy",
    "https://www.mybeckman.in/support/faq/research/different-types-of-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/diluting-biofluids-with-pbs",
    "https://www.mybeckman.in/support/faq/research/drawbacks-side-effects-to-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/effective-immunotherapy-treatment-for-diseases",
    "https://www.mybeckman.in/support/faq/research/endogenous-purpose-of-crispr",
    "https://www.mybeckman.in/support/faq/research/ethical-dilemmas-and-crispr-technology",
    "https://www.mybeckman.in/support/faq/research/exosome-fraction-of-interest",
    "https://www.mybeckman.in/support/faq/research/exosomes-from-microvesicles",
    "https://www.mybeckman.in/support/faq/research/exosomes-risk-during-ultracentrifugation",
    "https://www.mybeckman.in/support/faq/research/exosomes-role-in-cancer",
    "https://www.mybeckman.in/support/faq/research/extracellular-vesicle-guidelines",
    "https://www.mybeckman.in/support/faq/research/extracellular-vesicle-research-guidelines",
    "https://www.mybeckman.in/support/faq/research/functions-of-the-immune-system",
    "https://www.mybeckman.in/support/faq/research/future-of-car-t-research-therapeutics",
    "https://www.mybeckman.in/support/faq/research/gene-and-cell-therapy-differences",
    "https://www.mybeckman.in/support/faq/research/genetic-engineering-used-enhance-workflows-biologics-production",
    "https://www.mybeckman.in/support/faq/research/genetic-engineering-used-modify-biologic-agents",
    "https://www.mybeckman.in/support/faq/research/half-life-for-immunotherapy-drugs",
    "https://www.mybeckman.in/support/faq/research/harmful-entities-and-immune-systems",
    "https://www.mybeckman.in/support/faq/research/herpes-simplex-viruses-used-as-vectors",
    "https://www.mybeckman.in/support/faq/research/history-of-chimeric-antigen-receptors",
    "https://www.mybeckman.in/support/faq/research/how-are-biologics-used-in-targeted-gene-therapy",
    "https://www.mybeckman.in/support/faq/research/how-are-car-t-cells-produced",
    "https://www.mybeckman.in/support/faq/research/how-are-exosomes-counted",
    "https://www.mybeckman.in/support/faq/research/how-are-exosomes-visualized-and-characterized",
    "https://www.mybeckman.in/support/faq/research/how-are-t-cells-isolated-and-expanded",
    "https://www.mybeckman.in/support/faq/research/how-biologic-medicines-are-administered",
    "https://www.mybeckman.in/support/faq/research/how-do-chimeric-antigen-receptors-work",
    "https://www.mybeckman.in/support/faq/research/how-do-you-produce-a-viral-vector",
    "https://www.mybeckman.in/support/faq/research/how-does-a-viral-vector-work",
    "https://www.mybeckman.in/support/faq/research/how-does-crispr-cas-work",
    "https://www.mybeckman.in/support/faq/research/i-do-not-see-a-pellet-after-centrifuging-exosomes",
    "https://www.mybeckman.in/support/faq/research/immune-checkpoint-inhibitors-in-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/immune-function-therapeutically-restored-or-enhanced",
    "https://www.mybeckman.in/support/faq/research/immune-system-eliminates-harmful-cells",
    "https://www.mybeckman.in/support/faq/research/immune-system-not-functioning-properly",
    "https://www.mybeckman.in/support/faq/research/immunosuppressants-for-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/immunotherapy-and-aging",
    "https://www.mybeckman.in/support/faq/research/immunotherapy-and-cancer-types",
    "https://www.mybeckman.in/support/faq/research/immunotherapy-and-inflammatory-bowel-disease",
    "https://www.mybeckman.in/support/faq/research/immunotherapy-future-with-hiv-aids",
    "https://www.mybeckman.in/support/faq/research/immunotherapy-potential",
    "https://www.mybeckman.in/support/faq/research/immunotherapy-tumor-resistance",
    "https://www.mybeckman.in/support/faq/research/improving-adjuvants-for-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/innate-and-adaptive-immune-systems",
    "https://www.mybeckman.in/support/faq/research/isolation-protocol",
    "https://www.mybeckman.in/support/faq/research/lentiviruses-used-as-vectors",
    "https://www.mybeckman.in/support/faq/research/local-tissue-environmental-conditions-affect-immune-function",
    "https://www.mybeckman.in/support/faq/research/main-components-of-crispr-cas-system",
    "https://www.mybeckman.in/support/faq/research/material-for-exosome-isolation",
    "https://www.mybeckman.in/support/faq/research/mechanisms-of-antigen-loss-to-uncover-immunotherapeutics",
    "https://www.mybeckman.in/support/faq/research/medium-used-when-isolating-exosomes",
    "https://www.mybeckman.in/support/faq/research/methods-for-isolating-exosomes",
    "https://www.mybeckman.in/support/faq/research/mutational-load-and-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/nanoparticles-used-for-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/nhej-hdr-difference",
    "https://www.mybeckman.in/support/faq/research/oncolytic-viruses-targeting-cancer-cells-in-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/oral-sublingual-dermal-immunotherapy-differences",
    "https://www.mybeckman.in/support/faq/research/other-types-of-immune-cells",
    "https://www.mybeckman.in/support/faq/research/pat-defined",
    "https://www.mybeckman.in/support/faq/research/peptide-based-vaccines",
    "https://www.mybeckman.in/support/faq/research/popular-immunotherapy-approaches",
    "https://www.mybeckman.in/support/faq/research/protocol-for-ultracentrifugation",
    "https://www.mybeckman.in/support/faq/research/protocols-for-isolating-exosomes",
    "https://www.mybeckman.in/support/faq/research/quantitate-exosome-number",
    "https://www.mybeckman.in/support/faq/research/research-done-cell-based-biologic-agents",
    "https://www.mybeckman.in/support/faq/research/research-done-molecule-based-biologic-agents",
    "https://www.mybeckman.in/support/faq/research/research-done-tissue-based-biologic-agents",
    "https://www.mybeckman.in/support/faq/research/resolution-from-background-for-evs",
    "https://www.mybeckman.in/support/faq/research/retroviruses-used-as-vectors",
    "https://www.mybeckman.in/support/faq/research/rna-and-dna-viruses-in-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/role-genetic-engineering-biologics-production",
    "https://www.mybeckman.in/support/faq/research/safety-considerations-and-producing-viral-vectors",
    "https://www.mybeckman.in/support/faq/research/secondary-screening-versus-high-throughput-screening",
    "https://www.mybeckman.in/support/faq/research/selecting-car-t-cells",
    "https://www.mybeckman.in/support/faq/research/single-cell-analysis-for-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/small-molecule-drugs-boost-immune-system",
    "https://www.mybeckman.in/support/faq/research/stem-cells-in-gene-and-cell-therapy",
    "https://www.mybeckman.in/support/faq/research/stimulate-cells-to-induce-cytokine-expression",
    "https://www.mybeckman.in/support/faq/research/strategies-for-enhancing-local-delivery-of-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/successful-isolation-of-exosomes",
    "https://www.mybeckman.in/support/faq/research/targeting-blood-vessels-and-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/targeting-tumors-using-immunocytokines",
    "https://www.mybeckman.in/support/faq/research/tcr-til-car-t-differences-in-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/type-of-rotor-and-tubes-when-isolating-exosomes",
    "https://www.mybeckman.in/support/faq/research/types-of-viruses-commonly-used-as-vectors",
    "https://www.mybeckman.in/support/faq/research/ultracentrifugation-and-precipitation-comparison",
    "https://www.mybeckman.in/support/faq/research/vector-for-gene-transfer",
    "https://www.mybeckman.in/support/faq/research/viral-vector-challenges-for-therapeutic-applications",
    "https://www.mybeckman.in/support/faq/research/viral-vectors-versus-other-approaches",
    "https://www.mybeckman.in/support/faq/research/what-are-b-cells",
    "https://www.mybeckman.in/support/faq/research/what-are-biologics",
    "https://www.mybeckman.in/support/faq/research/what-are-chimeric-viral-vectors",
    "https://www.mybeckman.in/support/faq/research/what-are-exosomes",
    "https://www.mybeckman.in/support/faq/research/what-are-exosomes-made-of",
    "https://www.mybeckman.in/support/faq/research/what-are-macrophages",
    "https://www.mybeckman.in/support/faq/research/what-are-neoantigens",
    "https://www.mybeckman.in/support/faq/research/what-are-pam-sequences",
    "https://www.mybeckman.in/support/faq/research/what-are-small-molecule-drugs",
    "https://www.mybeckman.in/support/faq/research/what-are-stem-cells",
    "https://www.mybeckman.in/support/faq/research/what-are-t-cells",
    "https://www.mybeckman.in/support/faq/research/what-are-viral-vectors",
    "https://www.mybeckman.in/support/faq/research/what-benefit-can-analyzing-evs-by-flow-cytometry-give",
    "https://www.mybeckman.in/support/faq/research/what-cargoes-do-exosomes-carry",
    "https://www.mybeckman.in/support/faq/research/what-is-a-biobetter",
    "https://www.mybeckman.in/support/faq/research/what-is-a-biomarker",
    "https://www.mybeckman.in/support/faq/research/what-is-a-biosimilar",
    "https://www.mybeckman.in/support/faq/research/what-is-a-chimeric-antigen-receptor",
    "https://www.mybeckman.in/support/faq/research/what-is-a-guide-molecule",
    "https://www.mybeckman.in/support/faq/research/what-is-a-lead-compound",
    "https://www.mybeckman.in/support/faq/research/what-is-adoptive-cell-transfer",
    "https://www.mybeckman.in/support/faq/research/what-is-an-antibody",
    "https://www.mybeckman.in/support/faq/research/what-is-an-antigen",
    "https://www.mybeckman.in/support/faq/research/what-is-bacillus-calmette-guerin",
    "https://www.mybeckman.in/support/faq/research/what-is-cell-therapy",
    "https://www.mybeckman.in/support/faq/research/what-is-cellular-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/what-is-combination-therapy",
    "https://www.mybeckman.in/support/faq/research/what-is-crispr",
    "https://www.mybeckman.in/support/faq/research/what-is-denaturation-and-the-cause",
    "https://www.mybeckman.in/support/faq/research/what-is-gene-therapy",
    "https://www.mybeckman.in/support/faq/research/what-is-high-throughput-screening",
    "https://www.mybeckman.in/support/faq/research/what-is-immune-evasion",
    "https://www.mybeckman.in/support/faq/research/what-is-immuno-oncology",
    "https://www.mybeckman.in/support/faq/research/what-is-immunogenicity",
    "https://www.mybeckman.in/support/faq/research/what-is-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/what-is-targeted-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/what-is-the-function-of-exosomes",
    "https://www.mybeckman.in/support/faq/research/what-is-the-future-of-crispr",
    "https://www.mybeckman.in/support/faq/research/where-is-the-particulate",
    "https://www.mybeckman.in/support/faq/research/yields-from-exosomes-isolated-by-ultracentrifugation",
    "https://www.mybeckman.in/support/faq/scientific/behind-the-coulter-principle",
    "https://www.mybeckman.in/support/faq/scientific/centrifugal-elutriation-and-biological-questions",
    "https://www.mybeckman.in/support/faq/scientific/distinguishing-particles-from-bulk-materials",
    "https://www.mybeckman.in/support/faq/scientific/equivalent-shape-methods",
    "https://www.mybeckman.in/support/faq/scientific/flow-cytometry-for-ev-isolation",
    "https://www.mybeckman.in/support/faq/scientific/flow-rate",
    "https://www.mybeckman.in/support/faq/scientific/follicular-fluid",
    "https://www.mybeckman.in/support/faq/scientific/how-is-particle-size-determined",
    "https://www.mybeckman.in/support/faq/scientific/intraev-markers",
    "https://www.mybeckman.in/support/faq/scientific/irregular-shaped-3d-particles",
    "https://www.mybeckman.in/support/faq/scientific/light-scattering-and-particle-sizes",
    "https://www.mybeckman.in/support/faq/scientific/measuring-zeta-potential",
    "https://www.mybeckman.in/support/faq/scientific/methods-for-analyzing-evs",
    "https://www.mybeckman.in/support/faq/scientific/sterile-elutriator-system",
    "https://www.mybeckman.in/support/faq/scientific/surface-zeta-potential",
    "https://www.mybeckman.in/support/faq/scientific/technology-for-accurate-results-in-particle-characterization",
    "https://www.mybeckman.in/support/faq/scientific/tumor-microenvironment",
    "https://www.mybeckman.in/support/faq/scientific/types-of-extracellular-vesicles",
    "https://www.mybeckman.in/support/faq/scientific/what-is-centrifugal-elutriation",
    "https://www.mybeckman.in/support/faq/scientific/what-is-count-rate",
    "https://www.mybeckman.in/support/faq/scientific/what-is-dynamic-light-scattering",
    "https://www.mybeckman.in/support/faq/scientific/what-is-intensity-distribution",
    "https://www.mybeckman.in/support/faq/scientific/what-is-quasi-elastic-light-scattering",
    "https://www.mybeckman.in/support/faq/scientific/what-is-static-light-scattering",
    "https://www.mybeckman.in/support/faq/scientific/what-is-the-correlation-curve",
    "https://www.mybeckman.in/support/faq/scientific/what-is-the-m-descriptor",
    "https://www.mybeckman.in/support/faq/scientific/what-is-volume-distribution",
    "https://www.mybeckman.in/support/faq/scientific/what-is-z-average-size",
    "https://www.mybeckman.in/support/faq/scientific/what-is-zeta-potential",
    "https://www.mybeckman.in/support/faq/services/adding-instruments-to-proservice",
    "https://www.mybeckman.in/support/faq/services/air-particle-calibration-frequency",
    "https://www.mybeckman.in/support/faq/services/beckman-coulter-for-service",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-access-and-permissions",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-automatic-start-up",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-controller-ip-address",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-vpn",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-benefits",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-communication-protocols",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-communication-settings",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-enrollment-process",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-remote-support-service",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-security-and-operator-controls",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-security-controls",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-security-features",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-service-fees",
    "https://www.mybeckman.in/support/faq/services/can-i-upgrade-windows-on-the-instrument-controller-pc",
    "https://www.mybeckman.in/support/faq/services/connectivity-for-beckmanconnect",
    "https://www.mybeckman.in/support/faq/services/consider-win10-upgrade-service-instrument-controller-pc",
    "https://www.mybeckman.in/support/faq/services/consider-windows-10-upgrade-if-controller-pc-not-connected-to-a-network",
    "https://www.mybeckman.in/support/faq/services/continue-to-use-existing-windows-7-controller-pc",
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-about-the-ordering-process",
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-assist-with-titrations",
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-can-any-lab-use-this-service",
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-delivery-schedule",
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-evaluate-sample-before-bulk",
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-outside-antibodies",
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-product-spec-changes",
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-saving-money",
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-use-service-no-bec-instrument",
    "https://www.mybeckman.in/support/faq/services/custom-design-services-ce-asr-labeling",
    "https://www.mybeckman.in/support/faq/services/custom-design-services-compensation-kit-receipt",
    "https://www.mybeckman.in/support/faq/services/custom-design-services-order-turnaround",
    "https://www.mybeckman.in/support/faq/services/custom-design-services-performance-difference",
    "https://www.mybeckman.in/support/faq/services/custom-design-services-pre-lot-evaluation",
    "https://www.mybeckman.in/support/faq/services/full-care-and-taxes",
    "https://www.mybeckman.in/support/faq/services/full-care-cancellation",
    "https://www.mybeckman.in/support/faq/services/full-care-equipment-freight",
    "https://www.mybeckman.in/support/faq/services/full-care-lease-terms",
    "https://www.mybeckman.in/support/faq/services/full-care-leasing",
    "https://www.mybeckman.in/support/faq/services/full-care-leasing-availability",
    "https://www.mybeckman.in/support/faq/services/full-care-leasing-instruments",
    "https://www.mybeckman.in/support/faq/services/full-care-leasing-options",
    "https://www.mybeckman.in/support/faq/services/full-care-leasing-tech-refresh",
    "https://www.mybeckman.in/support/faq/services/full-care-payments",
    "https://www.mybeckman.in/support/faq/services/full-care-service-benefits",
    "https://www.mybeckman.in/support/faq/services/get-started-with-proservice",
    "https://www.mybeckman.in/support/faq/services/how-proservice-works",
    "https://www.mybeckman.in/support/faq/services/instrument-qualification-and-move-support",
    "https://www.mybeckman.in/support/faq/services/instrument-verification-vs-calibration",
    "https://www.mybeckman.in/support/faq/services/liquid-particle-calibration-frequency",
    "https://www.mybeckman.in/support/faq/services/preventative-maintenance-for-high-use-equipment",
    "https://www.mybeckman.in/support/faq/services/preventative-maintenance-services",
    "https://www.mybeckman.in/support/faq/services/proservice-bandwidth-requirements",
    "https://www.mybeckman.in/support/faq/services/proservice-benefits",
    "https://www.mybeckman.in/support/faq/services/proservice-compatibility",
    "https://www.mybeckman.in/support/faq/services/proservice-connection-security",
    "https://www.mybeckman.in/support/faq/services/proservice-cost",
    "https://www.mybeckman.in/support/faq/services/proservice-data-parameters",
    "https://www.mybeckman.in/support/faq/services/proservice-data-storage",
    "https://www.mybeckman.in/support/faq/services/proservice-hardware",
    "https://www.mybeckman.in/support/faq/services/proservice-install-personnel",
    "https://www.mybeckman.in/support/faq/services/proservice-installation-preparation",
    "https://www.mybeckman.in/support/faq/services/proservice-installation-process",
    "https://www.mybeckman.in/support/faq/services/proservice-installation-time",
    "https://www.mybeckman.in/support/faq/services/proservice-instrument-connections",
    "https://www.mybeckman.in/support/faq/services/proservice-instruments",
    "https://www.mybeckman.in/support/faq/services/proservice-proxy-server",
    "https://www.mybeckman.in/support/faq/services/proservice-rap-box",
    "https://www.mybeckman.in/support/faq/services/proservice-remote-connectivity",
    "https://www.mybeckman.in/support/faq/services/proservice-security",
    "https://www.mybeckman.in/support/faq/services/proservice-standards",
    "https://www.mybeckman.in/support/faq/services/proservice-user-access",
    "https://www.mybeckman.in/support/faq/services/protected-health-info-and-proservice",
    "https://www.mybeckman.in/support/faq/services/remote-management-framework",
    "https://www.mybeckman.in/support/faq/services/replacement-parts-for-instrument-repairs",
    "https://www.mybeckman.in/support/faq/services/security-authentication-for-proservice",
    "https://www.mybeckman.in/support/faq/services/servicing-instruments",
    "https://www.mybeckman.in/support/faq/services/submitting-a-calibration-service-request",
    "https://www.mybeckman.in/support/faq/services/terms-conditions",
    "https://www.mybeckman.in/support/faq/services/what-does-windows-10-upgrade-service-include",
    "https://www.mybeckman.in/support/faq/services/what-happens-if-my-instrument-was-previously-oq-qualified",
    "https://www.mybeckman.in/support/faq/services/what-is-an-instrument-controller-pc",
    "https://www.mybeckman.in/support/faq/services/what-is-corecal",
    "https://www.mybeckman.in/support/faq/services/what-is-proservice",
    "https://www.mybeckman.in/support/faq/careers/onsite-tours",
    "https://www.mybeckman.in/support/faq/industry-standards/rational-for-the-subvisible-measurement-range",
    "https://www.mybeckman.in/support/faq/other/bar-code-reading-system",
    "https://www.mybeckman.in/support/faq/other/contract-upgrade",
    "https://www.mybeckman.in/support/faq/other/product-labeling",
    "https://www.mybeckman.in/support/faq/product/aquios-cl-accepted-barcode-types",
    "https://www.mybeckman.in/support/faq/product/lis-navios-integration",
    "https://www.mybeckman.in/support/faq/product/navios-operating-system",
    "https://www.mybeckman.in/support/faq/product/passing-system-suitability-test-with-qbd1200",
    "https://www.mybeckman.in/support/faq/product/spriselect-technical-documents",
    "https://www.mybeckman.in/support/faq/research/biologics-changing-disease-research-therapeutics",
    "https://www.mybeckman.in/support/faq/research/biomaterials-for-immunotherapy",
    "https://www.mybeckman.in/support/faq/research/differences-in-isolating-exosomes",
    "https://www.mybeckman.in/support/faq/research/t-cell-receptor-and-why-it-is-critical",
    "https://www.mybeckman.in/support/faq/research/treated-diseases-using-newly-approved-immunotherapies",
    "https://www.mybeckman.in/support/faq/research/vaccine-challenges-for-immunotherapy",
    "https://www.mybeckman.in/support/faq/scientific/what-is-laser-diffraction",
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-network-performance",
    "https://www.mybeckman.in/support/faq/services/custom-design-services-sodium-azide-free-formulas",
    "https://www.mybeckman.in/support/faq/services/proservice-network-protocol"
  ],
  "description": "FAQ answer: article column with a narrow right rail (col-md-3, offset) of related questions and links",
  "blocks": [
    {
      "name": "media-split",
      "instances": [
        "#content-holder > div.row:has(> div.col-md-4 img):has(> div.col-md-8 :is(p, ul, ol, h2, h3, h4, a))"
      ],
      "pageInstances": {
        "https://www.mybeckman.in/support/faq/careers/are-interns-paid": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/background-check-and-drug-test-requirements": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/college-interns-graduates-positions": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/company-recruiting": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/do-interns-receive-benefits": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/duration-of-internship": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/how-do-i-apply-for-a-position": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/international-students": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/internship-opportunities": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/job-application-process": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/job-application-received": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/onsite-interviews": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/summer-interns-college-graduate-recruitment": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/unpaid-or-volunteer-opportunities": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/when-do-college-interns-and-graduates-start-work": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/attaching-a-pdf-file-during-checkout": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/back-order-notification": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/billing-and-shipping-address-not-on-file": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/different-address-for-one-order": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/different-billing-or-shipping-address-from-registration": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/how-can-i-use-a-credit-card": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/how-can-i-use-a-purchase-order": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/how-do-i-see-contract-prices": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/incomplete-checkout-process": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/no-prices-in-the-catalog": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/online-store-availability": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/pricing-for-a-specific-contract": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/purchase-supplies-online-with-contract": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/register-for-online-ordering": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/shopping-online-with-a-contract": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/ecommerce/some-items-not-showing-catalog-price": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/21-cfr-11-and-training-requirements": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/21501-4-calibration-certificate": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/additional-asr-resources": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/aspects-of-manufacturing-under-cgmp": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/asr-offering-ous": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/asr-regulation-for-consistency-of-product": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/beckman-coulter-ensures-asr-product-quality": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/benefits-of-cgmp-manufacturing": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/calibration-certificate-requirements": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cgmp-for-air-particle-cleanliness": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-an-organization-and-personnel": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-buildings-and-facilities": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-documentation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-equipment": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-production-process": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-raw-material-control": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-the-laboratory": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-warehousing": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/changes-on-product-specifications-and-performance-post-ivdr": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/cleanroom-data-from-cro-to-fda": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/consistency-of-the-product": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/contemporaneously-meaning-from-the-fda": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/creating-an-audit-trail": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/difference-between-cgmp-and-gpm": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/electronic-documents-subject-to-part-11": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/electronic-format-for-cleanroom-records": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/flow-rate-for-instrument-calibration-and-measurement": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/format-for-electronic-records": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/gxp-cleanroom-monitoring": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/impacts-to-periodic-classification": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/iso-21501-4-and-compliance": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/iso-21501-calibration-test-elements": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/issue-for-silicone-oil-being-present": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/ivdr-implications-for-individual-clinical-laboratories": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/key-changes-to-sampling-classification": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/liquid-particle-counters-operating-characteristics": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/main-sections-of-usp-1787": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/meaning-of-changes-for-pharma": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/nanoscale-particles": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/national-institute-of-standards-and-technology": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/nist-traceable-standards": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/offsite-databases-over-onsite": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/particle-count-measurements": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/particle-counter-calibration-guidance": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/particle-counting-efficiency": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/particle-sizing-and-measurement": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/pharma-cleanroom-monitoring": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/protein-based-challenges": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/risk-based-approach-for-21-cfr-11": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/status-of-hydraulic-fluids-in-an-active-system": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/threshold-noise-level": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/usp-1787-and-usp-787": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/validation-of-cleanroom-workflow": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/what-are-extractables": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/what-are-leachables": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/what-is-a-coincidence-error": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/what-is-an-analyte-specific-reagent": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/what-is-cgmp": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/what-is-consensus-standard": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/what-is-iso-11171": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/what-is-srm-2806": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/when-will-part-11-update": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/2d-gs1-data-matrix-bar-code": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/additional-charges-for-service-engineers": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/aging-instruments": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/bar-code-reading-system-not-provided": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/bar-code-reading-system-recommendations": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/bar-code-reading-systems-for-labs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/changes-to-our-product-specifications": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/contract-manufacturing-services-availability": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/direct-calls-to-my-service-engineer": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/direction-for-contract-cleaners": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/escalating-a-problem": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/establish-a-scheduled-delivery": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/finding-my-system-id-number": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/help-with-cap-or-fda-audit": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/installation-upgrades-for-my-instrument": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/instrument-service-in-biohazard-areas": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/is-there-assistance-with-titrations": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/linear-bar-codes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/mission-vision": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/negotiate-a-discount-on-my-labor-rate": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/new-bar-code-change": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/number-to-request-material-safety-data-sheets": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/one-study-and-flow-cytometry": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/order-length": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/preventative-maintenance-coverage": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/preventative-maintenance-done-early": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/product-labeling-and-bar-codes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/reading-the-new-bar-code": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/reagents-bar-codes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/register-my-instrument": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/risk-based-sample-site-selection": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/sampling-changes-and-mega-size-cleanrooms": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/save-with-contact-management-services": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/service-agreement-pricing": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/service-agreements-from-third-parties": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/service-engineer-repair-capabilities": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/service-representative-tasks": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/services-and-warranties": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/services-for-lab-use": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/system-id-and-instruments": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/system-id-number-generated-the-wrong-instrument": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/technical-support-by-phone": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/training-for-field-engineers": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/what-is-system-id": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/which-engineer-will-respond-to-my-call": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/why-a-beckman-coulter-service-agreement": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/why-the-new-bar-code-standard": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/will-reagents-bar-codes-change": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/accuracy-of-sedimentation-and-diffusion-coefficient-calculations": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/acid-and-persulphate-not-oxidizing-organics": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/adding-parameters-to-navios": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/air-displacement": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/amount-of-cfdna-present-in-1ml-normal-plasma": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/ampure-xp-dry-step-following-ethanol-removal": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/ampure-xp-room-temperature": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/ampure-xp-technical-documents": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-applications": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-automate-repetitive-tasks": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-barcoded-reagents": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-customer-testimonials": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-how-it-works": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-lis-connectivity": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-load-and-go-flow-cytometry": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-running-user-defined-assays": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-sample-tubes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-throughput": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-user-friendly-easy-to-learn": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/are-bubbles-around-the-neck-of-the-polypropylene-bottle-normal-and-will-they-affect-performance": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/auc-analysis": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/auc-rotors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/bead-carryover-downstream-pcr": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/beads-and-binding": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/binding-capacity-of-beads": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/calibration-toc-analysis-records-qbd1200-memory-can-hold": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/can-ampure-xp-be-used-to-purify-rna": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/can-i-still-purchase-ampure": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/carrier-gas-amount-used-to-sample-1-vial": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/centrifuge-and-accessories-documentation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/centrifuge-and-rotor-serial-numbers": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/certification-for-centrifuges": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/clearllab-ifu-and-sample-types": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/clearllab-intended-use": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/cost-for-each-toc-analysis": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/counterbalance-configuration-for-auc": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/customer-quotes-for-the-aquios-cl": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/cytoflex-vssc": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/difference-between-auc-and-other-centrifuges": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/difference-between-static-and-dynamic-light-scattering": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-additional-liquid-antibodies": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-analyzing-complex-data": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-compensation-for-pre-formulated-panels": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-dura-innovations-different-from-lyophilization": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-dura-innovations-in-clinical-labs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-dura-innovations-limit-on-materials": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-if-cd8-not-included": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-if-cytokine-expression-t-helper-cell-type": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-if-inducing-cytokine-expression": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-if-sample-types": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-if-single-step-staining": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-if-why-alexafluor700-750": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-im-sample-material-use": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-im-what-is-one-study": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-overcoming-limitations-with-acq-software": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-sample-volume": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duraclone-staining-characteristics": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duractive-and-brefeldin-a": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duractive-environmental-cleanliness-reqs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duractive-heparinized-whole-blood": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duractive-lps-compound": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/duractive-stimulant-mixes-vs-liquid-formulations": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/ethernet-connection-qbd1200-networked-printer": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/expected-recovery-for-ampure-xp": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/expected-recovery-for-spriselect": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/expected-recovery-with-rnaclean-xp": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/filling-procedure-analytical-sample-cell": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/forces-on-solute-particle-in-gravitational-field": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/fringe-displacement-calculated": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/fringe-patterns-from-interference-testing": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/frozen-genomic-reagent-beads": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/how-can-i-purchase-kaluza-software": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/how-do-coulter-counters-work": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/how-does-the-network-license-work": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/how-does-the-qbd1200-avoid-interferences-from-tic": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/how-is-kaluza-licensed": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/how-much-thicker-is-the-new-polypropylene-bottle-than-the-previous-version": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/how-our-rna-extraction-kits-differ-from-existing-kits": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/interference-detected-by-auc": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/kaluza-analysis-v2-and-kaluza-for-gallios": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/kaluza-fcs-file-compatibility": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/kaluza-name-origin": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/kaluza-new-features": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/kaluza-recommended-computer-specifications": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/keyboard-mouse-connection-to-qbd1200": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/lab-productivity-with-aquios-cl": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/major-components-analytical-sample-cell": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/minimum-elution-volume": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/more-kaluza-performance": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/navios-acquisition-speed": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/navios-barcode-reader": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/navios-electronic-processing-capabilities": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/navios-fluorochromes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/navios-optical-filters": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/navios-versus-navios-ex": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/new-rna-extraction-solution-for-researchers": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/obtaining-schematics-for-a-centrifuge": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/one-reagent-needed-for-64-vials": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/qbd1200-auto-range-function": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/qbd1200-avoid-interference-residual-trace-amounts-co2": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/qbd1200-avoid-sample-to-sample-carry-over": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/qbd1200-control-amount-of-sample-drawn-in-analysis-dilution": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/qbd1200-uv-lamp-last": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/rayleigh-interferometer": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/rna-extraction-kit-manufacturing-outputs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/rna-extraction-kit-virus-detection-research-workflows": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/rnaclean-xp-bind-single-stranded-and-double-stranded-rna": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/rnaclean-xp-technical-documents": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/rnaclean-xp-to-purify-mirna": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/rnaclean-xp-tube-format": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/rnadvance-viral-xp-product-supplies": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/sample-water-required-each-vial-analyzed": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/service-calibration-interval-for-qbd1200": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/size-range-for-rnaclean-xp": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/spriplate-96-super-magnet-plate": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/toc-allowable-in-water-to-make-up-the-one-reagent": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/upper-size-limit-nucleic-acid-recovery": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/vials-analyzed-with-1-bottle-one-reagent-stock-solution": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/vials-analyzed-with-1litre-diluted-one-reagent": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/was-there-any-change-in-the-wall-thickness-with-the-new-polycarbonate-bottle-design": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/what-is-hiac": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/what-is-kaluza": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/what-is-pids-technology": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/what-is-the-difference-between-rnadvance-viral-xp-and-rnadvance-viral": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/where-are-our-rna-extraction-kits-manufactured": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/why-doesnt-the-qbd1200-report-tic": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/about-immunotherapy-clinical-trials": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/active-immunotherapy-and-passive-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/adeno-associated-viruses-used-as-vectors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/adenoviruses-used-as-vectors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/agent-type-affect-biologics-production": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/antigen-specific-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/are-all-immunotherapies-cell-based": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/biological-agent-type-affect-regulatory-standards": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/biologics-differ-from-traditional-pharmaceuticals": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/biologics-drive-antibody-directed-targeting": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/biologics-organ-tissue-transplantation-regenerative-medicine": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/biologics-used-act": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/biomarkers-for-diagnostic-screening-in-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/cancer-cells-bypass-tcr-mediated-t-cell-recognition": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/car-receptor-introduced-to-the-t-cell": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/car-t-cell-target-antigens": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/car-t-cells-for-therapeutic-purposes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/car-t-cells-side-effects": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/cells-for-cell-based-immunotherapies": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/chimeric-antigen-receptor-components-and-domains": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/considerations-to-optimizing-viral-vector-production": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/considerations-when-selecting-a-viral-vector-candidate": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/considered-approaches-to-improve-therapeutic-safety": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/crispr-enhancing-improved-therapeutic-agents": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/crispr-gene-therapy-impact-on-medicine": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/crispr-impact-gene-alterations-function": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/crispr-mediated-genetic-engineering-impact-industrial-productivity-nature": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/crispr-rnai-difference": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/crispr-talens-difference": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/crispr-zfns-difference": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/cytokines-boost-the-immune-system": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/deliver-foreign-nucleic-acids-into-a-cell": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/difference-between-chemotherapy-radiation-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/different-crispr-associated-system-proteins": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/different-t-cell-types": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/different-types-biologic-agents-researched": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/different-types-of-gene-therapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/different-types-of-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/diluting-biofluids-with-pbs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/drawbacks-side-effects-to-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/effective-immunotherapy-treatment-for-diseases": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/endogenous-purpose-of-crispr": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/ethical-dilemmas-and-crispr-technology": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/exosome-fraction-of-interest": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/exosomes-from-microvesicles": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/exosomes-risk-during-ultracentrifugation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/exosomes-role-in-cancer": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/extracellular-vesicle-guidelines": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/extracellular-vesicle-research-guidelines": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/functions-of-the-immune-system": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/future-of-car-t-research-therapeutics": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/gene-and-cell-therapy-differences": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/genetic-engineering-used-enhance-workflows-biologics-production": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/genetic-engineering-used-modify-biologic-agents": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/half-life-for-immunotherapy-drugs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/harmful-entities-and-immune-systems": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/herpes-simplex-viruses-used-as-vectors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/history-of-chimeric-antigen-receptors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-are-biologics-used-in-targeted-gene-therapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-are-car-t-cells-produced": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-are-exosomes-counted": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-are-exosomes-visualized-and-characterized": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-are-t-cells-isolated-and-expanded": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-biologic-medicines-are-administered": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-do-chimeric-antigen-receptors-work": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-do-you-produce-a-viral-vector": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-does-a-viral-vector-work": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/how-does-crispr-cas-work": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/i-do-not-see-a-pellet-after-centrifuging-exosomes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immune-checkpoint-inhibitors-in-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immune-function-therapeutically-restored-or-enhanced": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immune-system-eliminates-harmful-cells": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immune-system-not-functioning-properly": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immunosuppressants-for-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immunotherapy-and-aging": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immunotherapy-and-cancer-types": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immunotherapy-and-inflammatory-bowel-disease": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immunotherapy-future-with-hiv-aids": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immunotherapy-potential": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/immunotherapy-tumor-resistance": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/improving-adjuvants-for-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/innate-and-adaptive-immune-systems": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/isolation-protocol": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/lentiviruses-used-as-vectors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/local-tissue-environmental-conditions-affect-immune-function": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/main-components-of-crispr-cas-system": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/material-for-exosome-isolation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/mechanisms-of-antigen-loss-to-uncover-immunotherapeutics": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/medium-used-when-isolating-exosomes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/methods-for-isolating-exosomes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/mutational-load-and-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/nanoparticles-used-for-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/nhej-hdr-difference": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/oncolytic-viruses-targeting-cancer-cells-in-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/oral-sublingual-dermal-immunotherapy-differences": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/other-types-of-immune-cells": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/pat-defined": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/peptide-based-vaccines": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/popular-immunotherapy-approaches": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/protocol-for-ultracentrifugation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/protocols-for-isolating-exosomes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/quantitate-exosome-number": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/research-done-cell-based-biologic-agents": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/research-done-molecule-based-biologic-agents": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/research-done-tissue-based-biologic-agents": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/resolution-from-background-for-evs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/retroviruses-used-as-vectors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/rna-and-dna-viruses-in-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/role-genetic-engineering-biologics-production": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/safety-considerations-and-producing-viral-vectors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/secondary-screening-versus-high-throughput-screening": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/selecting-car-t-cells": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/single-cell-analysis-for-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/small-molecule-drugs-boost-immune-system": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/stem-cells-in-gene-and-cell-therapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/stimulate-cells-to-induce-cytokine-expression": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/strategies-for-enhancing-local-delivery-of-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/successful-isolation-of-exosomes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/targeting-blood-vessels-and-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/targeting-tumors-using-immunocytokines": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/tcr-til-car-t-differences-in-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/type-of-rotor-and-tubes-when-isolating-exosomes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/types-of-viruses-commonly-used-as-vectors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/ultracentrifugation-and-precipitation-comparison": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/vector-for-gene-transfer": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/viral-vector-challenges-for-therapeutic-applications": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/viral-vectors-versus-other-approaches": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-b-cells": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-biologics": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-chimeric-viral-vectors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-exosomes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-exosomes-made-of": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-macrophages": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-neoantigens": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-pam-sequences": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-small-molecule-drugs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-stem-cells": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-t-cells": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-are-viral-vectors": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-benefit-can-analyzing-evs-by-flow-cytometry-give": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-cargoes-do-exosomes-carry": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-a-biobetter": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-a-biomarker": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-a-biosimilar": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-a-chimeric-antigen-receptor": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-a-guide-molecule": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-a-lead-compound": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-adoptive-cell-transfer": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-an-antibody": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-an-antigen": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-bacillus-calmette-guerin": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-cell-therapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-cellular-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-combination-therapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-crispr": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-denaturation-and-the-cause": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-gene-therapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-high-throughput-screening": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-immune-evasion": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-immuno-oncology": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-immunogenicity": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-targeted-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-the-function-of-exosomes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/what-is-the-future-of-crispr": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/where-is-the-particulate": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/yields-from-exosomes-isolated-by-ultracentrifugation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/behind-the-coulter-principle": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/centrifugal-elutriation-and-biological-questions": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/distinguishing-particles-from-bulk-materials": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/equivalent-shape-methods": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/flow-cytometry-for-ev-isolation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/flow-rate": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/follicular-fluid": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/how-is-particle-size-determined": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/intraev-markers": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/irregular-shaped-3d-particles": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/light-scattering-and-particle-sizes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/measuring-zeta-potential": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/methods-for-analyzing-evs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/sterile-elutriator-system": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/surface-zeta-potential": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/technology-for-accurate-results-in-particle-characterization": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/tumor-microenvironment": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/types-of-extracellular-vesicles": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-centrifugal-elutriation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-count-rate": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-dynamic-light-scattering": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-intensity-distribution": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-quasi-elastic-light-scattering": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-static-light-scattering": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-the-correlation-curve": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-the-m-descriptor": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-volume-distribution": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-z-average-size": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-zeta-potential": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/adding-instruments-to-proservice": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/air-particle-calibration-frequency": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckman-coulter-for-service": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-access-and-permissions": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-automatic-start-up": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-controller-ip-address": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-vpn": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-benefits": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-communication-protocols": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-communication-settings": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-enrollment-process": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-remote-support-service": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-security-and-operator-controls": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-security-controls": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-security-features": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-service-fees": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/can-i-upgrade-windows-on-the-instrument-controller-pc": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/connectivity-for-beckmanconnect": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/consider-win10-upgrade-service-instrument-controller-pc": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/consider-windows-10-upgrade-if-controller-pc-not-connected-to-a-network": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/continue-to-use-existing-windows-7-controller-pc": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-about-the-ordering-process": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-assist-with-titrations": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-can-any-lab-use-this-service": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-delivery-schedule": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-evaluate-sample-before-bulk": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-outside-antibodies": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-product-spec-changes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-saving-money": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-use-service-no-bec-instrument": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/custom-design-services-ce-asr-labeling": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/custom-design-services-compensation-kit-receipt": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/custom-design-services-order-turnaround": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/custom-design-services-performance-difference": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/custom-design-services-pre-lot-evaluation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-and-taxes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-cancellation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-equipment-freight": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-lease-terms": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-leasing": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-leasing-availability": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-leasing-instruments": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-leasing-options": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-leasing-tech-refresh": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-payments": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/full-care-service-benefits": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/get-started-with-proservice": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/how-proservice-works": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/instrument-qualification-and-move-support": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/instrument-verification-vs-calibration": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/liquid-particle-calibration-frequency": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/preventative-maintenance-for-high-use-equipment": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/preventative-maintenance-services": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-bandwidth-requirements": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-benefits": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-compatibility": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-connection-security": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-cost": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-data-parameters": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-data-storage": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-hardware": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-install-personnel": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-installation-preparation": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-installation-process": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-installation-time": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-instrument-connections": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-instruments": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-proxy-server": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-rap-box": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-remote-connectivity": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-security": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-standards": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-user-access": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/protected-health-info-and-proservice": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/remote-management-framework": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/replacement-parts-for-instrument-repairs": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/security-authentication-for-proservice": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/servicing-instruments": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/submitting-a-calibration-service-request": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/terms-conditions": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/what-does-windows-10-upgrade-service-include": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/what-happens-if-my-instrument-was-previously-oq-qualified": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/what-is-an-instrument-controller-pc": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/what-is-corecal": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/what-is-proservice": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/careers/onsite-tours": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/industry-standards/rational-for-the-subvisible-measurement-range": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/bar-code-reading-system": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/contract-upgrade": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/other/product-labeling": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/aquios-cl-accepted-barcode-types": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/lis-navios-integration": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/navios-operating-system": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/passing-system-suitability-test-with-qbd1200": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/product/spriselect-technical-documents": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/biologics-changing-disease-research-therapeutics": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/biomaterials-for-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/differences-in-isolating-exosomes": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/t-cell-receptor-and-why-it-is-critical": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/treated-diseases-using-newly-approved-immunotherapies": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/research/vaccine-challenges-for-immunotherapy": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/scientific/what-is-laser-diffraction": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-network-performance": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/custom-design-services-sodium-azide-free-formulas": [
          "#content-holder > div"
        ],
        "https://www.mybeckman.in/support/faq/services/proservice-network-protocol": [
          "#content-holder > div"
        ]
      }
    }
  ],
  "sections": [
    {
      "id": "faq-answer",
      "name": "FAQ question and answer",
      "selector": [
        "#main > div.main-holder > div.container:has(#content-holder)",
        "#content-holder"
      ],
      "style": null,
      "blocks": [
        "media-split"
      ],
      "defaultContent": [
        "#content-holder > h1",
        "#main > div.main-holder > div.container:has(#content-holder) div.col-md-8"
      ]
    }
  ],
  "pageCleanup": {
    "https://www.mybeckman.in/support/faq/careers/are-interns-paid": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9257882776787293",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/background-check-and-drug-test-requirements": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.39778164344711564",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/college-interns-graduates-positions": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.32609967549582497",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/company-recruiting": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6852265514802427",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/do-interns-receive-benefits": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5732908570397154",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/duration-of-internship": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5447134469342159",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/how-do-i-apply-for-a-position": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.881362415067481",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/international-students": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7131249485906955",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/internship-opportunities": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.16450698586524382",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/job-application-process": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.164201254439304",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/job-application-received": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6047084131513459",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/onsite-interviews": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6206167608879601",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/summer-interns-college-graduate-recruitment": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5242278429343729",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/unpaid-or-volunteer-opportunities": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4981928585372085",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/when-do-college-interns-and-graduates-start-work": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.13962885338699182",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/attaching-a-pdf-file-during-checkout": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8227668616982637",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/back-order-notification": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.04729178185949656",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/billing-and-shipping-address-not-on-file": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2266893675218049",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/different-address-for-one-order": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.09977773724643413",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/different-billing-or-shipping-address-from-registration": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7637973109552124",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/how-can-i-use-a-credit-card": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7997348144280605",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/how-can-i-use-a-purchase-order": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.39260776203209646",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/how-do-i-see-contract-prices": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9639211812652788",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/incomplete-checkout-process": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.15627435108896293",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/no-prices-in-the-catalog": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8625311963475315",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/online-store-availability": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9585841885269004",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/pricing-for-a-specific-contract": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8801013960780131",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/purchase-supplies-online-with-contract": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3808745806823369",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/register-for-online-ordering": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.10900510436091915",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/shopping-online-with-a-contract": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7865722454902571",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/ecommerce/some-items-not-showing-catalog-price": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8579838626644388",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/21-cfr-11-and-training-requirements": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3954585018153747",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/21501-4-calibration-certificate": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9500024286534442",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/additional-asr-resources": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8585050896841849",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/aspects-of-manufacturing-under-cgmp": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.000035321570925783696",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/asr-offering-ous": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9296954615082399",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/asr-regulation-for-consistency-of-product": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8145550357073436",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/beckman-coulter-ensures-asr-product-quality": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3488779541911071",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/benefits-of-cgmp-manufacturing": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.24315223542405484",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/calibration-certificate-requirements": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4498633423776174",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-for-air-particle-cleanliness": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7165678309012297",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-an-organization-and-personnel": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9335348401346252",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-buildings-and-facilities": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9727915641748777",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-documentation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.33495717052118257",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-equipment": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.37846691763053886",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-production-process": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.11642360701107257",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-raw-material-control": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1478539298511169",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-the-laboratory": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5257628149858412",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cgmp-requirements-for-warehousing": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.603193573367889",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/changes-on-product-specifications-and-performance-post-ivdr": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.20585792212189258",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/cleanroom-data-from-cro-to-fda": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4546858413843837",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/consistency-of-the-product": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8767181376601655",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/contemporaneously-meaning-from-the-fda": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8040274057132507",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/creating-an-audit-trail": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.48806133064790513",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/difference-between-cgmp-and-gpm": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.04410816259488004",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/electronic-documents-subject-to-part-11": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.31804038173469074",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/electronic-format-for-cleanroom-records": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.923133099765452",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/flow-rate-for-instrument-calibration-and-measurement": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.00800955199284592",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/format-for-electronic-records": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6026109753864068",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/gxp-cleanroom-monitoring": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.34854795969337327",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/impacts-to-periodic-classification": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2970529348238209",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/iso-21501-4-and-compliance": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.48366821069998933",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/iso-21501-calibration-test-elements": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.13421361681204957",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/issue-for-silicone-oil-being-present": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5858113299242353",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/ivdr-implications-for-individual-clinical-laboratories": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.026988985568292767",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/key-changes-to-sampling-classification": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1252511583866227",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/liquid-particle-counters-operating-characteristics": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.537887016453902",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/main-sections-of-usp-1787": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6802187359932218",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/meaning-of-changes-for-pharma": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5869138504634175",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/nanoscale-particles": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.06494424931179432",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/national-institute-of-standards-and-technology": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.11220772696807979",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/nist-traceable-standards": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7270158292832073",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/offsite-databases-over-onsite": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8363947205482765",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/particle-count-measurements": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8914176142291251",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/particle-counter-calibration-guidance": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6136358410861487",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/particle-counting-efficiency": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7157957611382081",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/particle-sizing-and-measurement": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5651817660679551",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/pharma-cleanroom-monitoring": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5507489637155009",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/protein-based-challenges": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3467660141416221",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/risk-based-approach-for-21-cfr-11": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2570331213241437",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/status-of-hydraulic-fluids-in-an-active-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9738542901028834",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/threshold-noise-level": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2763307000168118",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/usp-1787-and-usp-787": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9457730838824725",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/validation-of-cleanroom-workflow": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3204551763268",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/what-are-extractables": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.05382981998317282",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/what-are-leachables": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3307371760772124",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-a-coincidence-error": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9787072785854771",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-an-analyte-specific-reagent": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.329613180660125",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-cgmp": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.19344957199888146",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-consensus-standard": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8234135339495141",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-iso-11171": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5074473804172903",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/what-is-srm-2806": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.05799293076976142",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/when-will-part-11-update": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.03691257311990148",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/2d-gs1-data-matrix-bar-code": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4097797798870181",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/additional-charges-for-service-engineers": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.28483017267054733",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/aging-instruments": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9004716546349986",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/bar-code-reading-system-not-provided": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8313886366493255",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/bar-code-reading-system-recommendations": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9860528008672406",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/bar-code-reading-systems-for-labs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9111523230482605",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/changes-to-our-product-specifications": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5891174204578172",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/contract-manufacturing-services-availability": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.46419315483450885",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/direct-calls-to-my-service-engineer": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8270453357346133",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/direction-for-contract-cleaners": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6276312194557223",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/escalating-a-problem": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5593613661265422",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/establish-a-scheduled-delivery": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7302304241911696",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/finding-my-system-id-number": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7901234495878027",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/help-with-cap-or-fda-audit": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.10579006196284901",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/installation-upgrades-for-my-instrument": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.034925519845318",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/instrument-service-in-biohazard-areas": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.44154388896461516",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/is-there-assistance-with-titrations": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4000571035526209",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/linear-bar-codes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4855418621189225",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/mission-vision": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.13736601446006869",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/negotiate-a-discount-on-my-labor-rate": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1892546047119753",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/new-bar-code-change": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9663332592978827",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/number-to-request-material-safety-data-sheets": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9933464033500528",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/one-study-and-flow-cytometry": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.11223513249238892",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/order-length": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5604335539133306",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/preventative-maintenance-coverage": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4213008360927353",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/preventative-maintenance-done-early": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.24892297339195613",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/product-labeling-and-bar-codes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2921967369245867",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/reading-the-new-bar-code": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1321193453180759",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/reagents-bar-codes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.664015186974398",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/register-my-instrument": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.652764464464933",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/risk-based-sample-site-selection": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5262037898249615",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/sampling-changes-and-mega-size-cleanrooms": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7625142949269997",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/save-with-contact-management-services": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.37007928605883766",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/service-agreement-pricing": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.20265778166365545",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/service-agreements-from-third-parties": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4847727221177023",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/service-engineer-repair-capabilities": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5079611874691928",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/service-representative-tasks": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6794723769053319",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/services-and-warranties": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9002486213704239",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/services-for-lab-use": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5356534124628184",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/system-id-and-instruments": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6726297375908026",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/system-id-number-generated-the-wrong-instrument": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.38687627919904366",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/technical-support-by-phone": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9195649238936227",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/training-for-field-engineers": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.34269305706100206",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/what-is-system-id": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5539482514207531",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/which-engineer-will-respond-to-my-call": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9762591017323808",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/why-a-beckman-coulter-service-agreement": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3920965810905135",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/why-the-new-bar-code-standard": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.16967529034739426",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/will-reagents-bar-codes-change": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7647754949545669",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/accuracy-of-sedimentation-and-diffusion-coefficient-calculations": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3267080029665782",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/acid-and-persulphate-not-oxidizing-organics": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6682834093270276",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/adding-parameters-to-navios": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.42149318126746727",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/air-displacement": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5266923674540651",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/amount-of-cfdna-present-in-1ml-normal-plasma": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8082786706637807",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/ampure-xp-dry-step-following-ethanol-removal": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.00020408433781082813",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/ampure-xp-room-temperature": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.005887628102503206",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/ampure-xp-technical-documents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5650107938528438",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-applications": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.20949671063005804",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-automate-repetitive-tasks": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.22749936094028345",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-barcoded-reagents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5606514227414102",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-customer-testimonials": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5696926697819693",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-how-it-works": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.912439490798593",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-lis-connectivity": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7983007962487135",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-load-and-go-flow-cytometry": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8510966520559854",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-running-user-defined-assays": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6029892508422244",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-sample-tubes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7907073852637251",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-throughput": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.855589942263149",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-user-friendly-easy-to-learn": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.43904764603706703",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/are-bubbles-around-the-neck-of-the-polypropylene-bottle-normal-and-will-they-affect-performance": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.29259411124831136",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/auc-analysis": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2130335282317276",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/auc-rotors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.106648145769765",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/bead-carryover-downstream-pcr": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3320056077638317",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/beads-and-binding": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.037361568276343515",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/binding-capacity-of-beads": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5837578671769893",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/calibration-toc-analysis-records-qbd1200-memory-can-hold": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5351002316799321",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/can-ampure-xp-be-used-to-purify-rna": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1749173072065051",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/can-i-still-purchase-ampure": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8945985736784408",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/carrier-gas-amount-used-to-sample-1-vial": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5304483378938886",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/centrifuge-and-accessories-documentation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9669477941886301",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/centrifuge-and-rotor-serial-numbers": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8327514802939133",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/certification-for-centrifuges": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.34763134998656053",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/clearllab-ifu-and-sample-types": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.27778311674524825",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/clearllab-intended-use": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.12178425083995581",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/cost-for-each-toc-analysis": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.48304840704085206",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/counterbalance-configuration-for-auc": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9218044986945396",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/customer-quotes-for-the-aquios-cl": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.031053543965123165",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/cytoflex-vssc": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.04148114157715399",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/difference-between-auc-and-other-centrifuges": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9637716065680331",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/difference-between-static-and-dynamic-light-scattering": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.889078586512164",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-additional-liquid-antibodies": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8264354020029019",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-analyzing-complex-data": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.013742826705359534",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-compensation-for-pre-formulated-panels": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.57439881578838",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-dura-innovations-different-from-lyophilization": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.08784730653354411",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-dura-innovations-in-clinical-labs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5845384808214955",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-dura-innovations-limit-on-materials": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5070531896265777",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-if-cd8-not-included": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7637758860687989",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-if-cytokine-expression-t-helper-cell-type": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4352457599211139",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-if-inducing-cytokine-expression": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.45881028459669393",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-if-sample-types": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.18613804447034543",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-if-single-step-staining": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8840252342154448",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-if-why-alexafluor700-750": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7844428839473215",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-im-sample-material-use": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.39297058714847444",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-im-what-is-one-study": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.899590227449889",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-overcoming-limitations-with-acq-software": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.08298259401014041",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-sample-volume": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.06570827762545972",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duraclone-staining-characteristics": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.44943281933500034",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duractive-and-brefeldin-a": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.21201612452146879",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duractive-environmental-cleanliness-reqs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8917974321004221",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duractive-heparinized-whole-blood": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7972512196881074",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duractive-lps-compound": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.43970023306655914",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/duractive-stimulant-mixes-vs-liquid-formulations": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8823633812312065",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/ethernet-connection-qbd1200-networked-printer": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6859186205260454",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/expected-recovery-for-ampure-xp": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.09661838830912772",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/expected-recovery-for-spriselect": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5516871245114123",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/expected-recovery-with-rnaclean-xp": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.918800247320317",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/filling-procedure-analytical-sample-cell": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2811732987873746",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/forces-on-solute-particle-in-gravitational-field": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.24761497883096517",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/fringe-displacement-calculated": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.37623753265432813",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/fringe-patterns-from-interference-testing": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.006253709716636635",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/frozen-genomic-reagent-beads": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6899559784434065",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/how-can-i-purchase-kaluza-software": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.38308129841015315",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/how-do-coulter-counters-work": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.345675566063286",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/how-does-the-network-license-work": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4695322064327352",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/how-does-the-qbd1200-avoid-interferences-from-tic": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2994701084073953",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/how-is-kaluza-licensed": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8420778381425686",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/how-much-thicker-is-the-new-polypropylene-bottle-than-the-previous-version": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3495229843271477",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/how-our-rna-extraction-kits-differ-from-existing-kits": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4395757332230542",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/interference-detected-by-auc": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9818650237324884",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/kaluza-analysis-v2-and-kaluza-for-gallios": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9580062443180315",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/kaluza-fcs-file-compatibility": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2695201622015484",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/kaluza-name-origin": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.21244033671086338",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/kaluza-new-features": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5686941031269778",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/kaluza-recommended-computer-specifications": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3712777192291624",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/keyboard-mouse-connection-to-qbd1200": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7648087755762084",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/lab-productivity-with-aquios-cl": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.12254849649707333",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/major-components-analytical-sample-cell": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.23299049398420912",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/minimum-elution-volume": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7120550684007605",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/more-kaluza-performance": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9897526476318865",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/navios-acquisition-speed": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.13897124597476984",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/navios-barcode-reader": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.893386325847112",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/navios-electronic-processing-capabilities": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3521575637804075",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/navios-fluorochromes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3795949329178302",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/navios-optical-filters": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4420978857430595",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/navios-versus-navios-ex": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.010235052440888404",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/new-rna-extraction-solution-for-researchers": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7385762807975622",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/obtaining-schematics-for-a-centrifuge": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6717280477686807",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/one-reagent-needed-for-64-vials": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2313628452751072",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/qbd1200-auto-range-function": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5696929498529529",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/qbd1200-avoid-interference-residual-trace-amounts-co2": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7353636234775621",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/qbd1200-avoid-sample-to-sample-carry-over": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.46375065004853755",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/qbd1200-control-amount-of-sample-drawn-in-analysis-dilution": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8705901423146415",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/qbd1200-uv-lamp-last": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.29519456932893096",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/rayleigh-interferometer": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4908124493967928",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/rna-extraction-kit-manufacturing-outputs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7224595628029569",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/rna-extraction-kit-virus-detection-research-workflows": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.51803022720552",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/rnaclean-xp-bind-single-stranded-and-double-stranded-rna": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7101973942286189",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/rnaclean-xp-technical-documents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6268957771192216",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/rnaclean-xp-to-purify-mirna": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8971320477905241",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/rnaclean-xp-tube-format": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.031418345164032524",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/rnadvance-viral-xp-product-supplies": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.015306578177943342",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/sample-water-required-each-vial-analyzed": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8244591191690779",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/service-calibration-interval-for-qbd1200": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9013884807408379",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/size-range-for-rnaclean-xp": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7422416467651475",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/spriplate-96-super-magnet-plate": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3092022390574023",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/toc-allowable-in-water-to-make-up-the-one-reagent": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9717927877176776",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/upper-size-limit-nucleic-acid-recovery": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.889893032834316",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/vials-analyzed-with-1-bottle-one-reagent-stock-solution": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8571143963777246",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/vials-analyzed-with-1litre-diluted-one-reagent": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7512747458567041",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/was-there-any-change-in-the-wall-thickness-with-the-new-polycarbonate-bottle-design": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.032891409036119645",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/what-is-a-particle-counter": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8235812431636491",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/what-is-hiac": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.26718968576577407",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/what-is-kaluza": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9747830956132209",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/what-is-pids-technology": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3012357905782108",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/what-is-the-difference-between-rnadvance-viral-xp-and-rnadvance-viral": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.06965302289978292",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/where-are-our-rna-extraction-kits-manufactured": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8118405971774648",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/why-doesnt-the-qbd1200-report-tic": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5531630720197482",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/about-immunotherapy-clinical-trials": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.36066887779549084",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/active-immunotherapy-and-passive-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.32087283442347003",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/adeno-associated-viruses-used-as-vectors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.37859131834576865",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/adenoviruses-used-as-vectors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7419098872701887",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/agent-type-affect-biologics-production": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6460167371003077",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/antigen-specific-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5847293046007322",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/are-all-immunotherapies-cell-based": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.07990824559301246",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/biological-agent-type-affect-regulatory-standards": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6806009832766727",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/biologics-differ-from-traditional-pharmaceuticals": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.38292501425711534",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/biologics-drive-antibody-directed-targeting": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4802415993350416",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/biologics-organ-tissue-transplantation-regenerative-medicine": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.04753068451763842",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/biologics-used-act": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8644478264861346",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/biomarkers-for-diagnostic-screening-in-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.32798499041755813",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/cancer-cells-bypass-tcr-mediated-t-cell-recognition": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9752493043222029",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/car-receptor-introduced-to-the-t-cell": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7986528712094965",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/car-t-cell-target-antigens": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4645129447067564",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/car-t-cells-for-therapeutic-purposes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8203747704309753",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/car-t-cells-side-effects": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1920406703851678",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/cells-for-cell-based-immunotherapies": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6639536089634037",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/chimeric-antigen-receptor-components-and-domains": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2899597679200627",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/considerations-to-optimizing-viral-vector-production": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5577396319027551",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/considerations-when-selecting-a-viral-vector-candidate": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7821505416894435",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/considered-approaches-to-improve-therapeutic-safety": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.32803607058703965",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/crispr-enhancing-improved-therapeutic-agents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6137341447025999",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/crispr-gene-therapy-impact-on-medicine": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5901579353626816",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/crispr-impact-gene-alterations-function": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.11541155418428684",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/crispr-mediated-genetic-engineering-impact-industrial-productivity-nature": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8086064142501894",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/crispr-rnai-difference": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4354365167071229",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/crispr-talens-difference": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9144990804804382",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/crispr-zfns-difference": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.40788226969591823",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/cytokines-boost-the-immune-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8392791024524618",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/deliver-foreign-nucleic-acids-into-a-cell": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.770026417830452",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/difference-between-chemotherapy-radiation-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1314505974829625",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/different-crispr-associated-system-proteins": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9375923131571171",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/different-t-cell-types": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.18268447127194776",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/different-types-biologic-agents-researched": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7245966857478093",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/different-types-of-gene-therapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3388739325346666",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/different-types-of-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7858899418914729",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/diluting-biofluids-with-pbs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7943553492070421",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/drawbacks-side-effects-to-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.03952814022396334",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/effective-immunotherapy-treatment-for-diseases": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.002312051090004208",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/endogenous-purpose-of-crispr": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8111818960363393",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/ethical-dilemmas-and-crispr-technology": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8263150245838717",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/exosome-fraction-of-interest": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.31856473318678113",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/exosomes-from-microvesicles": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3373526294446463",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/exosomes-risk-during-ultracentrifugation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.14660498557753354",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/exosomes-role-in-cancer": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.17426732237523546",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/extracellular-vesicle-guidelines": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5167340612074052",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/extracellular-vesicle-research-guidelines": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8718332223049938",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/functions-of-the-immune-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6918836779830794",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/future-of-car-t-research-therapeutics": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8660773478814602",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/gene-and-cell-therapy-differences": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.94436922433592",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/genetic-engineering-used-enhance-workflows-biologics-production": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6911500654525784",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/genetic-engineering-used-modify-biologic-agents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.33713417397575507",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/half-life-for-immunotherapy-drugs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.37237896340477394",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/harmful-entities-and-immune-systems": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5507759696176311",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/herpes-simplex-viruses-used-as-vectors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9821599448773335",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/history-of-chimeric-antigen-receptors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.33082015206842175",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-are-biologics-used-in-targeted-gene-therapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6025154101078082",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-are-car-t-cells-produced": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.07470299246021961",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-are-exosomes-counted": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5637888971102275",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-are-exosomes-visualized-and-characterized": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2370882882936437",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-are-t-cells-isolated-and-expanded": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.0960799987607126",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-biologic-medicines-are-administered": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2033811676472348",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-do-chimeric-antigen-receptors-work": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3720271063747721",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-do-you-produce-a-viral-vector": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9445618772770525",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-does-a-viral-vector-work": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7437322269670706",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/how-does-crispr-cas-work": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.36994567174832493",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/i-do-not-see-a-pellet-after-centrifuging-exosomes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4327536586445696",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immune-checkpoint-inhibitors-in-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.10950278540932645",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immune-function-therapeutically-restored-or-enhanced": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9742970789252163",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immune-system-eliminates-harmful-cells": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.06713699479158375",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immune-system-not-functioning-properly": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3533534300708916",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immunosuppressants-for-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5872426801321224",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immunotherapy-and-aging": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7928308505280255",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immunotherapy-and-cancer-types": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.04553340991840249",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immunotherapy-and-inflammatory-bowel-disease": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7199368172781845",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immunotherapy-future-with-hiv-aids": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.29205730611634306",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immunotherapy-potential": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7541028781313863",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/immunotherapy-tumor-resistance": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.638584465854982",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/improving-adjuvants-for-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7276739245346835",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/innate-and-adaptive-immune-systems": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7889990142086472",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/isolation-protocol": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1973507359520119",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/lentiviruses-used-as-vectors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3298902647728801",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/local-tissue-environmental-conditions-affect-immune-function": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9034686100817371",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/main-components-of-crispr-cas-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.20282095825366575",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/material-for-exosome-isolation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.15390689530639856",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/mechanisms-of-antigen-loss-to-uncover-immunotherapeutics": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7721714939926727",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/medium-used-when-isolating-exosomes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3587911728790725",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/methods-for-isolating-exosomes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.14306481920691227",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/mutational-load-and-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6926243488348979",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/nanoparticles-used-for-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8488435862656198",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/nhej-hdr-difference": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8008771335006302",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/oncolytic-viruses-targeting-cancer-cells-in-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7392587845003274",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/oral-sublingual-dermal-immunotherapy-differences": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7360359295039451",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/other-types-of-immune-cells": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.47177334577637653",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/pat-defined": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5397152021809527",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/peptide-based-vaccines": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.12920250850654025",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/popular-immunotherapy-approaches": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9420518484340769",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/protocol-for-ultracentrifugation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5153739470716375",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/protocols-for-isolating-exosomes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.10204715264990794",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/quantitate-exosome-number": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.33901715054855475",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/research-done-cell-based-biologic-agents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.45781230869552314",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/research-done-molecule-based-biologic-agents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7378821604679415",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/research-done-tissue-based-biologic-agents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1999266796475836",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/resolution-from-background-for-evs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5259090406095447",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/retroviruses-used-as-vectors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.008452788386309917",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/rna-and-dna-viruses-in-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6495202860119047",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/role-genetic-engineering-biologics-production": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.27406005059291405",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/safety-considerations-and-producing-viral-vectors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.31324445203788553",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/secondary-screening-versus-high-throughput-screening": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9173057241147842",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/selecting-car-t-cells": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8577062886096894",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/single-cell-analysis-for-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.1978348841563301",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/small-molecule-drugs-boost-immune-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5695619824826698",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/stem-cells-in-gene-and-cell-therapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9918406513905139",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/stimulate-cells-to-induce-cytokine-expression": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7920484342739932",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/strategies-for-enhancing-local-delivery-of-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8601316483218493",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/successful-isolation-of-exosomes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7585880907752801",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/targeting-blood-vessels-and-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.37574674657112517",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/targeting-tumors-using-immunocytokines": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.763683308926367",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/tcr-til-car-t-differences-in-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.12765484832781104",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/type-of-rotor-and-tubes-when-isolating-exosomes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.19742856618687143",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/types-of-viruses-commonly-used-as-vectors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.955217504688669",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/ultracentrifugation-and-precipitation-comparison": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.41327976108848796",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/vector-for-gene-transfer": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.005247427122849091",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/viral-vector-challenges-for-therapeutic-applications": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.658124981219174",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/viral-vectors-versus-other-approaches": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9085179140143775",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-b-cells": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5966893740599934",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-biologics": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5441450158084595",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-chimeric-viral-vectors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.015461861700549306",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-exosomes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8347489921995827",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-exosomes-made-of": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.0525626498890126",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-macrophages": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3793337806730076",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-neoantigens": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.05887162955399339",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-pam-sequences": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2555233911626902",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-small-molecule-drugs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.43214916730833663",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-stem-cells": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6735936836117218",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-t-cells": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5376283168288112",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-are-viral-vectors": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9104810022675978",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-benefit-can-analyzing-evs-by-flow-cytometry-give": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8741834491195694",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-cargoes-do-exosomes-carry": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9920236659306225",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-a-biobetter": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9438008351384541",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-a-biomarker": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5618111262004568",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-a-biosimilar": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8500693361581761",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-a-chimeric-antigen-receptor": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.40776434960261654",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-a-guide-molecule": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.967479961884432",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-a-lead-compound": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.06440894975873668",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-adoptive-cell-transfer": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6245448853499072",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-an-antibody": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.11379005523499186",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-an-antigen": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4862398251344162",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-bacillus-calmette-guerin": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6077338795055655",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-cell-therapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.06507730549725876",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-cellular-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8517294784835322",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-combination-therapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3042340030349703",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-crispr": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.588960834284685",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-denaturation-and-the-cause": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.10521162113833193",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-gene-therapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6818950076066144",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-high-throughput-screening": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.15266681571768081",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-immune-evasion": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.305494446357096",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-immuno-oncology": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3927527641048144",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-immunogenicity": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6332758140852821",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.31680340794757267",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-targeted-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.582393014355381",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-the-function-of-exosomes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6815470360510562",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/what-is-the-future-of-crispr": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4950081475356676",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/where-is-the-particulate": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9854484669371318",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/yields-from-exosomes-isolated-by-ultracentrifugation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6220921505431832",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/behind-the-coulter-principle": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.14384364485988588",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/centrifugal-elutriation-and-biological-questions": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.46199766675311094",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/distinguishing-particles-from-bulk-materials": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.47610502459378357",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/equivalent-shape-methods": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7757145238957851",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/flow-cytometry-for-ev-isolation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3112818953941223",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/flow-rate": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5043136432993296",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/follicular-fluid": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.057390653849929474",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/how-is-particle-size-determined": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2572718115821544",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/intraev-markers": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.32963183617733927",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/irregular-shaped-3d-particles": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9442912319662417",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/light-scattering-and-particle-sizes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.19999478951796812",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/measuring-zeta-potential": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.46389834889849235",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/methods-for-analyzing-evs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9893569721959239",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/sterile-elutriator-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8109777095341415",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/surface-zeta-potential": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.26513408943986005",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/technology-for-accurate-results-in-particle-characterization": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.16727434830272636",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/tumor-microenvironment": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.099037920087236",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/types-of-extracellular-vesicles": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7059785274329915",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-centrifugal-elutriation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.48507616917330587",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-count-rate": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7645290820570373",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-dynamic-light-scattering": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2755446570049219",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-intensity-distribution": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9080332814473032",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-quasi-elastic-light-scattering": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.39027888843604097",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-static-light-scattering": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7320945876126984",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-the-correlation-curve": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.14783919714885807",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-the-m-descriptor": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.867720364271381",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-volume-distribution": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6212733053418776",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-z-average-size": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.38160148190385734",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-zeta-potential": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5657051407102751",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/adding-instruments-to-proservice": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7728143569111414",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/air-particle-calibration-frequency": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6756203313254459",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckman-coulter-for-service": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.979095959982434",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-access-and-permissions": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3780428310179209",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-automatic-start-up": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5444497004002882",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-controller-ip-address": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2392010354838323",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-vpn": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8277440570131269",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-benefits": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9021260509345833",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-communication-protocols": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.31733354204152786",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-communication-settings": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4114084114826353",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-enrollment-process": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.16584843792885084",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-remote-support-service": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.08097924269234047",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-security-and-operator-controls": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.15664380115076826",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-security-controls": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3996623173210344",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-security-features": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6446289953263734",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-service-fees": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.45266936783572354",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/can-i-upgrade-windows-on-the-instrument-controller-pc": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7292721543288764",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/connectivity-for-beckmanconnect": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9965039717585368",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/consider-win10-upgrade-service-instrument-controller-pc": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7198153121171347",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/consider-windows-10-upgrade-if-controller-pc-not-connected-to-a-network": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.04071188449361696",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/continue-to-use-existing-windows-7-controller-pc": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.45347179717115615",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-about-the-ordering-process": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.49675550018230363",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-assist-with-titrations": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6367833048911913",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-can-any-lab-use-this-service": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6278722965769973",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-delivery-schedule": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2686698470584655",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-evaluate-sample-before-bulk": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8137071166563367",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-outside-antibodies": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6460172575441661",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-product-spec-changes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9785216656491639",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-saving-money": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.18056313356070763",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/contract-manufacturing-services-use-service-no-bec-instrument": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.22664150938331395",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/custom-design-services-ce-asr-labeling": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.11077115809811089",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/custom-design-services-compensation-kit-receipt": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2383445924962404",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/custom-design-services-order-turnaround": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.013442352940569058",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/custom-design-services-performance-difference": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7002315187283689",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/custom-design-services-pre-lot-evaluation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7556525407954927",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-and-taxes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8112694675041929",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-cancellation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.43173471019039744",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-equipment-freight": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7056575424723932",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-lease-terms": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.3911383101904282",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-leasing": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5233319075559505",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-leasing-availability": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.05229165910545441",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-leasing-instruments": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5639238764882859",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-leasing-options": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.564885742127191",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-leasing-tech-refresh": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.11433588468957656",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-payments": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.03690029329614908",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/full-care-service-benefits": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.38265817749725506",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/get-started-with-proservice": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.33654281960360877",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/how-proservice-works": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6895026163096679",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/instrument-qualification-and-move-support": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7201949236455338",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/instrument-verification-vs-calibration": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.13951821133034015",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/liquid-particle-calibration-frequency": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9697219648117382",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/preventative-maintenance-for-high-use-equipment": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.05575594159074038",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/preventative-maintenance-services": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5969406669846365",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-bandwidth-requirements": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9778335695327189",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-benefits": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5562431893710499",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-compatibility": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2835388154418642",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-connection-security": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.829273056774285",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-cost": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.20148544332533747",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-data-parameters": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.18770069538366274",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-data-storage": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.20958326539265526",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-hardware": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.12975652948047467",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-install-personnel": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5373887699806218",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-installation-preparation": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5673160645667064",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-installation-process": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5503398571686089",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-installation-time": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5841139422879641",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-instrument-connections": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.34226938226446857",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-instruments": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6630759799391253",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-proxy-server": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4156911775803427",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-rap-box": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2653345920730319",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-remote-connectivity": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4642585363005408",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-security": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.755228837248271",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-standards": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4555135880327259",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-user-access": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.14567475875932467",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/protected-health-info-and-proservice": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8996904546786172",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/remote-management-framework": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4116818085508145",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/replacement-parts-for-instrument-repairs": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.2506387694038583",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/security-authentication-for-proservice": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7854444377638106",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/servicing-instruments": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6108234446287591",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/submitting-a-calibration-service-request": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5793550139866864",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/terms-conditions": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5330514312612779",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/what-does-windows-10-upgrade-service-include": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4080810150788259",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/what-happens-if-my-instrument-was-previously-oq-qualified": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6739464239060727",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/what-is-an-instrument-controller-pc": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.49335396075254656",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/what-is-corecal": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8057953005967377",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/what-is-proservice": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.0243053950901595",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/careers/onsite-tours": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9412438508229252",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/industry-standards/rational-for-the-subvisible-measurement-range": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7778112445285837",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/bar-code-reading-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5298704492205577",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/contract-upgrade": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.5052355272397429",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/other/product-labeling": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.9006117214221464",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/aquios-cl-accepted-barcode-types": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7874106262974249",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/lis-navios-integration": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.06624624050565464",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/navios-operating-system": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6850467053521392",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/passing-system-suitability-test-with-qbd1200": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.6960342955911474",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/product/spriselect-technical-documents": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.07483996859996911",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/biologics-changing-disease-research-therapeutics": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.002522494709499168",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/biomaterials-for-immunotherapy": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.8920516630875716",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/differences-in-isolating-exosomes": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7805789706300243",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/t-cell-receptor-and-why-it-is-critical": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.26303053179487856",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/treated-diseases-using-newly-approved-immunotherapies": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.4742298512096851",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/research/vaccine-challenges-for-immunotherapy": [
      "div.flash-message",
      "#truste_0\\.03958695931752387",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/scientific/what-is-laser-diffraction": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.01825596183224265",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/beckmanconnect-and-network-performance": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7794954774795156",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/custom-design-services-sodium-azide-free-formulas": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.04051913773517035",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ],
    "https://www.mybeckman.in/support/faq/services/proservice-network-protocol": [
      "#trustarc-banner-overlay",
      "div.flash-message",
      "#truste-consent-track",
      "#truste_0\\.7743012718219351",
      "#teconsent",
      "#ModalPopup",
      "#country-selector-newHeader"
    ]
  }
};

const parsers = {
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
