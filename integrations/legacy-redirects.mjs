import { writeFile } from 'node:fs/promises';

/**
 * Keeps the old site's URLs (aboutus.htm, admission.htm, ...) working after the move.
 *
 * Astro's built-in `redirects` option writes `aboutus.htm/index.html` (a folder) and ignores
 * `base`, so instead this writes a real `aboutus.htm` file for each old URL. That works on every
 * static host, including GitHub Pages. It also writes `_redirects` (Cloudflare, Netlify) and
 * `.htaccess` (Apache/LiteSpeed hosting such as Hostinger) so those hosts answer with a real 301.
 *
 * @param {Record<string, string>} map old path -> new path, both starting with "/"
 * @returns {import('astro').AstroIntegration}
 */
export default function legacyRedirects(map) {
  let base = '/';
  let site = '';
  return {
    name: 'legacy-redirects',
    hooks: {
      'astro:config:done': ({ config }) => {
        base = config.base;
        site = config.site ?? '';
      },
      'astro:build:done': async ({ dir, logger }) => {
        const prefix = base.replace(/\/$/, '');
        const lines = [];
        const rewrites = [];
        for (const [from, to] of Object.entries(map)) {
          const target = prefix + to;
          const canonical = site ? new URL(target, site).href : target;
          const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>This page has moved</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${canonical}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.hash)</script>
</head>
<body>
<p>This page has moved to <a href="${target}">${canonical}</a>.</p>
</body>
</html>
`;
          await writeFile(new URL('.' + from, dir), html);
          lines.push(`${prefix}${from} ${target} 301`);
          rewrites.push(`RewriteRule ^${from.slice(1).replace(/\./g, '\\.')}$ ${target} [R=301,NE,L]`);
        }
        await writeFile(new URL('./_redirects', dir), lines.join('\n') + '\n');
        const htaccess = [
          '# Only used by Apache/LiteSpeed hosting (e.g. Hostinger). Generated at build time.',
          `ErrorDocument 404 ${prefix}/404.html`,
          '',
          '<IfModule mod_rewrite.c>',
          'RewriteEngine On',
          '# Pages of the old website',
          ...rewrites,
          '</IfModule>',
          '',
          '<IfModule mod_headers.c>',
          'Header always set X-Content-Type-Options "nosniff"',
          'Header always set Referrer-Policy "strict-origin-when-cross-origin"',
          'Header always set X-Frame-Options "SAMEORIGIN"',
          '</IfModule>',
        ];
        await writeFile(new URL('./.htaccess', dir), htaccess.join('\n') + '\n');
        // Files in _astro/ have content hashes in their names, so they can be cached for a year.
        await writeFile(
          new URL('./_astro/.htaccess', dir),
          '<IfModule mod_headers.c>\nHeader set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n',
        );
        logger.info(`wrote ${lines.length} redirect pages for old .htm URLs`);
      },
    },
  };
}
