import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

/**
 * Option insights (homepage "Fresh insights"): image on top, a red category paragraph and the
 * card text, which holds the card's link; the link stretches over the whole card.
 * Row cells: [image] [category paragraph + linked text paragraph].
 * @param {HTMLUListElement} ul
 * @param {Element} block
 */
function decorateInsights(ul, block) {
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-resource-insight';
    moveInstrumentation(row, li);
    const cells = [...row.children];
    const imageCell = cells.find((c) => c.querySelector('picture, img') && !c.textContent.trim());
    const image = document.createElement('div');
    image.className = 'cards-resource-insight-image';
    const body = document.createElement('div');
    body.className = 'cards-resource-insight-body';
    const pic = imageCell?.querySelector('picture') || imageCell?.querySelector('img');
    if (pic) image.append(pic);
    cells.filter((c) => c !== imageCell).forEach((cell) => {
      [...cell.children].forEach((el) => { if (el.textContent.trim()) body.append(el); });
    });
    body.querySelectorAll('a').forEach((a) => a.classList.remove('button', 'primary', 'secondary'));
    body.querySelectorAll('.button-container').forEach((el) => el.classList.remove('button-container'));
    const link = body.querySelector('a[href]');
    const category = body.firstElementChild;
    if (category && !category.contains(link)) category.classList.add('cards-resource-insight-category');
    if (link) {
      link.classList.add('cards-resource-insight-link');
      li.classList.add('cards-resource-insight-linked');
    }
    if (pic) li.append(image);
    li.append(body);
    ul.append(li);
  });
}

/**
 * Cards (resource): wrapping grid of document cards, title above a (linked)
 * cover image, followed by an outline "Read" link.
 * Row cells: [cover image (optionally linked)] [bold title + "Read" link].
 * Option insights: see decorateInsights.
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-resource-list';
  if (block.classList.contains('insights')) {
    // own list / card classes: none of the document-card grid rules apply
    ul.className = 'cards-resource-insights';
    decorateInsights(ul, block);
    ul.querySelectorAll('picture > img').forEach((img) => {
      const url = new URL(img.src, window.location.href);
      if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    });
    block.replaceChildren(ul);
    return;
  }

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
