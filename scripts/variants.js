/**
 * Block families with variants: one block (cards, carousel, accordion, table, hero, embed) whose
 * variant is a block option, e.g. "Cards (faq)" or "Table (specs, pairs)". Each variant keeps its
 * own code and styles in blocks/<family>/variants/<variant>.{js,css}; the family's <family>.js
 * calls decorateVariant().
 *
 * - Legacy names: each variant was a separate block (e.g. cards-faq), so its CSS and the page
 *   styles use .<legacy>, .<legacy>-wrapper and .<legacy>-container. Those classes are added
 *   to the block, its wrapper and its section.
 * - Item type cell: rows of a family with several item types start with the item component id
 *   in imported content (the converter uses it to pick the row's model, e.g. "cards-faq-card");
 *   AEM never renders it. A leading cell holding only a known item id is removed.
 * - Unused fields: AEM renders every block-level field of the family's model as a row, so other
 *   variants' fields arrive as empty rows. Rows without any content are removed.
 */
import { loadCSS } from './aem.js';

const hasContent = (el) => Boolean(el.textContent.trim()
  || el.querySelector('img, picture, a, iframe, video, svg'));

/**
 * @param {Element} block the block element
 * @param {string} family block name, e.g. 'cards'
 * @param {Object<string, string>} variants variant option (single word, AEM splits hyphenated
 *   options) -> legacy block name, e.g. { faq: 'cards-faq', icons: 'accordion-icon-grid' }
 * @param {string[]} [itemIds] item component ids that may lead a row
 * @returns {Promise<string>} the variant name ('' for the family's default look)
 */
export default async function decorateVariant(block, family, variants, itemIds = []) {
  const variant = Object.keys(variants).find((v) => block.classList.contains(v)) || '';

  [...block.children].forEach((row) => {
    const first = row.firstElementChild;
    if (first && row.children.length > 1 && itemIds.includes(first.textContent.trim())
      && !first.querySelector('img, picture, a')) first.remove();
    if (!hasContent(row)) row.remove();
  });

  const name = variant || 'default';
  if (variant) {
    const legacy = variants[variant];
    block.classList.add(legacy);
    block.parentElement?.classList.add(`${legacy}-wrapper`);
    block.closest('.section')?.classList.add(`${legacy}-container`);
  }
  const base = `${window.hlx.codeBasePath}/blocks/${family}/variants/${name}`;
  const [, mod] = await Promise.all([loadCSS(`${base}.css`), import(`${base}.js`)]);
  await mod.default(block);
  return variant;
}
