"use client";
import { useState } from "react";

// Shows the headshot; falls back to a gradient monogram if the image is missing.
export default function Avatar() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/profile.jpg"
          alt="Ayush Ranjan Roy"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent/25 to-[#4C9BFF]/15">
          <span className="bg-gradient-to-br from-accent-soft to-[#4C9BFF] bg-clip-text font-display text-6xl font-bold text-transparent">
            AR
          </span>
        </div>
      )}
    </div>
  );
}
