import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const isOptimizable = (img) => {
  const url = new URL(img.src, window.location.href);
  return url.origin === window.location.origin && !/\.svg$/i.test(url.pathname);
};

/**
 * Carousel (gallery): one large image at a time with prev/next arrows and a
 * clickable thumbnail strip generated from the slides.
 * Row cells: [image] [optional caption].
 * @param {Element} block
 */
export default function decorate(block) {
  const slides = document.createElement('ul');
  slides.className = 'carousel-gallery-slides';
  const thumbs = document.createElement('ul');
  thumbs.className = 'carousel-gallery-thumbs';

  [...block.children].forEach((row) => {
    const pic = row.querySelector('picture');
    if (!pic) return;
    const slide = document.createElement('li');
    slide.className = 'carousel-gallery-slide';
    moveInstrumentation(row, slide);
    const img = pic.querySelector('img');
    const index = slides.children.length;

    const media = document.createElement('div');
    media.className = 'carousel-gallery-image';
    if (isOptimizable(img)) {
      const optimized = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '900' }]);
      moveInstrumentation(img, optimized.querySelector('img'));
      media.append(optimized);
    } else {
      if (index === 0) img.loading = 'eager';
      media.append(pic);
    }
    slide.append(media);

    const caption = [...row.children].find((c) => c.textContent.trim());
    if (caption) {
      caption.className = 'carousel-gallery-caption';
      slide.append(caption);
    }
    slides.append(slide);

    // thumbnail button
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'carousel-gallery-thumb';
    button.setAttribute('aria-label', `Show image ${index + 1}${img.alt ? `: ${img.alt}` : ''}`);
    const thumb = isOptimizable(img)
      ? createOptimizedPicture(img.src, '', false, [{ width: '150' }])
      : media.querySelector('picture').cloneNode(true);
    thumb.querySelector('img')?.setAttribute('alt', '');
    thumb.querySelectorAll('img').forEach((t) => { t.loading = 'lazy'; });
    button.append(thumb);
    li.append(button);
    thumbs.append(li);
  });

  const count = slides.children.length;
  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'carousel-gallery-arrow carousel-gallery-prev';
  prev.setAttribute('aria-label', 'Previous image');
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'carousel-gallery-arrow carousel-gallery-next';
  next.setAttribute('aria-label', 'Next image');

  const stage = document.createElement('div');
  stage.className = 'carousel-gallery-stage';
  stage.append(prev, slides, next);

  block.replaceChildren(stage);
  if (count > 1) block.append(thumbs);
  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'carousel');
  block.setAttribute('aria-label', 'Image gallery');

  let current = 0;
  const show = (i) => {
    current = (i + count) % count;
    [...slides.children].forEach((s, idx) => {
      s.classList.toggle('carousel-gallery-active', idx === current);
      s.setAttribute('aria-hidden', String(idx !== current));
    });
    [...thumbs.querySelectorAll('.carousel-gallery-thumb')].forEach((t, idx) => {
      t.classList.toggle('carousel-gallery-thumb-active', idx === current);
      t.setAttribute('aria-current', String(idx === current));
    });
  };

  if (count <= 1) {
    prev.hidden = true;
    next.hidden = true;
  }
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  thumbs.querySelectorAll('.carousel-gallery-thumb').forEach((t, idx) => {
    t.addEventListener('click', () => show(idx));
  });
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  if (count) show(0);
}
