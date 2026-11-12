import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// source .line-arrow-container > svg.arrow-svg (15x30, stroke #b8b6b4)
function createChevron() {
  const li = document.createElement('li');
  li.className = 'cards-workflow-chevron';
  li.setAttribute('aria-hidden', 'true');
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 15 30');
  svg.setAttribute('width', '15');
  svg.setAttribute('height', '30');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', 'M 2 5 L 13 15 L 2 25');
  path.setAttribute('vector-effect', 'non-scaling-stroke');
  svg.append(path);
  li.append(svg);
  return li;
}

/**
 * Cards (workflow): one row of numbered process steps separated by chevrons; each
 * tile shows a coloured number badge + step name, a product image and the product
 * name, and the whole tile links to the product. Stacks without chevrons on mobile.
 * Row cells: [product image] [bold step name paragraph + product name link paragraph].
 * Option unnumbered (Vi-CELL BLU integrations): bordered tiles without badges or
 * chevrons; the name may itself be the link (<p><strong><a>name</a></strong></p>).
 * @param {Element} block
 */
export default function decorate(block) {
  const numbered = !block.classList.contains('unnumbered');
  const ul = document.createElement('ul');
  ul.className = 'cards-workflow-list';
  ul.setAttribute('aria-label', 'Workflow steps');

  const rows = [...block.children];
  rows.forEach((row, i) => {
    const li = document.createElement('li');
    li.className = `cards-workflow-item cards-workflow-color-${(i % 4) + 1}`;
    moveInstrumentation(row, li);

    let picture = null;
    const nodes = [];
    [...row.children].forEach((cell) => {
      const pic = cell.querySelector('picture') || cell.querySelector('img');
      if (pic && !picture) {
        picture = pic;
        const parent = pic.parentElement;
        pic.remove();
        if (parent !== cell && !parent.textContent.trim() && !parent.querySelector('img, picture')) parent.remove();
      }
      nodes.push(...[...cell.children].filter((el) => el.textContent.trim()));
    });

    const findLink = (el) => (el.matches('a[href]') ? el : el.querySelector('a[href]'));
    const link = nodes.map(findLink).find(Boolean);
    const tile = document.createElement(link ? 'a' : 'div');
    tile.className = 'cards-workflow-step';
    if (link) {
      tile.href = link.href;
      if (link.target) tile.target = link.target;
      if (tile.target === '_blank') tile.rel = 'noopener noreferrer';
    }

    // step name: a bold-only block (may hold the tile link), else the first block
    // that is not the product link
    const isBold = (el) => {
      const b = el.matches('strong, b') ? el : el.querySelector('strong, b');
      return !!b && b.textContent.trim() === el.textContent.trim();
    };
    const nameEl = nodes.find(isBold) || nodes.find((el) => !findLink(el)) || null;
    const productEl = nodes.find((el) => el !== nameEl && findLink(el))
      || nodes.find((el) => el !== nameEl) || null;

    const head = document.createElement('div');
    head.className = 'cards-workflow-head';
    const name = document.createElement('strong');
    name.className = 'cards-workflow-name';
    if (nameEl) {
      moveInstrumentation(nameEl, name);
      const inner = nameEl.matches('strong, b') ? nameEl : nameEl.querySelector('strong, b');
      name.append(...(inner && isBold(nameEl) ? inner : nameEl).childNodes);
      // the tile is the link: drop a nested anchor, keep its text
      name.querySelectorAll('a').forEach((a) => a.replaceWith(...a.childNodes));
    }
    if (numbered) {
      const badge = document.createElement('span');
      badge.className = 'cards-workflow-number';
      badge.setAttribute('aria-hidden', 'true');
      badge.textContent = String(i + 1);
      const srOnly = document.createElement('span');
      srOnly.className = 'cards-workflow-sr';
      srOnly.textContent = `Step ${i + 1}: `;
      name.prepend(srOnly);
      head.append(badge);
    }
    head.append(name);
    tile.append(head);

    if (picture) {
      const img = picture.querySelector('img') || picture;
      const product = productEl?.textContent.trim();
      if (!img.alt && product) img.alt = product;
      const media = document.createElement('div');
      media.className = 'cards-workflow-image';
      media.append(picture);
      tile.append(media);
    }

    if (productEl) {
      const product = document.createElement('p');
      product.className = 'cards-workflow-product';
      moveInstrumentation(productEl, product);
      // the tile is the link: keep the product link's text, drop the nested anchor
      const anchor = findLink(productEl);
      if (anchor) product.append(...anchor.childNodes);
      else product.append(...productEl.childNodes);
      tile.append(product);
    }

    if (i > 0 && numbered) ul.append(createChevron());
    li.append(tile);
    ul.append(li);
  });

  ul.querySelectorAll('.cards-workflow-image img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    (img.closest('picture') || img).replaceWith(optimizedPic);
  });

  block.replaceChildren(ul);
}
