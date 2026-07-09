"use client";
import { useState } from "react";

// Headshot with a graceful monogram fallback (light theme).
export default function Avatar() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-line">
        <span className="font-display text-lg text-muted">AR</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/profile.jpg"
      alt="Ayush Ranjan Roy"
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
