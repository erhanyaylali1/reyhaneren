# Graph Report - reyhaneren  (2026-11-05)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 508 nodes · 1205 edges · 29 communities (19 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.86)
- Token cost: 1,317 input · 205 output

## Graph Freshness
- Built from commit: `e1ed1e2e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Service Pages & Metadata
- Database & Auth Config
- Admin Auth & Session
- Blog Post Management
- Blog Public Pages
- Layout & Cookie Consent
- Appointment Form
- Production Dependencies
- Package Config & Dev Dependencies
- TypeScript Config
- Project Changelog & Docs
- Root Layout & Structured Data
- OpenGraph Image
- ESLint Config
- Third Party Libraries
- Database Schema
- Project Documentation & Icons
- NPM Scripts
- ESLint Rules
- Admin Layout
- Tiptap Text Style Extension
- Tiptap YouTube Extension
- File Icon Asset
- Globe Icon Asset
- Google Verification File
- Next.js Logo Asset
- Vercel Logo Asset
- Window Icon Asset
- Post Data Access Layer

## God Nodes (most connected - your core abstractions)
1. `next` - 48 edges
2. `react` - 24 edges
3. `ServiceTemplate()` - 18 edges
4. `site` - 18 edges
5. `db()` - 17 edges
6. `requireAdmin()` - 17 edges
7. `Geri Bildirim Değişiklikleri - Site Feedback Changelog` - 17 edges
8. `compilerOptions` - 16 edges
9. `fail()` - 15 edges
10. `Icon()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `Reyhan Eren Portrait Photo (Main)` --references--> `Hakkımda Sayfası (About Page)`  [INFERRED]
  public/reyhan-eren-aile-danismani-izmir-portre.jpg → geri-bildirim-degisiklikleri.md
- `Reyhan Eren Avatar Portrait (Blog/Small)` --references--> `Blog Related Services Component`  [INFERRED]
  public/reyhan-eren-avatar-portre.jpg → geri-bildirim-degisiklikleri.md
- `Reyhan Eren Avatar Portrait (Blog/Small)` --references--> `Reyhan Eren - Family Counsellor`  [INFERRED]
  public/reyhan-eren-avatar-portre.jpg → geri-bildirim-degisiklikleri.md
- `Reyhan Eren Portrait Photo (Main)` --references--> `Reyhan Eren - Family Counsellor`  [INFERRED]
  public/reyhan-eren-aile-danismani-izmir-portre.jpg → geri-bildirim-degisiklikleri.md
- `Apple Touch Icon` --references--> `Next.js Web Project (reyhaneren.com.tr)`  [INFERRED]
  src/app/apple-icon.png → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Appointment/Contact Flow Components** — geri_bildirim_degisiklikleri__ref__src_components_appointment_form, geri_bildirim_degisiklikleri__ref__src_app_site_page, geri_bildirim_degisiklikleri__ref__src_app_site_iletisim_page [EXTRACTED 0.90]
- **Reyhan Eren Profile Image Assets** — public_reyhan_eren_portre, public_reyhan_eren_avatar, concept_reyhan_eren [EXTRACTED 0.95]
- **Site Content and Copy Files Changed by Feedback** — geri_bildirim_degisiklikleri__ref__src_lib_content, geri_bildirim_degisiklikleri__ref__src_lib_site, geri_bildirim_degisiklikleri__ref__src_app_site_page, geri_bildirim_degisiklikleri__ref__src_app_site_hakkimda_page, geri_bildirim_degisiklikleri__ref__src_app_site_iletisim_page [EXTRACTED 0.95]

## Communities (29 total, 10 thin omitted)

### Community 0 - "Service Pages & Metadata"
Cohesion: 0.07
Nodes (65): next, AboutPage(), metadata, principles, metadata, Page(), metadata, Page() (+57 more)

### Community 1 - "Database & Auth Config"
Cohesion: 0.07
Nodes (60): server-only, ALLOWED_IMAGE_TYPES, firstFreeSlug(), hashPin(), initialPin(), LOGIN_LOCK_MS, LOGIN_MAX_FAILURES, MAX_IMAGE_BYTES (+52 more)

### Community 2 - "Admin Auth & Session"
Cohesion: 0.07
Nodes (32): changePin(), clientKey(), FormState, isPin(), login(), logout(), setSessionCookie(), AdminLoginPage() (+24 more)

### Community 3 - "Blog Post Management"
Cohesion: 0.09
Nodes (42): deletePost(), savePost(), uploadImage(), AdminPostsPage(), metadata, DeletePostButton(), Icon(), IconName (+34 more)

### Community 4 - "Blog Public Pages"
Cohesion: 0.09
Nodes (33): nextConfig, getViews(), recordView(), validSlug(), BlogPage(), metadata, generateMetadata(), generateStaticParams() (+25 more)

### Community 5 - "Layout & Cookie Consent"
Cohesion: 0.13
Nodes (25): react, metadata, NotFound(), SiteLayout(), SiteNotFound(), Choice, CookieConsent(), CookiePreferencesButton() (+17 more)

### Community 6 - "Appointment Form"
Cohesion: 0.15
Nodes (17): AppointmentForm(), onSubmit(), Errors, faceToFacePaused, Field, FieldError(), fieldOrder, formats (+9 more)

### Community 7 - "Production Dependencies"
Cohesion: 0.11
Nodes (20): dependencies, @emailjs/browser@^5.0.3, next@16.4.3, react@19.3.0, server-only@^0.0.1, @supabase/supabase-js@^2.118.0, @tiptap/extension-highlight@^3.32.2, @tiptap/extension-image@^3.32.2 (+12 more)

### Community 8 - "Package Config & Dev Dependencies"
Cohesion: 0.15
Nodes (18): devDependencies, tailwindcss@^4, @tailwindcss/turbopack@^4, @types/node@^20, @types/react@^19, @types/react-dom@^19, @types/sanitize-html@^2.16.2, typescript@^5 (+10 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "Project Changelog & Docs"
Cohesion: 0.14
Nodes (18): Reyhan Eren - Family Counsellor, WhatsApp Click Analytics Event, Geri Bildirim Değişiklikleri - Site Feedback Changelog, App Layout (layout.tsx), Hakkımda Sayfası (About Page), Hizmetler Sayfası (Services Page), İletişim Sayfası (Contact Page), Ana Sayfa (Home Page) (+10 more)

### Community 11 - "Root Layout & Structured Data"
Cohesion: 0.22
Nodes (6): figtree, metadata, newsreader, sameAs, structuredData, viewport

### Community 12 - "OpenGraph Image"
Cohesion: 0.25
Nodes (4): alt, contentType, dir, size

### Community 13 - "ESLint Config"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.3, eslint, eslint-config-next

### Community 14 - "Third Party Libraries"
Cohesion: 0.20
Nodes (6): @next/third-parties@^16.4.3, react-dom@19.3.0, sanitize-html@^2.18.1, @next/third-parties, react-dom, sanitize-html

### Community 15 - "Database Schema"
Cohesion: 0.40
Nodes (4): posts_status_published_idx, public.admin_settings, public.login_attempts, public.posts

### Community 16 - "Project Documentation & Icons"
Cohesion: 0.40
Nodes (5): AGENTS.md - Next.js Agent Rules, Next.js Web Project (reyhaneren.com.tr), README - Next.js Project, Apple Touch Icon, App Icon (Favicon)

### Community 17 - "NPM Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 18 - "ESLint Rules"
Cohesion: 0.50
Nodes (3): extends, next/core-web-vitals, next/typescript

## Knowledge Gaps
- **23 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `{
  listPosts,
  findPostBySlug,
  findPostById,
  insertPost,
  updatePost,
  removePost,
  incrementViews,
  checkPin,
  setPin,
  getSessionVersion,
  getLoginLock,
  recordFailedLogin,
  clearLoginFailures,
  uploadImage,
}`, `App Layout (layout.tsx)`, `Hizmetler Sayfası (Services Page)` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 146 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Service Pages & Metadata` to `Admin Auth & Session`, `Blog Post Management`, `Blog Public Pages`, `Layout & Cookie Consent`, `Appointment Form`, `Production Dependencies`, `Package Config & Dev Dependencies`, `Root Layout & Structured Data`, `OpenGraph Image`, `Admin Layout`?**
  _High betweenness centrality (0.365) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `{
  listPosts,
  findPostBySlug,
  findPostById,
  insertPost,
  updatePost,
  removePost,
  incrementViews,
  checkPin,
  setPin,
  getSessionVersion,
  getLoginLock,
  recordFailedLogin,
  clearLoginFailures,
  uploadImage,
}` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Service Pages & Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Layout & Cookie Consent` to `Service Pages & Metadata`, `Admin Auth & Session`, `Blog Post Management`, `Blog Public Pages`, `Appointment Form`, `Production Dependencies`, `Package Config & Dev Dependencies`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `Database & Auth Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07370600414078675 - nodes in this community are weakly interconnected._
- **Why does `server-only` connect `Database & Auth Config` to `Package Config & Dev Dependencies`, `Admin Auth & Session`, `Blog Public Pages`, `Production Dependencies`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Should `Admin Auth & Session` be split into smaller, more focused modules?**
  _Cohesion score 0.07127882599580712 - nodes in this community are weakly interconnected._