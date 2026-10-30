// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import legacyRedirects from './integrations/legacy-redirects.mjs';

// The GitHub Pages workflow sets SITE_URL and BASE_PATH (from actions/configure-pages), so the
// same build works on https://<user>.github.io/<repo>/ before the domain is connected and on
// https://www.thegroveschool.in/ afterwards. Every other host serves from the domain root.
const site = process.env.SITE_URL || 'https://www.thegroveschool.in';
const base = process.env.BASE_PATH || '/';

// Pages of the old website -> where that content lives now.
const oldUrls = {
  '/index.htm': '/',
  '/aboutus.htm': '/about/',
  '/location.htm': '/contact/#location',
  '/admission.htm': '/admissions/',
  '/artsculture.htm': '/school-life/arts-culture/',
  '/arjagannathantheatre.htm': '/school-life/childrens-theatre/',
  '/sportsgame.htm': '/school-life/sports-games/',
  '/exhibitionprojects.htm': '/school-life/exhibitions-projects/',
  '/annualprojectday.htm': '/school-life/annual-project-day/',
  '/electionshouses.htm': '/school-life/elections-houses/',
  '/supwenvironment.htm': '/school-life/supw-environment/',
  '/annualday.htm': '/school-life/annual-day/',
  '/highlightsandachivements.htm': '/achievements/',
  '/achievements.htm': '/achievements/',
  '/magazine.htm': '/magazine/',
  '/media.htm': '/media/',
  '/contact.htm': '/contact/',
};

export default defineConfig({
  site,
  base,
  // Astro 7 defaults to JSX-style whitespace, which glues "<strong>A</strong> b" together in prose.
  compressHTML: true,
  integrations: [sitemap(), legacyRedirects(oldUrls)],
  vite: {
    plugins: [tailwindcss()],
  },
});
