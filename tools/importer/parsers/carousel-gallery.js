/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-gallery. Base: carousel (xwalk container; child model
 * carousel-gallery-slide: image, imageAlt, text).
 * Source: https://www.beckman.com/cell-culture-workstation/cydem-vt
 * Selector: div.product-gallery-carousel
 * One row per div.slideset > div.slide:
 *   cell 1 = <!-- field:image --> slide img (href="#" wrapper link dropped, alt kept)
 *   cell 2 = optional caption (<!-- field:text -->), empty in the source
 * The div.pagination thumbnails duplicate the slides and the prev/next arrows are
 * chrome; both are ignored (the block generates its own thumbnails).
 */
const clean = (s) => (s || '').replace(/[ ​]/g, ' ').replace(/\s+/g, ' ').trim();

export default function parse(element, { document }) {
  let slides = Array.from(element.querySelectorAll('.slideset > .slide'));
  if (!slides.length) slides = Array.from(element.querySelectorAll('.slide'));
  slides = slides.filter((s) => !s.classList.contains('slick-cloned') && !s.closest('.pagination'));

  const cells = [];
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;
    img.setAttribute('alt', clean(img.getAttribute('alt')));
    if (!clean(img.getAttribute('title'))) img.removeAttribute('title');

    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    imageCell.appendChild(img);

    // caption: any slide text outside the image (none in the source today)
    const caption = clean(slide.textContent);
    let textCell = '';
    if (caption) {
      textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      const p = document.createElement('p');
      p.textContent = caption;
      textCell.appendChild(p);
    }
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-gallery', cells });
  element.replaceWith(block);
}
