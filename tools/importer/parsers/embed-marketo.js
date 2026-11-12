/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed-marketo -> block "Embed (marketo)" (family embed, variant option "marketo").
 * xwalk simple block, model embed (shared by the embed variants): classes, classes_options,
 * embed_* group (one row), formId (one row). The converter maps rows to field groups by
 * position, so the (empty) embed_* row comes first.
 * Source: https://www.beckman.com/liquid-handlers/biomek-i-series-automated-workstations
 * Selector: div.formassembly-container.marketo-two-column
 * Rows:
 *   0. (empty: embed_placeholder / embed_uri of the default and wistia variants)
 *   1. <!-- field:formId --> 3101
 * The form id is read from the rendered Marketo form: hidden input formid, else
 * form#mktoForm_<id>. Base URL and Munchkin id are not authored: they are always the
 * Beckman instance (https://pages.beckman.com, 682-XWP-826), which blocks/embed/variants/
 * marketo.js uses. The rendered field list is not copied: the block loads the form from Marketo.
 */
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

  const cells = [
    [''],
    row(document, 'formId', formId),
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'Embed (marketo)', cells });
  element.replaceWith(block);
}
