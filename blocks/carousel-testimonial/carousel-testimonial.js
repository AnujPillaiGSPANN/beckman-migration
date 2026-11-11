import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { findWistia, createWistiaIframe } from '../../scripts/wistia.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// red opening quote glyph (source: em.fa.fa-quote-left in #ea1c2c)
function createQuoteMark() {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 448 512');
  svg.setAttribute('class', 'carousel-testimonial-mark');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M0 216c0-75.1 60.9-136 136-136h8a32 32 0 0 1 0 64h-8c-39.8 0-72 32.2-72 72v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V216Zm256 0c0-75.1 60.9-136 136-136h8a32 32 0 0 1 0 64h-8c-39.8 0-72 32.2-72 72v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64h-64c-35.3 0-64-28.7-64-64V216Z');
  svg.append(path);
  return svg;
}

function buildVideo(row, wistia) {
  const media = document.createElement('div');
  media.className = 'carousel-testimonial-video';
  moveInstrumentation(row, media);

  const loadPlayer = (autoPlay) => {
    if (media.classList.contains('carousel-testimonial-video-loaded')) return;
    const options = { videoFoam: false };
    if (autoPlay) options.autoPlay = true;
    const iframe = createWistiaIframe(wistia.id, options);
    media.replaceChildren(iframe);
    media.classList.add('carousel-testimonial-video-loaded');
  };

  const img = row.querySelector('picture img, img');
  if (img) {
    let poster = img.closest('picture') || img;
    const url = new URL(img.src, window.location.href);
    if (url.origin === window.location.origin && !/\.svg$/i.test(url.pathname)) {
      poster = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, poster.querySelector('img'));
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'carousel-testimonial-placeholder';
    button.setAttribute('aria-label', 'Play video');
    const play = document.createElement('span');
    play.className = 'carousel-testimonial-play';
    button.append(poster, play);
    button.addEventListener('click', () => loadPlayer(true));
    media.append(button);
    return media;
  }

  // no poster: the Wistia player shows its own thumbnail and plays on click
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      loadPlayer(false);
    }
  }, { rootMargin: '200px' });
  observer.observe(media);
  return media;
}

function buildSlide(row, index, total) {
  const slide = document.createElement('li');
  slide.className = 'carousel-testimonial-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('aria-label', `${index + 1} of ${total}`);
  moveInstrumentation(row, slide);

  const body = document.createElement('div');
  body.className = 'carousel-testimonial-quote';
  [...row.children].forEach((cell) => {
    if (!cell.textContent.trim()) return;
    moveInstrumentation(cell, body);
    body.append(...cell.childNodes);
  });
  body.querySelectorAll('p').forEach((p) => {
    if (!p.textContent.trim() && !p.querySelector('img, picture')) p.remove();
  });

  // attribution: the last paragraph that is entirely italic
  const paragraphs = [...body.querySelectorAll(':scope > p')];
  const last = paragraphs[paragraphs.length - 1];
  const isItalic = (p) => p.textContent.trim()
    && [...p.childNodes].every((n) => (n.nodeType === Node.TEXT_NODE && !n.textContent.trim())
      || (n.nodeType === Node.ELEMENT_NODE && n.matches('em, i')));
  if (last && paragraphs.length > 1 && isItalic(last)) last.classList.add('carousel-testimonial-attribution');

  const first = paragraphs.find((p) => !p.classList.contains('carousel-testimonial-attribution'));
  if (first) first.prepend(createQuoteMark(), ' ');
  slide.append(body);
  return slide;
}

function createArrow(direction) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `carousel-testimonial-arrow carousel-testimonial-${direction}`;
  button.setAttribute('aria-label', direction === 'prev' ? 'Previous quote' : 'Next quote');
  const glyph = document.createElement('span');
  glyph.setAttribute('aria-hidden', 'true');
  glyph.textContent = direction === 'prev' ? '❮' : '❯';
  button.append(glyph);
  return button;
}

/**
 * Carousel (testimonial): a Wistia video beside a quote slider with prev/next
 * arrows and dots. Slides switch instantly like the source slideshow.
 * Rows: [video: optional poster image + Wistia URL or id] then one row per quote:
 * [quote paragraph(s) + italic attribution paragraph].
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const wistia = rows.length ? findWistia(rows[0]) : null;
  const videoRow = wistia ? rows.shift() : null;
  const slideRows = rows.filter((row) => row.textContent.trim());

  const children = [];
  if (videoRow) children.push(buildVideo(videoRow, wistia));

  const slider = document.createElement('div');
  slider.className = 'carousel-testimonial-slider';
  slider.setAttribute('role', 'region');
  slider.setAttribute('aria-roledescription', 'carousel');
  slider.setAttribute('aria-label', 'Testimonials');

  const stage = document.createElement('div');
  stage.className = 'carousel-testimonial-stage';
  const track = document.createElement('ul');
  track.className = 'carousel-testimonial-slides';
  const slides = slideRows.map((row, i) => buildSlide(row, i, slideRows.length));
  track.append(...slides);
  stage.append(track);
  slider.append(stage);

  const dots = document.createElement('div');
  dots.className = 'carousel-testimonial-dots';
  let current = 0;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    [...dots.children].forEach((dot, i) => {
      dot.classList.toggle('carousel-testimonial-dot-active', i === current);
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  if (slides.length > 1) {
    const prev = createArrow('prev');
    const next = createArrow('next');
    prev.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    stage.append(prev, next);
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-testimonial-dot';
      dot.setAttribute('aria-label', `Show quote ${i + 1}`);
      dot.addEventListener('click', () => show(i));
      // the source dots are inline-blocks separated by whitespace
      if (i) dots.append(' ');
      dots.append(dot);
    });
    slider.append(dots);
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  children.push(slider);
  block.replaceChildren(...children);
  if (!videoRow) block.classList.add('carousel-testimonial-no-video');
  if (slides.length) show(0);
}
