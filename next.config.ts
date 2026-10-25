import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import path from "node:path";

/**
 * The site is fully static: no auth, no API routes, no user input, no remote
 * images. The policy therefore stays tight, with two deliberate allowances:
 *
 * - `'unsafe-inline'` for scripts and styles: Next.js emits inline bootstrap
 *   scripts and inline style attributes (also from Motion). A nonce-based
 *   policy requires dynamic rendering, which would give up static
 *   prerendering; it is recorded as a follow-up rather than silently
 *   weakening the build.
 * - `'unsafe-eval'` and websocket connections only in development, where the
 *   dev server and HMR require them.
 *
 * The dev/prod split uses the phase Next.js passes to this function. Neither
 * `NODE_ENV` nor `NEXT_PHASE` was reliable here (`next start` still reported
 * "development"), so the phase argument is the only trustworthy signal.
 */
function contentSecurityPolicy(isDev: boolean) {
  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : "'self' 'unsafe-inline'";
  const connectSrc = isDev ? "'self' ws: wss:" : "'self'";

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src ${connectSrc}`,
    "media-src 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function securityHeaders(isDev: boolean) {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(isDev) },
    // Never let a browser re-interpret a response as another content type.
    { key: "X-Content-Type-Options", value: "nosniff" },
    // Redundant with frame-ancestors above, kept for older browsers.
    { key: "X-Frame-Options", value: "DENY" },
    // Do not leak full page URLs (including fragments) to LinkedIn or others.
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    // Keep the browsing context isolated from cross-origin openers.
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
    { key: "X-DNS-Prefetch-Control", value: "off" },
    // Disable the legacy XSS auditor rather than relying on its heuristics.
    { key: "X-XSS-Protection", value: "0" },
    // Ignored over plain HTTP; effective once the site is served over HTTPS.
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains",
    },
  ];
}

export default function nextConfig(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    // Do not advertise the framework on every response.
    poweredByHeader: false,
    // A parent directory has its own lockfile; pin the workspace root to this
    // app so Turbopack does not infer D:\laragon\www.
    turbopack: {
      root: path.resolve(__dirname),
      rules: {
        "*.css": {
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      },
    },
    cacheComponents: true,
    partialPrefetching: true,
    async headers() {
      return [{ source: "/:path*", headers: securityHeaders(isDev) }];
    },
  };
}
