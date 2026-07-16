"use client";

import { useEffect, useRef } from "react";

export default function Ambient() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }

    let raf = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="ambient-orb a" />
        <div className="ambient-orb b" />
        <div className="ambient-orb c" />
        <div className="ambient-grid" />
        <div className="noise" />
      </div>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    </>
  );
}
