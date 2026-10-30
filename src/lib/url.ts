// Internal links must include the configured `base` so the site also works from a sub-path
// (e.g. https://<user>.github.io/<repo>/ while previewing on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** False for preview builds (e.g. GitHub Pages before the domain is connected): they are kept out of search engines. */
export const isLiveSite = new URL(import.meta.env.SITE).hostname === 'www.thegroveschool.in';

/** Prefix a root-relative path ("/about/") with the site's base path. External URLs pass through. */
export function url(path: string): string {
  if (/^[a-z]+:/i.test(path) || path.startsWith('#')) return path;
  return base + path;
}

/** True when `href` is the current page or (for section links) one of its children. */
export function isActive(href: string, pathname: string, exact = false): boolean {
  const target = url(href);
  return exact || href === '/' ? pathname === target : pathname.startsWith(target);
}
