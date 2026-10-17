# AKDEVIA and MEDIKA: independent Next.js zones

This uses official Next.js external rewrites, not Vercel Microfrontends.
The repositories remain independent; there is no shared build or dependency.

| Vercel project | GitHub repository | Production branch | Public routes |
| --- | --- | --- | --- |
| akdevia | https://github.com/Adex0494/adev | master | `/` and everything except `/medika` |
| medika-demo | https://github.com/Adex0494/Clinika | medika-demo | `/medika` and `/medika/*` |

MEDIKA's existing `main` branch participates in the real production release
workflow. This integration is committed to `medika-demo` instead. Select that
branch manually as the demo project's Production Branch. Do not merge/push
these changes to `main` as part of the portfolio deployment. Future demo
updates deploy only medika-demo; AKDEVIA commits deploy only akdevia. Bring
future reviewed application changes into the demo branch separately.

## Manual Vercel configuration

1. Import Clinika as **medika-demo**, repository root, Next.js preset, Production
   Branch `medika-demo`, install `pnpm install --frozen-lockfile`, build `pnpm build`.
   Configure the variables in MEDIKA's `docs/multi-zone-deployment.md` before
   building. Do not alter its existing production project or Supabase resources.
2. Use the stable Production domain assigned by Vercel to medika-demo. It must
   allow unauthenticated proxy requests: configure Deployment Protection for
   this public demo as appropriate. A protected preview URL is not a suitable
   origin. Never add a bypass secret to a public URL.
3. Import adev as **akdevia**, repository root, Next.js preset, Production
   Branch `master`, install `npm ci`, build `npm run build`.
4. Add **SERVER-ONLY** `MEDIKA_DEMO_ORIGIN=https://<stable-medika-demo-production-domain>`
   to akdevia. It is an origin, without `/medika`, query strings or credentials.
   Trailing slash is normalized. No `NEXT_PUBLIC_MEDIKA_DEMO_ORIGIN` is needed.
5. Only akdevia owns `akdevia.com` (and optionally `www.akdevia.com`). Attach
   domains and configure Namecheap DNS manually. No Vercel/DNS changes are
   automated by this repository.

The origin is read by next.config.ts at build time. Rebuild ADEV after changing
it. A child update at the same stable origin needs no ADEV commit/rebuild.
Requests for `/medika`, nested pages, `/medika/api/*`, public assets and
`/medika/_next/*` are rewritten with their original path/query. The browser
keeps the public URL. The CTA uses a normal anchor for document navigation.
Without the variable, ADEV still runs normally; `/medika` is unavailable (404).

## Local development

Standalone: `npm ci`, then `npm run dev`. No MEDIKA variables are required.
Integrated: start MEDIKA with `MEDIKA_BASE_PATH=/medika` and its development
configuration on port 3010; set `MEDIKA_DEMO_ORIGIN=http://localhost:3010` in
ADEV's ignored `.env.local`. For automatic login behind a local proxy, also set
MEDIKA's server-only `MEDIKA_DEMO_LOCAL_ORIGIN=http://localhost:3000` (or ADEV's
actual port) and use `next dev`. This opt-in is ignored in production builds.
Restart both servers. Build-time path changes require
a MEDIKA rebuild/restart; never reuse a root-mode build for the child zone.
Do not put Supabase keys or the demo password in this repository.

## Validation and rollback

Run `npm run typecheck`, `npm run lint`,
`npm test`, and `npm run build`. Check `/` and the demo CTA, then
`/medika`, `/medika/login`, dashboard/patients/waiting-room, demo-session POST,
JS/CSS/image requests and authenticated attachment/document downloads.
Review browser behavior after importing both projects; HTTP rendering alone
does not verify the clinical UI. MEDIKA application suites follow its manual
review policy.

To remove the proxy reversibly, clear MEDIKA_DEMO_ORIGIN and rebuild ADEV.
The other project's code, database and deployment are unaffected.

References: [Next.js Multi-Zones](https://nextjs.org/docs/app/guides/multi-zones),
[basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath).

## Validation recorded on 2026-10-12

- npm package-lock matches the manifest; all direct dependencies are installed.
  No dependency versions were changed. Removed the stale pnpm lockfile so Vercel
  selects the consistent npm install.
- TypeScript and ESLint passed. Fixed pre-existing Hero animation tuple typing
  and Button test ref typing that prevented TypeScript validation.
- Configuration inspected with origin unset, HTTPS with trailing slashes, and
  localhost:3010. Correct external rewrites; no browser env or redirects.
- ADEV home and its `/medika` document-navigation link returned HTTP 200 locally.
  Integrated proxy checks passed for demo entry/login/patients/waiting-room,
  JS/CSS, public assets, app icon, image optimizer and demo auto-login.
- Vitest could not execute tests: the restricted environment denies subprocess
  creation (`spawn EPERM`). Tests are added/updated but not claimed as passed.
- Ordinary production build could not download Google Fonts. A temporary local
  font substitute allowed compilation, then Next's TypeScript worker was blocked
  by EPERM. Separate TypeScript passed. Full production build remains unverified.
- Dynamic MEDIKA patient/document routes also encountered worker EPERM during
  local compilation; their behavior and browser UI remain pending verification.

Temporary font substitutes and inspection servers are outside both repositories;
do not add NEXT_FONT_GOOGLE_MOCKED_RESPONSES to Vercel. No deployment was run.
