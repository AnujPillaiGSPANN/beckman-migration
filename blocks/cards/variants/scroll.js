import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

/**
 * Cards (scroll): single-row horizontally scrolling strip of tiles.
 * Row cells: [image] [either a single download link, or eyebrow + linked title].
 * - download tiles (brochure covers): the link shows as a hover/focus overlay.
 * - linked tiles (applications): eyebrow label + title; the whole tile is clickable.
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-scroll-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-scroll-card';
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div) => {
      if (div.querySelector('picture') && !div.textContent.trim()) div.className = 'cards-scroll-card-image';
      else div.className = 'cards-scroll-card-body';
    });
    li.querySelectorAll('.cards-scroll-card-body p').forEach((p) => {
      if (!p.textContent.trim() && !p.querySelector('picture')) p.remove();
    });

    const body = li.querySelector('.cards-scroll-card-body');
    const links = body ? [...body.querySelectorAll('a')] : [];
    if (!body || !body.textContent.trim()) {
      body?.remove();
    } else if (links.length === 1 && body.textContent.trim() === links[0].textContent.trim()) {
      // download overlay over the cover image
      li.classList.add('cards-scroll-card-download');
      const [link] = links;
      link.className = 'cards-scroll-card-overlay';
      link.closest('.button-container')?.classList.remove('button-container');
      const image = li.querySelector('.cards-scroll-card-image');
      if (image) {
        image.append(link);
        body.remove();
      }
    } else {
      // eyebrow = paragraph before the title, title link stretches over the tile
      const title = body.querySelector('h1, h2, h3, h4, h5, h6')
        || [...body.children].find((el) => el.querySelector('a, strong'));
      if (title) {
        title.classList.add('cards-scroll-card-title');
        const prev = title.previousElementSibling;
        if (prev && prev.tagName === 'P') prev.classList.add('cards-scroll-card-eyebrow');
      }
      const link = title?.querySelector('a') || links[0];
      if (link) {
        li.classList.add('cards-scroll-card-linked');
        link.classList.add('cards-scroll-card-link');
        link.classList.remove('button');
        link.closest('.button-container')?.classList.remove('button-container');
      }
    }
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '500' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.replaceChildren(ul);
}
