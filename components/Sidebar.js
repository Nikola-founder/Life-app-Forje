"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: "◆" },
  { href: "/tasks", label: "Tasks", icon: "✓" },
  { href: "/habits", label: "Habits", icon: "↻" },
  { href: "/journal", label: "Journal", icon: "✎" },
  { href: "/goals", label: "Goals", icon: "▲" },
  { href: "/finance", label: "Finance", icon: "£" },
  { href: "/calendar", label: "Calendar", icon: "▦" },
  { href: "/health", label: "Health", icon: "♥" },
  { href: "/notes", label: "Notes", icon: "▤" },
  { href: "/contacts", label: "Contacts", icon: "☺" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-surface border-b border-parchmentDark sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="wax-seal !w-8 !h-8 text-sm">F</div>
          <span className="font-display text-lg text-ink">Forje Life</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="btn-ghost !py-1 !px-3"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surface border-b border-parchmentDark px-4 py-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block py-2 px-2 rounded-md font-body text-sm ${
                pathname === item.href ? "bg-parchmentDark text-ink font-semibold" : "text-inkSoft"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-2 mt-1 rounded-md text-brick font-body text-sm"
          >
            ⎋ Log out
          </button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 bg-surface border-r border-parchmentDark px-5 py-6">
        <div className="flex items-center gap-3 mb-8 px-1">
          <div className="wax-seal">F</div>
          <div>
            <div className="font-display text-xl text-ink leading-tight">Forje Life</div>
            <div className="text-xs text-inkSoft font-body">your life, kept</div>
          </div>
        </div>

        <div className="stitch-divider mb-6" />

        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-colors ${
                  active
                    ? "bg-leather text-surface font-semibold shadow-card"
                    : "text-inkSoft hover:bg-parchmentDark/60 hover:text-ink"
                }`}
              >
                <span className="w-4 text-center">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="stitch-divider mb-4" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm text-brick hover:bg-brick/10 transition-colors"
        >
          <span className="w-4 text-center">⎋</span>
          Log out
        </button>
      </aside>
    </>
  );
}
