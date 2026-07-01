# Overview

This repository is a personal portfolio site for FanYu built with Next.js App Router, React 19, TypeScript, and Tailwind CSS 4. It is a production-facing personal website with a homepage, portfolio listing, portfolio detail pages, and a guestbook.

The codebase is content-driven and route-based. Most shared behavior lives in reusable components, static data modules, utility helpers, and CSS variables rather than in a complex runtime state layer.

# Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- React Markdown, remark-gfm, rehype-raw
- Shiki and c063 for syntax highlighting
- Giscus for guestbook and portfolio discussion embeds
- Google Analytics Data API
- Vercel Analytics and Vercel Speed Insights
- Ant Design Icons and react-icons
- fanyucomponents as the local shared UI utility library

The project does not use Zustand, TanStack Query, React Hook Form, Zod, or shadcn/ui.

# Project Structure

- `src/app/` contains App Router routes, nested layouts, metadata, robots, sitemap, and API routes.
- `src/components/` contains reusable UI, page sections, markdown rendering, code rendering, and route-specific components.
- `src/contexts/` contains cross-cutting React context such as theme state.
- `src/hooks/` contains custom hooks, currently focused on portfolio query-string state.
- `src/libs/` contains static content, route definitions, site configuration, environment accessors, and motion variants.
- `src/utils/` contains small pure helpers for class names, dates, URLs, GitHub badges, and syntax-highlighting parsing.
- `src/styles/` contains global CSS and component-specific CSS helpers.
- `src/types/` contains shared TypeScript types.
- `public/` contains static assets such as images, icons, cursor assets, and other site files.

This project is mostly route-based and component-based. Content and configuration are centralized in `src/libs/`, while the UI is assembled from reusable sections and presentation components.

# Architecture

- Prefer App Router conventions and keep route-specific logic close to the route segment.
- Keep static content in `src/libs/*` instead of scattering it inside pages.
- Use server components by default.
- Add `"use client"` only when browser APIs, hooks, animation state, clipboard access, localStorage, `next/navigation`, Giscus, or theme state are required.
- Use nested layouts for route-specific metadata and shared route shells.
- Use the existing sitemap and robots routes for discoverability rather than ad hoc SEO files.
- Keep portfolio detail pages data-driven from `src/libs/portfolio.tsx` and matching route metadata from the dynamic `[title]` layout.

# Coding Standards

- Match the existing style in nearby files before making changes.
- Prefer small, focused components over large generic abstractions.
- Reuse `cn()` from `src/utils/className.tsx` for class composition.
- Prefer semantic HTML and utility classes over extra wrapper elements.
- Keep import grouping consistent with the file you are editing.
- Keep prop names clear and domain-specific.
- Use `Readonly` for props where the codebase already does that.
- Prefer `type` aliases unless an `interface` is clearly better for a public contract.
- Avoid introducing new global patterns unless the repo already uses them.
- Do not add unnecessary comments; keep code readable through structure and naming.

# TypeScript Rules

- `strict` mode is enabled; do not weaken types to make code compile.
- The repo uses the `@/*` path alias for `src/*` imports.
- Keep shared domain types in `src/types/` and reuse them across features.
- Prefer explicit union types, literal types, and template literal types when the domain needs them.
- Reuse `OverrideProps` and `DistributiveOmit` from `fanyucomponents` where that pattern already exists.
- Avoid `any`, unsafe casts, and unnecessary non-null assertions.
- Keep route and metadata types aligned with Next.js App Router conventions.
- Use narrow, typed helpers for date strings, routes, portfolio items, and API responses.

# React Rules

- Write function components.
- Use hooks only inside client components.
- Keep state local unless multiple components already share the same concern.
- Use `useMemo`, `useCallback`, and `useEffect` only when they solve an actual cost or correctness problem.
- Use `Suspense` where the codebase already expects lazy or async client rendering.
- Keep event handlers small and named after the action they perform.
- Prefer composition over prop-heavy base components.
- Do not create new generic `Button`, `Card`, or `Section` components unless there is a real repeated need.
- Reuse the existing section components and page-specific wrappers before introducing new containers.

# Next.js Rules

- Follow App Router patterns.
- Keep page-level metadata in `metadata.tsx` or route-local `generateMetadata` when the route needs dynamic values.
- Keep `robots.ts` and `sitemap.ts` updated when routes change.
- Use nested layouts for route shells and route-specific metadata.
- Use server components by default and client components only when needed.
- Keep API routes in `src/app/api/*` and return `NextResponse` objects.
- Use `next/image` for local/static images when appropriate.
- Keep dynamic route slugs aligned with `slugify` and `deslugify`.
- Keep canonical URLs, Open Graph data, and Twitter metadata aligned with `site.url`.

# Tailwind Rules

- Tailwind 4 is used directly with the CSS-first setup in `src/styles/globals.css`.
- The codebase uses many arbitrary values and CSS variable-based utilities such as `text-(--muted)`, `rounded-(--border-radius-lg)`, and `bg-linear-to-r`.
- Use Tailwind utility classes for layout and spacing before adding extra CSS.
- Use `cn()` for conditional Tailwind classes.
- Do not assume a `tailwind.config.*` file exists; this project does not have one.
- Keep utility classes aligned with the existing visual language rather than introducing a new design system.

# Styling Rules

- Treat `src/styles/globals.css` as the source of truth for theme tokens and shared primitives.
- The site uses CSS custom properties for colors, shadows, radius, container width, and motion timing.
- Dark theme is the default; light theme is enabled through `document.documentElement.dataset.theme = "light"`.
- Do not break the `data-theme` contract or introduce styling that only works in one theme.
- Reuse existing utility classes such as `.btn`, `.card`, `.container`, `.tooltip`, `.overlay-wrapper`, `.slide-collapse`, and `.skeleton`.
- Keep new CSS small and component-scoped when possible.
- Do not add a separate styling framework.

# Design System

This project follows a token-based design system defined in `src/styles/globals.css`.

## Colors

- Always prefer CSS variables and Tailwind utilities bound to CSS variables.
- Use values such as `text-(--foreground)`, `text-(--muted)`, `bg-(--background)`, `bg-(--primary-background)`, and `bg-(--secondary-background)`.
- Never hardcode colors like `#fff`, `#000`, or brand blues when an existing token can express the same intent.
- Use hardcoded colors only when matching a specific external asset or a literal data-driven value.

## Radius

- Prefer `rounded-(--border-radius-sm)`, `rounded-(--border-radius-md)`, and `rounded-(--border-radius-lg)`.
- Keep new radius values aligned with the existing token scale.

## Shadows

- Prefer the existing shadow tokens defined in CSS.
- Avoid ad hoc `box-shadow` values unless the component truly needs a new visual treatment.

## Spacing

- Prefer the Tailwind spacing scale used by nearby components.
- Avoid arbitrary spacing unless the surrounding code already uses it or the layout requires precise alignment.

## Icons

- Prefer Ant Design Icons and react-icons, which are already in use.
- Do not introduce another icon library.

## CSS Variables

- Prefer `var(--foreground)` and the existing theme tokens instead of literal colors.
- Do not duplicate CSS variables that already exist in `src/styles/globals.css`.
- Keep theme tokens consistent across light and dark mode.

# Components

Prefer reusing these existing building blocks before creating new ones:

- `src/components/HeadingSection.tsx` for route-level section headings.
- `src/components/index/MySection.tsx` for homepage section shells.
- `src/components/CustomLink.tsx` for internal and external links.
- `src/components/MyImage.tsx` for remote images with fallback and retry support.
- `src/components/MyMarkdown.tsx` for Markdown rendering.
- `src/components/CodePre.tsx`, `src/components/CodeContainer.tsx`, and `src/components/CodeCard.tsx` for code display.
- `src/components/CopyButton.tsx` for clipboard actions.
- `src/components/Carousel.tsx` for scrolling showcase lists.
- `src/components/BackToTopButton.tsx` for scroll-to-top behavior.
- `src/components/Footer.tsx` and `src/components/Header/Header.tsx` for global site chrome.
- `src/components/index/PortfolioSection.tsx`, `src/components/index/SkillsSection.tsx`, `src/components/index/ExperienceSection.tsx`, and `src/components/index/ContactSection.tsx` for homepage content blocks.
- `src/components/index/SkillBadge.tsx`, `src/components/index/ContactCard.tsx`, and `src/components/index/ExperienceDiv.tsx` for repeated content items.
- `src/components/portfolio/PortfolioFilterBar.tsx`, `src/components/portfolio/PortfolioList.tsx`, and `src/components/portfolio/PortfolioCard.tsx` for portfolio browsing.
- `src/components/guestbook/GiscusSection.tsx` and the portfolio discussion components for Giscus integration.

Before inventing a new base component, check whether the same behavior already exists as a section wrapper, card-like utility class, or route-specific component.

## Component Search Priority

Before creating a new component, search for these first:

- `HeadingSection`
- `MySection`
- `MyImage`
- `MyMarkdown`
- `Carousel`
- `Footer`
- `Header`
- `PortfolioCard`
- `PortfolioFilterBar`
- `SkillBadge`
- `ContactCard`

Also search adjacent feature components, route-specific wrappers, and helpers in `src/components/portfolio/[title]`, `src/components/index`, and `src/components/Header`.

# Markdown Rules

- Markdown rendering must go through `MyMarkdown`.
- Do not render `ReactMarkdown` directly in new code.
- Keep syntax-highlighted code blocks on the existing `CodePre` and `CodeContainer` path.
- Preserve the current heading-anchor and link behavior when extending markdown rendering.

# Image Rules

- Prefer `MyImage` for remote or retryable images.
- Use `next/image` when the image is local, fixed, and does not need `MyImage`'s retry behavior.
- Do not use raw `img` directly unless there is a specific reason and the surrounding code already does so.

# Link Rules

- Prefer `CustomLink` for links that may be internal or external.
- Use `next/link` only when the target is definitely internal and does not need `CustomLink` behavior.
- Use `OutsideLink` from `fanyucomponents` only when the behavior is specifically external-link focused.

# Motion Guidelines

- Reuse motion variants from `src/libs/motion.tsx` whenever possible.
- Do not duplicate animation variants or create near-identical motion objects in new components.
- Prefer existing variants such as `fadeInItem` and `staggerContainer` when they fit the interaction.
- Keep animations subtle and purposeful.
- Respect `prefers-reduced-motion` in both CSS and Framer Motion patterns.
- Avoid introducing a second animation system unless there is a clear need.

# Accessibility

- Use semantic elements first.
- Keep interactive elements keyboard accessible.
- Provide `aria-label`, `aria-expanded`, and `aria-controls` where the existing pattern already uses them.
- Keep alt text meaningful for images.
- Do not rely on color alone for state or meaning.
- Preserve reduced-motion behavior and avoid animations that ignore `prefers-reduced-motion`.
- Keep focusable elements and links reachable without requiring hover.

# Performance

- Prefer server rendering and static data over client-side fetching when possible.
- Keep client components as small as possible.
- Reuse memoized or cached work for expensive Markdown, highlighting, or filtering operations.
- Keep portfolio filtering derived from URL state rather than duplicating state in multiple places.
- Lazy load or suspense-wrap heavier third-party embeds where the repo already does so.
- Avoid unnecessary image wrappers or repeated conversions in render paths.
- Use the existing analytics and speed-insight integrations rather than adding duplicate measurement code.

# Metadata Rules

- Whenever adding or renaming a page, keep metadata, Open Graph, Twitter metadata, canonical URLs, robots rules, and sitemap entries synchronized.
- Update route-local metadata in `metadata.tsx` or `generateMetadata` when a route needs its own title or description.
- Keep dynamic portfolio pages aligned with `src/app/sitemap.ts` and `src/app/robots.ts`.
- Do not add a public page without considering SEO metadata.

# SEO

- Keep `site.url`, metadata URLs, canonical URLs, sitemap output, and robots rules consistent.
- Update metadata for any route you add or rename.
- Preserve Open Graph and Twitter metadata on public pages.
- Keep structured data in the root layout aligned with the actual site content.
- Ensure dynamic portfolio routes continue to appear in the sitemap.
- Do not weaken indexability unless the route is intentionally private or utility-only.

# Animations

- The project uses both Framer Motion and CSS animations.
- Use Framer Motion for list and UI motion that already matches the portfolio experience.
- Use CSS animations for shared primitive effects such as carousel motion, collapse behavior, and global transitions.
- Keep animations subtle and purposeful.
- Respect reduced-motion preferences.
- Do not introduce a second animation system unless there is a clear reason.

# Forbidden

- Never duplicate components when an equivalent already exists.
- Never duplicate hooks when the same behavior is already covered.
- Never duplicate utilities when a small helper already exists in `src/utils/`.
- Never duplicate CSS variables when the token already exists in `src/styles/globals.css`.
- Never add a new dependency unless the task genuinely needs it and the existing stack cannot cover it.
- Never create unused components or dead code.
- Never break theme behavior, metadata consistency, or route structure to force a shortcut.

# Workflow

Before every implementation:

1. Understand the existing architecture.
2. Search existing components.
3. Search utility functions.
4. Search hooks.
5. Search types.
6. Search CSS variables.
7. Search motion variants.
8. Only then begin coding.

When implementing a change, prefer the smallest possible refactor that preserves the current architecture.

# Code Quality

- Prefer readable code over clever code.
- Prefer composition over deep nesting.
- Prefer small components over giant components.
- Avoid duplicated JSX when a shared component or helper can remove it.
- Avoid nested ternaries unless they materially improve clarity.
- Keep naming consistent with the rest of the repository.

# AI Development Rules

AI must follow these rules before changing code:

1. Search for an existing reusable component first.
2. Do not create duplicate base components such as Button or Card.
3. Follow the current project style.
4. Do not introduce a new library on your own.
5. Do not modify unrelated files.
6. Prefer refactoring over rewriting.
7. Keep the existing coding style consistent.
8. Do not break dark or light theme behavior.
9. Do not create unused components.
10. Prefer the existing utility functions before adding new helpers.

# Before Writing Code

Before modifying code, AI must search for:

- related components
- related hooks
- related utilities
- related types
- theme variables

Only start implementation after confirming that the existing codebase does not already provide the needed behavior.

# Notes For This Repository

- `src/app/layout.tsx` wires the global header, footer, theme provider, analytics, and structured data.
- `src/libs/site.tsx` is the central source for title, description, URL, and SEO keywords.
- `src/libs/portfolio.tsx` is the canonical source for portfolio content, tags, and Giscus references.
- `src/libs/routes.tsx` drives navigation, sitemap, and robots behavior.
- `src/contexts/ThemeContext.tsx` owns the light/dark toggle and persists theme state in localStorage.
- `src/styles/globals.css` defines the actual design system tokens and shared utility classes.
- The repo currently has no `services/` or `providers/` directory, so do not invent one unless the project adds a real need.
- The repo currently has no `tailwind.config.*` or `prettier` config file.

# AI Agent Checklist

Before finishing, verify:

- [ ] No duplicate component was added.
- [ ] No duplicate utility was added.
- [ ] No duplicate hook was added.
- [ ] Dark mode still works.
- [ ] Light mode still works.
- [ ] Theme tokens were preserved.
- [ ] Metadata stays synchronized.
- [ ] Existing animation style was preserved.
- [ ] Existing spacing and layout language were preserved.
- [ ] Existing naming conventions were preserved.
- [ ] No unnecessary dependencies were added.
- [ ] Existing reusable components were used whenever possible.
