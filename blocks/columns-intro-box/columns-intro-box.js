/**
 * Columns (intro-box): intro copy beside a boxed callout column.
 * The first cell of each row is the main text column; every following
 * cell is rendered as a callout box.
 * @param {Element} block
 */
export default function decorate(block) {
  const cols = [...(block.firstElementChild?.children || [])];
  block.classList.add(`columns-intro-box-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('columns-intro-box-row');
    [...row.children].forEach((col, i) => {
      col.classList.add(i === 0 ? 'columns-intro-box-main' : 'columns-intro-box-box');
      const pic = col.querySelector('picture');
      if (pic && col.children.length === 1) col.classList.add('columns-intro-box-img-col');
    });
  });
}
