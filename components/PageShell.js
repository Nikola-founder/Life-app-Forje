"use client";

import Sidebar from "./Sidebar";
import AuthGuard from "./AuthGuard";

export default function PageShell({ title, subtitle, children }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 px-5 py-6 md:px-10 md:py-10 max-w-5xl mx-auto w-full">
          <header className="mb-6">
            <h1 className="font-display text-3xl md:text-4xl text-ink">{title}</h1>
            {subtitle && <p className="text-inkSoft font-body mt-1">{subtitle}</p>}
            <div className="stitch-divider mt-4" />
          </header>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
