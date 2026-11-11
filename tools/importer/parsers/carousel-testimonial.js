/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-testimonial. Base: carousel (xwalk container with block fields; block
 * model carousel-testimonial: video_image, video_imageAlt, video_uri; child model
 * carousel-testimonial-slide: text).
 * Source: https://www.beckman.com/liquid-handlers/echo-acoustic
 * Selector: div.two-columns-holder (left: Wistia embed, right: div.slideshow-container)
 * Rows:
 *   1. video group: [<!-- field:video_image --> poster img, only when the source has an
 *      authored (non-Wistia-chrome) image] <!-- field:video_uri -->
 *      <p><a>https://fast.wistia.net/embed/iframe/<id></a></p> (id from wistia_async_<id> /
 *      data-video-id; same form as embed-wistia / hero-video)
 *   2+. one single-cell row per div.mySlides (<!-- field:text -->):
 *      quote paragraph(s) (bare text + inline <strong> collected into <p>; the Font Awesome
 *      quote glyph is dropped, the block draws its own) + <p><em>attribution</em></p>
 * Slider chrome (prev/next, dots), empty h2 / caption are dropped; no empty image cells.
 */
const clean = (s) => (s || '').replace(/[  ​]/g, ' ').replace(/\s+/g, ' ').trim();

function wistiaId(root) {
  const values = [];
  root.querySelectorAll('[class*="wistia_async_"], [data-video-id], iframe[src], a[href], source[src]').forEach((el) => {
    values.push(el.getAttribute('class') || '', el.getAttribute('src') || '', el.getAttribute('href') || '');
    if (el.getAttribute('data-video-service') === 'wistia') values.push(`wistia_async_${el.getAttribute('data-video-id')}`);
  });
  for (const v of values) {
    const m = v.match(/wistia_async_([a-z0-9]{10})/i)
      || v.match(/wistia\.(?:net|com)\/(?:embed\/)?(?:iframe|medias)\/([a-z0-9]{10})/i);
    if (m) return m[1];
  }
  return null;
}

/** Split a slide into quote paragraphs + attribution paragraph(s). */
function slideNodes(document, slide) {
  const out = [];
  let pending = null;
  const flush = () => {
    if (pending) {
      // trim edge whitespace
      if (pending.firstChild && pending.firstChild.nodeType === 3) pending.firstChild.textContent = pending.firstChild.textContent.replace(/^\s+/, '');
      if (pending.lastChild && pending.lastChild.nodeType === 3) pending.lastChild.textContent = pending.lastChild.textContent.replace(/\s+$/, '');
      if (clean(pending.textContent)) out.push(pending);
    }
    pending = null;
  };
  Array.from(slide.childNodes).forEach((n) => {
    if (n.nodeType === 8) return;
    if (n.nodeType === 1 && /(^|\s)fa(\s|-|$)/.test(n.getAttribute('class') || '') && !clean(n.textContent)) return;
    if (n.nodeType === 1 && n.tagName === 'BR') { flush(); return; }
    if (n.nodeType === 1 && ['P', 'DIV', 'BLOCKQUOTE'].includes(n.tagName)) {
      flush();
      if (!clean(n.textContent)) return;
      const p = document.createElement('p');
      const em = n.querySelector('em, i');
      if (em && clean(em.textContent) === clean(n.textContent)) {
        const e = document.createElement('em');
        e.textContent = clean(n.textContent);
        p.appendChild(e);
      } else {
        Array.from(n.childNodes).forEach((c) => p.appendChild(c));
      }
      out.push(p);
      return;
    }
    if (n.nodeType === 3) {
      if (!pending && !clean(n.textContent)) return;
      n.textContent = n.textContent.replace(/\s+/g, ' ');
    } else if (n.nodeType === 1) {
      n.removeAttribute('style');
    }
    if (!pending) pending = document.createElement('p');
    pending.appendChild(n);
  });
  flush();
  return out;
}

export default function parse(element, { document }) {
  const left = element.querySelector('.two-columns-holder__left') || element;
  const slidesRoot = element.querySelector('.slideshow-container') || element;

  const cells = [];

  // Row 1: video (poster + Wistia URL)
  const id = wistiaId(left);
  const poster = Array.from(left.querySelectorAll('img'))
    .find((img) => !img.closest('.wistia_embed, .w-chrome') && !/^data:/i.test(img.getAttribute('src') || ''));
  if (id || poster) {
    const frag = document.createDocumentFragment();
    if (poster) {
      const img = document.createElement('img');
      img.setAttribute('src', poster.getAttribute('src'));
      img.setAttribute('alt', clean(poster.getAttribute('alt')) || 'Customer testimonial video');
      frag.appendChild(document.createComment(' field:video_image '));
      frag.appendChild(img);
    }
    if (id) {
      const url = `https://fast.wistia.net/embed/iframe/${id}`;
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.textContent = url;
      p.appendChild(a);
      frag.appendChild(document.createComment(' field:video_uri '));
      frag.appendChild(p);
    }
    cells.push([frag]);
  }

  // Quote rows
  let slides = Array.from(slidesRoot.querySelectorAll('.mySlides'));
  if (!slides.length) slides = Array.from(slidesRoot.querySelectorAll('[class*="slide"]')).filter((s) => clean(s.textContent));
  slides.forEach((slide) => {
    const nodes = slideNodes(document, slide);
    if (!nodes.length) return;
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(' field:text '));
    nodes.forEach((n) => frag.appendChild(n));
    cells.push([frag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-testimonial', cells });
  element.replaceWith(block);
}
