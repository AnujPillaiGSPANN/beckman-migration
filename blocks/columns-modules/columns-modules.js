/**
 * Columns (modules): three equal columns, each a short heading or label
 * followed by a bulleted list or an image.
 * Row cells: [heading/label + list or image] x 3.
 * @param {Element} block
 */
export default function decorate(block) {
  const cols = [...(block.firstElementChild?.children || [])];
  block.classList.add(`columns-modules-${cols.length}-cols`);
  // every column is a label + image (e.g. Front / Side / Front Open views)
  if (cols.length && cols.every((col) => col.querySelector('picture'))) {
    block.classList.add('columns-modules-images');
  }

  [...block.children].forEach((row) => {
    row.classList.add('columns-modules-row');
    [...row.children].forEach((col) => {
      col.classList.add('columns-modules-col');
      if (col.querySelector('picture')) col.classList.add('columns-modules-media');
      // a leading short paragraph above an image is the view label
      const first = col.firstElementChild;
      if (first?.tagName === 'P' && !first.querySelector('picture') && col.querySelector('picture')) {
        first.classList.add('columns-modules-label');
      }
    });
  });
}
