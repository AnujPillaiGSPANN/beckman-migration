import { findWistia, createWistiaIframe } from '../../../scripts/wistia.js';

function loadPlayer(block, id, autoPlay) {
  if (block.classList.contains('embed-wistia-loaded')) return;
  const player = document.createElement('div');
  player.className = 'embed-wistia-player';
  // no playerColor override: the source player uses the media's own colour (#ea1c2c)
  const options = { videoFoam: false };
  if (autoPlay) options.autoPlay = true;
  player.append(createWistiaIframe(id, options));
  block.replaceChildren(player);
  block.classList.add('embed-wistia-loaded');
}

/**
 * Poster play button in the media's own player colour (Wistia media settings, playerColor),
 * read once the block comes near the viewport; the CSS default is Wistia's default colour.
 */
function usePlayerColor(block, id) {
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((e) => e.isIntersecting)) return;
    observer.disconnect();
    fetch(`https://fast.wistia.com/embed/medias/${id}.json`)
      .then((resp) => (resp.ok ? resp.json() : null))
      .then((json) => {
        const color = json && json.media && json.media.embedOptions
          && json.media.embedOptions.playerColor;
        if (/^[0-9a-f]{6}$/i.test(color || '')) block.style.setProperty('--embed-wistia-color', `#${color}`);
      })
      .catch(() => {});
  }, { rootMargin: '400px' });
  observer.observe(block);
}

/**
 * Embed (wistia): Wistia video player from a media id or Wistia URL.
 * Cells: optional poster image + Wistia link (fast.wistia.net/embed/iframe/<id>,
 * *.wistia.com/medias/<id>) or a bare media id.
 * With a poster the player loads (and starts) on click, otherwise it loads
 * lazily when the block scrolls into view.
 * @param {Element} block
 */
export default function decorate(block) {
  const wistia = findWistia(block);
  if (!wistia) return;
  const poster = block.querySelector('picture');
  block.textContent = '';

  if (poster) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'embed-wistia-placeholder';
    button.setAttribute('aria-label', 'Play video');
    button.append(poster);
    const icon = document.createElement('span');
    icon.className = 'embed-wistia-play';
    button.append(icon);
    button.addEventListener('click', () => loadPlayer(block, wistia.id, true));
    block.append(button);
    usePlayerColor(block, wistia.id);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      loadPlayer(block, wistia.id, false);
    }
  }, { rootMargin: '200px' });
  observer.observe(block);
}
