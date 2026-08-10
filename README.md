# Osgood's diary — blog + map + photo log

Built with **Astro** + **MDX**, math via **KaTeX**, map via **Leaflet**.
Ships as a static site — deploy straight to Netlify.

## Run it locally

```bash
npm install
npm run dev       # http://localhost:4321
```

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Writing an article

Add a `.mdx` file to `src/content/articles/`. The filename (minus extension)
becomes the URL slug.

```mdx
---
title: "Your Title"
description: "One-line summary"
date: 2026-07-19
tags: ["travel"]
cover: "/images/your-image.jpg"   # optional
draft: false
---

Normal **markdown** works: paragraphs, lists, [links](/), > quotes, `code`.

## Tables

| Col A | Col B |
|-------|-------|
| 1     | 2     |

## Images

<figure>
  <img src="/images/your-image.jpg" alt="Description" />
  <figcaption>Caption text</figcaption>
</figure>

## Math (KaTeX)

Inline: $E = mc^2$

Block:

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$
```

Put images in `public/images/` and reference them as `/images/filename.jpg`.

## Adding a photo (for the map + your photo data structure)

Add a `.mdx` file to `src/content/photos/` — this is the structured data
you asked for (date, location, caption, etc). The schema lives in
`src/content.config.ts` if you want to add/remove fields.

```mdx
---
id: "unique-id"
title: "Optional title"
caption: "What's happening in the photo"
date: 2026-07-19
image: "/images/your-image.jpg"
location:
  name: "Place name"
  lat: 35.0116
  lng: 135.7681
tags: ["japan"]
article: "fushimi-inari-dawn"   # optional — links to an article slug
---
```

Every photo entry automatically becomes a pin on `/map`, with a popup
showing the image, title, caption, and a link to the related article
(if any).

## Project structure

```
src/
  content.config.ts        # schemas for "articles" and "photos"
  content/
    articles/               # your blog posts (.mdx)
    photos/                 # your photo data structure (.mdx)
  layouts/
    Layout.astro             # site chrome (header/footer/global styles)
    Article.astro             # article title/date/tags header
  components/
    PhotoMap.astro           # Leaflet map, reads pins from props
  pages/
    index.astro               # article listing (home)
    map.astro                 # map page, pulls pins from photos collection
    articles/[slug].astro     # renders each article
public/
  images/                    # put your images here
netlify.toml                 # Netlify build config
```

## Deploying to Netlify

**Option A — git (recommended):** push this repo to GitHub/GitLab, then in
Netlify: "Add new site" → "Import an existing project" → pick the repo.
Netlify will read `netlify.toml` automatically (build command
`npm run build`, publish directory `dist`). Every push redeploys.

**Option B — drag and drop:** run `npm run build` locally, then drag the
resulting `dist/` folder onto Netlify's "Deploys" page.

## Notes / things you may want to change

- Two example articles' worth of content and two example photos are included
  as a template — delete or replace them.
- The two example images (`public/images/torii.png`, `bamboo.png`) are
  placeholder solid-color PNGs — swap in your real photos (same filenames,
  or update the paths in the content files).
- Colors/fonts live in `src/layouts/Layout.astro` under `<style is:global>`
  as CSS variables (`--ink`, `--paper`, `--accent`, etc.) if you want to
  restyle.
- Leaflet map tiles come from OpenStreetMap's public tile server, which is
  fine for personal/low-traffic use; for anything higher-traffic, consider
  a tile provider like MapTiler or Stadia Maps (swap the `L.tileLayer` URL
  in `src/components/PhotoMap.astro`).
