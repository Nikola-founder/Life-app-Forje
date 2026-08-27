# Forje Life

A private, all-in-one life ledger: tasks, habits, journal, goals (with
auto-generated milestones), finance (multi-currency, base GBP), calendar,
health, notes, and contacts (with boarding house & year fields). Built with
Next.js + Supabase, deployed on Vercel. Works on desktop and mobile browsers,
and syncs everywhere you log in.

## 1. Create your Supabase project (free)

1. Go to https://supabase.com → **New project**.
2. Pick any name/region, set a database password (save it somewhere), wait
   ~2 minutes for it to spin up.
3. Go to **SQL Editor** → **New query**, paste the entire contents of
   `supabase/schema.sql` from this project, and click **Run**. This creates
   all 10 tables with row-level security, so each user only ever sees their
   own data.
4. Go to **Project Settings → API**. You'll need two values:
   - **Project URL**
   - **anon public** key

5. (Recommended) Go to **Authentication → Providers** and make sure
   **Email** is enabled. By default Supabase requires email confirmation on
   sign-up — you can turn this off in **Authentication → Settings** if you
   want to skip confirmation emails for a personal app.

## 2. Run it locally first (optional but recommended)

```bash
npm install
cp .env.local.example .env.local
# open .env.local and paste your Supabase URL + anon key
npm run dev
```

Visit http://localhost:3000, sign up with your email, and you're in.

## 3. Deploy to Vercel

1. Push this project to a GitHub repo (or use `vercel` CLI directly from
   this folder).
2. Go to https://vercel.com → **Add New → Project** → import the repo.
3. In **Environment Variables**, add both, making sure **Production, Preview,
   and Development** are all checked:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   ⚠️ If you add these *after* your first deploy (or a build failed with
   `supabaseUrl is required`), go to **Deployments → ⋯ → Redeploy**. Vercel
   only reads env vars at build time, so a page refresh won't pick them up —
   you need a fresh deploy after adding or changing them.
4. Click **Deploy**. Vercel will build and give you a live URL
   (e.g. `forje-life.vercel.app`) that works on any device — this is what
   you log into from your phone, laptop, or school computer.

That's it — the same Supabase database backs every device you log in from,
so everything you add on your phone shows up on your laptop and vice versa.

## How the automatic parts work

- **Goal milestones**: when you create a goal with a category and target
  date, `lib/milestones.js` calculates how far away the date is and
  generates 2–5 milestones with dates and phase-appropriate titles
  (e.g. education goals get "Build the basics → Exam-ready practice →
  Finish"). No manual milestone entry needed — check them off as you go.
- **Finance currency conversion**: `lib/currency.js` calls the free
  frankfurter.app exchange rate API to convert any transaction into GBP at
  the time you log it, so your balance is always shown in GBP regardless of
  what currency you spent in.

## Project structure

```
app/                 → one folder per module (route), all client components
components/          → Sidebar, PageShell (layout), AuthGuard
lib/supabaseClient.js → Supabase browser client
lib/milestones.js     → automatic goal → milestone breakdown logic
lib/currency.js       → GBP conversion helper
supabase/schema.sql   → full DB schema + RLS policies, run once
```

## Customizing later

- Add more currencies: edit `SUPPORTED_CURRENCIES` in `lib/currency.js`.
- Add more goal categories: edit `PHASES_BY_CATEGORY` in `lib/milestones.js`.
- Change the palette: edit CSS variables/colors in `app/globals.css` and
  `tailwind.config.js`.
