// Central SEO/site configuration.
// Set NEXT_PUBLIC_SITE_URL in your environment (e.g. https://forje.life) before
// deploying — every canonical URL, sitemap entry, and social preview is built
// from this value. It falls back to localhost so local `next dev` still works.

export const siteConfig = {
  name: "Forje Life",
  shortName: "Forje",
  tagline: "Your life, kept in one ledger.",
  description:
    "Forje Life is the all-in-one planner for international boarding students — tasks, habits, an AI-guided journal, multi-currency budgeting, calendar, health tracking, notes, and your dorm contacts in one place.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  // Update to your real support/contact address before launch.
  contactEmail: "hello@forje.life",
  twitterHandle: "@forjelife",
};

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

// Reusable metadata builder for individual routes. Pages that are part of the
// authenticated app (dashboard, tasks, etc.) pass noIndex: true so search
// engines never try to index a page that's just an auth-gated shell.
export function pageMetadata({ title, description, path = "/", noIndex = false }) {
  const url = absoluteUrl(path);
  const desc = description || siteConfig.description;
  return {
    title,
    description: desc,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description: desc,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description: desc,
      site: siteConfig.twitterHandle,
    },
  };
}
