/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-finder → "Cards (finder)": the source's Coveo product table ("Explore …
 * Models", div.product-table inside a .CoveoSearchInterface with data-pipeline="Product Table").
 * Unlike the plain Cards convention (image + text per card), this variant's rows are settings:
 * the product cards are not authored, the block loads them live (see blocks/cards/README.md).
 * Item model cards-finder-setting: name (text), value (richtext). One row per setting:
 *   endpoint  <origin><data-sc-rest-endpoint-uri>/search/v2?sitecoreItemUri=<item URI, lang=en>
 *             &siteName=<data-sc-site-name> (from the page's .CoveoForSitecoreContext)
 *   query     aq as the source sends it: the interface's CoveoForSitecoreFilterExpression scope
 *             tree (data-sc-filter-scope-node) + the page's #JSFilterExpression advanced filter,
 *             each in parentheses
 *   scope     cq from CoveoForSitecoreLocalExpression: language (en: the products are indexed in
 *             English only), latest version, index source
 *   pipeline / hub / results   data-pipeline / data-results-per-page of the interface
 *   facet     "Title | @field" per CoveoFacet (source field names; the block translates them)
 *   product link  eStore product page for the site's country ({id} = product number)
 *   quote link    the site's Request a Quote page (relative on the migrated site)
 * The rendered results are not imported.
 */

// Coveo for Sitecore index field names: lower case, characters other than a-w, y, 0-9 → zNx
function field(name) {
  const raw = String(name).trim().replace(/^@/, '').toLowerCase();
  return `@${Array.from(raw).map((c) => (/[a-wy0-9]/.test(c) ? c : `z${c.charCodeAt(0)}x`)).join('')}`;
}

function expression(node) {
  if (!node) return '';
  switch (node.type) {
    case 'and': return `(${expression(node.left)} ${expression(node.right)})`;
    case 'or': return `(${expression(node.left)} OR ${expression(node.right)})`;
    case 'not': return `NOT ${expression(node.operand)}`;
    case 'field': {
      const values = node.fieldValues || [];
      const op = (node.operator && node.operator.name) || '==';
      return `${field(node.fieldName)}${op}${values.length > 1 ? `(${values.join(',')})` : values[0]}`;
    }
    default: return '';
  }
}

function settingRow(document, name, value) {
  const nameCell = document.createDocumentFragment();
  nameCell.appendChild(document.createComment(' field:name '));
  nameCell.appendChild(document.createTextNode(name));
  const valueCell = document.createDocumentFragment();
  valueCell.appendChild(document.createComment(' field:value '));
  if (value && value.nodeType) valueCell.appendChild(value);
  else {
    const p = document.createElement('p');
    p.textContent = value;
    valueCell.appendChild(p);
  }
  return ['cards-finder-setting', nameCell, valueCell];
}

export default function parse(element, { document, url, params }) {
  const pageUrl = new URL((params && params.originalURL) || url);
  const origin = pageUrl.origin;
  const iface = element.closest('.CoveoSearchInterface') || element;
  const context = document.querySelector('.CoveoForSitecoreContext[data-sc-item-uri]');

  const rows = [];
  const restUri = (context && context.getAttribute('data-sc-rest-endpoint-uri')) || '/coveo/rest';
  const siteName = (context && context.getAttribute('data-sc-site-name')) || 'website';
  let itemUri = context ? context.getAttribute('data-sc-item-uri') : '';
  if (!itemUri) {
    const id = (document.querySelector('#context-itemid-value') || {}).value;
    if (id) itemUri = `sitecore://web/{${id.toUpperCase()}}?lang=en&ver=1`;
  }
  itemUri = itemUri.replace(/([?&](?:amp;)?lang=)[^&]*/, '$1en');
  rows.push(settingRow(document, 'endpoint',
    `${origin}${restUri}/search/v2?sitecoreItemUri=${encodeURIComponent(itemUri)}&siteName=${encodeURIComponent(siteName)}`));

  const parts = [];
  iface.querySelectorAll('.CoveoForSitecoreFilterExpression[data-sc-filter-scope-node]').forEach((el) => {
    try {
      const tree = JSON.parse(el.getAttribute('data-sc-filter-scope-node'));
      const expr = expression(tree.advanced);
      if (expr) parts.push(`(${expr})`);
    } catch (e) { /* not a filter tree */ }
  });
  const jsFilter = document.querySelector('#JSFilterExpression[data-sc-advanced-filter]');
  if (jsFilter && jsFilter.getAttribute('data-sc-advanced-filter').trim()) {
    parts.push(`(${jsFilter.getAttribute('data-sc-advanced-filter').trim()})`);
  }
  if (parts.length) rows.push(settingRow(document, 'query', parts.join(' ')));

  const local = iface.querySelector('.CoveoForSitecoreLocalExpression');
  const scope = [];
  if (!local || local.getAttribute('data-sc-filter-on-current-language') === 'true') scope.push('(@z95xlanguage==en)');
  if (!local || local.getAttribute('data-sc-filter-on-latest-version') === 'true') {
    const versionField = (context && context.getAttribute('data-sc-latest-version-field-name')) || 'z95xlatestversion';
    scope.push(`(@${versionField}==1)`);
  }
  const source = context && context.getAttribute('data-sc-index-source-name');
  if (source && (!local || local.getAttribute('data-sc-filter-on-sitecore-context-database') === 'true')) {
    scope.push(`(@source=="${source}")`);
  }
  if (scope.length) rows.push(settingRow(document, 'scope', scope.join(' ')));

  const pipeline = iface.getAttribute('data-pipeline');
  if (pipeline) {
    rows.push(settingRow(document, 'pipeline', pipeline));
    rows.push(settingRow(document, 'hub', pipeline));
  }
  rows.push(settingRow(document, 'results', iface.getAttribute('data-results-per-page') || '8'));

  iface.querySelectorAll('.CoveoFacet[data-field][data-title]').forEach((f) => {
    rows.push(settingRow(document, 'facet', `${f.getAttribute('data-title').trim()} | ${f.getAttribute('data-field').trim()}`));
  });

  const country = /mybeckman\.in$/.test(pageUrl.hostname) ? 'IN' : 'US';
  rows.push(settingRow(document, 'product link', `https://store.beckman.com/p/{id}?countryCode=${country}`));
  const quote = document.createElement('p');
  const a = document.createElement('a');
  a.setAttribute('href', `${origin}/request-quote`);
  a.textContent = 'Request a Quote';
  quote.appendChild(a);
  rows.push(settingRow(document, 'quote link', quote));

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards (finder)', cells: rows });
  element.replaceWith(block);
}
