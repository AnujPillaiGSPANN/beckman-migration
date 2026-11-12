/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner -> block "Hero (banner)" (family hero, variant option "banner").
 * xwalk block, model hero (shared by the hero variants; rows in model order:
 * image | media_* | text, the fields of the other variants stay empty). The library Hero has
 * image + text rows only; the empty media_* row is the merged family model's (Motion / Promo),
 * kept so the converter maps the rows to the fields by position.
 * Source: https://www.mybeckman.in/resources/technologies/analytical-ultracentrifugation
 * Selector: … div.bc-rich-text:nth-of-type(2) > div.outimg > div.top-banner
 * Rows:
 *   1. <!-- field:image --> background photo. The source sets it in a class rule of the page's
 *      inline <style> (.top-banner { background-image: url(…) }), not on the element. Read from
 *      the element's inline style (the importer copies computed backgrounds there), else from
 *      data-excat-bg (written in preprocess by the cleanup's cssBackgrounds rule, extension
 *      already fixed), else from a <style> class rule naming one of the element's classes.
 *      Alt = the H1 text (the source has none).
 *   2. media_* group (Motion / Promo variants): empty row.
 *   3. <!-- field:text --> H1 + subtitle paragraph(s) (<b> kept as <strong>); the
 *      div.dark-overlay is dropped (the variant draws the overlay).
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

function cssUrl(css) {
  const m = /background(?:-image)?\s*:[^;{}]*?url\(\s*(?:&quot;|["'])?([^"')&]+?)(?:&quot;|["'])?\s*\)/i.exec(css || '');
  return m ? m[1].trim() : null;
}

/** Background URL from a class rule in the document's <style>s (comments ignored). */
function classRuleUrl(element, document) {
  const classes = Array.from(element.classList || []);
  for (const s of Array.from(document.querySelectorAll('style'))) {
    const css = (s.textContent || '').replace(/\/\*[\s\S]*?\*\//g, '');
    const rule = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = rule.exec(css))) {
      const sels = m[1].split(',').map((x) => x.trim());
      if (!classes.some((c) => sels.includes(`.${c}`))) continue;
      const url = cssUrl(m[2]);
      if (url) return url;
    }
  }
  return null;
}

function backgroundUrl(element, document) {
  return element.getAttribute('data-excat-bg')
    || cssUrl(element.getAttribute('style'))
    || classRuleUrl(element, document);
}

function fieldCell(document, field, nodes) {
  if (!nodes.length) return '';
  const frag = document.createDocumentFragment();
  frag.appendChild(document.createComment(` field:${field} `));
  nodes.forEach((n) => frag.appendChild(n));
  return frag;
}

/** Copy of a paragraph's inline content: text + <b>/<strong> as <strong>, links kept. */
function inlineCopy(document, source, target) {
  Array.from(source.childNodes).forEach((n) => {
    if (n.nodeType === 3) {
      target.appendChild(document.createTextNode(n.textContent.replace(/\s+/g, ' ')));
    } else if (n.nodeType === 1 && /^(B|STRONG)$/.test(n.tagName)) {
      const strong = document.createElement('strong');
      strong.textContent = n.textContent.replace(/\s+/g, ' ');
      target.appendChild(strong);
    } else if (n.nodeType === 1 && n.tagName === 'A' && n.getAttribute('href')) {
      const a = document.createElement('a');
      a.setAttribute('href', n.getAttribute('href'));
      a.textContent = clean(n.textContent);
      target.appendChild(a);
    } else if (n.nodeType === 1) {
      target.appendChild(document.createTextNode(n.textContent.replace(/\s+/g, ' ')));
    }
  });
  const first = target.firstChild;
  const last = target.lastChild;
  if (first && first.nodeType === 3) first.textContent = first.textContent.replace(/^\s+/, '');
  if (last && last.nodeType === 3) last.textContent = last.textContent.replace(/\s+$/, '');
  return target;
}

export default function parse(element, { document }) {
  const heading = element.querySelector('h1, h2');
  const headingText = heading ? clean(heading.textContent) : '';
  const cells = [];

  // Row 1: background photo
  const bg = backgroundUrl(element, document);
  if (bg) {
    const img = document.createElement('img');
    img.setAttribute('src', bg);
    img.setAttribute('alt', headingText || 'Banner');
    cells.push([fieldCell(document, 'image', [img])]);
  } else {
    cells.push(['']);
  }

  // Row 2: media_* group (other variants)
  cells.push(['']);

  // Row 3: H1 + subtitle
  const text = [];
  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = headingText;
    text.push(h1);
  }
  Array.from(element.querySelectorAll('p')).forEach((p) => {
    if (!clean(p.textContent) || p.closest('.dark-overlay')) return;
    text.push(inlineCopy(document, p, document.createElement('p')));
  });
  cells.push([fieldCell(document, 'text', text)]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero (banner)', cells });
  element.replaceWith(block);
}
