import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export default function PublicFooter() {
  return (
    <footer className="border-t border-parchmentDark mt-16">
      <div className="max-w-5xl mx-auto px-5 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="wax-seal !w-8 !h-8 text-sm">F</div>
          <span className="font-display text-lg text-ink">{siteConfig.name}</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-body text-inkSoft">
          <Link href="/faq" className="hover:text-ink">FAQ</Link>
          <Link href="/privacy" className="hover:text-ink">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-ink">Terms of Service</Link>
          <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-ink">Contact</a>
        </nav>
        <p className="text-xs font-body text-inkSoft/80">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
