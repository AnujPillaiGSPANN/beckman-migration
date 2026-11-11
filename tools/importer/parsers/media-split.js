/* eslint-disable */
/* global WebImporter */

/**
 * Parser for media-split. Base: columns (xwalk block/v1/block + item model media-split-row).
 * Sources:
 *  - product-series (Biomek): div.containercustom:has(ul.cusautolist) > div.row
 *      .col-md-6 #1 = intro paragraph + ul.cusautolist (strong lead-ins) + a > button "Learn more"
 *      .col-md-6 #2 = p > img
 *  - product-detail (Cydem VT): div.spotlight-content-wrapper div.Section > div.responsive-table
 *      .table-row > .table-cell = 6 separate <ul> (span.plain, <br>) -> merged into one list
 *      siblings = .container-overlay-full-width img (+ div.overlay zoom link, dropped) + caption <p>
 * Layout: 1 row, 2 cells:
 *   cell 1 (field:column1)      = rich text (intro, list, CTA)
 *   cell 2 (group column2_*)    = field:column2_image (picture, alt -> column2_imageAlt)
 *                                 + field:column2_text (optional caption)
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();
const BLOCK = ['P', 'UL', 'OL', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'TABLE', 'BLOCKQUOTE', 'FIGURE'];

function tidy(document, root) {
  // comments, zoom overlays, icon glyphs
  const walker = document.createTreeWalker(root, 128);
  const comments = [];
  while (walker.nextNode()) comments.push(walker.currentNode);
  comments.forEach((c) => c.remove());
  root.querySelectorAll('.overlay').forEach((n) => n.remove());
  root.querySelectorAll('a[href="#"]').forEach((a) => { if (!a.querySelector('img')) a.remove(); });
  root.querySelectorAll('i, em[class*="fa"], span[class*="icon"]').forEach((n) => {
    if (!clean(n.textContent) && !n.querySelector('img')) n.remove();
  });
  // unwrap span.plain
  root.querySelectorAll('span.plain').forEach((s) => s.replaceWith(...Array.from(s.childNodes)));
  // drop <br> at list-item / paragraph edges (they only add blank lines)
  root.querySelectorAll('li br, p br').forEach((br) => {
    const parent = br.parentElement;
    const after = [];
    let n = br.nextSibling;
    while (n) { after.push(n); n = n.nextSibling; }
    const before = [];
    n = br.previousSibling;
    while (n) { before.push(n); n = n.previousSibling; }
    const empty = (list) => list.every((x) => !clean(x.textContent) && !(x.nodeType === 1 && x.querySelector('img')) && !(x.nodeType === 1 && x.tagName === 'IMG'));
    if (empty(after) || empty(before)) br.remove();
    if (parent && !clean(parent.textContent) && !parent.querySelector('img') && parent.tagName === 'SPAN') parent.remove();
  });
  // unwrap <button> inside links
  root.querySelectorAll('a button, button').forEach((btn) => {
    const label = clean(btn.textContent);
    if (label) btn.replaceWith(document.createTextNode(label));
    else btn.remove();
  });
}

/** Merge adjacent sibling lists of the same type into one. */
function mergeLists(root) {
  Array.from(root.querySelectorAll('ul, ol')).forEach((list) => {
    if (!list.isConnected) return;
    let next = list.nextElementSibling;
    while (next && next.tagName === list.tagName) {
      // text between the two lists must be whitespace only
      let between = list.nextSibling;
      let onlyWs = true;
      while (between && between !== next) {
        if (clean(between.textContent)) onlyWs = false;
        between = between.nextSibling;
      }
      if (!onlyWs) break;
      Array.from(next.children).forEach((li) => list.appendChild(li));
      const drop = next;
      next = next.nextElementSibling;
      drop.remove();
    }
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
    if (n.tagName === 'IMG' || n.tagName === 'PICTURE') {
      flush();
      const p = document.createElement('p');
      p.appendChild(n);
      out.push(p);
      return;
    }
    if (!BLOCK.includes(n.tagName)) {
      if (n.tagName === 'BR') return;
      if (!clean(n.textContent) && !n.querySelector('img, picture')) return;
      // a lone CTA link becomes a bold (primary button) paragraph
      if (!pending) pending = document.createElement('p');
      pending.appendChild(n);
      return;
    }
    flush();
    if (n.tagName === 'DIV' || n.tagName === 'FIGURE') {
      const inner = flatten(document, n);
      // a div holding a single link is a CTA: render as a primary button
      if (inner.length === 1 && inner[0].tagName === 'P' && inner[0].children.length === 1
        && inner[0].firstElementChild.tagName === 'A'
        && clean(inner[0].textContent) === clean(inner[0].firstElementChild.textContent)) {
        const a = inner[0].firstElementChild;
        const strong = document.createElement('strong');
        a.replaceWith(strong);
        strong.appendChild(a);
      }
      out.push(...inner);
      return;
    }
    if (clean(n.textContent) || n.querySelector('img, picture')) out.push(n);
  });
  flush();
  return out;
}

export default function parse(element, { document }) {
  const row = element.querySelector(':scope > .table-row') || element.querySelector('.table-row') || element;
  let parts = Array.from(row.children).filter((c) => !['STYLE', 'SCRIPT'].includes(c.tagName));

  // Bootstrap layout: two .col-* children; table layout: first .table-cell = text, rest = media
  const cols = parts.filter((c) => /(^|\s)col-/.test(c.getAttribute('class') || ''));
  let textParts;
  let mediaParts;
  if (cols.length >= 2) {
    textParts = [cols[0]];
    mediaParts = cols.slice(1);
  } else {
    const firstText = parts.find((c) => c.querySelector('ul, ol, p') && !c.querySelector('img')) || parts[0];
    textParts = firstText ? [firstText] : [];
    mediaParts = parts.filter((c) => c !== firstText);
  }

  const col1 = [];
  textParts.forEach((p) => {
    tidy(document, p);
    mergeLists(p);
    col1.push(...flatten(document, p));
  });
  // merge lists that were in separate wrappers but ended up adjacent
  const merged = [];
  col1.forEach((n) => {
    const prev = merged[merged.length - 1];
    if (prev && prev.tagName === n.tagName && (n.tagName === 'UL' || n.tagName === 'OL')) {
      Array.from(n.children).forEach((li) => prev.appendChild(li));
    } else merged.push(n);
  });

  const col2 = [];
  mediaParts.forEach((p) => {
    tidy(document, p);
    if (p.tagName === 'IMG' || p.tagName === 'PICTURE') {
      const wrap = document.createElement('p');
      wrap.appendChild(p);
      col2.push(wrap);
      return;
    }
    if (p.tagName === 'P' || /^H[1-6]$/.test(p.tagName)) {
      if (clean(p.textContent) || p.querySelector('img')) col2.push(p);
      return;
    }
    col2.push(...flatten(document, p));
  });

  const textCell = document.createDocumentFragment();
  if (merged.length) {
    textCell.appendChild(document.createComment(' field:column1 '));
    merged.forEach((n) => textCell.appendChild(n));
  }

  // media group: first image -> column2_image, remaining text -> column2_text (caption)
  const mediaCell = document.createDocumentFragment();
  let img = null;
  const caption = [];
  col2.forEach((n) => {
    const found = n.tagName === 'IMG' ? n : n.querySelector('img');
    if (found && !img) {
      img = found;
      const rest = clean(n.textContent);
      if (rest && n !== found) {
        found.closest('picture')?.remove();
        found.remove();
        caption.push(n);
      }
      return;
    }
    if (clean(n.textContent)) caption.push(n);
  });
  if (img) {
    const picture = img.closest('picture') || document.createElement('picture');
    if (!picture.contains(img)) picture.appendChild(img);
    mediaCell.appendChild(document.createComment(' field:column2_image '));
    mediaCell.appendChild(picture);
  }
  if (caption.length) {
    mediaCell.appendChild(document.createComment(' field:column2_text '));
    caption.forEach((n) => mediaCell.appendChild(n));
  }

  const cells = [[merged.length ? textCell : '', (img || caption.length) ? mediaCell : '']];
  const block = WebImporter.Blocks.createBlock(document, { name: 'media-split', cells });
  element.replaceWith(block);
}
