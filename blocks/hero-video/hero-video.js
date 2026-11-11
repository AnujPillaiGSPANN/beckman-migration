import { findWistia, createWistiaIframe } from '../../scripts/wistia.js';

// background player: muted, looping autoplay without any chrome
const BACKGROUND_OPTIONS = {
  autoPlay: true,
  muted: true,
  silentAutoPlay: 'allow',
  endVideoBehavior: 'loop',
  playsinline: true,
  controlsVisibleOnLoad: false,
  playbar: false,
  playButton: false,
  bigPlayButton: false,
  smallPlayButton: false,
  volumeControl: false,
  fullscreenButton: false,
  settingsControl: false,
  playbackRateControl: false,
  qualityControl: false,
  copyLinkAndThumbnailEnabled: false,
  fitStrategy: 'cover',
  videoFoam: false,
};

/**
 * Hero (video): H1 + CTAs over a muted, looping Wistia background video.
 * Rows: [Wistia URL (+ optional poster image)] [H1 + CTA links].
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const media = document.createElement('div');
  media.className = 'hero-video-media';
  const content = document.createElement('div');
  content.className = 'hero-video-content';

  let videoId = null;
  rows.forEach((row) => {
    const wistia = findWistia(row);
    const hasText = row.querySelector('h1, h2, h3, h4, h5, h6');
    if (wistia && !hasText) {
      videoId = videoId || wistia.id;
      const poster = row.querySelector('picture');
      if (poster) media.append(poster);
    } else if (!hasText && row.querySelector('picture') && !row.textContent.trim()) {
      media.append(row.querySelector('picture'));
    } else {
      const cells = row.querySelectorAll(':scope > div');
      (cells.length ? [...cells] : [row]).forEach((cell) => content.append(...cell.childNodes));
    }
  });

  // CTA links in strong/em paragraphs are buttons (decorateButtons); keep plain links as CTAs too
  content.querySelectorAll('p > a:only-child, p > strong > a:only-child, p > em > a:only-child')
    .forEach((a) => a.closest('p').classList.add('hero-video-cta'));
  const ctas = [...content.querySelectorAll('.hero-video-cta')];
  if (ctas.length) {
    const group = document.createElement('div');
    group.className = 'hero-video-ctas';
    ctas[0].before(group);
    group.append(...ctas);
  }

  const poster = media.querySelector('img');
  if (poster) poster.loading = 'eager';

  block.textContent = '';
  block.append(media, content);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (videoId && !reduceMotion) {
    const frame = document.createElement('div');
    frame.className = 'hero-video-frame';
    const iframe = createWistiaIframe(videoId, BACKGROUND_OPTIONS, 'Background video');
    iframe.loading = 'eager';
    iframe.tabIndex = -1;
    iframe.setAttribute('aria-hidden', 'true');
    iframe.addEventListener('load', () => block.classList.add('hero-video-playing'));
    frame.append(iframe);
    media.append(frame);
  }
}
