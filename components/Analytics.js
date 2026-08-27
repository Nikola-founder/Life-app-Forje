"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, getStoredConsent } from "./CookieConsent";

// Set NEXT_PUBLIC_GA_ID in your environment to enable Google Analytics 4.
// Nothing loads until (a) that env var is set AND (b) the visitor has
// accepted cookies via the consent banner — no tracking script ever ships
// to a visitor who hasn't opted in.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    setEnabled(getStoredConsent() === "accepted");

    function onChange(e) {
      setEnabled(e.detail === "accepted");
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!GA_ID || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
