import { findWistia, createWistiaIframe } from '../../scripts/wistia.js';

/**
 * Columns (intro-video): intro copy beside a click-to-play Wistia video or a photo.
 * Row cells: [rich text, first paragraph boxed] [Wistia URL (+ optional caption) | image].
 * @param {Element} block
 */
export default function decorate(block) {
  const cols = [...(block.firstElementChild?.children || [])];
  block.classList.add(`intro-video-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    row.classList.add('intro-video-row');
    [...row.children].forEach((col) => {
      const wistia = findWistia(col);
      // image-only column (photo instead of a video): media, not boxed lead copy
      if (!wistia && col.querySelector('picture, img') && !col.textContent.trim()) {
        col.classList.add('intro-video-media');
        return;
      }
      if (!wistia) {
        col.classList.add('intro-video-text');
        const lead = col.querySelector(':scope > p');
        if (lead && lead === col.firstElementChild) lead.classList.add('intro-video-lead');
        return;
      }

      col.classList.add('intro-video-video');
      // drop the authored link (and its now empty paragraph); keep any caption text
      const { source } = wistia;
      const holder = source?.closest('p') || source;
      if (holder && holder.textContent.trim() === source?.textContent.trim()) holder.remove();
      else source?.remove();

      const player = document.createElement('div');
      player.className = 'intro-video-player';
      const iframe = createWistiaIframe(wistia.id, { videoFoam: false, playerColor: 'ea1c2c' });
      player.append(iframe);
      col.prepend(player);
    });
  });
}
