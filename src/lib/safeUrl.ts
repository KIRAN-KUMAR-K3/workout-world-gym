/**
 * URL guards.
 *
 * Every link and media address on the site comes from the config files, and
 * those files will be edited by hand over the years. These helpers make sure a
 * mistyped or pasted-in value can never turn into something dangerous (for
 * example a `javascript:` link, or media loaded over plain http).
 */

/** Schemes a link on this site is allowed to use. */
const LINK_PROTOCOLS = new Set(['https:', 'tel:']);

/**
 * Returns `url` if it is an https:// or tel: link, otherwise a harmless "#".
 * Used for every external link (registration form, WhatsApp, Maps, Instagram).
 */
export function safeLink(url: string): string {
  try {
    // No base URL: relative values are rejected rather than resolved.
    const parsed = new URL(url);
    if (LINK_PROTOCOLS.has(parsed.protocol)) return url;
  } catch {
    /* not a valid absolute URL */
  }
  if (import.meta.env.DEV) {
    console.warn(`[config] Blocked unsafe or invalid link: ${url}`);
  }
  return '#';
}

/**
 * Returns `url` if it is an https:// address or a path on this site
 * ("/images/photo.webp"); otherwise undefined, so the image/video component
 * shows its placeholder instead of loading it.
 */
export function safeMediaUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  // Site-relative path. "//host" (protocol-relative) is not allowed.
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  try {
    if (new URL(url).protocol === 'https:') return url;
  } catch {
    /* not a valid absolute URL */
  }
  if (import.meta.env.DEV) {
    console.warn(`[config] Blocked unsafe or invalid media URL: ${url}`);
  }
  return undefined;
}

/**
 * Serialises data for a <script type="application/ld+json"> block. Escaping
 * "<" means text such as "</script>" inside an answer can never close the tag.
 */
export function jsonForScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
