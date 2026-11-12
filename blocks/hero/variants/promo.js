import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

function optimize(img, width) {
  const url = new URL(img.src, window.location.href);
  if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
  const picture = createOptimizedPicture(img.src, img.alt, false, [{ width }]);
  const newImg = picture.querySelector('img');
  moveInstrumentation(img, newImg);
  ['width', 'height'].forEach((attr) => {
    if (img.hasAttribute(attr)) newImg.setAttribute(attr, img.getAttribute(attr));
  });
  (img.closest('picture') || img).replaceWith(picture);
}

/**
 * Builds one feature tile: icon + title side by side, description below.
 * @param {Element[]} nodes authored nodes of the feature (icon anywhere, title first text block)
 * @param {Element} [source] authored row, for instrumentation
 */
function buildFeature(nodes, source) {
  const item = document.createElement('li');
  item.className = 'hero-promo-feature';
  if (source) moveInstrumentation(source, item);

  const holder = document.createElement('div');
  holder.append(...nodes);
  const icon = holder.querySelector('picture') || holder.querySelector('img');
  const head = document.createElement('div');
  head.className = 'hero-promo-feature-head';
  if (icon) {
    const iconWrap = document.createElement('span');
    iconWrap.className = 'hero-promo-feature-icon';
    const emptyParent = icon.parentElement !== holder ? icon.parentElement : null;
    iconWrap.append(icon);
    if (emptyParent && !emptyParent.textContent.trim() && !emptyParent.querySelector('img, picture')) {
      emptyParent.remove();
    }
    head.append(iconWrap);
  }

  const blocks = [...holder.querySelectorAll(':scope > *')].filter((el) => el.textContent.trim());
  const desc = document.createElement('div');
  desc.className = 'hero-promo-feature-text';
  if (blocks.length) {
    const titleEl = blocks.shift();
    const title = document.createElement('h3');
    title.className = 'hero-promo-feature-title';
    moveInstrumentation(titleEl, title);
    const strong = titleEl.matches('p') && titleEl.children.length === 1
      && titleEl.firstElementChild.matches('strong, b')
      && titleEl.textContent.trim() === titleEl.firstElementChild.textContent.trim()
      ? titleEl.firstElementChild : titleEl;
    title.append(...strong.childNodes);
    head.append(title);
    desc.append(...blocks);
  } else {
    // inline text with the icon (no wrapping block): keep it as the description
    const rest = [...holder.childNodes].filter((n) => n.textContent.trim());
    desc.append(...rest);
  }

  item.append(head);
  if (desc.childNodes.length) item.append(desc);
  return item;
}

/**
 * Hero (promo): content-width dark banner with a background photo behind the
 * eyebrow, very large H2 and text, then a 4-up icon feature strip and a centred CTA.
 * Rows (block model hero: image | media_* | text): [background image], optionally a second
 * image-only row (media_image: an image shown under the CTA on small screens only),
 * [eyebrow paragraph + H2 + text + CTA link], then one row per feature:
 * [icon image] [bold feature title paragraph + description]. Older content has the mobile
 * image row after the text row; image-only rows are told apart by order (first =
 * background), or by their field name where the Universal Editor instruments them.
 * @param {Element} block
 */
export default function decorate(block) {
  const background = document.createElement('div');
  background.className = 'hero-promo-background';
  const content = document.createElement('div');
  content.className = 'hero-promo-content';
  const features = document.createElement('ul');
  features.className = 'hero-promo-features';
  const ctas = document.createElement('div');
  ctas.className = 'hero-promo-ctas';
  const mobileImage = document.createElement('div');
  mobileImage.className = 'hero-promo-mobile-image';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length > 1) {
      if (!row.textContent.trim() && !row.querySelector('img')) return;
      const nodes = [];
      cells.forEach((cell) => nodes.push(...cell.childNodes));
      features.append(buildFeature(nodes, row));
      return;
    }
    const cell = cells[0] || row;
    const hasText = !!cell.textContent.trim();
    if (!hasText && cell.querySelector('img')) {
      const img = cell.querySelector('picture') || cell.querySelector('img');
      const prop = cell.querySelector('[data-aue-prop]')?.dataset.aueProp || '';
      const isMobile = prop.startsWith('media_') && !mobileImage.querySelector('img');
      if (!isMobile && !background.querySelector('img')) {
        moveInstrumentation(row, background);
        background.append(img);
      } else if (!mobileImage.querySelector('img')) {
        // a second image-only row: source .mobile-img, shown below the CTA on small screens
        moveInstrumentation(row, mobileImage);
        mobileImage.append(img);
      }
      return;
    }
    if (hasText) {
      moveInstrumentation(cell, content);
      content.append(...cell.childNodes);
    }
  });

  // a list of icon + text items in the text is a feature strip too
  content.querySelectorAll(':scope > ul').forEach((ul) => {
    const items = [...ul.children];
    if (!items.length || !items.every((li) => li.querySelector('img'))) return;
    items.forEach((li) => features.append(buildFeature([...li.childNodes], li)));
    ul.remove();
  });

  content.querySelectorAll(':scope > p').forEach((p) => {
    if (!p.textContent.trim() && !p.querySelector('img, picture')) p.remove();
  });

  // eyebrow: a short paragraph before the heading
  const heading = content.querySelector(':scope > :is(h1, h2, h3)');
  const eyebrow = heading?.previousElementSibling;
  if (eyebrow?.matches('p') && !eyebrow.querySelector('a')) eyebrow.classList.add('hero-promo-eyebrow');

  // CTA paragraphs (link-only) move below the feature strip
  content.querySelectorAll(':scope > p').forEach((p) => {
    const link = p.querySelector('a[href]');
    if (link && p.textContent.trim() === link.textContent.trim()) {
      if (!link.classList.contains('button')) link.classList.add('button');
      if (!link.classList.contains('secondary')) link.classList.add('primary');
      p.classList.add('button-container');
      ctas.append(p);
    }
  });

  const bgImg = background.querySelector('img');
  if (bgImg) {
    bgImg.loading = 'lazy';
    optimize(bgImg, '2000');
  }
  features.querySelectorAll('.hero-promo-feature-icon img').forEach((img) => optimize(img, '120'));
  const mobileImg = mobileImage.querySelector('img');
  if (mobileImg) {
    optimize(mobileImg, '750');
    // source img: natural size capped at the banner width; full width until it has loaded
    const cap = (img) => {
      if (img.naturalWidth) img.style.maxWidth = `min(100%, ${img.naturalWidth}px)`;
    };
    const img = mobileImage.querySelector('img');
    if (img.complete) cap(img);
    else img.addEventListener('load', () => cap(img), { once: true });
  }

  const top = document.createElement('div');
  top.className = 'hero-promo-top';
  if (bgImg) top.append(background);
  top.append(content);

  const children = [top];
  if (features.children.length) children.push(features);
  if (ctas.children.length) children.push(ctas);
  if (mobileImg) children.push(mobileImage);
  block.replaceChildren(...children);
}
