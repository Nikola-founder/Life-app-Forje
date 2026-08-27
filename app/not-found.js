import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment px-4">
      <div className="w-full max-w-md text-center">
        <div className="wax-seal mx-auto mb-6 !w-16 !h-16 !text-xl">F</div>
        <p className="font-mono text-sm tracking-widest text-brass uppercase mb-2">Error 404</p>
        <h1 className="font-display text-4xl text-ink mb-3">This page isn&apos;t in the ledger</h1>
        <p className="text-inkSoft font-body mb-8">
          The page you&apos;re looking for doesn&apos;t exist, moved, or the link
          might be broken.
        </p>
        <div className="stitch-divider mb-8" />
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/faq" className="btn-ghost">
            Visit the FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
