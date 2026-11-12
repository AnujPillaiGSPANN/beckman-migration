/* eslint-disable */
/* global WebImporter */

/**
 * Beckman cleanup transformer (all templates: air-particle-counters,
 * product-series, product-detail).
 *
 * Removes non-authorable site chrome (cookie banner, header, breadcrumbs,
 * footer, modals, overlays) and technical noise (scripts, styles, tracking,
 * injected inputs, slider chrome, Coveo widgets, empty spacers).
 *
 * Preserved on purpose:
 * - div.container.custome-container: only the breadcrumbs inside it are
 *   removed, because the same container holds the promo banner
 *   (#internalPromotionalBanners) and the product intro
 *   (div.product-intro-wrapper).
 * - main content wrappers (.product-content-wrap, .product-series-callouts
 *   and its parent, .bcls-aeo-faqs, .spotlight-content-wrapper).
 * - #product-table-wrapper is kept as an empty placeholder during
 *   beforeTransform so the product-detail section selector
 *   "div.spotlight-content-wrapper > div:has(#product-table-wrapper)" still
 *   matches; the placeholder is dropped in afterTransform.
 *
 * Empty-element cleanup never touches anything inside a block instance of
 * the current template (parsers decide what to keep there).
 *
 * Pages with their own mapping (template.pages[url], see the import scripts'
 * pageMapping) are matched with selectors written against the raw page
 * (":nth-of-type", ":has(> a[name=…])"). The import script resolves them AFTER
 * this transformer's beforeTransform, so on those pages every removal outside
 * the page's block targets is only marked (data-excat-drop) in beforeTransform
 * and carried out at the start of afterTransform; removals inside a block
 * target happen at once (the parser must not see the noise), and an element
 * that is or contains a block / section target is never removed.
 * Pages without an entry keep the original behaviour unchanged.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

const MEDIA = 'img, picture, video, iframe, svg, table, input, select, textarea, form, object, embed';
const DROP = 'data-excat-drop';
const COVEO_LINK = 'data-excat-coveo-link'; // in-page link to the removed Coveo models table
const MODELS_LINK = 'data-excat-models-link'; // … re-pointed at the page's models heading
const MODELS_HEADING = 'data-excat-models-heading';
const ICON_CLASS = 'data-excat-icon'; // Font Awesome class of a removed empty <i> icon

function safeAll(root, sel) {
  try {
    return Array.from(root.querySelectorAll(sel));
  } catch (e) {
    return [];
  }
}

function insideBlock(el, blocks) {
  return blocks.some((b) => b === el || b.contains(el));
}

/** Removal context: { defer, blocks, keep } (defer only on per-page-mapped pages). */
function drop(el, ctx) {
  if (!el || !el.parentNode) return;
  if (!ctx || !ctx.defer) {
    el.remove();
    return;
  }
  if (ctx.keep.some((k) => k === el || el.contains(k))) return;
  if (insideBlock(el, ctx.blocks)) el.remove();
  else el.setAttribute(DROP, '');
}

function removeAll(root, selectors, ctx) {
  selectors.forEach((sel) => safeAll(root, sel).forEach((n) => drop(n, ctx)));
}

/** origin + path without trailing slash (same key as the import scripts' pageMapping). */
function pageKey(u) {
  try {
    const { origin, pathname } = new URL(u);
    return `${origin}${pathname.replace(/\/$/, '')}`;
  } catch (e) {
    return u || '';
  }
}

function sourceUrl(payload) {
  return (payload && payload.params && payload.params.originalURL) || '';
}

/** This page's own mapping (template.pages[url]) or null. */
function pageMapping(template, url) {
  if (!url || !template || !template.pages) return null;
  const key = pageKey(url);
  const entry = Object.entries(template.pages).find(([u]) => pageKey(u) === key);
  return entry ? entry[1] : null;
}

/** Elements the import script will claim for the page's own block selectors. */
function ownBlockTargets(root, own) {
  const els = [];
  Object.values((own && own.blocks) || {}).forEach((sels) => {
    sels.forEach((sel) => {
      safeAll(root, sel).forEach((el) => {
        if (els.some((b) => b === el || b.contains(el) || el.contains(b))) return;
        els.push(el);
      });
    });
  });
  return els;
}

function ownSectionTargets(root, own) {
  return ((own && own.sections) || []).map((s) => (s.selector || [])
    .map((sel) => safeAll(root, sel)[0])
    .find(Boolean)).filter(Boolean);
}

function text(el) {
  return (el.textContent || '').replace(/[ ​\s]+/g, '');
}

function isEmpty(el) {
  return !text(el) && !el.querySelector(MEDIA);
}

/** Elements matched by the current template's block instance selectors (or the page's own). */
function blockInstances(root, template, url) {
  const own = pageMapping(template, url);
  if (own) return ownBlockTargets(root, own);
  const els = [];
  ((template && template.blocks) || []).forEach((block) => {
    (block.instances || []).forEach((sel) => {
      safeAll(root, sel).forEach((el) => {
        if (!els.includes(el)) els.push(el);
      });
    });
  });
  return els;
}

/** Coveo "Explore <product> Models" table: dynamic, empty in the snapshot. */
function stripCoveoProductTable(root, doc) {
  safeAll(root, '#product-table-wrapper').forEach((ptw) => {
    const host = ptw.closest('.CoveoSearchInterface') || ptw;
    const placeholder = doc.createElement('div');
    placeholder.id = 'product-table-wrapper';
    host.replaceWith(placeholder);
  });
}

/**
 * Coveo tech-docs widget: keep the "Technical Documents" heading and the
 * "Please view Technical Documents for <product> here." sentence + link.
 */
function simplifyTechDocs(root, doc) {
  safeAll(root, '#techdocs-wrapper').forEach((wrapper) => {
    const error = wrapper.querySelector('#coveo-techdocs-error');
    const center = wrapper.querySelector('#coveo-center-column');
    let p = null;
    if (error && text(error)) {
      p = doc.createElement('p');
      Array.from(error.childNodes).forEach((n) => p.append(n));
      // tidy leading/trailing whitespace in text nodes
      if (p.firstChild && p.firstChild.nodeType === 3) {
        p.firstChild.textContent = p.firstChild.textContent.replace(/^\s+/, '');
      }
      p.querySelectorAll('a[href]').forEach((a) => {
        a.setAttribute('href', a.getAttribute('href').replace(/ /g, '%20'));
      });
    }
    if (center) {
      if (p) center.replaceWith(p);
      else center.remove();
    } else if (p) {
      wrapper.append(p);
    }
    removeAll(wrapper, ['#coveo-techdocs-more-results', 'link']);
  });
}

/** Empty spacers / anchors / headings / tables outside block instances. */
function removeEmptyNoise(root, template, ctx, url) {
  const blocks = ctx && ctx.defer ? ctx.blocks : blockInstances(root, template, url);
  // per-page-mapped pages: empty lists too (e.g. <ul></ul> in the MET ONE 6000 intro)
  const sel = ctx && ctx.defer ? 'p, h1, h2, h3, h4, h5, h6, table, a, ul, ol' : 'p, h1, h2, h3, h4, h5, h6, table, a';
  const candidates = safeAll(root, sel);
  candidates.forEach((el) => {
    if (!el.isConnected || insideBlock(el, blocks)) return;
    if (el.tagName === 'A') {
      const href = (el.getAttribute('href') || '').trim();
      const deadHref = !href || href === 'null' || href === '#';
      if (deadHref && isEmpty(el)) drop(el, ctx);
      return;
    }
    if (isEmpty(el)) drop(el, ctx);
  });
  // empty AEO placeholder (#content-holder > .bcls-aeo-published)
  safeAll(root, '#content-holder, .bcls-aeo-published').forEach((el) => {
    if (el.isConnected && !insideBlock(el, blocks) && isEmpty(el)) drop(el, ctx);
  });
}

const INLINE = /^(EM|STRONG|B|I|U|SPAN|SUB|SUP|SMALL|FONT)$/;
const CONTAINERS = /^(DIV|SECTION|ARTICLE|BODY|MAIN)$/;
const LINE_BOXES = /^(P|LI|H[1-6])$/;
const isBlank = (n) => n.nodeType === 3 ? !n.textContent.trim() : n.nodeType === 8;

/** Nearest sibling of a <br> run in a direction, skipping blank text and other <br>s. */
function lineNeighbour(br, dir) {
  let n = br[dir];
  while (n && (isBlank(n) || n.nodeName === 'BR')) n = n[dir];
  return n;
}

/**
 * <br>s in default content (block tables are left alone). A <br> that ends / starts an inline
 * wrapper (e.g. "<em>Part number:<br></em>M2P-…", which the HTML-to-Markdown step drops) moves
 * out of it first. Then, in a paragraph / list item / heading, a <br> run that separates two
 * lines of text is kept and a leading or trailing run is dropped; <br>s directly in a bare
 * container (stray ones between paragraphs or blocks, e.g. the "<br><br><br>" between the
 * Vi-CELL BLU intro buttons) are dropped.
 */
function tidyLineBreaks(root) {
  const brs = safeAll(root, 'br').filter((br) => !br.closest('table'));
  brs.forEach((br) => {
    let parent = br.parentElement;
    while (parent && INLINE.test(parent.tagName)) {
      if (!lineNeighbour(br, 'nextSibling')) parent.after(br);
      else if (!lineNeighbour(br, 'previousSibling')) parent.before(br);
      else break;
      parent = br.parentElement;
    }
  });
  brs.forEach((br) => {
    const parent = br.parentElement;
    if (!parent) return;
    if (CONTAINERS.test(parent.tagName)) {
      br.remove();
      return;
    }
    if (!LINE_BOXES.test(parent.tagName)) return;
    const inline = (n) => n && (n.nodeType === 3 || INLINE.test(n.nodeName) || /^(A|IMG|PICTURE)$/.test(n.nodeName));
    if (!inline(lineNeighbour(br, 'previousSibling')) || !inline(lineNeighbour(br, 'nextSibling'))) br.remove();
  });
}

/**
 * Per-page-mapped pages, afterTransform: elements left empty once the deferred removals are
 * done, and stray <br>s (see tidyLineBreaks). Block tables are left alone.
 */
function removeEmptyLeftovers(root) {
  tidyLineBreaks(root);
  safeAll(root, 'p, h1, h2, h3, h4, h5, h6, ul, ol').reverse().forEach((el) => {
    if (el.isConnected && !el.closest('table') && isEmpty(el)) el.remove();
  });
  safeAll(root, 'a').forEach((a) => {
    const href = (a.getAttribute('href') || '').trim();
    if (a.closest('table') || !(!href || href === 'null' || href === '#') || !isEmpty(a)) return;
    a.remove();
  });
}

/** Heading id as generated by the importer (github-slugger style). */
function slug(textValue) {
  return textValue.trim().toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');
}

const HEADINGS = 'h1, h2, h3, h4, h5, h6';
const CHROME = '#mainNav, .footer2023, header, footer, #consent_blackbar';
const contentHeading = (h) => h.textContent.trim() && !h.closest(CHROME);

/** The heading inside the target, else the first heading that follows it. */
function firstHeadingNear(target) {
  if (target.matches(HEADINGS) && target.textContent.trim()) return target;
  const inside = safeAll(target, HEADINGS).find(contentHeading);
  if (inside) return inside;
  // eslint-disable-next-line no-bitwise
  return safeAll(target.ownerDocument, HEADINGS)
    .find((h) => contentHeading(h) && (target.compareDocumentPosition(h) & 4)) || null;
}

/**
 * In-page links (#id) point at wrapper ids that do not survive the import.
 * Re-point them at the id the importer gives the matching heading.
 */
function rewriteAnchors(root) {
  const doc = root.ownerDocument;
  const headings = safeAll(root, HEADINGS).filter(contentHeading);
  safeAll(root, 'a[href^="#"]').forEach((a) => {
    const id = decodeURIComponent(a.getAttribute('href').slice(1));
    if (!id) return;
    let target = doc.getElementById(id);
    if (!target) {
      target = safeAll(root, 'a[name]').find((n) => n.getAttribute('name') === id)
        || safeAll(root, '[class]').find((n) => n.classList.contains(id)) || null;
    }
    let heading = target ? firstHeadingNear(target) : null;
    if (!heading) {
      const label = a.textContent.trim().toLowerCase();
      heading = label && headings.find((h) => h.textContent.trim().toLowerCase().includes(label));
    }
    if (heading) a.setAttribute('href', `#${slug(heading.textContent)}`);
  });
}

/** Source buttons outside blocks: red = primary (<strong>), outlined = secondary (<em>). */
function markButtons(root, template, doc, url) {
  const blocks = blockInstances(root, template, url);
  safeAll(root, 'a > button.btn').forEach((btn) => {
    const a = btn.parentElement;
    if (insideBlock(a, blocks)) return;
    a.className = `${a.className} ${btn.className}`.trim();
    a.textContent = btn.textContent;
  });
  safeAll(root, 'a.btn').forEach((a) => {
    if (insideBlock(a, blocks) || a.closest('strong, em')) return;
    const outlined = /btn-(secondary|outline|white|default)/.test(a.className) && !/btn-red/.test(a.className);
    const wrap = doc.createElement(outlined ? 'em' : 'strong');
    a.replaceWith(wrap);
    wrap.append(a);
  });
}

/**
 * Click-to-zoom images: the inline <img> URL has no file extension and media.beckman.com
 * refuses it outside the source site; the zoom overlay links the same image as a .jpg.
 * Use that URL before the overlays are removed.
 */
function useZoomImageUrls(root) {
  const hasExt = (u) => /\.(jpe?g|png|gif|webp|svg)$/i.test((u || '').split('?')[0]);
  safeAll(root, '.container-overlay-full-width').forEach((box) => {
    const img = box.querySelector('img');
    const zoom = box.querySelector('[data-featherlight]');
    const full = zoom && zoom.getAttribute('data-featherlight');
    if (img && hasExt(full) && !hasExt(img.getAttribute('src'))) img.setAttribute('src', full);
  });
  // product (PIM) images: www.beckman.com/pimassets/… (and www.mybeckman.in/pimassets/…)
  // redirects to plytix-files.com, and AEM
  // asset upload fails on both. Reference a local copy, /images/pim/<image id>-<file name>
  // (download new ones from https://plytix-files.com/<path after /pimassets/> into
  // content/images/pim/ under that name).
  // (the live pages use site-relative /pimassets/… paths, the snapshots absolute ones)
  safeAll(root, 'img[src*="beckman.com/pimassets/"], img[src*="mybeckman.in/pimassets/"], img[src^="/pimassets/"], img[src*="plytix-files.com/"]').forEach((img) => {
    const parts = img.getAttribute('src').split('?')[0].split('/');
    const [id, file] = parts.slice(-2);
    if (id && file) img.setAttribute('src', `/images/pim/${id}-${file}`);
  });
}

/**
 * Linked images in default content: AEM text components cannot hold images, so a linked
 * image becomes an image paragraph followed by a paragraph with the bare link URL
 * (scripts.js joinLinkedImages turns the pair back into a linked image).
 * Images inside blocks (tables) and lists keep their link.
 */
function splitLinkedImages(root, doc) {
  safeAll(root, 'a[href]').forEach((a) => {
    if (a.closest('table, li') || a.textContent.trim()) return;
    const imgs = a.querySelectorAll('img');
    if (imgs.length !== 1) return;
    const parent = a.parentElement;
    const host = parent && parent.tagName === 'P' && !parent.textContent.trim()
      && parent.querySelectorAll('img').length === 1 ? parent : a;
    const href = a.getAttribute('href');
    const imgP = doc.createElement('p');
    imgP.append(imgs[0].closest('picture') || imgs[0]);
    const linkP = doc.createElement('p');
    const link = doc.createElement('a');
    link.setAttribute('href', href);
    link.textContent = href;
    linkP.append(link);
    host.replaceWith(imgP, linkP);
  });
}

/**
 * Document links: on upload to AEM, an absolute link to a document file without a query
 * string (any host, e.g. media.beckman.com or m2p-labs.com) is turned into a DAM asset
 * reference, which Edge Delivery does not serve (404). Beckman's other document links carry
 * ?…&country=XX and stay external, so give the bare ones the same country parameter.
 * Also: AEM escapes "&" in image alt text twice (screen readers read "&amp;"), so alts use "and".
 */
/**
 * Same-site page links → site-relative, as the importer does on live imports (snapshot imports
 * keep them absolute, which sent visitors to the live site). The import script then adds /in
 * for India pages. Files, media, gated downloads and the "Explore … Models" jumps into the live
 * Coveo models table stay absolute (they are not pages of this site).
 */
function relativizeSiteLinks(root, payload) {
  const source = (payload && payload.params && payload.params.originalURL) || '';
  let origin;
  try { ({ origin } = new URL(source)); } catch (e) { return; }
  safeAll(root, `a[href^="${origin}/"], a[href="${origin}"]`).forEach((a) => {
    const href = a.getAttribute('href');
    if (/#product-table-wrapper$/.test(href)) return;
    const u = new URL(href);
    if (/^\/(-\/media|gated-media|pimassets|sitecore)\b/i.test(u.pathname)) return;
    if (/\.[a-z0-9]{2,5}$/i.test(u.pathname) && !/\.html?$/i.test(u.pathname)) return;
    a.setAttribute('href', `${u.pathname}${u.search}${u.hash}` || '/');
  });
}

function keepDocumentLinksExternal(root, payload) {
  const source = (payload && payload.params && payload.params.originalURL) || '';
  const country = /mybeckman\.in/.test(source) ? 'IN' : 'US';
  safeAll(root, 'a[href^="https://"], a[href^="http://"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href.includes('?') || href.includes('#') || !/\.(pdf|docx?|xlsx?|pptx?|zip)$/i.test(href)) return;
    a.setAttribute('href', `${href}?country=${country}`);
  });
  safeAll(root, 'img[alt*="&"]').forEach((img) => {
    img.setAttribute('alt', img.getAttribute('alt').replace(/\s*&\s*/g, ' and '));
  });
}

/**
 * Page rules (source origin + path). Visibility of the intro CTAs and of the "Resources + Tools"
 * box is decided by the source site's CSS/JS, so it is recorded per page (see each page's
 * migration-work/pages/<slug>/authoring-analysis.json).
 * - introCtas: 'keep' = the intro "Explore … Models" / "Request a Quote" pair is visible;
 *   default = hidden duplicate
 * - resourceTools: 'list' = visible: label paragraph + list of links; 'drop' = hidden
 * - modelsHeading: heading that replaces the Coveo models table as the "Explore … Models" target
 *   (demoted to h2 when it is a second h1); without one, the visible "Explore … Models" links
 *   point at the live product page's table (<page URL>#product-table-wrapper)
 * - bannerAlt: alt text for the promo banner image (empty on the source)
 * - introCtas: 'quote' = the intro has only a visible "Request a Quote" next to a hidden
 *   "Explore … Models" link (Echo 21CFR11): drop the hidden link, keep the button
 * - jumpBar: 'drop' = every jump link is hidden (the bar renders as an empty band): drop the bar
 * - galleryAlt: alt text for the gallery images that carry the generic "Product Image - N" alt
 * - dropImages: image file names that 404 on the source too (broken there): the image is left
 *   out, so the card is emitted without one
 * - spacers: drop &nbsp;-only text between elements and empty <div>s outside blocks
 * - wrapImages: an <img> sitting directly in a container gets its own paragraph
 * - railCurrent: the rail's current-page link (li.active-nav) points at the site root on the
 *   source: re-point it at the page itself
 */
const PAGE_RULES = {
  'https://www.beckman.com/air-particle-counters/met-one-3400-plus': {
    introCtas: 'keep',
    resourceTools: 'list',
    bannerAlt: 'MET ONE 3400+ Software Update: Faster reviews. Stronger data integrity. Simpler fleet management.',
  },
  'https://www.beckman.com/air-particle-counters/met-one-6000': { introCtas: 'keep', resourceTools: 'list' },
  'https://www.beckman.com/air-particle-counters/facility-monitoring-system': { introCtas: 'keep', resourceTools: 'list' },
  'https://www.beckman.com/cell-counters-and-analyzers/vi-cell-blu': { resourceTools: 'drop' },
  'https://www.mybeckman.in/reagents/centrifugation/density-gradient-reagents': { resourceTools: 'list' },
  'https://www.mybeckman.in/supplies/microbioreactor-supplies/plate-covers/sealing-foil-basic': {
    introCtas: 'keep',
    modelsHeading: '#main > div.main-holder > div.bc-rich-text div.csc-default.is-header h1',
  },
  // hidden "Licenses" / "Request a Quote" pair dropped (default introCtas); the visible
  // "Explore Licenses" button and "Licenses" jump link point at the live Coveo licenses table
  'https://www.mybeckman.in/flow-cytometry/software/cytobank-enterprise': {
    resourceTools: 'list',
    galleryAlt: 'Cytobank Enterprise',
    dropImages: ['cytobank-enhanced-compute-analysis-c47410-2023-03.png'],
    spacers: true,
  },
  'https://www.mybeckman.in/liquid-handlers/software/echo/21-cfr-part-11-compliance-manager': {
    introCtas: 'quote',
    jumpBar: 'drop',
    resourceTools: 'list',
    galleryAlt: 'Echo 21CFR11 Compliance Manager',
    spacers: true,
  },
  'https://www.mybeckman.in/flow-cytometry/research-flow-cytometers/cytoflex/software': {
    spacers: true,
    wrapImages: true,
    railCurrent: true,
  },
};

/**
 * media.beckman.com images whose URL has no file extension: the bare URL is refused (403) outside
 * the source site, the same item with its real extension is served (checked with curl, content
 * type in brackets). Keyed by the lower-case /-/media/ path.
 */
const MEDIA_EXTENSIONS = {
  // vi-cell-blu: hero-promo icons [png], mobile image [png], integrations [jpg/png/jpg],
  // steps [jpg x4, png], hero-promo background in the inline CSS [png]
  '/-/media/vi-cell-blu/beckman-coulterlsvicell-blu-20comparable-data': 'png',
  '/-/media/vi-cell-blu/beckman-coulterlsvicell-blu-20gmp-copmpliant': 'png',
  '/-/media/vi-cell-blu/beckman-coulterlsvicell-blu-20scale-up': 'png',
  '/-/media/vi-cell-blu/beckman-coulterlsvicell-blu-20reliable-uptime': 'png',
  '/-/media/vi-cell-blu/element-34': 'png',
  '/-/media/vi-cell-blu/banner-darker': 'png',
  '/-/media/beckman/site_promotion_banners/promotional-cards/vi-cell-ambr-integration': 'jpg',
  '/-/media/japan-team/landing-pages/nucleic-acid-sample-preparation/biomek': 'png',
  '/-/media/cell-sorters-counters-and-analyzers/media/vi-cell-blu-with-seg-flow-s3-and-sample-mod-2022-08': 'jpg',
  '/-/media/ppcs/vi-cell-blu_2025/cell-counting-vi-cell-blu-pipette-tube-lab-201712': 'jpg',
  '/-/media/ppcs/vi-cell-blu_2025/cell-counting-vi-cell-blu-home-screen-lab-201712': 'jpg',
  '/-/media/ppcs/vi-cell-blu_2025/cell-counting-vi-cell-blu-lab-walk-away-201712': 'jpg',
  '/-/media/ppcs/vi-cell-blu_2025/cell-counting-vi-cell-blu-carousel-load-201712': 'jpg',
  '/-/media/cell-sorters-counters-and-analyzers/cell-analyzers/instruments/vi-cell-blu/product-images/cell-viability-vi-cell-blu-plate-no-becls-logo-202608': 'png',
  // density-gradient-reagents workflow tiles [png]
  '/-/media/landing-page-support-images/centrifugation/dgu-workflow/density-gradient-media-optimate': 'png',
  '/-/media/landing-page-support-images/centrifugation/dgu-workflow/optimate-workflow': 'png',
  '/-/media/landing-page-support-images/centrifugation/dgu-workflow/optima-xpn-workflow': 'png',
  '/-/media/landing-page-support-images/centrifugation/dgu-workflow/optixtract-workflow': 'png',
  // echo-acoustic "Explore Applications" tile 7: www.beckman.com/liquid-handlers/-/media//<id>.ashx
  // (bot-protected host) is served by media.beckman.com as /-/media/<id>.jpg [jpeg]
  '/-/media/2ec0cf3fc1234c05b2ea2035704e8343': 'jpg',
};

/** Working URL for an extension-less / .ashx media URL listed above, else null. */
function mediaUrlWithExtension(url) {
  const m = /^https?:\/\/(?:media\.beckman\.com|www\.beckman\.com(?:\/[^?#]*?)?)(\/-\/media\/+[^?#]+?)(\.ashx)?(\?[^#]*)?$/i.exec(url || '');
  if (!m) return null;
  const path = m[1].replace(/\/-\/media\/+/, '/-/media/');
  const ext = MEDIA_EXTENSIONS[path.toLowerCase()];
  if (!ext || (/\.[a-z0-9]+$/i.test(path) && !m[2])) return null;
  return `https://media.beckman.com${path}.${ext}${m[3] || ''}`;
}

function fixMediaExtensions(root) {
  safeAll(root, 'img[src]').forEach((img) => {
    const fixed = mediaUrlWithExtension(img.getAttribute('src'));
    if (fixed) img.setAttribute('src', fixed);
  });
  const fixCss = (css) => css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (all, q, u) => {
    const fixed = mediaUrlWithExtension(u.replace(/&quot;/g, ''));
    return fixed ? `url(${q}${fixed}${q})` : all;
  });
  safeAll(root, '[style*="url("]').forEach((el) => el.setAttribute('style', fixCss(el.getAttribute('style'))));
  safeAll(root, 'style').forEach((s) => {
    if (/url\(/.test(s.textContent)) s.textContent = fixCss(s.textContent);
  });
}

/**
 * Link fixes: gated-media hrefs carry a raw {GUID} (percent-encode the braces); Sitecore
 * component paths (…/<page>/page-components/…) point at the page itself.
 */
function fixLinks(root) {
  safeAll(root, 'a[href*="{"], a[href*="}"]').forEach((a) => {
    a.setAttribute('href', a.getAttribute('href').replace(/\{/g, '%7B').replace(/\}/g, '%7D'));
  });
  safeAll(root, 'a[href*="/page-components/"]').forEach((a) => {
    a.setAttribute('href', a.getAttribute('href').replace(/\/page-components\/[^?#]*/, ''));
  });
}

/** Jump-link bar (#intrenal-page-link-wrapper > div > a…): one paragraph per visible link. */
function splitJumpLinks(root, doc, ctx) {
  safeAll(root, '#intrenal-page-link-wrapper a[style*="display: none"], #intrenal-page-link-wrapper a[style*="display:none"]')
    .forEach((a) => drop(a, ctx));
  safeAll(root, '#intrenal-page-link-wrapper > div').forEach((bar) => {
    Array.from(bar.children).forEach((a) => {
      if (a.tagName !== 'A' || a.hasAttribute(DROP)) return;
      a.classList.remove('active');
      if (!a.className) a.removeAttribute('class');
      a.textContent = a.textContent.trim();
      const p = doc.createElement('p');
      a.replaceWith(p);
      p.append(a);
    });
  });
}

/**
 * In-page links to the removed Coveo models table: re-point at the page's models heading
 * (rules.modelsHeading), else at the models table of the live product page
 * (<source page>#product-table-wrapper). The visible intro button becomes a paragraph with
 * only <em><a>label</a></em> (secondary button). Hidden links were dropped before this runs.
 */
function handleCoveoLinks(root, doc, rules, ctx, url) {
  const heading = rules.modelsHeading ? safeAll(root, rules.modelsHeading)[0] : null;
  if (heading) {
    let h = heading;
    if (h.tagName === 'H1' && safeAll(root, 'h1').indexOf(h) > 0) {
      h = doc.createElement('h2');
      Array.from(heading.childNodes).forEach((n) => h.append(n));
      heading.replaceWith(h);
    }
    h.setAttribute(MODELS_HEADING, '');
  }
  safeAll(root, `a[${COVEO_LINK}]`).forEach((a) => {
    a.removeAttribute(COVEO_LINK);
    if (a.hasAttribute(DROP)) return;
    if (heading) a.setAttribute(MODELS_LINK, '');
    else a.setAttribute('href', `${pageKey(url)}#product-table-wrapper`);
    if (a.classList.contains('product-table-link-btn')) {
      // visible outline button in the intro: <p><em><a>label</a></em></p>
      const label = a.textContent.trim();
      a.textContent = label;
      a.removeAttribute('class');
      const em = doc.createElement('em');
      a.replaceWith(em);
      em.append(a);
      if (!em.parentElement || em.parentElement.tagName !== 'P') {
        const p = doc.createElement('p');
        em.replaceWith(p);
        p.append(em);
      }
    }
  });
}

/** afterTransform: models links -> the id the importer gives the models heading (deduplicated). */
function pointModelsLinks(root) {
  const target = root.querySelector(`[${MODELS_HEADING}]`);
  const links = safeAll(root, `a[${MODELS_LINK}]`);
  links.forEach((a) => a.removeAttribute(MODELS_LINK));
  if (!target) {
    links.forEach((a) => a.remove());
    return;
  }
  target.removeAttribute(MODELS_HEADING);
  const id = slug(target.textContent);
  const before = safeAll(root, HEADINGS).filter((h) => h.textContent.trim()
    && slug(h.textContent) === id && h !== target
    // eslint-disable-next-line no-bitwise
    && (h.compareDocumentPosition(target) & 4));
  const href = `#${id}${before.length ? `-${before.length}` : ''}`;
  links.forEach((a) => a.setAttribute('href', href));
}

/** Intro "Resources + Tools" box: label paragraph + list of links (or dropped when hidden). */
function resourceTools(root, doc, rules, ctx, url) {
  safeAll(root, 'div.resource-tool-table-wrapper').forEach((box) => {
    if (rules.resourceTools === 'drop') {
      drop(box, ctx);
      return;
    }
    if (rules.resourceTools !== 'list') return;
    const label = box.querySelector('.resource-tool-table-links-heading');
    const p = doc.createElement('p');
    p.textContent = label ? label.textContent.trim() : '';
    const ul = doc.createElement('ul');
    safeAll(box, '.resource-tool-table-links-wrapper a').forEach((a) => {
      const li = doc.createElement('li');
      const link = doc.createElement('a');
      // an empty href reloads the page itself on the source
      link.setAttribute('href', (a.getAttribute('href') || '').trim() || url);
      link.textContent = a.textContent.trim();
      li.append(link);
      ul.append(li);
    });
    box.replaceWith(...(p.textContent ? [p] : []), ul);
  });
}

/** Sealing Foil Basic: legacy m2p-labs product block (product family nav, slider, download box). */
function legacyM2pBlock(root, doc, ctx) {
  safeAll(root, 'nav.product-detail-nav').forEach((nav) => {
    const ul = nav.querySelector('ul');
    if (!ul) return;
    safeAll(ul, 'li').forEach((li) => li.removeAttribute('class'));
    safeAll(ul, 'a').forEach((a) => { a.textContent = a.textContent.trim(); });
    nav.replaceWith(ul);
  });
  // broken slider (relative lazy images that 403/404) with a duplicate "Request a Quote"
  removeAll(root, ['section.product-detail-content-section-slider'], ctx);
  safeAll(root, 'a.is-call-to-action').forEach((a) => {
    const label = a.querySelector('.btn-text');
    if (label) a.textContent = label.textContent.trim();
  });
  safeAll(root, 'a.download-box').forEach((a) => {
    if (!a.textContent.trim()) drop(a, ctx);
  });
  [['.download-box-title', 'link'], ['.download-box-size', 'text'], ['.download-box-button', 'link']]
    .forEach(([sel, kind]) => safeAll(root, sel).forEach((box) => {
      const a = box.querySelector('a');
      const p = doc.createElement('p');
      if (kind === 'link' && a) {
        const link = doc.createElement('a');
        link.setAttribute('href', a.getAttribute('href'));
        link.textContent = a.textContent.trim();
        p.append(link);
      } else {
        p.textContent = box.textContent.replace(/\s+/g, ' ').trim();
      }
      box.replaceWith(p);
    }));
}

const NBSP_ONLY = /^[\s\u00a0\u200b]*$/;

/** Page rules added for the batch-4 India pages (see PAGE_RULES); beforeTransform. */
function pageCleanupRules(root, doc, rules, ctx, url) {
  if (rules.galleryAlt) {
    safeAll(root, '.product-gallery-carousel img').forEach((img) => {
      const alt = (img.getAttribute('alt') || '').trim();
      if (!alt || /^Product Image - \d+$/i.test(alt)) img.setAttribute('alt', rules.galleryAlt);
    });
  }
  (rules.dropImages || []).forEach((file) => {
    safeAll(root, 'img[src]').forEach((img) => {
      // the PIM copy is already renamed <image id>-<file> (useZoomImageUrls) at this point
      const name = img.getAttribute('src').split('?')[0].split('/').pop();
      if (name === file || name.endsWith(`-${file}`)) drop(img, ctx);
    });
  });
  if (rules.railCurrent) {
    safeAll(root, '.rail-navigation li.active-nav > a[href]').forEach((a) => {
      let path = '';
      try { path = new URL(a.getAttribute('href'), url).pathname; } catch (e) { return; }
      if (path === '/' || path === '') a.setAttribute('href', pageKey(url));
    });
  }
  if (rules.jumpBar === 'drop') removeAll(root, ['#intrenal-page-link-wrapper'], ctx);
  if (rules.introCtas === 'quote') removeAll(root, ['div.rt-holder a.product-table-link-btn'], ctx);
  if (rules.wrapImages) {
    safeAll(root, 'img').forEach((img) => {
      const parent = img.parentElement;
      if (!parent || !CONTAINERS.test(parent.tagName) || insideBlock(img, ctx.blocks)) return;
      const p = doc.createElement('p');
      img.replaceWith(p);
      p.append(img);
    });
  }
  if (rules.spacers) {
    // &nbsp;-only text directly in a container (e.g. after the CytExpert screenshot / tables)
    safeAll(root, 'div, section, article').forEach((el) => {
      if (insideBlock(el, ctx.blocks)) return;
      Array.from(el.childNodes).forEach((n) => {
        if (n.nodeType === 3 && /\u00a0/.test(n.textContent) && NBSP_ONLY.test(n.textContent)) n.remove();
      });
    });
    // empty divs (e.g. the "&nbsp;&nbsp;" spacer between the Cytobank intro buttons,
    // div.row.js-component, the empty container after the content wrapper)
    safeAll(root, 'div').reverse().forEach((el) => {
      if (el.isConnected && !insideBlock(el, ctx.blocks) && isEmpty(el)) drop(el, ctx);
    });
  }
}

/** Rules for pages with their own mapping (template.pages[url]); beforeTransform. */
function perPageRules(root, doc, ctx, url) {
  const rules = PAGE_RULES[pageKey(url)] || {};
  pageCleanupRules(root, doc, rules, ctx, url);
  // gallery slides: drop the href="#" zoom wrapper around the image (the parser does the same)
  safeAll(root, '.product-gallery-carousel a[href="#"]').forEach((a) => {
    if (a.querySelector('img')) a.replaceWith(...Array.from(a.childNodes));
  });
  // outlined text links styled as buttons (vi-cell-blu "Download Product Brochure")
  safeAll(root, 'a.redbtn').forEach((a) => {
    if (insideBlock(a, ctx.blocks) || a.closest('strong, em')) return;
    const em = doc.createElement('em');
    a.replaceWith(em);
    em.append(a);
  });
  if (rules.bannerAlt) {
    safeAll(root, '#internalPromotionalBanners img').forEach((img) => {
      if (!(img.getAttribute('alt') || '').trim()) img.setAttribute('alt', rules.bannerAlt);
    });
  }
  // intro CTAs: hidden duplicates, or visible with a dead "Explore … Models" jump
  if (rules.introCtas !== 'keep' && rules.introCtas !== 'quote') {
    removeAll(root, ['div.rt-holder > div:has(> a.product-table-link-btn)'], ctx);
  }
  safeAll(root, '.product-table-link-btn i, .product-table-link-btn .fa').forEach((i) => i.remove());
  safeAll(root, `a.btn[${COVEO_LINK}]`).forEach((a) => {
    safeAll(a, 'i, .fa').forEach((i) => i.remove());
    a.textContent = a.textContent.replace(/\s+/g, ' ').trim();
  });
  splitJumpLinks(root, doc, ctx); // marks the hidden jump links first
  handleCoveoLinks(root, doc, rules, ctx, url);
  resourceTools(root, doc, rules, ctx, url);
  legacyM2pBlock(root, doc, ctx);
  // Coveo filter UI / pager of the "Content and Resources" list; Bing UET tracking beacon
  removeAll(root, ['#multiselect__container', '#resource-table-pagination', 'div[id^="batBeacon"]', 'img[src*="bat.bing.com/"]'], ctx);
  // inline <style>/<script> inside content (e.g. density "WORKFLOW STYLES" in a bc-rich-text)
  removeAll(root, ['style', 'script', 'noscript', 'link'], ctx);
}

export default function transform(hookName, element, payload) {
  const doc = element.ownerDocument || document;
  const template = payload && payload.template;
  const url = sourceUrl(payload);
  const own = pageMapping(template, url);

  // runs on the original page (before the importer drops empty <a id/name> targets)
  if (hookName === 'preprocess') {
    // remember links to the Coveo models table before they are re-pointed at its heading
    if (own) safeAll(element, 'a[href="#product-table-wrapper"]').forEach((a) => a.setAttribute(COVEO_LINK, ''));
    // the importer drops empty <i> icons before transform: keep each Content and Resources
    // row's Font Awesome icon class for the cards-doclist parser (pdf / video)
    safeAll(element, '.content-resource-list-child').forEach((item) => {
      const icon = item.querySelector('.content-resource-list-icon [class*="fa-"]');
      if (icon) item.setAttribute(ICON_CLASS, icon.getAttribute('class'));
    });
    rewriteAnchors(element);
    return;
  }

  if (hookName === H.before) {
    // per-page-mapped pages: removals outside the page's blocks wait for afterTransform
    const ctx = own ? {
      defer: true,
      blocks: ownBlockTargets(element, own),
      keep: [...ownBlockTargets(element, own), ...ownSectionTargets(element, own)],
    } : null;
    fixMediaExtensions(element);
    fixLinks(element);
    markButtons(element, template, doc, url);
    useZoomImageUrls(element);
    if (own) perPageRules(element, doc, ctx, url);

    // Chrome that could interfere with block matching
    const chrome = [
      '#consent_blackbar', // TrustArc cookie banner
      '#mainNav', // global header
      // breadcrumbs only: the same container also holds the promo banner
      // (category pages) and the product intro (product detail pages)
      'div.block-holder:has(> nav.breadcrumbs)',
      'nav.breadcrumbs',
      'div.series-category-promotional-wrapper', // empty spacer
      'div.footer2023', // footer
      'ul.footerOpcoLogoLinks',
      '#ModalPopup', // access-restricted login modal
      'div.flash-message',
      'div.MaskOverlay',
      'div.MobileHeaderOverlay',
      'a.skip-to-main-content-link',
      'input#userId',
      'input#contextItemId',
      // hidden Marketo helper form / cross-domain iframe at body level
      'body > form.mktoForm:not([id])',
      'iframe#MktoForms2XDIframe',
      // injected / context inputs (browser extensions, Coveo context)
      '#hippowiz-ass-injected',
      '#hvmessage-toextension-listener',
      'input[id^="context-"][type="hidden"]',
      // hero video overlay + duplicate small-screen CTA label (product-series)
      '.color-overlay',
      'p.smallscreenbutton',
      // slider chrome: slick clones + arrows, gallery prev/next arrows
      '.slick-cloned',
      '.slick-arrow',
      'button.related-part__prev',
      'button.related-part__next',
      '.product-gallery-carousel a.btn-prev',
      '.product-gallery-carousel a.btn-next',
      // hidden duplicate CTAs in the product intro ("Explore ... Models" /
      // "Request a Quote") on product-detail pages
      'div.rt-holder > div:has(> a.product-table-link-btn)',
      // click-to-zoom overlays on images
      '.container-overlay-full-width > .overlay',
      'div.overlay:has(> a[title="Zoom"])',
    ];
    // per-page-mapped pages decide on the intro CTAs in perPageRules
    removeAll(element, own ? chrome.filter((sel) => !sel.startsWith('div.rt-holder')) : chrome, ctx);

    stripCoveoProductTable(element, doc);
    simplifyTechDocs(element, doc);

    // stray inputs outside forms (forms belong to embed blocks)
    safeAll(element, 'input').forEach((input) => {
      if (!input.closest('form')) drop(input, ctx);
    });

    removeEmptyNoise(element, template, ctx, url);
  }

  if (hookName === H.after) {
    // removals deferred on per-page-mapped pages (see beforeTransform)
    safeAll(element, `[${DROP}]`).forEach((el) => el.remove());
    removeAll(element, [
      'header',
      'footer',
      'nav',
      'script',
      'style',
      'noscript',
      'iframe',
      'link',
      'object',
      'embed',
      'input',
    ]);

    // Coveo placeholder kept only for section matching
    safeAll(element, '#product-table-wrapper').forEach((el) => {
      if (isEmpty(el)) el.remove();
    });

    splitLinkedImages(element, doc);
    keepDocumentLinksExternal(element, payload);
    fixLinks(element); // hrefs written by parsers
    relativizeSiteLinks(element, payload);
    if (own) {
      pointModelsLinks(element);
      removeEmptyLeftovers(element);
    }

    // Strip tracking / analytics attributes
    element.querySelectorAll('*').forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const n = attr.name.toLowerCase();
        if (
          n.startsWith('data-gtm')
          || n.startsWith('data-track')
          || n.startsWith('data-analytics')
          || n === 'onclick'
          || n === 'onload'
        ) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }
}
