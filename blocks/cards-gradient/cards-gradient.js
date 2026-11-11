import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Cards (gradient): 2x2 grid of grey text cards with a red-to-purple gradient top
 * border, heading, text and a right-aligned outline button; cards lift on hover.
 * Row cells: [heading + paragraph(s) + button link (em-wrapped link = outline button)].
 * @param {Element} block
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'cards-gradient-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-gradient-card';
    moveInstrumentation(row, li);

    const body = document.createElement('div');
    body.className = 'cards-gradient-card-body';
    [...row.children].forEach((cell) => {
      moveInstrumentation(cell, body);
      body.append(...cell.childNodes);
    });
    body.querySelectorAll('p').forEach((p) => {
      if (!p.textContent.trim() && !p.querySelector('img, picture')) p.remove();
    });

    // the trailing link-only paragraph is the outline CTA (source a.redbtn)
    const blocks = [...body.children];
    const last = blocks[blocks.length - 1];
    const link = last?.querySelector('a[href]');
    if (blocks.length > 1 && link && last.textContent.trim() === link.textContent.trim()) {
      last.classList.add('cards-gradient-card-action', 'button-container');
      link.classList.add('button', 'secondary');
      link.classList.remove('primary');
    }
    // other links in the text stay inline links
    body.querySelectorAll(':scope > :not(.cards-gradient-card-action) a.button')
      .forEach((a) => a.classList.remove('button', 'primary', 'secondary'));

    li.append(body);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
