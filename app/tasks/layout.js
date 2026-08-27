import { pageMetadata } from "@/lib/seo";

// This is your personal tasks — it requires sign-in, so it's kept out
// of search results (see robots: noIndex below) while still getting a
// proper tab title.
export const metadata = pageMetadata({
  title: "Tasks",
  path: "/tasks",
  noIndex: true,
});

export default function TasksLayout({ children }) {
  return children;
}
