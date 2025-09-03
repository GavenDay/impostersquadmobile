"use client";

import Script from "next/script";
import { useEffect } from "react";

// This is a global variable from the AdSense script.
declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

export function AdBanner() {
  const adClient = "ca-pub-XXXXXXXXXXXXXXXX"; // <-- REPLACE WITH YOUR CLIENT ID
  const adSlot = "YYYYYYYYYY"; // <-- REPLACE WITH YOUR AD SLOT ID

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Failed to push to adsbygoogle", err);
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className="flex h-[90px] w-[728px] items-center justify-center bg-muted text-muted-foreground"
      >
        Google Ad Banner (728x90) - Ads disabled in development
      </div>
    );
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div className="w-[728px] h-[90px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
}
