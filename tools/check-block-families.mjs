#!/usr/bin/env node
/**
 * Block structure check (npm run lint:blocks). This project organises blocks as families with
 * variants (see AGENTS.md): a look of an existing block is a variant of its family, never a
 * page-specific block of its own. Fails when:
 * - a block folder is named like a family variant (e.g. blocks/cards-whitepaper);
 * - a block folder is neither a family nor a listed standalone block (a new standalone block is
 *   added to STANDALONE below on purpose, after checking it fits no family);
 * - a family's dispatcher (VARIANTS in blocks/<family>/<family>.js), its variant files
 *   (blocks/<family>/variants/<variant>.{js,css}) and its model's variant select disagree;
 * - a variant or block option is not a single lower-case word (AEM splits hyphenated options).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const BLOCKS = path.join(ROOT, 'blocks');

export const FAMILIES = ['accordion', 'cards', 'carousel', 'embed', 'hero', 'table'];
// Standalone blocks: Columns-based blocks (AEM drops the name of blocks starting with
// "columns", so they cannot be family variants), site chrome and boilerplate blocks.
export const STANDALONE = [
  'columns', 'feature-modules', 'intro-box', 'intro-video', 'media-split',
  'footer', 'header', 'form', 'fragment', 'modal', 'quote', 'search', 'tabs', 'video',
];
// options that predate the rule (boilerplate table block); do not add to this list
const LEGACY_OPTIONS = ['no-header'];

const problems = [];
const fail = (msg) => problems.push(msg);
const word = /^[a-z][a-z0-9]*$/;

const dirs = fs.readdirSync(BLOCKS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
dirs.forEach((name) => {
  if (FAMILIES.includes(name) || STANDALONE.includes(name)) return;
  const family = FAMILIES.find((f) => name.startsWith(`${f}-`));
  if (family) {
    fail(`blocks/${name}: a look of "${family}" must be a variant of the ${family} family `
      + `(blocks/${family}/variants/${name.slice(family.length + 1).replace(/-/g, '')}.{js,css}), not its own block`);
  } else {
    fail(`blocks/${name}: unknown block. If it fits a family, make it a variant; if it is truly `
      + 'standalone, add it to STANDALONE in tools/check-block-families.mjs and to AGENTS.md');
  }
});

FAMILIES.forEach((family) => {
  const dir = path.join(BLOCKS, family);
  if (!fs.existsSync(dir)) { fail(`blocks/${family}: family block missing`); return; }
  const js = fs.readFileSync(path.join(dir, `${family}.js`), 'utf8');
  const body = js.match(/const VARIANTS = \{([\s\S]*?)\};/);
  if (!body) { fail(`blocks/${family}/${family}.js: no VARIANTS map (the family dispatcher)`); return; }
  const variants = [...body[1].matchAll(/^\s*'?([a-z0-9-]+)'?\s*:/gm)].map((m) => m[1]);

  const files = fs.existsSync(path.join(dir, 'variants')) ? fs.readdirSync(path.join(dir, 'variants')) : [];
  const fileVariants = [...new Set(files.map((f) => f.replace(/\.(js|css)$/, '')))].filter((v) => v !== 'default');
  ['default', ...variants].forEach((v) => {
    ['js', 'css'].forEach((ext) => {
      if (!files.includes(`${v}.${ext}`)) fail(`blocks/${family}/variants/${v}.${ext}: missing`);
    });
  });
  fileVariants.filter((v) => !variants.includes(v))
    .forEach((v) => fail(`blocks/${family}/variants/${v}.*: not registered in VARIANTS of ${family}.js`));

  let model;
  try {
    const def = JSON.parse(fs.readFileSync(path.join(dir, `_${family}.json`), 'utf8'));
    model = def.models.find((m) => m.id === family);
  } catch (e) {
    fail(`blocks/${family}/_${family}.json: ${e.message}`);
    return;
  }
  const opts = (field) => (model?.fields.find((f) => f.name === field)?.options || [])
    .map((o) => o.value).filter(Boolean);
  const selectable = opts('classes');
  variants.filter((v) => !selectable.includes(v))
    .forEach((v) => fail(`blocks/${family}/_${family}.json: variant "${v}" missing from the classes select`));
  selectable.filter((v) => !variants.includes(v))
    .forEach((v) => fail(`blocks/${family}/_${family}.json: classes option "${v}" has no VARIANTS entry`));
  [...variants, ...opts('classes_options')].filter((v) => !word.test(v) && !LEGACY_OPTIONS.includes(v))
    .forEach((v) => fail(`blocks/${family}: option "${v}" must be one lower-case word (AEM splits hyphenated options)`));
});

if (problems.length) {
  console.error(`Block structure check failed (${problems.length}):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
  console.error('See AGENTS.md, "Blocks: families with variants".');
  process.exit(1);
}
console.log(`Block structure OK: ${FAMILIES.length} families, ${STANDALONE.length} standalone blocks.`);
