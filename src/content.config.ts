import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---- Articles: your blog posts (Markdown/MDX, text + math + tables + images) ----
 const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: () => z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['trip', 'thoughts', 'knowledge']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    locationIds: z.array(z.string()).default([]),
  }),
});

// ---- Photos: your requested "data structure" (date, location, caption, ...) ----
const photos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/photos' }),
  schema: () => z.object({
    id: z.string(),                     // stable short id, e.g. "kyoto-fushimi-01"
    title: z.string().optional(),
    caption: z.string(),
    date: z.coerce.date(),
    image: z.string(),                  // path under /public, e.g. /images/kyoto1.jpg
    location: z.object({
      name: z.string(),                 // e.g. "Fushimi Inari-taisha, Kyoto"
      lat: z.number(),
      lng: z.number(),
    }),
    tags: z.array(z.string()).default([]),
    article: z.string().optional(),     // slug of a related article, optional
    display: z.boolean().default(true),
  }),
});

// ---- Locations: map pins with no photo attached — travel destinations,
// favorite places, sports practiced by location, or any other list you want
// plotted on the map. ----
const locations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/locations' }),
  schema: () => z.object({
    id: z.string(),
    name: z.string(),                   // e.g. "Chamonix, France"
    lat: z.number(),
    lng: z.number(),
    list: z.enum(['travel', 'favorite', 'sport']),
    // Only meaningful when list === 'sport', e.g. "ski", "surf", "climbing"
    sport: z.string().optional(),
    note: z.string().optional(),        // short blurb shown in the popup
    date: z.coerce.date().optional(),
    image: z.string().default(""), 
  }),
});

export const collections = { articles, photos, locations };

