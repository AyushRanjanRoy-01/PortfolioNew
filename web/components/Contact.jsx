"use client";

import { profile } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-page">
        <Reveal>
          <div className="glass-strong max-w-2xl p-8 sm:p-10">
            <p className="section-label">Contact</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
              Get in touch
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Available for senior AI roles. Happy to talk about agents, retrieval, platform work,
              or open source.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                GitHub
              </a>
              <a href={profile.resume} className="btn btn-ghost">
                Resume
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
