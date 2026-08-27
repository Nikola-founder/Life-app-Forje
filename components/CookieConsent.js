"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "forje_cookie_consent"; // "accepted" | "declined"
export const CONSENT_EVENT = "forje-cookie-consent-change";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (!existing) setVisible(true);
    } catch {
      // localStorage unavailable (e.g. privacy mode) — skip silently.
    }
  }, []);

  function choose(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-6 md:pb-6"
    >
      <div className="card mx-auto max-w-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 shadow-lift">
        <p className="text-sm font-body text-inkSoft flex-1">
          We use essential cookies to keep you signed in, and — only with your
          permission — analytics cookies to understand how Forje Life is used.
          See our{" "}
          <a href="/privacy" className="text-leather font-semibold underline">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="btn-ghost !py-2 !px-4 text-sm"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn-primary !py-2 !px-4 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export function getStoredConsent() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
