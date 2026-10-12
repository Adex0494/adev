import type { NextConfig } from "next";

const configuredOrigin = process.env.MEDIKA_DEMO_ORIGIN?.trim();
let medikaDemoOrigin: string | undefined;
if (configuredOrigin) {
  const url = new URL(configuredOrigin.replace(/\/+$/, ''));
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password
    || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('MEDIKA_DEMO_ORIGIN must be an HTTP(S) origin without a path, query or credentials.');
  }
  medikaDemoOrigin = url.origin;
}

const nextConfig: NextConfig = {
  async rewrites() {
    // Standalone development remains available without the other zone.
    if (!medikaDemoOrigin) return [];
    return {
      beforeFiles: [
        { source: '/medika', destination: `${medikaDemoOrigin}/medika` },
        { source: '/medika/:path*', destination: `${medikaDemoOrigin}/medika/:path*` },
      ],
    };
  },
};

export default nextConfig;
