import decorateVariant from '../../scripts/variants.js';

// variant option -> old block name (its code and styles live in variants/<option>.{js,css})
const VARIANTS = {
  motion: 'hero-video',
  promo: 'hero-promo',
};

// every item component id of the family (may lead a row in imported content)
const ITEMS = ['hero-promo-feature'];

export default async function decorate(block) {
  await decorateVariant(block, 'hero', VARIANTS, ITEMS);
}
