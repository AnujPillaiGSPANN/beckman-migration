/**
 * Columns (media): copy (intro, check-icon list, CTA) beside a large image
 * with an optional caption.
 * Row cells: [rich text] [image + optional caption paragraph].
 * Option "wrap": long-form text wraps around the image floated right ("left": floated left).
 * @param {Element} block
 */
export default function decorate(block) {
  const cols = [...(block.firstElementChild?.children || [])];
  block.classList.add(`media-split-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('media-split-row');
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      const hasCopyStructure = col.querySelector('ul, ol, h1, h2, h3, h4, h5, h6');
      if (pic && !hasCopyStructure) {
        col.classList.add('media-split-image');
        // paragraphs other than the picture paragraph are captions
        col.querySelectorAll(':scope > p').forEach((p) => {
          if (!p.querySelector('picture') && p.textContent.trim()) p.classList.add('media-split-caption');
        });
      } else {
        col.classList.add('media-split-text');
      }
    });
    // wrap: the image floats beside the text, so it must come first in the flow
    const image = row.querySelector(':scope > .media-split-image');
    if (block.classList.contains('wrap') && image) row.prepend(image);
  });
}
