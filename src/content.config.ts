import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per School Life page (src/content/school-life/*.md). The file name is the URL.
const schoolLife = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/school-life' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Shorter name for cards and menus. */
      navTitle: z.string().optional(),
      order: z.number(),
      summary: z.string(),
      cover: image(),
      coverAlt: z.string(),
      /** Folder name under src/assets/galleries/ whose photos are shown on the page. */
      gallery: z.string().optional(),
      /** Fallback description for gallery photos without their own caption. */
      galleryAlt: z.string().optional(),
      captions: z.array(z.string()).optional(),
      /** Show the four house cards (Elections & Houses page). */
      showHouses: z.boolean().optional(),
    }),
});

// One Markdown file per academic year (src/content/achievements/*.md), newest shown first.
const achievements = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/achievements' }),
  schema: z.object({
    title: z.string(),
    academicYear: z.string(),
    period: z.string(),
    order: z.number(),
    /** Dated highlights shown as a timeline. */
    events: z
      .array(
        z.object({
          year: z.number(),
          date: z.string(),
          text: z.string(),
          link: z.object({ href: z.url(), label: z.string() }).optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { schoolLife, achievements };
