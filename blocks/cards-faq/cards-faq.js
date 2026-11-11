import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Cards (faq): static question/answer boxes stacked vertically.
 * Row cells: [question heading + answer paragraph(s)].
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-faq-card';
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => { div.className = 'cards-faq-card-body'; });
    li.querySelectorAll('p').forEach((p) => {
      if (!p.textContent.trim() && !p.querySelector('img, picture')) p.remove();
    });
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
