import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

/**
 * Option side (homepage "Service & technical support"): linked service cards beside the
 * section's intro. The icon is an icon paragraph (":user-plus:" -> span.icon) at the top of the
 * text, or the image cell; the bold linked title stretches over the card.
 * Row cells: [image (optional)] [icon paragraph + bold linked title + description].
 * @param {HTMLUListElement} ul
 * @param {Element} block
 */
function decorateSide(ul, block) {
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-icon-card';
    moveInstrumentation(row, li);
    const image = document.createElement('div');
    image.className = 'cards-icon-card-image';
    const body = document.createElement('div');
    body.className = 'cards-icon-card-body';
    [...row.children].forEach((cell) => {
      const pic = cell.querySelector('picture, img');
      if (pic && !cell.textContent.trim() && !cell.querySelector('.icon')) {
        image.append(pic.closest('picture') || pic);
        return;
      }
      [...cell.children].forEach((el) => {
        const icon = el.querySelector(':scope > .icon');
        if (icon && !el.textContent.trim() && !image.children.length) image.append(icon);
        else if (el.textContent.trim()) body.append(el);
      });
    });
    body.querySelectorAll('a').forEach((a) => a.classList.remove('button', 'primary', 'secondary'));
    body.querySelectorAll('.button-container').forEach((el) => el.classList.remove('button-container'));
    const title = body.querySelector('h1, h2, h3, h4, h5, h6, p > strong:only-child')?.closest('h1, h2, h3, h4, h5, h6, p')
      || body.firstElementChild;
    title?.classList.add('cards-icon-card-title');
    const link = title?.querySelector('a[href]');
    if (link) {
      link.classList.add('cards-icon-card-link');
      li.classList.add('cards-icon-card-linked');
    }
    image.querySelector('img')?.setAttribute('alt', '');
    if (image.children.length) li.append(image);
    li.append(body);
    ul.append(li);
  });
}

/**
 * Cards (icon): static benefit tiles, centered icon + bold title + short description.
 * Row cells: [icon image] [title + description].
 * Option side: see decorateSide.
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-icon-list';
  if (block.classList.contains('side')) {
    decorateSide(ul, block);
    block.replaceChildren(ul);
    return;
  }

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
