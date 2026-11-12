import decorateVariant from '../../scripts/variants.js';

const VARIANTS = {
  faq: 'accordion-faq',
  icons: 'accordion-icon-grid',
  rail: 'accordion-rail',
};
const ITEMS = [
  'accordion-item',
  'accordion-faq-item',
  'accordion-icon-grid-item',
  'accordion-rail-item',
];

export default async function decorate(block) {
  await decorateVariant(block, 'accordion', VARIANTS, ITEMS);
}
