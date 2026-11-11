/* eslint-disable */
/* global WebImporter */

/**
 * Beckman sections transformer (all templates).
 *
 * Section selectors in page-templates.json point at the element that STARTS a
 * section. That element may be a top-level wrapper, a later sibling (e.g.
 * "div.bc-rich-text:has(+ div.formassembly-container)") or nested inside the
 * previous section's wrapper (e.g. "... div.bc-rich-text div.parent").
 *
 * beforeTransform:
 *  1. resolve every section start element FIRST (inserting <hr>s could change
 *     sibling-based selectors such as ":has(+ #related-parts-wrapper)"); each
 *     section takes the first selector match that is not already claimed by
 *     an earlier section and that follows the previous section's start in
 *     document order;
 *  2. walk in reverse and insert an <hr> before every section start except the
 *     first one found on the page. Every <hr> carries a temporary
 *     data-excat-section-id marker; a styled first section gets a temporary
 *     <hr> (data-excat-section-temp) so its metadata can be placed. The start
 *     element is tagged with data-excat-section-start.
 * afterTransform: for every styled section found, insert a Section Metadata
 * block (style) at the END of the section (right before the next section's
 * <hr>, or at the end of the page for the last section), then drop the
 * temporary attributes and the first section's temporary <hr>.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };
const MARKER = 'data-excat-section-id';
const START = 'data-excat-section-start';
const TEMP = 'data-excat-section-temp';

function selectorsOf(section) {
  const sels = Array.isArray(section.selector) ? section.selector : [section.selector];
  return sels.filter(Boolean);
}

function queryAll(root, sel) {
  try {
    return Array.from(root.querySelectorAll(sel));
  } catch (e) {
    return []; // unsupported selector - try next
  }
}

function follows(el, ref) {
  // true when el comes after ref in document order (incl. descendants of ref)
  // eslint-disable-next-line no-bitwise
  return Boolean(ref.compareDocumentPosition(el) & 4); // DOCUMENT_POSITION_FOLLOWING
}

function resolveStarts(root, sections) {
  const starts = [];
  let prev = null;
  sections.forEach((section) => {
    let found = null;
    let fallback = null;
    for (const sel of selectorsOf(section)) {
      const matches = queryAll(root, sel).filter((el) => !starts.includes(el));
      if (!fallback && matches.length) [fallback] = matches;
      found = matches.find((el) => !prev || follows(el, prev)) || null;
      if (found) break;
    }
    const el = found || fallback;
    starts.push(el);
    if (el) prev = el;
  });
  return starts;
}

export default function transform(hookName, element, payload) {
  const template = payload && payload.template;
  const sections = (template && template.sections) || [];
  if (sections.length < 2) return;
  const doc = element.ownerDocument || document;

  if (hookName === H.before) {
    const starts = resolveStarts(element, sections);
    // the first section found on the page opens the document: no break
    // before it (e.g. category pages without a promo banner)
    const first = starts.findIndex(Boolean);
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const el = starts[i];
      if (!el || !el.parentNode) continue;
      el.setAttribute(START, section.id);
      if (i === first && !section.style) continue;
      const hr = doc.createElement('hr');
      hr.setAttribute(MARKER, section.id);
      if (i === first) hr.setAttribute(TEMP, 'true'); // styled opener only
      el.parentNode.insertBefore(hr, el);
    }
  }

  if (hookName === H.after) {
    const breaks = sections.map((s) => element.querySelector(`hr[${MARKER}="${s.id}"]`));
    const found = sections.map((s, i) => Boolean(
      breaks[i] || element.querySelector(`[${START}="${s.id}"]`),
    ));
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style || !found[i]) continue;
      const meta = WebImporter.Blocks.createBlock(doc, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      // end of the section = just before the next section break. Using the
      // start element would misplace it when the next section starts INSIDE
      // this section's wrapper (product-series contact-us block).
      const next = breaks.slice(i + 1).find((hr) => hr && hr.parentNode);
      if (next) {
        next.before(meta);
      } else {
        element.append(meta);
      }
    }
    breaks.forEach((hr) => {
      if (!hr) return;
      if (hr.hasAttribute(TEMP)) hr.remove();
      else hr.removeAttribute(MARKER);
    });
    element.querySelectorAll(`[${START}]`).forEach((el) => el.removeAttribute(START));
  }
}
