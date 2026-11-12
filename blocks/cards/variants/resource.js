import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

/**
 * Cards (resource): wrapping grid of document cards, title above a (linked)
 * cover image, followed by an outline "Read" link.
 * Row cells: [cover image (optionally linked)] [bold title + "Read" link].
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-resource-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-resource-card';
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const imageCell = cells.find((c) => c.querySelector('picture'));
    const bodyCell = cells.find((c) => c !== imageCell);

    const title = document.createElement('div');
    title.className = 'cards-resource-card-title';
    const image = document.createElement('div');
    image.className = 'cards-resource-card-image';
    const actions = document.createElement('div');
    actions.className = 'cards-resource-card-actions';

    if (imageCell) image.append(...imageCell.childNodes);
    if (bodyCell) {
      [...bodyCell.children].forEach((el) => {
        const link = el.querySelector('a');
        const isAction = link && el.textContent.trim() === link.textContent.trim();
        (isAction ? actions : title).append(el);
      });
    }
    title.querySelectorAll('p').forEach((p) => { if (!p.textContent.trim()) p.remove(); });

    // link the cover to the "Read" target when it is not linked itself
    const readLink = actions.querySelector('a');
    const pic = image.querySelector('picture');
    if (pic && readLink && !pic.closest('a')) {
      const a = document.createElement('a');
      a.href = readLink.href;
      a.tabIndex = -1;
      a.setAttribute('aria-hidden', 'true');
      pic.replaceWith(a);
      a.append(pic);
    }

    li.append(title, image);
    if (actions.children.length) li.append(actions);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.replaceChildren(ul);
}
