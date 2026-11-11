import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Cards (icon): static benefit tiles, centered icon + bold title + short description.
 * Row cells: [icon image] [title + description].
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-icon-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-icon-card';
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      div.className = div.querySelector('picture') && !div.textContent.trim()
        ? 'cards-icon-card-image'
        : 'cards-icon-card-body';
    });
    // the first bold paragraph / heading is the tile title
    const body = li.querySelector('.cards-icon-card-body');
    const title = body?.querySelector('h1, h2, h3, h4, h5, h6, p > strong:only-child')?.closest('h1, h2, h3, h4, h5, h6, p');
    title?.classList.add('cards-icon-card-title');
    body?.querySelectorAll('p').forEach((p) => { if (!p.textContent.trim()) p.remove(); });
    li.querySelector('.cards-icon-card-image img')?.setAttribute('alt', '');
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '300' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.replaceChildren(ul);
}
