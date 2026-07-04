"use client";
import { useState } from "react";
import Icon from "@/components/Icon";
import { profile } from "@/lib/content";

// Set this to your Formspree form id (https://formspree.io) to enable AJAX send.
// While it's the placeholder, the form gracefully falls back to a mailto: draft.
const FORMSPREE_ID = "";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!FORMSPREE_ID) {
      // Fallback: open the user's mail client with the message prefilled.
      const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        "Portfolio enquiry from " + (data.name || "")
      )}&body=${body}`;
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const socials = [
    { name: "GitHub", href: profile.github, icon: "github" },
    { name: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
    { name: "Résumé", href: profile.resume, icon: "download" },
  ];

  return (
    <section id="contact" className="border-t border-line px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-content">
        <div className="reveal mb-3 font-mono text-[12.5px] uppercase tracking-[0.2em] text-accent-soft">
          Contact
        </div>
        <h2 className="reveal max-w-2xl text-3xl font-semibold sm:text-4xl">
          Let&apos;s build something reliable.
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Left: direct */}
          <div className="reveal">
            <p className="max-w-md text-[15.5px] leading-relaxed text-muted">
              Open to senior Gen AI / full-stack roles and interesting collaborations. The fastest way to reach me:
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2.5 font-mono text-[17px] text-accent-soft transition-colors hover:text-accent"
            >
              <Icon name="mail" size={19} /> {profile.email}
            </a>
            <div className="mt-7 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2.5 text-[13.5px] text-muted transition-colors hover:border-accent/60 hover:text-accent-soft"
                >
                  <Icon name={s.icon} size={16} /> {s.name}
                </a>
              ))}
            </div>
            <div className="mt-7 flex items-center gap-2 text-[13.5px] text-dim">
              <Icon name="mapPin" size={15} className="text-accent/70" /> {profile.location}
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={onSubmit} className="reveal rounded-2xl border border-line bg-surface/50 p-6">
            <div className="grid gap-4">
              <input
                name="name"
                required
                placeholder="Your name"
                aria-label="Your name"
                className="rounded-lg border border-line bg-bg/60 px-4 py-3 text-[14.5px] text-ink placeholder:text-dim focus:border-accent"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Your email"
                aria-label="Your email"
                className="rounded-lg border border-line bg-bg/60 px-4 py-3 text-[14.5px] text-ink placeholder:text-dim focus:border-accent"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="What would you like to build?"
                aria-label="Your message"
                className="resize-none rounded-lg border border-line bg-bg/60 px-4 py-3 text-[14.5px] text-ink placeholder:text-dim focus:border-accent"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-[14.5px] font-medium text-bg transition-colors hover:bg-accent-soft disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent — thank you!" : "Send message"}
                {status === "idle" && <Icon name="arrowRight" size={16} />}
              </button>
              {status === "error" && (
                <p className="text-[13px] text-red-400">Something went wrong — email me directly instead.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
