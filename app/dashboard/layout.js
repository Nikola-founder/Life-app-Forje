import { pageMetadata } from "@/lib/seo";

// This is your personal dashboard — it requires sign-in, so it's kept out
// of search results (see robots: noIndex below) while still getting a
// proper tab title.
export const metadata = pageMetadata({
  title: "Dashboard",
  path: "/dashboard",
  noIndex: true,
});

export default function DashboardLayout({ children }) {
  return children;
}
