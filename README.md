# FanYu

> A personal portfolio website for FanYu, built with Next.js App Router, TypeScript, and modern React patterns.

---

## Overview

FanYu is a personal website and portfolio built to present profile information, skills, work experience, and selected projects in a clean, responsive format. It is designed as a public-facing homepage that helps visitors quickly understand the author’s background, technical focus, and recent work.

The site combines static content with interactive sections such as a project portfolio, a guestbook powered by Giscus, and client-side theme switching. It also includes SEO-oriented metadata, structured data, analytics, and speed monitoring so the site is practical both as a portfolio and as a real production web app.

This project is a good fit for developers who want to showcase their work, publish a personal homepage, or study how a modern Next.js App Router site can be organized for content, interactivity, and deployment on Vercel.

---

## Features

- Responsive personal portfolio layout optimized for desktop and mobile.
- App Router-based structure with nested pages for portfolio and guestbook content.
- Theme-aware UI with client-side theme switching.
- Portfolio showcase pages with reusable sections and project detail views.
- Guestbook integration using Giscus for community comments.
- SEO-friendly metadata, Open Graph data, robots rules, and canonical URLs.
- Structured data injection for richer search engine understanding.
- Google Analytics Data API route for site analytics reporting.
- Vercel Analytics and Speed Insights for runtime visibility.
- Markdown rendering support with GitHub Flavored Markdown and syntax highlighting.

---

## Tech Stack

| Category   | Technology                                                      |
| ---------- | --------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router)                                         |
| UI Library | React 19                                                        |
| Language   | TypeScript                                                      |
| Styling    | Tailwind CSS 4, global CSS                                      |
| Animation  | Framer Motion                                                   |
| Markdown   | React Markdown, remark-gfm, rehype-raw, Shiki                   |
| Comments   | Giscus                                                          |
| Analytics  | Google Analytics Data API, Vercel Analytics and Speed Insights  |
| Deployment | Vercel                                                          |

---

## Project Structure

```text
src/
 app/          # App Router pages, layouts, metadata, robots, sitemap, and API routes
 components/   # Reusable UI components and feature sections
 contexts/     # React contexts such as theme management
 hooks/        # Custom hooks for route and portfolio state
 libs/         # Content data, site config, routes, and environment helpers
 styles/       # Global styles and feature-specific CSS
 types/        # Shared TypeScript types
 utils/        # Utility helpers for formatting and rendering
public/         # Static assets such as images and icons
```

- `src/app/` holds the App Router entry points for the homepage, portfolio pages, guestbook, sitemap, robots, and the analytics API route.
- `src/components/` contains reusable layout pieces and content sections for the homepage and portfolio views.
- `src/libs/` stores the site content model, route definitions, and environment variable accessors.
- `src/contexts/` provides cross-cutting UI state such as the current theme.
- `src/styles/` contains the global stylesheet and supporting CSS assets.
- `public/` serves static images and icons used throughout the site.

---

## Getting Started

### Clone

```bash
git clone https://github.com/fanyuuu2006/fanyu.git
cd fanyu
```

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

If you prefer another package manager, you can use it consistently for install, build, and start commands as long as the lockfile and scripts are kept in sync.

---

## Environment Variables

Create a `.env.local` file for runtime secrets and deployment-specific values:

```env
NEXT_PUBLIC_SITE_URL=
GA_PROPERTY_ID=
GA_CLIENT_EMAIL=
GA_PRIVATE_KEY=
```

- `NEXT_PUBLIC_SITE_URL` sets the canonical public URL used by metadata, API calls, and absolute links.
- `GA_PROPERTY_ID` is the Google Analytics property ID used by the analytics API route.
- `GA_CLIENT_EMAIL` is the service account email for Google Analytics Data API access.
- `GA_PRIVATE_KEY` is the service account private key. Newlines should be escaped in the environment file and normalized in code.

> The site currently uses a hardcoded Giscus configuration for the guestbook, so no extra environment variable is required for comments.

---

## Deployment

This project is ready to deploy on Vercel.

### Build Command

```bash
npm run build
```

### Output

Next.js produces the production build in `.next`, which Vercel uses automatically during deployment.

### Vercel Environment Variables

Configure the same variables listed above in the Vercel project settings before enabling production traffic.

### Recommended Vercel Workflow

- Automatic Deployment for pushes to the main branch.
- Preview Deployment for pull requests and feature branches.
- Production Deployment for the main branch after merge.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
