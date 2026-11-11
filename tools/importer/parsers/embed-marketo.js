/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed-marketo. Base: embed (xwalk simple block, model embed-marketo:
 * baseUrl, munchkinId, formId -> one row each).
 * Source: https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations
 * Selector: div.formassembly-container.marketo-two-column
 * Rows:
 *   1. <!-- field:baseUrl -->    https://pages.beckman.com
 *   2. <!-- field:munchkinId --> 682-XWP-826
 *   3. <!-- field:formId -->     3101
 * Values are read from the rendered Marketo form: hidden inputs (munchkinId / formid),
 * form#mktoForm_<id>, the forms2 XDFrame / script host. The model defaults are used
 * as fallbacks for base URL and Munchkin id. The rendered field list is not copied:
 * the block loads the form from Marketo.
 */
const DEFAULT_BASE = 'https://pages.beckman.com';
const DEFAULT_MUNCHKIN = '682-XWP-826';

function inputValue(root, names) {
  const inputs = Array.from(root.querySelectorAll('input[name]'));
  const hit = inputs.find((i) => names.includes((i.getAttribute('name') || '').toLowerCase()));
  return hit ? (hit.getAttribute('value') || hit.value || '').trim() : '';
}

function row(document, field, value) {
  if (!value) return [''];
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(` field:${field} `));
  frag.appendChild(document.createTextNode(value));
  return [frag];
}

export default function parse(element, { document }) {
  const form = element.querySelector('form[id^="mktoForm_"]') || element.querySelector('form');

  // form id
  let formId = inputValue(element, ['formid']);
  if (!formId && form) {
    const m = (form.getAttribute('id') || '').match(/mktoForm_(\d+)/);
    if (m) [, formId] = m;
  }

  // munchkin id
  let munchkinId = inputValue(element, ['munchkinid']);
  if (!munchkinId) {
    const scripts = Array.from(document.querySelectorAll('script')).map((s) => s.textContent || '').join('\n');
    const m = scripts.match(/loadForm\(\s*["'][^"']*["']\s*,\s*["']([0-9A-Z]{3}-[0-9A-Z]{3}-[0-9]{3})["']/i)
      || scripts.match(/["']([0-9]{3}-[A-Z]{3}-[0-9]{3})["']/);
    munchkinId = m ? m[1] : DEFAULT_MUNCHKIN;
  }

  // base URL (Marketo instance host)
  let baseUrl = '';
  const hostEl = Array.from(document.querySelectorAll('script[src*="forms2"], iframe[src*="XDFrame"], form[action*="/index.php/"]'))[0];
  if (hostEl) {
    const src = hostEl.getAttribute('src') || hostEl.getAttribute('action') || '';
    const m = src.match(/^(?:https?:)?\/\/([^/]+)/i);
    if (m) baseUrl = `https://${m[1]}`;
  }
  if (!baseUrl) baseUrl = DEFAULT_BASE;

  const cells = [
    row(document, 'baseUrl', baseUrl),
    row(document, 'munchkinId', munchkinId),
    row(document, 'formId', formId),
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed-marketo', cells });
  element.replaceWith(block);
}
