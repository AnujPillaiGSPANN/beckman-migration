import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

const isLinkOnly = (el) => {
  const link = el.querySelector('a[href]');
  return Boolean(link) && el.textContent.trim() === link.textContent.trim();
};

/**
 * Cards (tiles): bordered tiles, each a link to a detail page: image on top, centred title
 * below. The whole tile is clickable through its title link.
 * Row cells (item cards-tiles-card): [image] [text]. Text = optional eyebrow paragraph
 * (badge over the image, e.g. "Whitepaper"; badge tiles show the image as a contained
 * thumbnail on a red gradient) + the title (a paragraph or heading holding the link).
 * Option "panels" (Related Content): wrapping 4-column grid, grayscale photos, bold titles.
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-tiles-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-tiles-card';
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const imageCell = cells.find((c) => c.querySelector('picture, img'));
    const textCells = cells.filter((c) => c !== imageCell);

    const image = document.createElement('div');
    image.className = 'cards-tiles-card-image';
    const body = document.createElement('div');
    body.className = 'cards-tiles-card-body';

    const picture = imageCell?.querySelector('picture') || imageCell?.querySelector('img');
    if (picture) {
      const link = picture.closest('a');
      image.append(picture);
      if (link && !link.textContent.trim()) link.remove();
    }

    const parts = [];
    textCells.forEach((cell) => {
      [...cell.children].forEach((el) => {
        if (el.textContent.trim() || el.querySelector('a')) parts.push(el);
      });
      // single inline text (no block element) left in the cell
      if (!cell.children.length && cell.textContent.trim()) {
        const p = document.createElement('p');
        p.append(...cell.childNodes);
        parts.push(p);
      }
    });

    // title: the last part holding a link (or the last part); parts before it are eyebrows
    let titleIndex = parts.map((el) => Boolean(el.querySelector('a[href]'))).lastIndexOf(true);
    if (titleIndex < 0) titleIndex = parts.length - 1;
    parts.forEach((el, i) => {
      if (i < titleIndex && !isLinkOnly(el)) {
        el.classList.add('cards-tiles-card-badge');
        image.prepend(el);
        li.classList.add('cards-tiles-card-badged');
      } else {
        if (i === titleIndex) el.classList.add('cards-tiles-card-title');
        body.append(el);
      }
    });

    body.querySelectorAll('a').forEach((a) => a.classList.remove('button', 'primary', 'secondary'));
    body.querySelectorAll('.button-container').forEach((el) => el.classList.remove('button-container'));

    // whole tile clickable: the title link stretches over the tile (see tiles.css)
    const titleLink = body.querySelector('.cards-tiles-card-title a[href]');
    if (titleLink) li.classList.add('cards-tiles-card-linked');

    if (image.children.length) li.append(image);
    li.append(body);
    ul.append(li);
  });

  ul.querySelectorAll('.cards-tiles-card-image img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimized.querySelector('img'));
    (img.closest('picture') || img).replaceWith(optimized);
  });

  block.replaceChildren(ul);
}
