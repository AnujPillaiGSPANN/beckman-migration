import { moveInstrumentation } from '../../../scripts/scripts.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// download arrow into a tray, drawn in currentColor (source: Font Awesome fa-solid fa-download)
function createDownloadIcon() {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('class', 'cards-downloads-icon');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M6.9 0h2.2v8.1l2.6-2.6 1.5 1.5L8 12.2 2.8 7l1.5-1.5 2.6 2.6ZM0 11h2.2v2.8h11.6V11H16v5H0Z');
  svg.append(path);
  return svg;
}

const onlyLink = (el) => {
  const link = el.querySelector('a[href]');
  return link && el.textContent.trim() === link.textContent.trim() ? link : null;
};

const isDownload = (link) => /\.pdf(\?|#|$)/i.test(link.getAttribute('href') || '')
  || /^\|?\s*(pdf|download)\b/i.test(link.textContent.trim());

/**
 * Cards (downloads): two-column grid of bordered rows; title link on the left,
 * resource type label and a "| PDF" download link with a download icon on the right.
 * Row cells: [title link paragraph + type label paragraph + optional "PDF" link paragraph].
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-downloads-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-downloads-item';
    moveInstrumentation(row, li);

    const parts = [];
    [...row.children].forEach((cell) => parts.push(...cell.children));
    const blocks = parts.filter((el) => el.textContent.trim());
    blocks.forEach((el) => {
      el.querySelectorAll('a.button').forEach((a) => a.classList.remove('button', 'primary', 'secondary'));
      el.classList.remove('button-container');
    });

    // the download is the last link-only paragraph (never the first, which is the title)
    // that points at a PDF / reads "PDF"
    const downloadEl = blocks.slice(1).reverse()
      .find((el) => onlyLink(el) && isDownload(onlyLink(el))) || null;
    const titleEl = blocks.find((el) => el !== downloadEl && el.querySelector('a[href]'))
      || blocks.find((el) => el !== downloadEl);
    const labels = blocks.filter((el) => el !== downloadEl && el !== titleEl);

    const title = document.createElement('div');
    title.className = 'cards-downloads-title';
    if (titleEl) title.append(titleEl);
    title.querySelectorAll('a[href]').forEach((a) => {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });

    const info = document.createElement('div');
    info.className = 'cards-downloads-info';
    labels.forEach((el) => {
      el.classList.add('cards-downloads-type');
      info.append(el);
    });

    if (downloadEl) {
      const link = onlyLink(downloadEl);
      link.className = 'cards-downloads-link';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      const label = link.textContent.replace(/^\s*\|\s*/, '').trim() || 'PDF';
      link.textContent = `| ${label} `;
      if (!link.getAttribute('aria-label')) {
        link.setAttribute('aria-label', `Download ${label}: ${title.textContent.trim()}`);
      }
      link.append(createDownloadIcon());
      const wrap = document.createElement('p');
      wrap.className = 'cards-downloads-download';
      wrap.append(link);
      info.append(wrap);
    }

    li.append(title, info);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
