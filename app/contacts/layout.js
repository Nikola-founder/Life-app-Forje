import { pageMetadata } from "@/lib/seo";

// This is your personal contacts — it requires sign-in, so it's kept out
// of search results (see robots: noIndex below) while still getting a
// proper tab title.
export const metadata = pageMetadata({
  title: "Contacts",
  path: "/contacts",
  noIndex: true,
});

export default function ContactsLayout({ children }) {
  return children;
}
