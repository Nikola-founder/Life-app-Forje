import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Create your account",
  description: "Create a free Forje Life account and start your ledger.",
  path: "/signup",
});

export default function SignupLayout({ children }) {
  return children;
}
