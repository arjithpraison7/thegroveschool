# The Grove School website

The new website for **The Grove School, Alwarpet, Chennai** (www.thegroveschool.in), replacing the 2009 table-based site.
It is a static site built with [Astro](https://astro.build) and Tailwind CSS: no server, no database and no admin login to
hack, so it can be hosted free on GitHub Pages, Cloudflare or Netlify, or uploaded to any ordinary web host.

- **Hosting, domain and DNS:** [docs/HOSTING.md](docs/HOSTING.md)
- **What was carried over from the old site, and what needs the school's review:** [docs/CONTENT-INVENTORY.md](docs/CONTENT-INVENTORY.md)

## Run it locally

You need **Node.js 22.23.4 or newer** (Node 24 LTS recommended; `.nvmrc` pins 24). Fedora's default `nodejs` package is
older, so the easiest route is [fnm](https://github.com/Schniz/fnm):

```sh
curl -fsSL https://fnm.vercel.app/install | bash   # once; then open a new terminal
fnm install && fnm use                             # installs/uses the version in .nvmrc
npm install
npm run dev        # http://localhost:4321, reloads as you edit
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

You don't need Node to publish: the GitHub Actions workflow builds the site on GitHub's servers.

## Editing content

Most edits are text in one file. Commit the change and the site rebuilds and redeploys itself in about a minute.

| To change… | Edit |
| --- | --- |
| Phone, email, address, principal, timings | `src/data/site.ts` |
| **Admissions year, open/closed, form link** | `src/data/site.ts` → `admissions` |
| Menu items | `src/data/site.ts` → `nav` |
| Text of a School Life page (Arts, Sports, Annual Day…) | `src/content/school-life/<page>.md` |
| Achievements of a year | `src/content/achievements/<year>.md` (add a new file for a new year) |
| Home, About, Admissions, Contact, Media, Magazine pages | `src/pages/*.astro` |
| Colours and fonts | `src/styles/global.css` |

### Add photos to a gallery

Drop JPEG/PNG files into `src/assets/galleries/<page>/`. They appear in file-name order (`01.jpg`, `02.jpg`, …), and
are resized, converted to WebP and lazy-loaded automatically, so upload the best-quality originals you have. Strip
location data first if the photos came from a phone. To describe photos for screen readers, add a `captions:` list in
the page's Markdown file, in the same order.

### Add a new School Life page

Copy one of the files in `src/content/school-life/`, give it a new file name (that becomes the URL), set `order`,
`title`, `summary` and `cover`, and add a photo folder under `src/assets/galleries/` if it has a gallery. Then add a
menu link in `src/data/site.ts` → `schoolLifeLinks`.

### Add a new year of achievements

Create `src/content/achievements/2026-27.md` with the same front matter as `2016-17.md` (`order: 2026` puts it
first). The `events` list becomes the "Through the year" timeline.

## How it fits together

```
src/
  data/site.ts             school details, admissions, menu: one place to update
  content/                 page text in Markdown (school-life/, achievements/)
  content.config.ts        the fields each Markdown file must have
  assets/                  photos (optimised at build time), emblem, press clippings
  pages/                   one file per page; school-life/[slug].astro renders the Markdown pages
  components/              header, footer, gallery + lightbox, cards, page hero…
  layouts/BaseLayout.astro <head>, SEO and social-share tags
  styles/global.css        Tailwind theme: colours from the school emblem, Fraunces + Figtree fonts
integrations/legacy-redirects.mjs   keeps the old .htm URLs working (see below)
public/                    copied as-is: favicon, share image, _headers
.github/workflows/deploy.yml        build + deploy to GitHub Pages
wrangler.jsonc             only used if hosting on Cloudflare
```

**Old URLs keep working.** Every page of the old site (`aboutus.htm`, `admission.htm`, …) gets a small redirect page
at the same address, so Google results and bookmarks land on the new pages. The build also writes `_redirects`
(Cloudflare/Netlify) and `.htaccess` (Hostinger/Apache) for proper 301 redirects. The mapping lives in
`astro.config.mjs` → `oldUrls`.

**Sub-path builds.** `SITE_URL` and `BASE_PATH` (set by the GitHub workflow) let the same code run at
`https://<user>.github.io/<repo>/` before the domain is connected. Use `url('/path/')` from `src/lib/url.ts` for any
new internal link so it keeps working there.

## Quality checks done before hand-over

- All 16 pages + 404 checked at desktop (1440 px) and phone (390 px) widths: no console errors, broken images,
  failed requests or horizontal scrolling.
- axe-core accessibility audit (WCAG 2.1 A/AA + best practice): 0 violations on every page. Keyboard-accessible
  menus, skip link, alt text on every photo, visible focus, reduced-motion support.
- Lightbox (click, keyboard arrows, swipe, Escape) and mobile menu tested in Chrome.
- Sub-path build verified: all 2,171 internal URLs carry the base path.
- `npm audit`: 0 vulnerabilities (Astro 7.4, sharp 0.35).
