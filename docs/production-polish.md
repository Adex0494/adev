# AKDEVIA production polish — 2026-10-19

Baseline: `05db2e599c67d4b391116867d557f21b71bc5f2b`, clean `master`.
The final release SHA and deployment result are supplied in the delivery response;
`git log -1` identifies the checkout's exact release. Publication uses a normal
commit and push to `origin/master`, never a force push.

## Brand, homepage and About

The official ADEV artwork and centralized brand configuration are unchanged.
The homepage stays company-first: positioning and brand phrase, capabilities,
MEDIKA flagship and case study/gallery, process, About, contact and footer.
Navigation includes Services, Work, About and Contact; the logo returns Home.
MEDIKA is the only featured project; public demo links remain ordinary `/medika`
anchors for navigation between independent application zones.

The exact brand phrase appears once, immediately below the main hero headline:

- EN: **Not just ideas... Results you can experience**
- ES: **No solo ideas... Resultados que puedes experimentar.**

MEDIKA's introduction invites visitors to experience the working product, giving
the phrase concrete proof. No employees, headcounts, clients, awards, statistics
or other unsupported business claims were added.

About is a homepage section (`#about`) with a centered portrait/name/social
composition and adjacent company copy on desktop; it stacks on phones.
The founder is **Ariangel Díaz Espaillat**, **Founder & Software Developer** /
**Fundador y desarrollador de software**. Technologies are curated to React,
TypeScript, Next.js and Supabase, all supported by the existing product work.

English About copy:

> AKDEVIA builds modern web applications, business websites and digital products
> that solve real business problems. Founded by Ariangel Díaz Espaillat, the
> company connects product thinking with hands-on software development.
>
> Our work combines modern web development with clear interfaces and maintainable
> implementation. We collaborate with clients and professional teams to turn
> priorities into software people can open, test and use.

Spanish About copy:

> AKDEVIA desarrolla aplicaciones web modernas, sitios empresariales y productos
> digitales que resuelven problemas reales de negocio. Fundada por Ariangel Díaz
> Espaillat, la empresa une la visión de producto con la implementación de software.
>
> Nuestro trabajo combina desarrollo web moderno, interfaces claras y código
> mantenible. Colaboramos con clientes y equipos profesionales para convertir
> prioridades en software que las personas pueden abrir, probar y usar.

The supplied `Profile picture.jpg` was read from the authorized Desktop location.
Only `public/about/ariangel-diaz-espaillat.webp` is shipped: 360 × 360, 25,772
bytes, WebP quality 90, approximately 27% smaller than the 35,194-byte source.
There is no upscaling, crop, facial alteration, retained EXIF/XMP/ICC metadata,
original JPEG copy or runtime dependency on the source location.
Next/Image provides intrinsic dimensions, responsive sizes and translated alt text.

GitHub, LinkedIn, email and website use recognizable inline SVG icons, consistent
20px artwork in 44px targets, token-based theme colors, hover/focus states and
localized accessible labels. External destinations use `target="_blank"` with
`rel="noopener noreferrer"`; email remains a `mailto:` link. No icon package,
permanent dependency or analytics integration was added.

## Language and SEO architecture

Before: query-selected server rendering and full-document language navigation.
After: the homepage proxy resolves explicit URL, saved manual cookie, browser
Accept-Language, then English. Spanish browser languages starting with `es`
default to Spanish. A manual choice is saved for one year in a SameSite=Lax
cookie (Secure on HTTPS). Automatic browser selection does not overwrite it.

The server renders the correct locale without a hydration flash. A small locale
context updates the mounted content, labels and metadata immediately. Native
history updates preserve existing component/form/theme state and the section
being viewed; back/forward restores the URL language. Normal language clicks
perform no document request. Modified clicks and no-JavaScript navigation retain
real localized links. Root visits are normalized with replaceState to a shareable
explicit language URL; direct explicit URLs override saved preferences.

English and Spanish canonical/hreflang URLs are `https://akdevia.com/?lang=en`
and `https://akdevia.com/?lang=es`; the negotiated root is x-default. Using explicit
canonical variants keeps the canonical and hreflang targets aligned independently
of browser or saved language. Server metadata and immediate client updates share
one configuration. HTML language, title, description, OG/Twitter text and locale
stay aligned. Both canonical URLs are listed in the sitemap. Robots excludes
the clinical demo and API. Organization JSON-LD adds only the real founder title
and portrait; no address, founding date, ratings or invented business facts.

## Deployment and environment audit

GitHub default branches: `Adex0494/adev` master, `Adex0494/Clinika` main, verified
through GitHub CLI. Vercel production deployment metadata confirms the matching
repositories/branches; two consecutive MEDIKA releases show both projects building
the same main commits. No cross-project deployment hook was introduced.

At audit, both MEDIKA projects were READY at
`d187aab7cd69c7658924f28d86ef62f9be8e6e72`:

- Real production `clinika`: `dpl_6RpRqR4XMt4fgMNYxdxWeM41DPGc`.
- Sanitized demo `medika-demo`: `dpl_54a51J7RmLddAubUX6qfLLrxEa2d`.

Only environment metadata was inspected; secret values were not decrypted or
logged. Production has no demo-mode/base-path variables. Demo has its separate
Supabase and demo configuration. MEDIKA's existing fail-closed guard pins demo
mode to its Development Supabase project and requires `/medika` on Vercel.
These boundaries were preserved. No MEDIKA source, database, production patient
data or production application UI was modified/accessed, and no MEDIKA tests ran.

`akdevia.com` and `www.akdevia.com` are already verified Vercel assignments;
www redirects to the apex with HTTP 308. Both HTTPS endpoints and the custom-domain
demo auto-login worked before implementation. No Namecheap, DNS, domain,
authentication architecture, production secret or database setting was changed.

## Verification and remaining configuration

AKDEVIA checks: 223 tests across 36 files, with focused additions for About,
portrait, social icons, exact bilingual phrase, language priority/history/state,
proxy isolation and production SEO. V8 measured coverage: statements 89.23%,
branches 83.33%, functions 94.11%, lines 91.57%. Lint, strict typecheck and the
ordinary production build passed using the existing Geist fonts.

Chromium checked 320, 375, 430, 768 and 1440px with no horizontal overflow; 720px
reflow also passed. Light/dark and Spanish mobile axe scans reported no violations
in those tested states. Keyboard skip/focus, mobile About navigation, portrait
rendering, persisted preference, browser defaults, back navigation, immediate
switching and retained inline form state were exercised. No page JavaScript
errors were observed. This is targeted verification, not an accessibility certification.
Temporary Playwright/axe tooling is outside the repository and is removed after
verification; no permanent package change is necessary.

No launch-blocking account or domain work is required. Optional existing contact
integrations remain as documented in the production handoff: server email requires
an authorized Resend key and sender; scheduling requires a real Calendly event URL.
Until configured, the truthful prefilled email draft and direct email remain usable.
No message is falsely reported as sent. No mail was sent during verification.

Rollback: revert this release with a new normal commit and push master, or promote
the preceding AKDEVIA deployment. Neither action requires redeploying MEDIKA.
