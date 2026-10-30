## Project notes

- Static Astro 7 site for The Grove School. Needs Node >= 22.23.4 (`.nvmrc`: 24). `npm run check` type-checks.
- School details, admissions year/link and menu live in `src/data/site.ts`; page text in `src/content/` (Markdown).
- Internal links must go through `url()` from `src/lib/url.ts`: the GitHub Pages workflow may build under a sub-path.
- Content must stay factual: copy comes from the school's old site (see `docs/CONTENT-INVENTORY.md`); don't invent claims.
- Old `.htm` URLs are mapped in `astro.config.mjs` (`oldUrls`) and emitted by `integrations/legacy-redirects.mjs`.
- Hosting/DNS: `docs/HOSTING.md`. Builds for any domain other than www.thegroveschool.in are previews: noindex + banner.
- Keep security details about the old site out of this (public) repo; the notice lives in `../thegroveschool-old-site-backup/`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
