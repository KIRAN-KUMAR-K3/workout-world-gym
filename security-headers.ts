/**
 * =============================================================================
 *  SECURITY HEADERS — single source of truth
 * =============================================================================
 *  vite.config.ts uses this file to:
 *    1. write `dist/_headers`, which Cloudflare Pages turns into real HTTP
 *       response headers for the live site;
 *    2. add a matching Content-Security-Policy <meta> tag to the built
 *       index.html, so the policy still applies on hosts that ignore _headers;
 *    3. send the same headers from `npm run preview`, so what you test locally
 *       behaves like production.
 *
 *  IF YOU ADD A NEW EXTERNAL SERVICE (another image/video host, an analytics
 *  script, an embedded widget…) you must allow its host below, or the browser
 *  will block it. Add the narrowest source that works.
 * =============================================================================
 */

/** Content-Security-Policy: what the page is allowed to load, and from where. */
const csp: Record<string, string[]> = {
  // Anything not listed below is only allowed from this site itself.
  'default-src': ["'self'"],
  // Scripts: only the site's own bundled files. No inline scripts, no eval.
  'script-src': ["'self'"],
  // Styles: only the site's own stylesheet. No inline <style> or style="".
  'style-src': ["'self'"],
  // Images: own files, the film-grain data: texture, and Pexels stock photos.
  'img-src': ["'self'", 'data:', 'https://images.pexels.com'],
  // Video: own files and Pexels stock clips.
  'media-src': ["'self'", 'https://videos.pexels.com'],
  // Fonts are bundled with the site.
  'font-src': ["'self'"],
  // The page makes no API calls to other servers.
  'connect-src': ["'self'"],
  // Only the Google Maps embed may be framed inside the page.
  'frame-src': ['https://www.google.com', 'https://maps.google.com'],
  'worker-src': ["'self'", 'blob:'],
  'manifest-src': ["'self'"],
  // No plugins (Flash, Java…).
  'object-src': ["'none'"],
  // Stops an injected <base> tag from re-pointing relative links.
  'base-uri': ["'self'"],
  // The site has no forms; nothing may be posted anywhere.
  'form-action': ["'none'"],
};

/** Directives that only work as a real HTTP header (browsers ignore them in <meta>). */
const cspHeaderOnly: Record<string, string[]> = {
  // Nobody may embed this site in a frame (clickjacking protection).
  'frame-ancestors': ["'none'"],
  // Any stray http:// request is upgraded to https://.
  'upgrade-insecure-requests': [],
};

const serialise = (policy: Record<string, string[]>) =>
  Object.entries(policy)
    .map(([directive, sources]) => [directive, ...sources].join(' '))
    .join('; ');

/** Policy for the <meta http-equiv> tag. */
export const cspMeta = serialise(csp);

/** Full policy for the HTTP header on the live site. */
export const cspHeader = serialise({ ...csp, ...cspHeaderOnly });

/** Policy for `npm run preview` (plain http://localhost, so no https upgrade). */
export const cspPreview = serialise({
  ...csp,
  'frame-ancestors': cspHeaderOnly['frame-ancestors'],
});

/** Headers sent with every response. */
export const securityHeaders: Record<string, string> = {
  'Content-Security-Policy': cspHeader,
  // Browsers must not guess file types.
  'X-Content-Type-Options': 'nosniff',
  // Older-browser equivalent of frame-ancestors 'none'.
  'X-Frame-Options': 'DENY',
  // Other sites learn only that a visitor came from this domain, not which page.
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // The site never needs these device features, so they are switched off.
  'Permissions-Policy':
    'accelerometer=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), xr-spatial-tracking=()',
  // Always use HTTPS for the next year. (Add "; includeSubDomains; preload"
  // only once every subdomain of your domain is HTTPS-only.)
  'Strict-Transport-Security': 'max-age=31536000',
  // Pages opened from this site get no handle back to it.
  'Cross-Origin-Opener-Policy': 'same-origin',
  'X-Permitted-Cross-Domain-Policies': 'none',
};

/** Extra headers for the fingerprinted build files under /assets/. */
export const assetHeaders: Record<string, string> = {
  // File names change whenever content changes, so they can be cached forever.
  'Cache-Control': 'public, max-age=31536000, immutable',
  // Other websites may not load this site's scripts, styles or fonts.
  'Cross-Origin-Resource-Policy': 'same-origin',
};

/** Headers for the gym's own photos under /images/ and the share image. */
export const imageHeaders: Record<string, string> = {
  // Photos change rarely; browsers may keep them for 30 days and must then
  // revalidate. (Rename the file when you replace a photo, so nobody sees a
  // cached copy of the old one.)
  'Cache-Control': 'public, max-age=2592000, must-revalidate',
};

/** Contents of the Cloudflare Pages `_headers` file. */
export function buildHeadersFile(): string {
  const block = (path: string, headers: Record<string, string>) =>
    [path, ...Object.entries(headers).map(([k, v]) => `  ${k}: ${v}`)].join(
      '\n',
    );
  return [
    '# Generated by vite.config.ts from security-headers.ts — do not edit by hand.',
    block('/*', securityHeaders),
    block('/assets/*', assetHeaders),
    block('/images/*', imageHeaders),
    block('/og-image.jpg', imageHeaders),
    '',
  ].join('\n\n');
}
