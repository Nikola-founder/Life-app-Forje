import { pageMetadata, absoluteUrl } from "@/lib/seo";
import LegalDoc from "@/components/LegalDoc";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Answers to common questions about Forje Life.",
  path: "/faq",
});

const FAQS = [
  {
    q: "What is Forje Life?",
    a: "Forje Life is a mobile-first web app for international boarding students that brings tasks, habits, an AI-guided journal, multi-currency finance, calendar, health tracking, notes and a dorm contact directory into one place.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Every table in our database uses row-level security tied to your account, so your tasks, journal, finances and contacts are only ever visible to you. See our Privacy Policy for full details.",
  },
  {
    q: "Do I need to download an app?",
    a: "No — Forje Life runs in your browser and is built mobile-first, so it works well on a phone. You can also add it to your home screen for an app-like experience.",
  },
  {
    q: "How does the AI journal work?",
    a: "When you log a mood or write a thought dump, Forje Life can generate a short reflection and, over time, a weekly summary of your emotional trends, powered by an AI model. It's a reflective aid, not medical advice.",
  },
  {
    q: "Can I track more than one currency?",
    a: "Yes. Finance entries store their original currency alongside a common base-currency amount, so you can track spending across your home and host countries and still see one overall picture.",
  },
  {
    q: "What happens to my data if I stop using the app?",
    a: "You can delete individual records yourself at any time, or email us to request full account deletion, which we complete within 30 days. See our Privacy Policy for details.",
  },
  {
    q: "Is Forje Life free?",
    a: "You can create an account and start using Forje Life at no cost. If pricing changes in the future, we'll communicate it clearly before anything is charged.",
  },
  {
    q: "I'm having trouble signing in — what should I do?",
    a: "Double-check your email and password, and make sure you've confirmed your account via the link we emailed when you signed up. If you're still stuck, contact us and we'll help you sort it out.",
  },
];

// FAQPage structured data helps search engines show these questions
// directly in results.
function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
    url: absoluteUrl("/faq"),
  };
}

export default function FaqPage() {
  return (
    <LegalDoc title="Frequently Asked Questions" updated="27 August 2026">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <div className="flex flex-col gap-3">
        {FAQS.map((item) => (
          <details key={item.q} className="card p-5 group">
            <summary className="font-display text-lg text-ink cursor-pointer list-none flex items-center justify-between gap-4">
              {item.q}
              <span className="text-brass shrink-0 transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="text-inkSoft font-body text-sm mt-3">{item.a}</p>
          </details>
        ))}
      </div>
      <p className="text-center mt-4">
        Still have a question?{" "}
        <a href="mailto:hello@forje.life" className="text-leather font-semibold underline">
          Email us
        </a>
        .
      </p>
    </LegalDoc>
  );
}
