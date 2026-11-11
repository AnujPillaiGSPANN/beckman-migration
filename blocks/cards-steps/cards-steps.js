import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createExchangeArrows() {
  const li = document.createElement('li');
  li.className = 'cards-steps-exchange';
  li.setAttribute('aria-hidden', 'true');
  ['→', '←'].forEach((glyph) => {
    const arrow = document.createElement('span');
    arrow.className = 'cards-steps-exchange-arrow';
    arrow.textContent = glyph;
    li.append(arrow);
  });
  return li;
}

/**
 * Cards (steps): centred bordered cards, photo on top, a full-width coloured label
 * bar (colour by position: purple, navy, cyan) and a short description.
 * Option "exchange": two cards with a stacked right/left arrow pair drawn between them
 * (bars purple then cyan).
 * Row cells: [image] [bold label paragraph + description paragraph(s)].
 * @param {Element} block
 */
export default function decorate(block) {
  const exchange = block.classList.contains('exchange');
  const ul = document.createElement('ul');
  ul.className = 'cards-steps-list';

  const cards = [...block.children].map((row) => {
    const li = document.createElement('li');
    li.className = 'cards-steps-card';
    moveInstrumentation(row, li);

    const image = document.createElement('div');
    image.className = 'cards-steps-card-image';
    const body = document.createElement('div');
    body.className = 'cards-steps-card-body';

    [...row.children].forEach((cell) => {
      const pic = cell.querySelector('picture') || cell.querySelector('img');
      if (pic && !cell.textContent.trim()) {
        image.append(pic);
        return;
      }
      if (pic && !image.firstChild) image.append(pic);
      moveInstrumentation(cell, body);
      body.append(...cell.childNodes);
    });
    body.querySelectorAll('p').forEach((p) => {
      if (!p.textContent.trim() && !p.querySelector('img, picture')) p.remove();
    });

    // label bar: the leading heading or bold-only paragraph
    const first = body.firstElementChild;
    if (first) {
      const isBold = first.matches('h2, h3, h4, h5, h6')
        || (first.matches('p') && first.children.length === 1
          && first.firstElementChild.matches('strong, b')
          && first.textContent.trim() === first.firstElementChild.textContent.trim());
      if (isBold) {
        const label = document.createElement('p');
        label.className = 'cards-steps-card-label';
        moveInstrumentation(first, label);
        const inner = first.matches('p') ? first.firstElementChild : first;
        label.append(...inner.childNodes);
        first.replaceWith(label);
      }
    }

    if (image.firstChild) li.append(image);
    li.append(body);
    return li;
  });

  cards.forEach((card, i) => {
    if (exchange && i > 0) ul.append(createExchangeArrows());
    ul.append(card);
  });

  ul.querySelectorAll('.cards-steps-card-image img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    (img.closest('picture') || img).replaceWith(optimizedPic);
  });

  block.replaceChildren(ul);
}
