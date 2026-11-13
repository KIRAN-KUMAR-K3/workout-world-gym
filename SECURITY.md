# Security

This is a static website: it has no server-side code, database, login, forms or
payment handling, and it stores no visitor data. The only thing kept in a
visitor's browser is their colour-theme choice. That keeps the attack surface
small; the measures below protect what remains.

## What is in place

**Browser security policy (`security-headers.ts`)**

One file defines the HTTP security headers. The build writes them to
`dist/_headers` (applied by Cloudflare Pages) and adds the Content-Security-Policy
to `index.html` as a `<meta>` tag for hosts that ignore `_headers`.
`npm run preview` sends the same headers, so local testing matches production.

| Header | What it does |
|---|---|
| `Content-Security-Policy` | Only the site's own scripts, styles and fonts may load. No inline scripts, no inline styles, no `eval`. Images only from this site and `images.pexels.com`; video only from `videos.pexels.com`; frames only Google Maps. No plugins, no form submissions, no `<base>` hijacking. |
| `frame-ancestors 'none'` + `X-Frame-Options: DENY` | The site cannot be embedded in another page (clickjacking). |
| `Strict-Transport-Security` | Browsers always use HTTPS. |
| `X-Content-Type-Options: nosniff` | Browsers don't guess file types. |
| `Referrer-Policy` | Other sites learn only the domain a visitor came from. |
| `Permissions-Policy` | Camera, microphone, location, payment and similar features are switched off. |
| `Cross-Origin-Opener-Policy` | Pages opened from the site get no handle back to it. |

**Code**

- No `dangerouslySetInnerHTML`, `innerHTML`, `eval` or inline event handlers anywhere.
- Every outbound link passes through `safeLink()` (`src/lib/safeUrl.ts`), which only allows `https:` and `tel:`. A mistyped or malicious value in the config (for example a `javascript:` link) becomes a harmless `#`.
- Every image and video address passes through `safeMediaUrl()`: `https:` or a path on this site only.
- Links that open a new tab use `rel="noopener noreferrer"`.
- The Google Maps embed runs in a sandboxed iframe.
- In-page links are resolved by element id, never parsed as CSS selectors.
- The saved theme is checked against the list of known themes before use.
- If the 3D scene fails on a device, an error boundary shows the static artwork instead of a blank page. Errors are not shown to visitors.
- Structured data is escaped so it can never close its own `<script>` tag.
- Production builds contain no source maps, and the repository contains no secrets, API keys or `.env` files.

**Dependencies**

- `package-lock.json` pins exact versions; CI and Cloudflare install with `npm ci`.
- `npm run audit` fails on known vulnerabilities (moderate or worse).
- Dependabot (`.github/dependabot.yml`) proposes updates weekly.
- CI (`.github/workflows/ci.yml`) runs with read-only permissions and no secrets.

## Keeping it secure

- Run `npm run check` before deploying (type-check, vulnerability audit, build).
- Review and merge Dependabot pull requests.
- **Adding an external service** (analytics, a chat widget, another image host): add its host to `security-headers.ts`, or the browser will block it. Add the narrowest source that works and avoid `'unsafe-inline'` / `'unsafe-eval'`.
- After the site is live, check the real headers at <https://securityheaders.com> and <https://observatory.mozilla.org>.
- Protect the accounts that control the site: turn on two-factor authentication for GitHub, Cloudflare and the domain registrar, and for the Google account that owns the registration form.

## Known limits

- Stock photos and video clips load from Pexels' servers. They are passive media (they cannot run code here), but Pexels can see that a visitor's browser requested them. To remove that dependency, self-host the files (README section 8) and delete the Pexels hosts from `security-headers.ts`.
- The Google Maps embed and the Google Form are Google services with their own privacy terms.
- Security headers only take effect on a host that applies `_headers` (Cloudflare Pages does). On other hosts, configure the same headers in that host's settings; the `<meta>` policy still applies, but `frame-ancestors`, HSTS and the other headers do not.

## Reporting a problem

If you find a security problem with this website, please contact Workout World
Gym by phone or WhatsApp on 9686889915.
