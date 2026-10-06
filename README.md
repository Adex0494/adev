This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Brand logo

`reference-images/logo.png` is the single source of truth for the Adev logo.
`public/logo/logo.png` is an unchanged, byte-for-byte copy served by the site.
The header, footer, and social metadata share this asset through
`src/lib/brand.ts`. Preserve the complete artwork, background, colors, and 3:2
aspect ratio; do not crop, redraw, or apply visual filters. If the official source
changes, copy it to the public path and update its dimensions in `src/lib/brand.ts`.

Browser and application icons are derived only by cropping and scaling this source,
preserving its colors, symbol, and transparency. Next.js automatically registers
`src/app/icon.png` (512px), `src/app/apple-icon.png` (180px), and
`src/app/favicon.ico` (16/32/48/64px). The icon crop is x=200, y=100,
width=1136, height=824; scale proportionally onto a transparent square canvas.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
