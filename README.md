# L.M. Douglas — Author Website

Official website for **L.M. Douglas**, fantasy author of *Chronicles of the Endless War*. The site introduces the series, drives book sales, and grows the mailing list with a free-novella lead magnet.

It's a hand-built Vue single-page app: a cinematic hero carousel, a book showcase, an interactive world map of the realm of Gharantia, and a newsletter signup wired to MailerLite through a serverless function — deployed as static files on Netlify.

🌐 Live: lmdouglas.com

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Vue 3 (`<script setup>` single-file components) |
| Routing | Vue Router 4 (HTML5 history, smooth-scroll anchors) |
| Build tool | Vite 7 (`@vitejs/plugin-vue`) |
| Styling | Hand-written CSS + CSS custom properties — no framework |
| Fonts | Self-hosted Imperator (display) + Manrope (body) |
| Icons | Hand-built SVG components |
| Images | Responsive WebP with JPG/PNG fallback (custom helpers) |
| Forms | Netlify Forms (honeypot spam protection) |
| Serverless | Netlify Functions → MailerLite API |
| Hosting | Netlify |

No CSS framework and no UI library — every component, animation, and icon is bespoke.

## Features

- **Hero carousel** — full-bleed slides for each book with cover art, blurb, and buy links.
- **Chronicles showcase** — the full *Endless War* catalogue as a card grid, each card tagged by status (`new release`, `get it free`, `available`, `coming soon`).
- **Interactive world map** — clickable lore points across Gharantia (gods, cities, duchies, ports, ruins) plus character artwork, all data-driven from a single file.
- **Newsletter lead magnet** — readers get the free novella *Gharantia's Shadow* in exchange for signing up; the form posts to a Netlify Function that creates the subscriber in MailerLite.
- **Responsive image pipeline** — WebP is served to capable browsers via `srcset`, with the original JPG/PNG kept as a single-size fallback; CSS backgrounds pick a viewport-appropriate variant.
- **Self-hosted fonts** preloaded for a fast first paint, with a Google Fonts fallback for Manrope.
- **Responsive navigation** — desktop nav and a mobile burger menu, with smooth-scroll anchor links into homepage sections.
- **Embedded author blog** for news and updates.

## Pages

| Route | Description |
| --- | --- |
| `/` | Homepage — hero carousel, Chronicles showcase, interactive map, newsletter, footer |
| `/blog` | Blog (embedded author feed) |

## How it's built

A standard Vue + Vite SPA, with a few details worth calling out:

- **Data-driven content.** Books and map lore live in [`src/components/home/heroData.js`](src/components/home/heroData.js) as plain objects — the carousel, the Chronicles grid, and the world-map points all render from that one file, so adding a release or a location is a one-object change.
- **The responsive WebP system.** [`src/utils/webp.js`](src/utils/webp.js) detects WebP support once and caches it, then builds `srcset` strings from width-suffixed variants (`book1-flat-400.webp 400w, …`) and selects `-sm`/`-lg` backgrounds by viewport. If WebP isn't supported it returns `undefined`/the original path so the `<img>` falls back cleanly. The [`useViewportWidth`](src/composables/useViewportWidth.js) composable feeds the background selection.
- **The newsletter pipeline.** The form is a [Netlify Form](src/components/home/NewsletterSection.vue) (honeypot-protected) that also `POST`s to [`netlify/functions/newsletter-subscribe.js`](netlify/functions/newsletter-subscribe.js), a serverless function that forwards the subscriber to the MailerLite API. It expects two environment variables in Netlify: `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID`.
- **Build & deploy.** `npm run build` produces `/dist`; Netlify serves it and hosts the function (config in [`netlify.toml`](netlify.toml)).

### Project structure

```
src/
├── main.js                      # app entry (Vue + Router)
├── App.vue                      # root layout (Navbar + <router-view>)
├── style.css                    # global styles, CSS variables, @font-face
├── views/
│   └── HomeView.vue             # composes the homepage sections
├── components/
│   ├── navigation/              # Navbar, DesktopNav, MobileMenu, BurgerMenu, Logo, NavLink
│   ├── home/                    # HeroCarousel, HeroSlide, ChroniclesSection,
│   │                            #   MapSection, NewsletterSection, heroData.js
│   ├── blog/                    # BlogView, BlogSection (embedded feed)
│   ├── footer/                  # FooterSection
│   └── svgs/                    # hand-built SVG icons (social, decorative)
├── composables/
│   └── useViewportWidth.js      # reactive viewport width for responsive art
├── utils/
│   └── webp.js                  # WebP detection + responsive srcset/background helpers
├── router/
│   └── index.js                 # routes (/, /blog) + scroll/anchor behaviour
└── assets/
    ├── fonts/                   # self-hosted Imperator + Manrope
    └── images/                  # source artwork (jpg/png + webp variants)
netlify/
└── functions/
    └── newsletter-subscribe.js  # serverless: POST → MailerLite subscriber
```

## Getting started

**Prerequisites:** Node 20+ and npm.

```bash
git clone https://github.com/12vblanco/lmdouglas26.git
cd lmdouglas26
npm install
npm run dev          # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build to `/dist` (deploy-ready) |
| `npm run preview` | Serve the production build locally |

The newsletter function only runs on Netlify (via `netlify dev` or a deploy) and needs `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` set in the environment.

## Notes & possible improvements

- **SEO.** As a client-rendered SPA, meta tags and content are populated at runtime. Prerendering or SSR (e.g. a static-generation step) would give crawlers and social scrapers full content — worthwhile for an author/discovery site.
- **Blog.** The `/blog` route embeds an external feed rather than serving native content; a small built-in content model would keep posts on-domain.
- **About page.** `src/components/about/` is scaffolded but empty — an author bio page is a natural next addition.
- **Tooling.** No linting or automated tests yet; at minimum a smoke test that the app mounts and each route renders would help.
- **Bundle.** Image art dominates payload; continued audits of variant sizes keep the hero carousel lean (~500KB desktop / ~204KB mobile after the WebP pass).

## Credits

- **Author:** L.M. Douglas — [info@lmdouglas.com](mailto:info@lmdouglas.com)
- **Design & development:** [Victor Blanco](https://victorblancoweb.com)

## License

© 2026 Loraine Moore. All rights reserved. This is proprietary software — no part may be reproduced, distributed, or transmitted without prior written permission.
