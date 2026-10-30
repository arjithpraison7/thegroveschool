import type { APIRoute } from 'astro';
import { isLiveSite } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(`${import.meta.env.BASE_URL.replace(/\/?$/, '/')}sitemap-index.xml`, site);
  if (!isLiveSite) return new Response('User-agent: *\nDisallow: /\n');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`);
};
