import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to your Forje Life account.",
  path: "/login",
});

export default function LoginLayout({ children }) {
  return children;
}
