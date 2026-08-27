import Link from "next/link";
import PublicFooter from "./PublicFooter";

export default function LegalDoc({ title, updated, children }) {
  return (
    <div className="min-h-screen bg-parchment">
      <header className="max-w-3xl mx-auto px-5 md:px-10 pt-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="wax-seal !w-9 !h-9 text-base">F</div>
          <span className="font-display text-xl text-ink">Forje Life</span>
        </Link>
        <Link href="/" className="btn-ghost !py-2 !px-4 text-sm">
          Back home
        </Link>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto px-5 md:px-10 py-12">
        <h1 className="font-display text-4xl text-ink mb-2">{title}</h1>
        <p className="text-inkSoft font-body text-sm mb-6">Last updated: {updated}</p>
        <div className="stitch-divider mb-8" />
        <article className="prose-legal font-body text-ink flex flex-col gap-6">
          {children}
        </article>
      </main>

      <PublicFooter />
    </div>
  );
}
