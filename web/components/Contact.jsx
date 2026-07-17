"use client";

import { profile } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section pb-24">
      <div className="container-page max-w-3xl">
        <Reveal>
          <h2 className="section-title">Contact</h2>
          <p className="max-w-md text-[0.98rem] leading-7 text-stone-muted">
            Best reached by email. Open to senior AI roles.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="link-accent">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.resume} className="link">
                Resume
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
