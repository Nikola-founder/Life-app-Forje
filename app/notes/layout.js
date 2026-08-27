import { pageMetadata } from "@/lib/seo";

// This is your personal notes — it requires sign-in, so it's kept out
// of search results (see robots: noIndex below) while still getting a
// proper tab title.
export const metadata = pageMetadata({
  title: "Notes",
  path: "/notes",
  noIndex: true,
});

export default function NotesLayout({ children }) {
  return children;
}
