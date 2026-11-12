import decorateVariant from '../../scripts/variants.js';

// variant option -> old block name (its code and styles live in variants/<option>.{js,css})
const VARIANTS = {
  marketo: 'embed-marketo',
  wistia: 'embed-wistia',
};

export default async function decorate(block) {
  await decorateVariant(block, 'embed', VARIANTS);
}
