"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import PublicFooter from "@/components/PublicFooter";

const FEATURES = [
  {
    icon: "▦",
    title: "Calendar, dual timezone",
    body: "Day, week, month and agenda views with color-coded categories — see your home and host-country time side by side.",
  },
  {
    icon: "✎",
    title: "Wellness & AI journal",
    body: "Log your mood, dump your thoughts, and get AI-generated daily reflections plus weekly emotion trends.",
  },
  {
    icon: "£",
    title: "Multi-currency finance",
    body: "Track spending across currencies, break it down by category, and watch your monthly limit in real time.",
  },
  {
    icon: "✓",
    title: "Tasks & habits",
    body: "Keep coursework and daily routines on track, with streaks that show your progress at a glance.",
  },
  {
    icon: "▲",
    title: "Goals & milestones",
    body: "Break big goals into ordered milestones and track completion percentage as you go.",
  },
  {
    icon: "☺",
    title: "Dorm directory",
    body: "Contact cards for the people around you — filter by boarding house, grade or language.",
  },
];

const FAQ_PREVIEW = [
  {
    q: "Is my data private?",
    a: "Yes — every record is scoped to your account with row-level security, so only you can see your tasks, journal, finances and contacts.",
  },
  {
    q: "Does it work on my phone?",
    a: "Forje Life is a mobile-first web app that works in any modern browser, and can be installed to your home screen like an app.",
  },
  {
    q: "Who is it built for?",
    a: "International boarding students who are juggling schoolwork, routines, budgets and life across two countries at once.",
  },
];

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) {
        router.replace("/dashboard");
      }
    });
    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-parchment">
      <header className="max-w-5xl mx-auto px-5 md:px-10 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="wax-seal !w-9 !h-9 text-base">F</div>
          <span className="font-display text-xl text-ink">Forje Life</span>
        </div>
        <nav aria-label="Primary" className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost !py-2 !px-4 text-sm">
            Sign in
          </Link>
          <Link href="/signup" className="btn-primary !py-2 !px-4 text-sm">
            Get started free
          </Link>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-5 md:px-10 pt-16 pb-14 text-center">
          <p className="font-mono text-xs tracking-widest text-brass uppercase mb-4">
            Built for international boarding students
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-ink leading-tight mb-5">
            Your life, kept in one ledger.
          </h1>
          <p className="text-inkSoft font-body text-lg max-w-2xl mx-auto mb-8">
            Tasks, habits, an AI-guided journal, multi-currency budgeting, your
            calendar, health, notes and dorm contacts — everything a boarding
            student juggles, organized in a single, calm home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup" className="btn-primary text-base !py-3 !px-7">
              Start your ledger — it&apos;s free
            </Link>
            <Link href="/login" className="btn-ghost text-base !py-3 !px-7">
              I already have an account
            </Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="stitch-divider" />
        </div>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-5 md:px-10 py-16">
          <h2 className="font-display text-3xl text-ink text-center mb-2">
            Everything, in one place
          </h2>
          <p className="text-inkSoft font-body text-center mb-10 max-w-xl mx-auto">
            Six modules that cover the parts of student life that usually live
            in six different apps.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-5">
                <div className="wax-seal !w-9 !h-9 text-base mb-3" aria-hidden="true">
                  {f.icon}
                </div>
                <h3 className="font-display text-lg text-ink mb-1">{f.title}</h3>
                <p className="text-inkSoft font-body text-sm">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-leather">
          <div className="max-w-4xl mx-auto px-5 md:px-10 py-14 text-center">
            <h2 className="font-display text-3xl text-surface mb-3">
              Ready to keep your ledger?
            </h2>
            <p className="text-surface/80 font-body mb-7 max-w-xl mx-auto">
              Create a free account in under a minute — no credit card, cancel
              anytime.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-surface text-leather font-body font-semibold rounded-lg px-7 py-3 hover:opacity-90 transition-opacity"
            >
              Get started free
            </Link>
          </div>
        </section>

        {/* FAQ preview */}
        <section className="max-w-3xl mx-auto px-5 md:px-10 py-16">
          <h2 className="font-display text-3xl text-ink text-center mb-8">
            Common questions
          </h2>
          <div className="flex flex-col gap-4">
            {FAQ_PREVIEW.map((item) => (
              <div key={item.q} className="card p-5">
                <h3 className="font-display text-lg text-ink mb-1">{item.q}</h3>
                <p className="text-inkSoft font-body text-sm">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link href="/faq" className="text-leather font-semibold underline font-body">
              Read the full FAQ
            </Link>
          </p>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
