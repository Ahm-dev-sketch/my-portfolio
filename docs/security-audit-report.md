# Security Audit Report — `my-portfolio`

**Date:** 2026-10-25
**Scope:** the Next.js portfolio application in this workspace (source, configuration, dependencies, runtime, served headers)
**Authorization:** defensive assessment of the local project requested by the repository owner
**Method:** repository discovery → baseline checks → advisory research against authoritative sources → source audit → remediation → re-verification

---

## A. Executive Summary

The application is a fully static, prerendered marketing site. It has **no authentication, no database, no API routes, no Server Actions, no middleware, no file uploads, no cookies, no user input, and no environment secrets**. That removes most of the attack surface normally covered by this kind of audit.

**Confirmed exploitable application vulnerabilities: none found.** No injection sinks exist (`dangerouslySetInnerHTML`, `eval`, `innerHTML`, `document.write`, `child_process`, `fs`, shell execution, dynamic redirects), and all outbound links that open a new tab already carried `rel="noopener noreferrer"` (3/3).

**Weaknesses that were real and are now fixed:**

| ID | Weakness | Severity | Status |
|---|---|---|---|
| F-01 | No HTTP security headers at all (no CSP, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, frame protection, COOP) | Medium | **Fixed** |
| F-02 | Framework fingerprinting via `X-Powered-By: Next.js` | Low | **Fixed** |
| F-05 | Unused `create-next-app` template assets shipped in `public/` | Informational | **Fixed** |

**Most significant residual risk:** the local Node.js runtime is **v22.13.0**, which is 21 patch releases and **8 security releases behind** the current 22.x LTS (v22.23.4, 2026-10-20). Node ships fixes only in the latest patch, so this runtime is inside the affected line for every 22.x CVE since January 2025 — including **CVE-2026-111497**, a high-severity Brotli decoder out-of-bounds write permitting remote code execution. This is an environment/host issue, not a repository defect, and fixing it requires a Node upgrade outside the codebase. **Status: BLOCKED on human action** (see §G).

**Framework dependencies are current and unaffected:** `next@16.4.3` matches npm `latest` (published 2026-10-23) and is **not** inside any of the 77 advisories affecting the `next` package, including the critical RCEs patched in 16.4.1. `react`/`react-dom@19.3.0` were covered by no advisory affecting the `react` family; they were bumped to **19.3.1** as routine maintenance during this work, with no security claim attached.

`npm audit` reports **0 vulnerabilities** for both the full tree and the production-only tree. That is recorded as evidence, not as proof of security.

---

## B. Environment Inventory

| Item | Value |
|---|---|
| Framework | Next.js **16.4.3** (App Router, `src/app`), Turbopack build |
| React / React DOM | **19.3.1** (bumped from 19.3.0 during this work) |
| Node.js | **v22.13.0** (`next` requires `>=20.9.0`) |
| npm | 11.19.0 |
| Package manager / lockfile | npm, `package-lock.json` present |
| TypeScript | 5.9.3, `strict: true`, `noEmit: true` |
| Lint | ESLint 9.39.5 + `eslint-config-next@16.4.3` |
| UI deps | Tailwind CSS 4.x (via `@tailwindcss/turbopack`), `motion@14.6.0`, `lucide-react@1.61.0` |
| Rendering | Fully static prerender (`/`, `/_not-found`, `/icon.svg`, `/opengraph-image`); `cacheComponents` + `partialPrefetching` enabled |
| API surface | None — no Route Handlers, Server Actions, middleware/proxy, uploads, forms backend |
| Auth / DB / external APIs | None |
| Images | No `next/image` usage, no `remotePatterns`, no image optimizer traffic |
| CI/CD | None present in the repository |
| Deployment | **Not deployed**; `metadataBase` intentionally unset (no domain supplied) |
| Version control | Git repository initialised during this work: `8e8dc15` (audited baseline), `bbe154a` (React bump) |

---

## C. Findings

### F-01 — Missing HTTP security headers
- **Severity:** Medium (defense-in-depth; no XSS sink exists to pair with it)
- **Affected:** `next.config.ts` (no `headers()`), every response
- **Evidence (baseline, `next start`, `GET /`):** only `Vary`, `Link`, `Connection`, `Keep-Alive`, `Transfer-Encoding`, `Cache-Control`, `Content-Type`, `Date`, `X-Powered-By` were returned. No CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, or COOP.
- **Impact:** no browser-enforced mitigation against content injection, framing/clickjacking, MIME sniffing, referrer leakage of URL fragments to third parties (the site links to LinkedIn), or feature-permission abuse. Absent a CSP, any future XSS regression would execute with full privileges.
- **Confirmed/suspected:** Confirmed configuration weakness (not an exploit).
- **Fix applied:** per-request `headers()` layer applying CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/microphone/geolocation/payment/usb disabled), `Cross-Origin-Opener-Policy: same-origin`, `X-Permitted-Cross-Domain-Policies: none`, `X-DNS-Prefetch-Control: off`, `X-XSS-Protection: 0`, and `Strict-Transport-Security: max-age=63072000; includeSubDomains`.
- **Verification:** all headers present on `/`, `/icon.svg`, and `/opengraph-image`; CSP enforcement probes pass (see §E). `Cross-Origin-Resource-Policy` was deliberately **not** set so social crawlers can still embed the Open Graph image.

### F-02 — Framework disclosure via `X-Powered-By`
- **Severity:** Low (information disclosure)
- **Affected:** every response
- **Evidence:** baseline header `X-Powered-By: Next.js`.
- **Fix applied:** `poweredByHeader: false`.
- **Verification:** header absent on all tested routes.

### F-03 — Outdated Node.js runtime (environment)
- **Severity:** Medium in this context (host-level; CVEs are High/Critical class)
- **Affected:** host runtime `v22.13.0` (2025-01-06); affects `next dev` and `next start` on this machine and any deployment that pins the same runtime. It does **not** describe the source code, and it does not affect the current (undeployed) hosting target, which supplies its own runtime.
- **Evidence:** `https://nodejs.org/dist/index.json` → latest 22.x is **v22.23.4** (2026-10-20, `security: true`). 22.13.0 is 21 patches behind, spanning 8 security releases:
  - CVE-2025-23083 (Worker permission bypass), CVE-2025-23084 (Windows drive-name path traversal) — fixed 22.13.1
  - CVE-2025-23166 (async crypto crash) — 22.15.1
  - CVE-2025-27210 (Windows device-name path traversal), CVE-2025-27209 (HashDoS) — 22.17.1
  - CVE-2025-55131/55130/59465 etc. (buffer, FS permission, HTTP/2 crash) — 22.22.0
  - CVE-2026-21710/21712/21713/21714 (header crash, malformed URL crash, HMAC timing, HTTP/2 leak) — 22.22.2
  - CVE-2026-48933/48618/48934/48928/48930 (WebCrypto abort, TLS wildcard/session/SNI bypasses) — 22.23.0
  - CVE-2026-56846/56848/58043/58040/58044 (HTTP/2 UAF, permission over-grant, HTTPS session hostname bypass, parser-based smuggling) — 22.23.2
  - **CVE-2026-111497 (Brotli decoder out-of-bounds write → RCE)**, CVE-2026-105482/105483/106069 — 22.23.4
- **Reachability in this app:** no application route parses request bodies, uploads, or proxies traffic, and Node's Brotli decoder is used for request `Content-Encoding`, which this static site never consumes. The realistic exposure is therefore the HTTP/TLS parser surface of a publicly bound Node server plus any future code that handles input — low for the current static build, high if the app grows. Severity is scoped accordingly and not inflated to Critical.
- **Status:** **Not fixed** — a runtime upgrade is a host-level change outside the repository and requires owner action. See §G step 1.

### F-04 — CSP relies on `'unsafe-inline'` for scripts and styles
- **Severity:** Low (accepted trade-off, documented)
- **Evidence:** Next.js emits inline bootstrap/flight scripts and inline `style` attributes (including from Motion) at build time. A nonce- or hash-based policy requires dynamic rendering, which would forfeit static prerendering.
- **Practical consequence (verified, not assumed):** the policy **does** block external script origins and `eval` in production; it does **not** block injected inline `<script>` or inline event handlers. This is stated explicitly so the control is not over-credited.
- **Status:** Accepted, with a migration note (§G step 3).

### F-05 — Dead template assets publicly served
- **Severity:** Informational
- **Affected:** `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
- **Evidence:** zero references across `src/**/*.{ts,tsx}`.
- **Fix applied:** files deleted (no behavioral or visual change).

### F-06 — `react`/`react-dom` 19.3.0 vs 19.3.1
- **Severity:** Informational
- **Evidence:** npm `latest` for the line is 19.3.1 (2026-10-14); its release note is an RSC transport-protocol change, and no primary source describes it as a security fix. Advisories for `react` cover `<0.14.0` / `0.4.x` / `0.5.x`; `react-dom` advisories cover `16.0.0–16.4.1`. **19.3.0 is not affected by any live advisory.**
- **Status:** Upgraded to **19.3.1** as routine maintenance at owner request, with no security claim attached. Verified: `tsc`, ESLint, production build, `npm audit` (0), and a runtime smoke test (clean hydration, EN↔ID switching, headers intact, zero console errors).

### F-07 — No version-control baseline
- **Severity:** Informational (process)
- **Evidence:** `git rev-parse` → `fatal: not a git repository`.
- **Impact:** no diff-based review is possible; change provenance below is a manually verified file list, and there is no rollback point.
- **Status:** **Resolved** — repository initialised and the audited state committed as `8e8dc15` *before* any dependency change, with `bbe154a` for the React bump. Change provenance is now diffable and there is a rollback point.

### Scope items reviewed and found not applicable
Authentication/authorization (none exists), session/cookies (none), SQL/NoSQL injection (no database), SSRF (no server-side fetches, no image optimizer, no redirects), path traversal (no filesystem access), deserialization (no user-controlled payloads; the Next advisories concerning `use cache` deserialization and Server Actions do not apply), CSRF (no state-changing endpoints), file uploads (none), cache isolation (static content only; no user data ever enters a shared cache), secret exposure (no `.env*` files, no keys/certificates, no `NEXT_PUBLIC_*`, no `process.env` reads in `src/`), source-map exposure (**0** `.map` files under `.next/static`; the 49 under `.next/server` are not served), CI/CD (no workflows), containers (none).

### Dependency advisory research (exact installed versions)

| Package | Installed | Latest | Advisory status |
|---|---|---|---|
| `next` | 16.4.3 | 16.4.3 | Current. Not inside any of 77 `next` advisories. Criticals patched in 16.4.1 — e.g. GHSA-673q-mjm6-r5xr (`use cache` deserialization RCE, `>=16.0.0 <=16.4.0`), GHSA-2464-fhr4-w9xw (image-optimizer SVG RCE, `>=16.0.0 <=16.4.0`), GHSA-p3m5-59mp-jv5r (Server Actions DoS, `>=16.0.0 <=16.4.0`) — installed version is **outside** all of those ranges. |
| `react` / `react-dom` | 19.3.0 → **19.3.1** | 19.3.1 | No live advisory covered 19.3.0 (see F-06). RSC-runtime advisories affect `react-server-dom-*` bundled by Next, not this version pair. |
| `motion`, `lucide-react`, `tailwindcss`, `@tailwindcss/turbopack`, `typescript`, `eslint-config-next` | see §B | — | No live advisories. The two `npm`/`eslint` matches encountered were **withdrawn** advisories; installed `npm 11.19.0` and `eslint 9.39.5` are outside the withdrawn ranges anyway. |
| `unrs-resolver` (dev, transitive) | 1.12.2 | — | Only package in the lockfile with an install script; well-known ESLint resolver postinstall, dev-only, no advisory. |

Primary sources: `https://github.com/vercel/next.js/security/advisories`, `https://github.com/facebook/react/security/advisories`, `https://nodejs.org/en/blog/vulnerability`, `https://nodejs.org/dist/index.json`, `https://github.com/advisories`, npm bulk advisory API (`returns {}` for the pinned versions).

---

## D. Changes Implemented

| File | Purpose |
|---|---|
| `next.config.ts` | Converted to Next's function-form config so the **phase** (`PHASE_DEVELOPMENT_SERVER`) selects the CSP profile. Added `poweredByHeader: false` and a `headers()` layer emitting CSP, HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, `X-Permitted-Cross-Domain-Policies`, `X-DNS-Prefetch-Control`, `X-XSS-Protection`. Existing `turbopack.root`, CSS loader rule, `cacheComponents`, and `partialPrefetching` were preserved unchanged. |
| `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` | Deleted (unreferenced template assets). |
| `package.json`, `package-lock.json` | `react` / `react-dom` 19.3.0 → **19.3.1** (routine patch; lockfile updated by npm). |
| `docs/security-audit-report.md` | This report. |
| `.git/` | Repository initialised; baseline commit `8e8dc15`, React bump `bbe154a`. |

**Implementation note (important for maintainers):** the dev/prod CSP split cannot use `NODE_ENV` here. Under both `next start` and `npm run start`, `process.env.NODE_ENV` evaluated to `"development"`, and `NEXT_PHASE` was unset, which silently served the weaker dev policy in production. The phase argument that Next passes to the config function is the only trustworthy signal, and both profiles were verified empirically: `next start` → no `'unsafe-eval'`, no `ws:`; `next dev` → both present. Do not "simplify" this back to a `NODE_ENV` check without re-verifying.

No application logic, copy, layout, or business behavior was altered.

---

## E. Test Results

| Check | Command / method | Result |
|---|---|---|
| Dependency audit (all) | `npm audit` | **PASS** — 0 info/low/moderate/high/critical |
| Dependency audit (prod only) | `npm audit --omit=dev` | **PASS** — 0 vulnerabilities |
| Advisory applicability | authoritative sources vs pinned versions | **PASS** — Next/React unaffected; Node outdated (F-03) |
| Lint | `npm run lint` | **PASS** — no output, exit 0 |
| Type checking | `npx tsc --noEmit` | **PASS** — exit 0 |
| Production build | `npm run build` | **PASS** — 4 static routes; only the expected `metadataBase` warning |
| Secrets scan | recursive search for `.env*`, `*.pem`, `*.key`, `*.p12`, `*.pfx`; grep for `NEXT_PUBLIC`, `process.env`, keys/tokens | **PASS** — none present; `.gitignore` covers `.env*` and `*.pem` |
| Dangerous-sink scan | grep `dangerouslySetInnerHTML`, `innerHTML`, `eval(`, `new Function`, `document.write`, `child_process`, `execSync`, `spawn(`, `node:fs` | **PASS** — zero matches |
| Outbound link hygiene | all `target="_blank"` anchors | **PASS** — 3/3 carry `rel="noopener noreferrer"` |
| Source-map exposure | count `.map` under `.next/static` and `.next/server` | **PASS** — 0 client-served; server maps not routable |
| Security headers served | `next start`, `GET /`, `/icon.svg`, `/opengraph-image` | **PASS** — CSP + all hardening headers present; no `X-Powered-By` |
| CSP dev/prod split | `next start` vs `next dev --port 3100` | **PASS** — strict in production, relaxed in development |
| CSP enforcement (external scripts) | headless Chrome, `securitypolicyviolation` observer | **PASS** — `https://example.com/evil.js` blocked by `script-src` |
| CSP enforcement (`eval`) | `(0,eval)("1+1")` in production page | **PASS** — throws (no `'unsafe-eval'`) |
| Functional regression | headless Chrome, production build | **PASS** — 20/20 assertions: h1/section anchors, fonts loaded, Tailwind applied, language switch EN→ID under CSP, clipboard copy, mobile menu, zero console errors, zero failed requests, zero unexpected CSP violations |
| Browser compatibility of CSP | same harness (Chrome) | **PASS** — no violations on first load; Motion inline styles allowed by `style-src 'unsafe-inline'` |
| Node runtime patched | version comparison | **FAIL** — v22.13.0 is 8 security releases behind (F-03, not fixable in-repo) |
| Node runtime upgrade | official MSI, verified SHA-256 + OpenJS signature | **BLOCKED** — installer staged at `C:\Users\PC\Downloads\node-v22.23.4-x64.msi`; 16 live `node.exe` processes (agent host, MCP servers, npx wrappers) hold the current binaries and this session has no elevation |
| Runtime smoke test (React 19.3.1) | headless Chrome, production build | **PASS** — HTTP 200, CSP present, no `X-Powered-By`, correct `h1`, EN→ID switch, fonts loaded, 0 hydration errors, 0 console errors |
| Version control baseline | `git log --oneline` | **PASS** — repo initialised; audited state committed as `8e8dc15`, React bump as `bbe154a` |
| Container / IaC scan | — | **NOT APPLICABLE** — no container or IaC files |
| CI/CD workflow audit | — | **NOT APPLICABLE** — no workflows in repo |
| Auth / CSRF / IDOR regression tests | — | **NOT APPLICABLE** — no auth, sessions, or state-changing endpoints |
| `npm audit fix` | — | **NOT RUN** — no advisories to fix; force-upgrades were deliberately avoided |

---

## F. Remaining Risks

1. **Outdated Node.js runtime (F-03, open).** Highest-severity item on this machine. Not exploitable through this app's own routes today (no input handling), but the host HTTP/TLS stack carries publicly known RCE-class and TLS-hostname-bypass fixes that are absent in 22.13.0.
2. **CSP cannot stop inline script injection (F-04).** Inherent to preserving static prerendering. Real mitigation today is that no injection sink exists and React escapes all rendered data.
3. **HSTS `includeSubDomains`** will be applied once the site is served over HTTPS. If the eventual domain has HTTP-only sibling subdomains, that directive can cause outages — narrow it before choosing a production domain.
4. **Header enforcement depends on the host.** `headers()` works on Node-hosted Next.js and Vercel. A static host that ignores Next config (bare static export to a generic CDN) would drop every control in F-01 except the headers baked per response — verify with `curl -I` after deployment.
5. **No deployment, no domain, no `metadataBase`.** Open Graph/Twitter image URLs currently resolve to `http://localhost:3000`; this is a correctness issue, not a security one, and remains intentional until a domain is supplied.
6. **No version control.** No diff, review trail, or rollback point exists for any of these changes.
7. **Not assessed:** anything behind credentials or infrastructure (hosting account, DNS, TLS certificates, deployment pipeline) — none of it exists in this repository.

---

## G. Next Steps

1. **Install Node.js 22.23.4** (closes F-03). The official installer is already staged and verified: `C:\Users\PC\Downloads\node-v22.23.4-x64.msi` — SHA-256 `ca9303d3a12e8bec6de829fcb7812fc776930e0ce5c030328a24984ef928427e` matches nodejs.org `SHASUMS256.txt`, and the Authenticode signature is valid (OpenJS Foundation). Because 16 `node.exe` processes hold the current binaries, close them first (agent host, MCP servers, npx wrappers), then in an **elevated** PowerShell run:
   ```powershell
   msiexec /i "C:\Users\PC\Downloads\node-v22.23.4-x64.msi" /qb
   ```
   Verify with `node -v` (expect `v22.23.4`), then `npm ci && npm run build`. A reboot may be requested; do not run this while the agent session depends on the old binary.
2. **Before deploying:** set `metadataBase` to the real HTTPS origin, deploy, then verify controls from the outside with `curl -I https://<domain>/` that CSP/HSTS/`nosniff`/`X-Frame-Options`/`Referrer-Policy`/`Permissions-Policy` survive the host's edge. Re-check `includeSubDomains` against the real DNS zone.
3. **Optional CSP upgrade:** move to a nonce-based `script-src` if dynamic rendering becomes acceptable (e.g. via a proxy/middleware that injects a per-request nonce); until then, keep `'unsafe-inline'` and treat F-04 as an accepted limitation.
4. **Optional:** bump `react`/`react-dom` to 19.3.1 as routine maintenance (not security-driven), then re-run the harness.
5. **If scope grows** (contact-form backend, CMS, analytics, auth), re-audit those specific areas first: CSRF/rate limiting on the form endpoint, third-party script entries in `script-src`, and authorization checks server-side rather than UI-only.
6. **Initialize version control** before further change so audits can diff against a baseline.
