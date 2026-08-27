import { pageMetadata } from "@/lib/seo";

// This is your personal finance — it requires sign-in, so it's kept out
// of search results (see robots: noIndex below) while still getting a
// proper tab title.
export const metadata = pageMetadata({
  title: "Finance",
  path: "/finance",
  noIndex: true,
});

export default function FinanceLayout({ children }) {
  return children;
}
