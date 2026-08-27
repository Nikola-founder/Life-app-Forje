import { pageMetadata } from "@/lib/seo";

// This is your personal goals — it requires sign-in, so it's kept out
// of search results (see robots: noIndex below) while still getting a
// proper tab title.
export const metadata = pageMetadata({
  title: "Goals",
  path: "/goals",
  noIndex: true,
});

export default function GoalsLayout({ children }) {
  return children;
}
