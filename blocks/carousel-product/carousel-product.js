import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Cards-product cell parsing, shared anatomy with blocks/cards-product:
 * [image (optionally linked)] [linked title heading + description / list].
 * @param {Element} row authored row
 * @returns {HTMLLIElement}
 */
function buildSlide(row) {
  const li = document.createElement('li');
  li.className = 'carousel-product-slide';
  moveInstrumentation(row, li);
  while (row.firstElementChild) li.append(row.firstElementChild);
  [...li.children].forEach((div) => {
    div.className = div.querySelector('picture') && !div.textContent.trim()
      ? 'carousel-product-slide-image'
      : 'carousel-product-slide-body';
  });
  li.querySelectorAll('.carousel-product-slide-body p').forEach((p) => {
    if (!p.textContent.trim() && !p.querySelector('img, picture')) p.remove();
  });
  const body = li.querySelector('.carousel-product-slide-body');
  const link = body?.querySelector('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a') || body?.querySelector('a');
  if (link) {
    li.classList.add('carousel-product-slide-linked');
    link.classList.add('carousel-product-slide-link');
  }
  // description links keep plain link styling, not buttons
  body?.querySelectorAll('a.button').forEach((a) => a.classList.remove('button', 'primary', 'secondary'));
  body?.querySelectorAll('.button-container').forEach((p) => p.classList.remove('button-container'));
  return li;
}

function createArrow(direction) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `carousel-product-arrow carousel-product-${direction}`;
  button.setAttribute('aria-label', direction === 'prev' ? 'Previous products' : 'Next products');
  const label = document.createElement('span');
  label.textContent = direction === 'prev' ? 'Previous' : 'Next';
  label.setAttribute('aria-hidden', 'true');
  button.append(label);
  return button;
}

/**
 * Carousel (product): multi-card slider with prev/next arrows. Arrows are
 * hidden when every slide fits, and disabled at either end of the track.
 * @param {Element} block
 */
export default function decorate(block) {
  const track = document.createElement('ul');
  track.className = 'carousel-product-track';
  track.setAttribute('tabindex', '0');
  track.setAttribute('aria-label', 'Products');
  [...block.children].forEach((row) => track.append(buildSlide(row)));

  track.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  const prev = createArrow('prev');
  const next = createArrow('next');
  const viewport = document.createElement('div');
  viewport.className = 'carousel-product-viewport';
  viewport.append(track);
  block.replaceChildren(prev, viewport, next);
  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'carousel');

  // one slide per click (slick slidesToScroll: 1): slide width + its side margins
  const step = () => {
    const [first, second] = track.querySelectorAll('.carousel-product-slide');
    if (first && second) return second.offsetLeft - first.offsetLeft;
    return first ? first.getBoundingClientRect().width : track.clientWidth;
  };

  const update = () => {
    const overflow = track.scrollWidth - track.clientWidth > 5;
    block.classList.toggle('carousel-product-scrollable', overflow);
    prev.hidden = !overflow;
    next.hidden = !overflow;
    prev.disabled = track.scrollLeft <= 5;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  update();
}
