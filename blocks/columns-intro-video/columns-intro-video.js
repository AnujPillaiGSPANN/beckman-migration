import { findWistia, createWistiaIframe } from '../../scripts/wistia.js';

/**
 * Columns (intro-video): intro copy beside a click-to-play Wistia video.
 * Row cells: [rich text, first paragraph boxed] [Wistia URL (+ optional caption)].
 * @param {Element} block
 */
export default function decorate(block) {
  const cols = [...(block.firstElementChild?.children || [])];
  block.classList.add(`columns-intro-video-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('columns-intro-video-row');
    [...row.children].forEach((col) => {
      const wistia = findWistia(col);
      if (!wistia) {
        col.classList.add('columns-intro-video-text');
        const lead = col.querySelector(':scope > p');
        if (lead && lead === col.firstElementChild) lead.classList.add('columns-intro-video-lead');
        return;
      }

      col.classList.add('columns-intro-video-video');
      // drop the authored link (and its now empty paragraph); keep any caption text
      const { source } = wistia;
      const holder = source?.closest('p') || source;
      if (holder && holder.textContent.trim() === source?.textContent.trim()) holder.remove();
      else source?.remove();

      const player = document.createElement('div');
      player.className = 'columns-intro-video-player';
      const iframe = createWistiaIframe(wistia.id, { videoFoam: false, playerColor: 'ea1c2c' });
      player.append(iframe);
      col.prepend(player);
    });
  });
}
