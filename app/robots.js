import { siteConfig, absoluteUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/privacy", "/terms", "/faq", "/login", "/signup"],
        // Everything behind auth is personal data and has nothing to gain
        // from being indexed — keep crawlers out of it.
        disallow: [
          "/dashboard",
          "/tasks",
          "/habits",
          "/journal",
          "/goals",
          "/finance",
          "/calendar",
          "/health",
          "/notes",
          "/contacts",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
