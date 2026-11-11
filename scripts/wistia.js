/**
 * Wistia helpers shared by hero-video, columns-intro-video and embed-wistia.
 */

const WISTIA_HOST = /(^|\.)wistia\.(com|net)$|(^|\.)wi\.st$/i;
const WISTIA_ID = /^[a-z0-9]{10}$/i;

/**
 * Reads a Wistia media id from a URL or a bare id.
 * Supports fast.wistia.net/embed/iframe/<id>, *.wistia.com/medias/<id>,
 * fast.wistia.com/embed/medias/<id>.jsonp and wistia_async_<id>.
 * @param {string} value URL, class name or id
 * @returns {string|null} media id
 */
export function getWistiaId(value) {
  const str = (value || '').trim();
  if (!str) return null;
  if (WISTIA_ID.test(str)) return str;
  const async = str.match(/wistia_async_([a-z0-9]{10})/i);
  if (async) return async[1];
  try {
    const url = new URL(str);
    if (!WISTIA_HOST.test(url.hostname)) return null;
    const match = url.pathname.match(/\/(?:iframe|medias)\/([a-z0-9]{10})/i);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
}

/**
 * Finds the Wistia media id authored in an element: a link href, then the text.
 * @param {Element} el container
 * @returns {{ id: string, source: Element|null }|null}
 */
export function findWistia(el) {
  const links = [...el.querySelectorAll('a[href]')];
  const link = links.find((a) => getWistiaId(a.href));
  if (link) return { id: getWistiaId(link.href), source: link };
  const text = [...el.querySelectorAll('p, div')]
    .find((node) => !node.children.length && getWistiaId(node.textContent));
  if (text) return { id: getWistiaId(text.textContent), source: text };
  const own = getWistiaId(el.textContent);
  return own ? { id: own, source: null } : null;
}

/**
 * Builds a Wistia iframe.
 * @param {string} id media id
 * @param {Object} [options] Wistia embed options, appended as query parameters
 * @param {string} [title] accessible title
 * @returns {HTMLIFrameElement}
 */
export function createWistiaIframe(id, options = {}, title = 'Wistia video player') {
  const params = new URLSearchParams(Object.entries(options).map(([k, v]) => [k, String(v)]));
  const query = params.toString();
  const iframe = document.createElement('iframe');
  iframe.src = `https://fast.wistia.net/embed/iframe/${id}${query ? `?${query}` : ''}`;
  iframe.title = title;
  iframe.allow = 'autoplay; fullscreen; picture-in-picture';
  iframe.setAttribute('allowfullscreen', '');
  iframe.loading = 'lazy';
  return iframe;
}
