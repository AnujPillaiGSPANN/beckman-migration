import decorateVariant from '../../scripts/variants.js';

// variant option -> old block name (its code and styles live in variants/<option>.{js,css})
const VARIANTS = {
  product: 'cards-product',
  faq: 'cards-faq',
  icons: 'cards-icon',
  resource: 'cards-resource',
  scroll: 'cards-scroll',
  doclist: 'cards-doclist',
  downloads: 'cards-downloads',
  gradient: 'cards-gradient',
  steps: 'cards-steps',
  workflow: 'cards-workflow',
  tiles: 'cards-tiles',
};

// every item component id of the family (may lead a row in imported content)
const ITEMS = [
  'card',
  'cards-product-card',
  'cards-faq-card',
  'cards-icon-card',
  'cards-resource-card',
  'cards-scroll-card',
  'cards-doclist-item',
  'cards-downloads-item',
  'cards-gradient-item',
  'cards-steps-item',
  'cards-workflow-item',
  'cards-tiles-card',
];

export default async function decorate(block) {
  await decorateVariant(block, 'cards', VARIANTS, ITEMS);
}
