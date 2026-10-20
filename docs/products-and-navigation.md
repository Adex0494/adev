# Company, products and navigation — 2026-10-20

Baseline: `742c2ef65d6a2429d29ccaf9fdcb62a937ffce21`, clean `master`.
Publication uses a normal commit and push to `origin/master`; Vercel's existing
GitHub integration builds AKDEVIA automatically. The release SHA and deployment
URL are recorded in the delivery report. No MEDIKA code, configuration or data
is changed by this release.

## Information architecture

Previously the homepage included a MEDIKA hero preview, flagship card and full
case study/gallery, followed by process, About and contact. Now it presents the
company first: hero, services, one flagship product card, About, process, contact.
The hero communicates useful outcomes; About and the product card no longer
advertise a general technology stack. There are no placeholder products or
invented business statistics.

- `/`: AKDEVIA company homepage.
- `/products/medika`: MEDIKA product detail and case study. Implemented as an
  App Router page at `src/app/products/medika/page.tsx`. Future products can add
  sibling static routes without introducing a CMS.
- `/medika`: independent interactive demo, using the unchanged external rewrites.

The flagship card links to the product page through **Explore MEDIKA**, and
separately to `/medika` through **Launch live demo**. It retains one existing
patient-history screenshot and a concise business summary. All four detailed
screenshots, challenge/solution copy and engineering content live on the product
page. Next/Image reuses the existing 1440 × 900 WebP assets without duplication:
patients, patient history, consultation and reports. Alternating editorial rows
become stacked figures on smaller screens, with translated alt text, responsive
sizes, lazy loading and full-size accessible links.

The product page contains a hero, overview, challenge, solution, screenshot
gallery, capabilities, secondary engineering section and brand/demo CTA.
Capabilities were checked against MEDIKA's implemented source screens: patients,
waiting room, active consultations, clinical history, diagnoses, prescriptions,
medical documents, templates, reports, attachments and doctor/secretary workflows.
Its package manifest, source and established deployment verify Next.js, React,
TypeScript, Supabase/PostgreSQL, Tailwind CSS and Vercel. No patient records were
accessed to verify these claims. No healthcare compliance or outcome claims added.

## Active navigation and accessibility

`useActiveSection` uses IntersectionObserver with a one-pixel reading band 24px
below the measured header bar. A single geometry pass selects the last section
above that line, including after fast jumps. Window resize and ResizeObserver
rebuild the band; all observers/listeners are cleaned up. There is no global
scroll listener, extra tracking library or active-state animation.

Services, Work, About and Contact receive purple text, a persistent underline
and stronger weight. The hero has no active item because Home is represented
by the logo. Process continues the About state until Contact becomes current.
Section links use `aria-describedby` with localized “Current section” text,
without `aria-current`. Product routes mark Work with `aria-current="page"`.
The mobile menu uses the same states, closes on selection and returns keyboard
focus appropriately; Escape returns focus to its toggle. Existing focus rings,
skip link, 6rem anchor clearance and reduced-motion scrolling remain in use.

## Language, links and metadata

Internal Next/Link URLs carry `?lang=en|es`, preserving even automatically chosen
languages without requiring a saved cookie. Header and footer section links from
the product page return to the localized homepage and its section. The logo and
explicit Back to AKDEVIA link also return home. Demo links remain ordinary anchors
for document navigation across zones; MEDIKA keeps its own locale architecture.

The locale provider stays mounted between marketing routes. Switching language
updates content, URL, labels, image alt text and metadata without a document
refresh. URL normalization preserves `history.state`, including Next's route
snapshot before its history patch mounts, so Back works after direct links.
The proxy now matches `/` and `/products/:path*`, never `/medika`.

The product has localized title, description, Open Graph/Twitter metadata and
EN/ES/x-default alternates. Its canonical is
`https://akdevia.com/products/medika`. The sitemap includes this product and its
language alternates. Existing `/medika` robots exclusions are unchanged.

## Validation

- `npm test`: 38 files, 234 tests passed; coverage, lint, typecheck and production
  build also passed. Tests cover all section states, route state, product/home
  content boundaries, localized URLs, metadata, sitemap and history preservation.
- Chromium/Playwright: both pages at 320, 375, 430, 768, 1024 and 1440px in EN/ES
  and light/dark (48 combinations); no overflow, broken images or console errors.
  Checked mobile selection/Escape/focus, fast jumps, resize, cross-route section
  links, saved language, instant switching and browser Back.
- axe-core: 16 mobile/desktop, locale and theme cases, including open mobile menus;
  no WCAG A/AA violations detected. Desktop/mobile screenshots visually reviewed.
- Verification tools and captures remain in the OS temporary directory. Existing
  Playwright, Chromium and axe installations were reused; no dependencies added.

Rollback is a normal revert commit pushed to `master`, allowing the same automatic
deployment flow. Reverting AKDEVIA does not change the independent MEDIKA projects.
