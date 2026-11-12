import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

/**
 * Hero (banner): full-width dark banner, a background photo under a 70% black overlay and the
 * centred page title (H1) + subtitle.
 * Rows (block model hero, no items): [background image (image/imageAlt)] [text: H1 + paragraphs].
 * The photo fills a fixed-height banner (object-fit cover), so its natural size never drives
 * the layout.
 * @param {Element} block
 */
export default function decorate(block) {
  const media = document.createElement('div');
  media.className = 'hero-banner-media';
  const content = document.createElement('div');
  content.className = 'hero-banner-content';

  [...block.children].forEach((row) => {
    const cell = row.children.length === 1 ? row.firstElementChild : row;
    const pic = cell.querySelector('picture') || cell.querySelector('img');
    const hasText = Boolean(cell.textContent.trim());
    if (pic && !hasText && !media.children.length) {
      moveInstrumentation(row, media);
      media.append(pic);
      return;
    }
    if (hasText) {
      moveInstrumentation(cell, content);
      content.append(...cell.childNodes);
    }
  });

  content.querySelectorAll(':scope > p').forEach((p) => {
    if (!p.textContent.trim() && !p.querySelector('img, picture')) p.remove();
  });

  const img = media.querySelector('img');
  if (img) {
    img.loading = 'eager';
    img.alt = img.alt || '';
    const url = new URL(img.src, window.location.href);
    if (url.origin === window.location.origin && !/\.svg$/i.test(url.pathname)) {
      const picture = createOptimizedPicture(img.src, img.alt, true, [
        { media: '(min-width: 1024px)', width: '2000' },
        { media: '(min-width: 600px)', width: '1200' },
        { width: '750' },
      ]);
      moveInstrumentation(img, picture.querySelector('img'));
      (img.closest('picture') || img).replaceWith(picture);
    }
  }

  const overlay = document.createElement('div');
  overlay.className = 'hero-banner-overlay';
  block.replaceChildren(...(img ? [media] : []), overlay, content);
}
