# AKDEVIA production handoff

Historical initial release record. For the current live custom domain, About
section and language-switch architecture, see [Production polish](production-polish.md).

## Scope and audit

Baseline: `8402906` on `master`, clean working tree, repository `Adex0494/adev`.
The original site contained three fictional projects, fabricated project/client/year
counts, an unsupported MEDIKA patient/clinic count and AI claim, inactive forms,
a Calendly placeholder, dead footer links, and no usable language switch/mobile menu.
These have been replaced by truthful bilingual content and the real MEDIKA demo.

Homepage: header → positioning → three capabilities → flagship MEDIKA → case
study/gallery → four development stages → founder → project enquiry → footer.
The official logo and its central `src/lib/brand.ts` configuration are preserved.
Company/contact URLs live in `src/lib/site.ts`.

## MEDIKA boundary and screenshot provenance

All visitor-facing demo links are ordinary anchors to `/medika`, which perform
document navigation between independent Next.js zones. Existing external rewrites
and `MEDIKA_DEMO_ORIGIN` remain intact. The homepage locale proxy matches `/` only.
Neither this repository nor this refactor modifies MEDIKA code or its production.

Captured on 2026-10-17 using the public demo at
`https://akdevia.vercel.app/medika`, after automatic demo login, at 1440 × 900:

| Asset in `public/projects/medika/` | Source screen | Approximate size |
| --- | --- | --- |
| `medika-patients.webp` | Patient directory | 71 KB |
| `medika-patient-history.webp` | Fictional Demo patient's overview/history | 53 KB |
| `medika-consultation.webp` | Existing fictional consultation | 47 KB |
| `medika-reports.webp` | Demo reports workspace | 40 KB |

The directory uses Demo names, `example.invalid` email addresses and fictional
555 telephone numbers. The selected history/consultation explicitly describes
synthetic records. Screenshots contain only sanitized demo data. No browser chrome,
Vercel toolbar, credentials, developer console, or production patient data is shown.
Waiting room and template workflows were inspected read-only; no demo records were
created or changed. Screenshots use Next/Image, explicit dimensions, responsive
sizes, descriptive localized alt text and lazy loading below the hero.
Full-size assets open in a new tab for readable inspection.

## Contact delivery

`POST /api/contact` validates with the shared Zod schema, rejects cross-origin
browser submissions, malformed/oversized payloads and honeypots, and sends plain
text through the Resend HTTP API. It fixes the recipient to `adex0494@gmail.com`,
sets the visitor as `reply_to`, uses an idempotency key and a provider timeout,
and never exposes a provider secret to client code or logs submission content.
The UI prevents concurrent submissions and only reports success after the API
returns a confirmed provider submission ID. Provider acceptance does not establish
inbox delivery; check provider events when activating this integration.

Current automatic delivery: **not configured**. Vercel currently exposes only
`MEDIKA_DEMO_ORIGIN` in this project's environment metadata. No Resend account,
API key, or sender has been provisioned as part of this refactor.

Without both settings below, the form offers a URL-encoded, prefilled `mailto:`
draft. The visitor reviews and sends it with their email application. The UI
explicitly says that the message has not been sent. Network/provider failures also
keep a usable draft link. A direct email link is always available.

To activate automatic delivery later:

1. Sign in to an authorized Resend account and create a scoped sending API key.
2. Choose an already verified sender, or verify a sender/domain separately.
   Domain verification can require DNS records; DNS is outside this task.
3. Add `RESEND_API_KEY` as a server-only secret and `CONTACT_FROM_EMAIL` as the
   authorized sender in the AKDEVIA Vercel project. Configure production and
   preview appropriately. Never use `NEXT_PUBLIC_` for these values.
4. Redeploy, send one authorized end-to-end enquiry, and verify it arrives at
   `adex0494@gmail.com` with a working reply address.

Rate protection is bounded and per-instance (five provider attempts per ten
minutes); it is best-effort rather than a distributed quota. Honeypot validation
and payload limits remain active without a provider. If abuse becomes measurable,
add a durable limiter or platform rule as a separate change. No database is needed
for the current marketing website.

Reference: [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).

## Scheduling

No confirmed calendar account or event URL was found. No scheduling account,
subscription, Google authorization or fake event URL was created.
Email and the project form are the current contact paths.

After authorizing and configuring a real event in Calendly, set
`NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/<your-account>/<your-event>` and
redeploy. Only a valid HTTPS Calendly event URL enables the external call link.
There is no third-party embed or scheduling dependency.

## Languages, SEO and accessibility

Explicit language URLs are `/?lang=en` and `/?lang=es`. Both render on the server,
including `html[lang]`, metadata, content, forms, errors and accessible labels.
The current locale provider switches immediately using native history and a
manual-preference cookie; browser back/forward restores the URL's language.
Canonical URLs and reciprocal hreflang point to the intended `https://akdevia.com`.
Metadata includes localized titles/descriptions, Open Graph, Twitter large-image
cards, the unchanged official logo, existing favicons, Organization JSON-LD,
robots and a bilingual sitemap. The clinical demo and API are excluded from crawling.

The website uses one H1, semantic sections, meaningful anchors, a skip link,
visible keyboard focus, labeled form errors, a mobile menu with expanded state,
Escape handling, modal focus trapping/restoration and inert background content.
Reduced-motion preferences are honored. Theme preference responds to system/storage
changes, persists locally when available and hydrates without mismatched controls.
Content remains visible without animation or JavaScript.

No analytics/tracking service was activated. This keeps the current deployment
free of unconfigured tracking endpoints, new accounts or analytics billing changes.
Vercel build/runtime inspection provides the current deployment verification.

## Dependencies and checks

Next.js was updated from 16.1.6 to 16.4.2, React/React DOM to 19.2.5 and
eslint-config-next to 16.4.2. Compatible lockfile packages were refreshed for
security fixes. Unused Framer Motion was removed. No email SDK, calendar embed,
browser or screenshot library was added as a permanent application dependency.
Playwright and axe were installed only in a temporary tools directory.

Security audit after the updates: no production dependency vulnerabilities reported.
The complete development tree still reports the `braces <=3.0.3` advisory through
Next's ESLint plugin → fast-glob → micromatch. The registry currently lists 3.0.3
as the latest braces release; npm's proposed automatic fix downgrades the Next
ESLint configuration to 14.x. That incompatible downgrade was not applied.
This affects lint tooling, not the deployed runtime. Recheck for an upstream fix
when updating the development toolchain.

Commands (all scoped to this AKDEVIA repository):

```text
npm test
npm run test:coverage
npm run lint
npm run typecheck
npm run build
```

Run production builds with ordinary network access to fetch the original Geist
fonts. A restricted sandbox cannot download them; no substitute font or mocked
font response is committed. These commands do not run the MEDIKA application suites.

## Domain launch and rollback

No Namecheap setting, DNS record, custom-domain attachment or MEDIKA production
configuration was changed. After reviewing this deployment:

1. Optionally activate automatic email and scheduling as described above. The
   current email draft flow already works without either integration.
2. Attach `akdevia.com` to **AKDEVIA only**, then configure its DNS manually.
3. Verify HTTPS, both languages, canonical/share metadata, email and `/medika`
   automatic demo authentication on the custom domain. If the independent demo's
   origin policy rejects the new host, authorize that demo-only origin separately;
   do not change MEDIKA production or weaken its security.
4. Submit the public sitemap after DNS and HTTPS are working.

Rollback: revert the website commit on `master` with a normal new commit and push,
or promote the previous known working AKDEVIA deployment. Never force-push or
change the independent MEDIKA production deployment. Optional email and calendar
settings can be cleared and AKDEVIA rebuilt to restore draft-only contact.

## Release verification

- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed on Next.js 16.4.2 with the original Google Geist fonts.
- `git diff --check`: passed after removing a trailing blank line.
- Public logo SHA-256 matches the official source byte-for-byte.
- Browser: English/Spanish server rendering, language metadata, no broken images,
  no JavaScript page errors, working mobile navigation and correct email draft.
- Responsive widths 320, 375, 768 and 1440: no document horizontal overflow.
- Theme switching and persistence, reduced motion, dialog Escape close,
  initial focus and focus restoration were exercised in Chromium.
- axe: no reported violations in the checked English light/dark pages,
  Spanish mobile page and open project dialog. This is automated coverage of
  those states, not a claim of universal accessibility certification.
- MEDIKA public smoke check: automatic login reached `/medika/dashboard` while
  retaining `akdevia.vercel.app`; directory, history, consultation, templates,
  waiting room and reports were inspected using fictional demo data only.
- The user explicitly authorized the AKDEVIA tests after the initial automatic
  approval block. `npm test`: **199 passed, 30 files**, no failures or skipped tests.
- `npm run test:coverage`: **199 passed, 30 files**. V8 coverage for measured files:
  statements 87.15%, branches 80.24%, functions 93.06%, lines 89.45%.
- Vitest uses at most four jsdom workers to avoid local/CI resource contention;
  all cases and timeout limits remain intact. ESLint excludes generated coverage.
- Only AKDEVIA suites were executed. No MEDIKA application tests or source files
  were changed or executed.
- No credentials were added to source. Publication uses normal commits and pushes
  to `origin/master`, without force-pushing. The final deployment and its smoke
  checks are recorded after Vercel finishes building the release.

## Production delivery record

Application commit: `e0fb1ee534dc25faae2c7c5e1441b37cb1210195`.
Initial commit: `840290613562e0ab90b887ccbbe51a0221f5bf55`.
The release follow-up includes this delivery record and a native-form safeguard
that uses POST to keep contact details out of URLs before JavaScript loads.
A bilingual no-JavaScript notice directs visitors to email. Its final SHA is
provided in the delivery response and is available through `git rev-parse HEAD`.

Vercel confirmed the application release as **READY**, target **production**,
project `akdevia`, deployment `dpl_9EFoxJkP1PWFsC6v5SVnVFapNVqT`:

- Public URL: https://akdevia.vercel.app
- Application release URL: https://akdevia-nm2vot98w-adex0494s-projects.vercel.app
- GitHub Vercel commit status: success.
- Remote build duration: approximately 36 seconds.

The public deployment was checked in Chromium after publication:

- Both languages, localized HTML language and SEO metadata, working images,
  one H1 and no placeholder navigation.
- Light/dark switching and persistence, mobile menu, project modal, validation,
  Escape close and focus restoration.
- Real contact API fallback and correctly addressed/encoded email draft; no
  actual email was sent during these checks.
- No horizontal overflow after responsive layout transitions at 320, 375, 768
  and 1440 pixels. Original Geist fonts loaded successfully.
- No axe violations in the tested light/dark, Spanish mobile and modal states.
- No browser JavaScript page errors in the walkthrough.
- Clicking the homepage demo link authenticated automatically at
  `https://akdevia.vercel.app/medika/dashboard`; the browser stayed on AKDEVIA.
- GitHub profile returned 200. LinkedIn redirected an anonymous browser to its
  normal authentication wall, preserving the exact supplied profile destination.

Observability limitation: the Vercel connector returned 403 for build-event logs
and runtime-error logs. No authenticated Vercel CLI session was available as a
fallback. READY state, GitHub deployment success and browser behavior were
verified, but a clean server-log scan is **not claimed**. No drains or tracking
services were installed. This limitation does not prevent the verified public
site from operating; inspect the logs later through an authorized Vercel session.

## Requested delivery checklist

| # | Item | Result |
| --- | --- | --- |
| 1 | Initial commit | `840290613562e0ab90b887ccbbe51a0221f5bf55` |
| 2 | Final commit | Application `e0fb1ee534dc25faae2c7c5e1441b37cb1210195`; release follow-up SHA in final response |
| 3 | Sections changed | Header, hero, services, flagship work, case study/gallery, process, founder, contact, footer |
| 4 | Placeholders removed | Three invented projects, fabricated statistics and MEDIKA claims, dead social/footer links, calendar mockup and inactive forms |
| 5 | Homepage architecture | Positioning → capabilities → MEDIKA → case study → process → founder → enquiry |
| 6 | MEDIKA architecture | One flagship product, business challenge/approach, engineering context, four-image gallery; demo document links to `/medika` |
| 7 | Screenshots | `medika-patients.webp`, `medika-patient-history.webp`, `medika-consultation.webp`, `medika-reports.webp` |
| 8 | Screenshot dataset | Sanitized public demo only; fictional records |
| 9 | Contact implementation | Shared validated form, server-only Resend API, fixed recipient, reply-to, honeypot, limits, duplicate protection and draft fallback |
| 10 | Automatic inbox delivery now | No; provider is unconfigured. Visitors send the prepared draft through their email app |
| 11 | Email activation step | Authorized Resend account/key and sender; set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, redeploy and verify receipt |
| 12 | Scheduling implementation | Conditional safe HTTPS Calendly link; current contact form/email fallback |
| 13 | Scheduling activation step | Authorize/configure a real event and set `NEXT_PUBLIC_CALENDLY_URL`, then redeploy |
| 14 | LinkedIn | Supplied founder profile in founder/footer, accessible external links; anonymous access reaches LinkedIn authentication |
| 15 | GitHub | Supplied public founder profile in founder/footer, accessible external links; returned 200 |
| 16 | SEO | Future canonical domain, localized metadata, OG/Twitter, original icons/logo, Organization JSON-LD, robots, sitemap and hreflang |
| 17 | EN/ES | Full content, forms, validation, accessibility labels and server-rendered locale metadata |
| 18 | Accessibility | Landmarks, headings, focus visibility, skip link, modal focus/inert background, labels/errors, contrast and reduced motion |
| 19 | Responsive/visual | 320/375/768/1440 px, desktop/mobile, both themes, restrained motion, responsive optimized images |
| 20 | Analytics | No additional tracking or analytics services activated |
| 21 | Dependencies | Next 16.4.2, React/React DOM 19.2.5, matching Next ESLint config and compatible security refresh; Framer Motion removed |
| 22 | Tests | 199 passed in 30 files; coverage statements 87.15%, branches 80.24%, functions 93.06%, lines 89.45% |
| 23 | Lint/typecheck | Both passed |
| 24 | Production build | Passed locally; Vercel application release READY |
| 25 | Deployment URLs | Public and application release URLs listed above; final release deployment in final response |
| 26 | Deployment status | Application release READY, GitHub Vercel status success; logs inaccessible via current connector |
| 27 | `/medika` smoke check | Passed automatic login on AKDEVIA public domain |
| 28 | Production medical data | Never accessed, copied or modified |
| 29 | Secrets | No secrets committed; source reviewed and scanned for common secret formats |
| 30 | Domains | Namecheap, DNS and custom-domain attachment unchanged |
| 31 | Domain launch steps | Review public site, optionally activate email/calendar, attach AKDEVIA domain and configure DNS manually, then verify HTTPS, metadata and demo authentication; submit sitemap |
