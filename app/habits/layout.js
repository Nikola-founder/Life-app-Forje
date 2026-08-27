import { pageMetadata } from "@/lib/seo";

// This is your personal habits — it requires sign-in, so it's kept out
// of search results (see robots: noIndex below) while still getting a
// proper tab title.
export const metadata = pageMetadata({
  title: "Habits",
  path: "/habits",
  noIndex: true,
});

export default function HabitsLayout({ children }) {
  return children;
}
