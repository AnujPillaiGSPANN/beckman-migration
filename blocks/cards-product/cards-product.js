import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

// widest the card image column gets (desktop grid, source .product-series-callouts__image)
const CARD_IMAGE_WIDTH = 371;

/**
 * Cards (product): linked product cards in a wrapping grid.
 * Row cells: [image] [title (linked) + description + list].
 * The first link in the card body makes the whole card clickable.
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-product-card';
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-product-card-image';
      else div.className = 'cards-product-card-body';
    });

    // drop empty paragraphs left over from the source
    li.querySelectorAll('.cards-product-card-body p').forEach((p) => {
      if (!p.textContent.trim() && !p.querySelector('img, picture')) p.remove();
    });

    // an image authored at a fixed rendition size keeps that size, like the source,
    // where such images sit inline in the description. Imported content carries the
    // size in the URL (?w=…&h=…); AEM assets carry their own size in width/height,
    // so there an image narrower than the card's image column is a fixed-size one.
    const img = li.querySelector('.cards-product-card-image img');
    if (img) {
      const params = new URL(img.src, window.location.href).searchParams;
      let w = parseInt(params.get('w'), 10);
      let h = parseInt(params.get('h'), 10);
      if (!(w > 0 && h > 0) || /%/.test(params.get('w'))) {
        const aw = parseInt(img.getAttribute('width'), 10);
        const ah = parseInt(img.getAttribute('height'), 10);
        [w, h] = aw > 0 && ah > 0 && aw < CARD_IMAGE_WIDTH ? [aw, ah] : [0, 0];
      }
      if (w > 0 && h > 0) {
        // source sizes it with an inline style (width still capped at 100%)
        img.width = w;
        img.height = h;
        img.style.width = `${w}px`;
        img.style.height = `${h}px`;
        li.classList.add('cards-product-card-sized');
      }
    }

    // the title link (or first link) stretches over the whole card
    const body = li.querySelector('.cards-product-card-body');
    const link = body?.querySelector('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a') || body?.querySelector('a');
    if (link) {
      li.classList.add('cards-product-card-linked');
      link.classList.add('cards-product-card-link');
    }
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    moveInstrumentation(img, optimizedImg);
    // keep a fixed-size image's size
    if (img.closest('.cards-product-card-sized')) {
      optimizedImg.setAttribute('width', img.getAttribute('width'));
      optimizedImg.setAttribute('height', img.getAttribute('height'));
      optimizedImg.style.cssText = img.style.cssText;
    }
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);

  // images with no size in their URL or attributes (local copies of the source renditions):
  // decide from the natural size once loaded, with the same rule as the AEM width/height case
  ul.querySelectorAll('li:not(.cards-product-card-sized) .cards-product-card-image img:not([width])').forEach((img) => {
    const li = img.closest('li');
    const apply = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (!(w > 0 && h > 0) || w >= CARD_IMAGE_WIDTH) return;
      img.style.width = `${w}px`;
      img.style.height = `${h}px`;
      li.classList.add('cards-product-card-sized');
    };
    if (img.complete) apply();
    else img.addEventListener('load', apply, { once: true });
  });
}
