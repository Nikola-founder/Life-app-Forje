import { absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();

  // Only public, indexable routes belong here. Authenticated app pages
  // (dashboard, tasks, journal, etc.) are user-specific and intentionally
  // excluded — see app/robots.js.
  const routes = ["/", "/faq", "/privacy", "/terms", "/login", "/signup"];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.6,
  }));
}
