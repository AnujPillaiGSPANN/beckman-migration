import decorateVariant from '../../scripts/variants.js';

// variant option -> old block name (its code and styles live in variants/<option>.{js,css})
const VARIANTS = {
  comparison: 'table-comparison',
  specs: 'table-specs',
};

// every item component id of the family (may lead a row in imported content)
const ITEMS = [
  'table-row',
  'table-col-2',
  'table-col-3',
  'table-col-4',
  'table-comparison-row',
  'table-specs-row',
];

export default async function decorate(block) {
  await decorateVariant(block, 'table', VARIANTS, ITEMS);
}
