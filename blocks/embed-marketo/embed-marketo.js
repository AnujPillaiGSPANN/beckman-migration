import { loadCSS, loadScript } from '../../scripts/aem.js';

const DEFAULTS = {
  baseUrl: 'https://pages.beckman.com',
  munchkinId: '682-XWP-826',
};

/**
 * Reads the Marketo settings from the block rows. Each row holds one value:
 * a base URL (http...), a Munchkin id (NNN-XXX-NNN) and a numeric form id.
 * Rows may also be authored as "key | value" pairs.
 * @param {Element} block
 */
function readConfig(block) {
  const config = { ...DEFAULTS, formId: '' };
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const value = (cells[cells.length - 1]?.querySelector('a')?.href
      || cells[cells.length - 1]?.textContent || '').trim();
    const key = cells.length > 1 ? cells[0].textContent.trim().toLowerCase() : '';
    if (/^https?:\/\//i.test(value) || key.includes('url')) config.baseUrl = value.replace(/\/+$/, '');
    else if (/^\d{3}-[a-z]{3}-\d{3}$/i.test(value) || key.includes('munchkin')) config.munchkinId = value;
    else if (/^\d+$/.test(value) || key.includes('form')) config.formId = value;
  });
  return config;
}

async function renderForm(block, { baseUrl, munchkinId, formId }) {
  try {
    await Promise.all([
      loadCSS(`${baseUrl}/js/forms2/css/forms2.css`),
      loadScript(`${baseUrl}/js/forms2/js/forms2.min.js`),
    ]);
    if (!window.MktoForms2) throw new Error('MktoForms2 not available');
    window.MktoForms2.loadForm(baseUrl, munchkinId, Number(formId), (form) => {
      block.classList.add('embed-marketo-loaded');
      form?.getFormElem?.()?.[0]?.removeAttribute('style');
    });
  } catch (e) {
    block.classList.add('embed-marketo-error');
    // eslint-disable-next-line no-console
    console.error('embed-marketo: unable to load the Marketo form', e);
  }
}

/**
 * Embed (marketo): renders a Marketo forms2 form.
 * Rows: [Marketo base URL] [Munchkin id] [form id]; base URL and Munchkin id
 * default to the Beckman instance. Loads lazily when near the viewport.
 * @param {Element} block
 */
export default function decorate(block) {
  const config = readConfig(block);
  block.textContent = '';
  if (!config.formId) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'embed-marketo-wrapper';
  const form = document.createElement('form');
  form.id = `mktoForm_${config.formId}`;
  wrapper.append(form);
  block.append(wrapper);

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      renderForm(block, config);
    }
  }, { rootMargin: '300px' });
  observer.observe(block);
}
