import decorateVariant from '../../scripts/variants.js';

const VARIANTS = {
  gallery: 'carousel-gallery',
  product: 'carousel-product',
  testimonial: 'carousel-testimonial',
};
const ITEMS = [
  'carousel-item',
  'carousel-gallery-slide',
  'carousel-product-card',
  'carousel-testimonial-slide',
];

export default async function decorate(block) {
  await decorateVariant(block, 'carousel', VARIANTS, ITEMS);
}

/**
 * Universal Editor slide sync: scripts/editor-support.js imports showSlide from here and calls
 * it for every .carousel block. Only the default look has .carousel-slides to scroll.
 * @param {Element} block
 * @param {...*} args slide index, scroll behavior
 */
export async function showSlide(block, ...args) {
  if (!block.querySelector('.carousel-slides')) return;
  const mod = await import('./variants/default.js');
  mod.showSlide(block, ...args);
}
