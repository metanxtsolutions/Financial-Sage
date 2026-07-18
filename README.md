# Financial Sage

GST-focused marketing/SEO website for Financial Sage — India's GST registration &
compliance specialist for MSMEs. Built with Next.js 16 (App Router), TypeScript,
Tailwind CSS, and Prisma.

## Phase 1 vs Phase 2

This build is **Phase 1: the public SEO site only** — homepage, GST content
pillar pages, programmatic cluster/city pages, free tools, the MDX blog, FAQs,
and lead capture (form → database → email notification → WhatsApp handoff).

**Phase 2 — the client portal (`login.financialsage.co.in`) — is not built yet.**
It needs its own auth (Auth.js), a `User`/`GSTRecord`/`Document`/`ServiceHistory`
schema, and document storage, which in turn need real Neon/Supabase + Resend
accounts to be useful. Building it now, before those accounts exist, would mean
shipping untestable code — so it's deferred until the public site is live and
ranking. When you're ready to build it:

1. Add `User`, `GSTRecord`, `Document`, `ServiceHistory` models to
   `prisma/schema.prisma` (roughed out in the original project brief).
2. Add Auth.js (NextAuth v5) with email+password or email OTP.
3. Add a `login.financialsage.co.in` subdomain route. In Next.js 16 the file
   you want is **`proxy.ts`** at the project root (the `middleware.ts`
   convention was renamed — see "Next.js 16 notes" below), matching on
   `request.headers.get("host")` to route the portal subdomain into a
   `app/(portal)` route group while the main domain keeps serving the
   marketing site you see here.

## Tech Stack

- **Next.js 16** (App Router, Turbopack, React 19.2)
- **TypeScript**, **Tailwind CSS v4**
- **Prisma 7** (PostgreSQL) — used for the `Lead` model only in Phase 1
- **Resend** (free tier) for lead notification emails
- **next-sitemap** for `sitemap.xml` / `robots.txt`
- **next-mdx-remote** + **gray-matter** for the GST Guides blog
- **Zod** for form validation

No paid services are required to run Phase 1.

## Local Setup

```bash
npm install
cp .env.example .env   # then fill in real values, see below
npx prisma generate
npx prisma migrate dev --name init   # creates the Lead table
npm run dev
```

Open http://localhost:3000.

### Environment variables

See `.env.example` for the full list. At minimum for local dev:

| Variable | Required for | Where to get it |
|---|---|---|
| `DATABASE_URL` | Saving leads | Free Postgres at [neon.tech](https://neon.tech) or [supabase.com](https://supabase.com) |
| `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `RESEND_FROM_EMAIL` | Lead email notifications | Free tier at [resend.com](https://resend.com) — optional, the lead form still saves to the DB and shows the WhatsApp fallback if these are blank |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp click-to-chat links | Your business WhatsApp number, digits only with country code |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, JSON-LD | `https://financialsage.co.in` in production |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID` | Analytics | Optional — leave blank to disable |

## Database

Prisma 7 changed how the client connects — it no longer reads `DATABASE_URL`
on its own. The connection is wired explicitly in `src/lib/prisma.ts` via a
`@prisma/adapter-pg` driver adapter, and `prisma.config.ts` (used by the CLI
for migrations) also reads `DATABASE_URL` from `.env`. You only need to set
`DATABASE_URL` once — both sides pick it up.

```bash
npx prisma migrate dev --name init   # local dev, creates/updates tables
npx prisma studio                    # browse the Lead table visually
```

In production, run `npx prisma migrate deploy` as part of your deploy step
(or a one-off command) rather than `migrate dev`.

## Content — where to edit things

Everything content-related lives in `src/data/*.ts` or `content/gst-guides/*.mdx`,
not hardcoded in components, so it's editable without touching page logic:

| What | File |
|---|---|
| Business facts, stats, WhatsApp number | `src/lib/site-config.ts` |
| Pricing tiers | `src/data/pricing.ts` |
| FAQs (60+, categorized) | `src/data/faqs.ts` |
| Programmatic GST cluster pages (`/gst-registration-fees`, `/gst-registration-for-freelancers`, etc.) | `src/data/gst-clusters.ts` |
| Programmatic city pages (`/gst-registration/[state]/[city]`) | `src/data/cities.ts` — add more cities here, no template changes needed |
| Homepage service cards, "who needs GST" list | `src/data/services.ts` |
| Testimonials (sample data — see note below) | `src/data/testimonials.ts` |
| "Other Services" footer stubs | `src/data/other-services.ts` |
| HSN/SAC lookup data | `src/data/hsn-sac.ts` |
| GST Guides blog posts | `content/gst-guides/*.mdx` |

**Adding a new city page**: add an entry to `src/data/cities.ts`, then add the
matching `[state, city]` pair to the `cityPaths` array in
`next-sitemap.config.js` so it's included in the sitemap. That's it — the
route template at `src/app/gst-registration/[state]/[city]/page.tsx` handles
the rest.

**Adding a new cluster page**: same pattern — add an entry to
`src/data/gst-clusters.ts` and to the `clusterSlugs` array in
`next-sitemap.config.js`.

## A deliberate omission: review/rating schema

The homepage testimonials are placeholder/sample MSME quotes, clearly labelled
as such in the UI. We do **not** emit `Review`/`AggregateRating` JSON-LD for
them (see `src/lib/schema.tsx`) — marking up fake or unverified reviews as
schema.org Reviews violates Google's structured data guidelines and risks a
manual action. Add that schema once real client reviews are collected.

## Next.js 16 notes (things that differ from older Next.js knowledge)

This project was scaffolded on Next.js 16.2, which changed a few conventions
worth knowing before extending it:

- **`middleware.ts` → `proxy.ts`**: the file and exported function are now
  named `proxy`, not `middleware`. Relevant when building the Phase 2 portal's
  subdomain routing.
- **`params`/`searchParams` are `Promise`s** in pages, layouts, and
  `generateMetadata` — always `await params` before using it.
- **Prisma 7 requires a driver adapter** (`@prisma/adapter-pg` here) —
  `PrismaClient` no longer reads `DATABASE_URL` automatically.
- **Turbopack is the default** for both `next dev` and `next build`.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add all the environment variables from `.env.example` in the Vercel
   project settings (Production + Preview).
4. Deploy. Vercel runs `npm run build`, which also triggers
   `next-sitemap` via the `postbuild` script.
5. In your domain registrar / DNS provider, point `financialsage.co.in`
   (and `www`) at Vercel per their domain instructions, and add the domain
   in the Vercel project's Domains tab.
6. **`login.financialsage.co.in` (Phase 2, once built)**: add it as a second
   domain on the *same* Vercel project (not a separate project) — the
   `proxy.ts` host-based routing described above depends on both domains
   resolving to the same deployment.

### Running the portal locally, once built (Phase 2)

Since both domains share one Next.js app, you can't easily hit
`login.financialsage.co.in` on `localhost`. Two options once you build it:

- Edit your local `/etc/hosts` to map a fake local domain (e.g.
  `login.localtest.me`) to `127.0.0.1`, and browse to
  `http://login.localtest.me:3000`.
- Or temporarily hit the portal route group directly at
  `http://localhost:3000/portal-preview` behind a dev-only route, if you'd
  rather not touch `/etc/hosts`.

## Scripts

```bash
npm run dev      # local dev server (Turbopack)
npm run build    # production build + sitemap generation
npm run start    # run the production build locally
npm run lint     # ESLint
```
