import { pageMetadata } from "@/lib/seo";

// This is your personal health — it requires sign-in, so it's kept out
// of search results (see robots: noIndex below) while still getting a
// proper tab title.
export const metadata = pageMetadata({
  title: "Health",
  path: "/health",
  noIndex: true,
});

export default function HealthLayout({ children }) {
  return children;
}
