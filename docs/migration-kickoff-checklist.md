# Migration kick-off checklist

Answer these with the client and the project lead **before scoping a site**. Give the answers as rules when
the scope starts ("scope site <url>" plus the rules); they are saved with the catalog
(`catalog/review-instructions.md`), and the scope and its review follow them, so the review asks far less.
Leave an answer empty when it is not known yet: it becomes an Open item in the decision log.

Owners: **C** client / product owner · **A** solution architect / dev lead (with an author) · **T** tech lead + client IT.

## 1. Scope — which pages are in (C)

| # | Question | Typical answer | Answer |
|---|---|---|---|
| 1.1 | Pages generated from product data (one page per part / SKU number): migrate, keep on the old site, or feed from data? | Leave out; decide separately | |
| 1.2 | Search results, sign-in / account, shop (cart, orders) pages | Leave out | |
| 1.3 | Form-only pages (request a quote, contact forms, consent / privacy forms) | Leave out or embed the form | |
| 1.4 | Campaign / landing pages (paid campaigns, events, webinars, thank-you pages) | In, or only current ones | |
| 1.5 | Old content (news, events, campaigns older than N years) | Leave out or archive | |
| 1.6 | Other languages / countries on the same site | In / out per locale | |
| 1.7 | Interactive tools (calculators, configurators, apps) | Keep on the old site and link, or embed | |
| 1.8 | Documents (PDFs) | Keep linking to the existing URLs | |

## 2. Content model — how pages are built (A)

| # | Question | This project's rule | Answer |
|---|---|---|---|
| 2.1 | Blocks are one block per family with variants (never page-specific blocks) | Yes — AGENTS.md, `npm run lint:blocks` | |
| 2.2 | Breadcrumbs: built from the page location or authored? | Built (page text, not imported) | |
| 2.3 | In-page jump tabs / anchor bars: a block or page text in a section style? | Page text, anchor-tabs section style | |
| 2.4 | Header / footer chrome found inside page content (sign-in bar, country switcher) | Page chrome, not imported | |
| 2.5 | Article + side rail (links, lead form) page bodies | Sidebar section: page text + Embed (marketo) | |
| 2.6 | Text-only pages (terms, protocols, references) | Page text, no blocks | |
| 2.7 | Section backgrounds and text colours | Section style (section metadata), never a block variant | |
| 2.8 | Image beside text | Media Split | |

## 3. Technical — data and integrations (T)

| # | Question | Notes | Answer |
|---|---|---|---|
| 3.1 | Live search / product data (e.g. Coveo): will the source allow the new domains (CORS + token), or will the site go live on the same domain with the API routed? | Without it, live lists cannot load on AEM | |
| 3.2 | Shop data (prices, availability, add to quote / cart) | Same question as 3.1 | |
| 3.3 | Forms (Marketo or other): form ids, thank-you pages, tracking | Embed blocks | |
| 3.4 | Videos (Wistia, YouTube, Vimeo) | Embed blocks | |
| 3.5 | Bot protection on the source site: capture route, and which language/country version it serves | Check captures are the right locale | |
| 3.6 | Fonts and their licence domains (new preview / live domains) | | |
| 3.7 | Content source (AEM author / Document Authoring) and who uploads / publishes | | |
| 3.8 | Redirects from old URLs, SEO metadata, analytics | Before go-live | |

## After scoping

The review writes its open questions to a decision log (`migration-work/scope/decision-log.md`) instead of
asking them one by one: each with links to its pictures in the Plan, a recommendation, the impact of changing
it later, and its owner. Fill it in offline, hand it back, and the answered items are applied to the catalog
and saved as rules; Open items stay as they are and come back in the next review.
