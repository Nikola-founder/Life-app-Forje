# Forje Life — Site Readiness Pass

Nothing in your existing app logic, Supabase schema, or module pages
(tasks, habits, journal, goals, finance, calendar, health, notes,
contacts) was touched. Everything below is additive — new files, or
small non-behavioral edits (labels, aria attributes) to existing ones.

Full list of touched files is in `CHANGES.txt`.

## 1. Privacy Policy — `app/privacy/page.js`
Covers what's collected (account, tasks, journal, finance, health,
contacts), Supabase + Groq processing, retention, deletion requests, a
boarding-student/minors section, and your rights. **Placeholders in
brackets** (legal entity name, address, jurisdiction) need your real
details before publishing — have a lawyer review it, especially given
the international/minor-student angle.

## 2. Terms of Service — `app/terms/page.js`
Acceptable use, content ownership, an AI-disclaimer section (the
journal reflections aren't medical advice), termination, liability.
Same placeholder caveat as above.

## 3. Clear CTA — `app/page.js`
The homepage was previously just a blank "Loading…" redirect. It's now
a real marketing landing page: hero with a primary "Get started free"
CTA, feature overview, a second CTA band, an FAQ preview, and a
footer. Signed-in visitors are still auto-redirected to `/dashboard`
after the page loads — this is the one page whose *content* changed
structurally, since none of your other requests (meta tags, social
share, sitemap, CTA) had anywhere to attach to on a blank redirect
page.

## 4. FAQ — `app/faq/page.js`
Accessible accordion (native `<details>`, no JS required) plus
FAQPage structured data (JSON-LD) so Google can show questions
directly in search results.

## 5. robots.txt — `app/robots.js`
Allows the marketing/legal/auth pages, disallows the authenticated app
routes (dashboard, tasks, journal, etc.) since those require login and
show personal data — nothing to gain from indexing them, and you don't
want personal ledgers turning up in search results.

## 6. sitemap.xml — `app/sitemap.js`
Lists only the public pages (home, FAQ, privacy, terms, login, signup).

## 7. Custom 404 — `app/not-found.js`
On-brand, links back home and to the FAQ.

## 8. Alt text
No `<img>` tags exist anywhere in the codebase (checked), so there was
nothing to add. If you add real photos/screenshots later, give each an
`alt` attribute describing it.

## 9. Analytics — `components/Analytics.js`
Google Analytics 4, wired but **off by default**. Set `NEXT_PUBLIC_GA_ID`
to enable it, and even then it only loads after a visitor accepts the
cookie banner — never before.

## 10–11. Meta titles & descriptions — `lib/seo.js` + a `layout.js` per route
Every route (including all ten authenticated app pages) now has a
proper `<title>` and description, added via a sibling `layout.js` file
so your existing `page.js` files didn't need to change. Authenticated
pages are marked `noindex` in their metadata.

## 12. Social share — Open Graph + Twitter Card tags
Set site-wide in `app/layout.js` and per-page via the same `lib/seo.js`
helper. Add `NEXT_PUBLIC_GA_ID`/`NEXT_PUBLIC_SITE_URL` and deploy to
see real preview cards when a link is shared on iMessage/Slack/Twitter.

## 13. Favicon — `app/icon.png`, `app/apple-icon.png`, `app/manifest.js`
Generated to match your existing wax-seal "F" mark and leather color
palette. Next.js's App Router picks these up automatically — no extra
`<link>` tags needed.

## 14. Canonical URLs
Set per page via `alternates.canonical` in `lib/seo.js`'s
`pageMetadata()` helper, driven by `NEXT_PUBLIC_SITE_URL`.

## 15. Cookie consent — `components/CookieConsent.js`
A simple accept/decline banner. Declining (or ignoring it) means
analytics never loads; accepting enables it. Choice is stored in
`localStorage`, not a cookie itself, so it works before any cookie is
set.

## 16. Mobile version
Your app was already built mobile-first; the new pages (landing, FAQ,
privacy, terms, 404) follow the exact same responsive patterns
(`px-5 md:px-10`, stacked buttons under `sm:`, single-column grids
below `sm:`) as your existing pages.

## 17. Accessibility
- Skip-to-content link (keyboard users can jump past the sidebar)
- Visible focus rings app-wide on keyboard focus (doesn't affect mouse/touch clicks)
- Sidebar icons marked `aria-hidden` (screen readers were reading out "◆ Dashboard" etc. — now just "Dashboard")
- `aria-current="page"` on the active nav link
- Mobile menu button now has `aria-expanded`/`aria-controls`
- Login/signup labels properly linked to their inputs via `htmlFor`/`id` (they were visually next to each other before, but not programmatically linked — screen readers couldn't announce which label went with which field)
- `autoComplete` attributes on email/password fields
- Form errors now use `role="alert"` so they're announced immediately
- Respects `prefers-reduced-motion` (was already there, untouched)

## 18. Test forms
I reviewed (not live-tested, see note below) the login, signup, and
every module's create/edit forms:
- Login/signup both `preventDefault`, disable the button while
  submitting, and surface Supabase's error message on failure —
  correct pattern.
- Signup enforces `minLength={6}` matching Supabase's default password
  policy.
- I could not run `next dev`/`next build` in this sandbox — no network
  access, so `npm install` can't fetch dependencies. **Please run
  `npm install && npm run build` yourself before deploying** to catch
  anything a static review can't (e.g. a real Supabase auth round
  trip). I did do a structural brace/paren balance check on every file
  I touched and found no issues.

## 19. Check broken links
Wrote a script that extracts every `href`/`Link` in the codebase and
cross-checks it against your actual route folders. Result: every
internal link resolves to a real page. (The one flagged candidate,
`#main-content`, is the skip-link's in-page anchor, not a route — expected.)

## 20. Optimize performance
- `next.config.mjs`: gzip/brotli compression on, `X-Powered-By` header
  removed, security headers added (`X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`), long-term
  caching on the static icon/manifest files.
- Fonts were already loaded via `next/font` (self-hosted, no
  render-blocking Google Fonts request) — left as-is, it's correct.
- Analytics script only loads after consent, so it never delays first
  paint for a new visitor.

---

### Before you deploy
1. Fill in the bracketed placeholders in `app/privacy/page.js` and
   `app/terms/page.js` (company name, address, jurisdiction) and get
   them reviewed by a lawyer.
2. Set `NEXT_PUBLIC_SITE_URL` to your real domain in Vercel.
3. Optionally set `NEXT_PUBLIC_GA_ID` if you want analytics.
4. Run `npm install && npm run build` locally to confirm a clean build
   — I couldn't run this myself in this sandbox.
