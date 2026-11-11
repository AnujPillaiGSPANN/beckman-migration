/* eslint-disable */
/* global WebImporter */

/**
 * Parser for feature-modules. Base: columns (xwalk block/v1/block + item model feature-modules-row).
 * Source: https://www.beckman.com/cell-culture-workstation/cydem-vt
 * Selectors (two instances):
 *  - #features-wrapper div.bc-columns.row : 3 x .bc-column > .bc-rich-text = h4 + ul
 *      (trailing <br><div>&nbsp;</div> in list items and li > p > span wrappers removed,
 *      inline links kept)
 *  - div.spotlight-content-wrapper div.bc-rich-text > table.responsive-table : 1 row x 3 td
 *      = label <p> + img.image-full-width (div.overlay zoom links dropped). The three images
 *      share one copy-pasted alt, so the alt is replaced with the view label.
 * Also product-detail MET ONE 6000 / Facility Monitoring System / Vi-CELL BLU:
 *   4 x .bc-column (h4 + ul, or h4 + div.bc-rich-text-desc text -> <p>); style attributes and
 *   empty <a></a> anchors (no href, no content) dropped.
 * Layout: 1 row, up to 4 cells; cell N is the field group columnN_*:
 *   field:columnN_text  = heading/label + list (rich text)
 *   field:columnN_image = picture (alt -> columnN_imageAlt)
 */
const MAX_COLUMNS = 4;
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();

function tidy(root) {
  root.querySelectorAll('.overlay').forEach((n) => n.remove());
  root.querySelectorAll('a[href="#"]').forEach((a) => { if (!a.querySelector('img')) a.remove(); });
  root.querySelectorAll('style, script, input').forEach((n) => n.remove());
  // empty anchors (e.g. Vi-CELL BLU "<a></a><a href>FAST mode</a>", "<a href=…></a>Error log files")
  root.querySelectorAll('a').forEach((a) => { if (!clean(a.textContent) && !a.querySelector('img')) a.remove(); });
  root.querySelectorAll('[style]').forEach((n) => n.removeAttribute('style'));
  // empty divs / spans / paragraphs
  Array.from(root.querySelectorAll('div, span, p')).reverse().forEach((n) => {
    if (!clean(n.textContent) && !n.querySelector('img, picture')) n.remove();
  });
  // unwrap li > p and span wrappers
  root.querySelectorAll('li > p').forEach((p) => p.replaceWith(...Array.from(p.childNodes)));
  root.querySelectorAll('span').forEach((s) => s.replaceWith(...Array.from(s.childNodes)));
  // <br> at the end of list items / cells
  root.querySelectorAll('br').forEach((br) => {
    let n = br.nextSibling;
    while (n && n.nodeType === 3 && !clean(n.textContent)) n = n.nextSibling;
    if (!n) br.remove();
  });
  // normalise whitespace in list items (span fragments leave double spaces)
  root.querySelectorAll('li').forEach((li) => {
    Array.from(li.childNodes).forEach((n) => {
      if (n.nodeType === 3) n.textContent = n.textContent.replace(/\s+/g, ' ');
    });
  });
}

/** Flatten a column container into block-level nodes. */
function flatten(document, container) {
  const out = [];
  let pending = null;
  const flush = () => { if (pending && clean(pending.textContent)) out.push(pending); pending = null; };
  Array.from(container.childNodes).forEach((n) => {
    if (n.nodeType === 3) {
      if (!clean(n.textContent)) return;
      if (!pending) pending = document.createElement('p');
      pending.appendChild(n);
      return;
    }
    if (n.nodeType !== 1) return;
    if (n.tagName === 'BR') { flush(); return; }
    if (n.tagName === 'IMG' || n.tagName === 'PICTURE') {
      flush();
      const p = document.createElement('p');
      p.appendChild(n);
      out.push(p);
      return;
    }
    if (n.tagName === 'DIV' || n.tagName === 'FIGURE' || n.tagName === 'SECTION') {
      flush();
      out.push(...flatten(document, n));
      return;
    }
    if (['P', 'UL', 'OL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TABLE', 'BLOCKQUOTE'].includes(n.tagName)) {
      flush();
      if (clean(n.textContent) || n.querySelector('img, picture')) out.push(n);
      return;
    }
    if (!pending) pending = document.createElement('p');
    pending.appendChild(n);
  });
  flush();
  return out;
}

export default function parse(element, { document }) {
  let columns;
  if (element.tagName === 'TABLE') {
    const firstRow = element.querySelector('tr');
    columns = firstRow ? Array.from(firstRow.children) : [];
  } else {
    columns = Array.from(element.querySelectorAll(':scope > .bc-column, :scope > [class*="col-"]'));
    if (!columns.length) columns = Array.from(element.children);
  }

  // shared, copy-pasted image alts are replaced with the column label
  const imgs = Array.from(element.querySelectorAll('img'));
  const altCount = {};
  imgs.forEach((img) => {
    const alt = clean(img.getAttribute('alt'));
    altCount[alt] = (altCount[alt] || 0) + 1;
  });

  const row = columns.slice(0, MAX_COLUMNS).map((col, idx) => {
    tidy(col);
    const label = Array.from(col.querySelectorAll('p, h1, h2, h3, h4, h5, h6'))
      .find((el) => clean(el.textContent));
    col.querySelectorAll('img').forEach((img) => {
      const alt = clean(img.getAttribute('alt'));
      if (label && (!alt || (imgs.length > 1 && altCount[alt] > 1))) img.setAttribute('alt', clean(label.textContent));
    });
    const nodes = flatten(document, col.querySelector(':scope > .bc-rich-text') || col);
    const n = idx + 1;
    const text = [];
    let img = null;
    nodes.forEach((node) => {
      const found = node.tagName === 'IMG' ? node : node.querySelector('img');
      if (found && !img) {
        img = found;
        if (node !== found && clean(node.textContent)) {
          (found.closest('picture') || found).remove();
          text.push(node);
        }
        return;
      }
      if (!found) text.push(node);
    });
    if (!text.length && !img) return '';
    const frag = document.createDocumentFragment();
    if (text.length) {
      frag.appendChild(document.createComment(` field:column${n}_text `));
      text.forEach((t) => frag.appendChild(t));
    }
    if (img) {
      const picture = img.closest('picture') || document.createElement('picture');
      if (!picture.contains(img)) picture.appendChild(img);
      frag.appendChild(document.createComment(` field:column${n}_image `));
      frag.appendChild(picture);
    }
    return frag;
  });

  const cells = [row.length ? row : ['']];
  const block = WebImporter.Blocks.createBlock(document, { name: 'feature-modules', cells });
  element.replaceWith(block);
}
