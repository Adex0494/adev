# AKDEVIA

Bilingual software-business website and engineering portfolio for
Ariangel Díaz Espaillat. Next.js App Router, strict TypeScript, Tailwind CSS,
React Hook Form, Zod and Vitest. npm is the package manager.

## Development

```text
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run test:coverage
npm run build
```

Open http://localhost:3000 for English or http://localhost:3000/?lang=es for
Spanish. Keep both translation files in `src/i18n/` aligned. Server-rendered
sections receive the selected locale; only interactive controls use client code.

Copy `.env.example` to ignored `.env.local` when configuring integrations.
No email provider or calendar account is required: the contact form offers a
truthful prefilled email draft until server-side mail delivery is configured.

## Production and integrations

- [Production handoff](docs/production-readiness.md): contact setup, scheduling,
  screenshot provenance, SEO, accessibility and domain-launch checklist.
- [Independent MEDIKA zone](docs/multi-zone-deployment.md): external rewrites and
  demo-only environment boundaries. Public demo links always use `/medika`.
- `src/lib/site.ts`: real business/contact/profile URLs and future canonical domain.
- `src/lib/brand.ts`: centralized official logo asset and dimensions.

GitHub: https://github.com/Adex0494/adev · Production branch: `master`.
Vercel project: **AKDEVIA** · Current public site: https://akdevia.vercel.app.
Future canonical domain: https://akdevia.com. DNS and domain attachment are manual.

## Official logo

`reference-images/logo.png` is the source of truth.
`public/logo/logo.png` is an unchanged byte-for-byte copy. Preserve the complete
artwork, background, colors and 3:2 aspect ratio; do not crop, redraw or filter it.
The business name is AKDEVIA; the established logo artwork retains ADEV.

Browser/application icons are derived from this source, preserving its colors,
symbol and transparency. Next.js registers `src/app/icon.png` (512px),
`src/app/apple-icon.png` (180px) and `src/app/favicon.ico` (16/32/48/64px).
The icon crop is x=200, y=100, width=1136, height=824, scaled proportionally onto
a transparent square canvas.

## Security and rollback

Never commit credentials or use `NEXT_PUBLIC_` for email secrets. Screenshots
must come only from the sanitized public MEDIKA demo. Do not access or modify
MEDIKA production or patient data. Keep normal Git history; rollback through a
revert commit or an earlier AKDEVIA deployment. See the production handoff for
current integration limitations and specific launch checks.
