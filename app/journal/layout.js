import { pageMetadata } from "@/lib/seo";

// This is your personal journal — it requires sign-in, so it's kept out
// of search results (see robots: noIndex below) while still getting a
// proper tab title.
export const metadata = pageMetadata({
  title: "Journal",
  path: "/journal",
  noIndex: true,
});

export default function JournalLayout({ children }) {
  return children;
}
