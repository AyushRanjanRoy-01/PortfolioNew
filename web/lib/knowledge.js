import { profile, about, experience, projects } from "@/lib/content";

// Builds the grounding corpus for the "ask my work" agent + MCP tools.
// Small enough to pass as context (no vector DB needed).
export function buildKnowledge() {
  const out = [];
  out.push(`${profile.name} — ${profile.role}, ${profile.location}.`);
  out.push(`Contact: ${profile.email} · GitHub ${profile.github} · LinkedIn ${profile.linkedin}.`);

  out.push(`\nABOUT\n${about.bio.join(" ")}`);

  out.push(`\nSKILLS`);
  for (const [group, items] of Object.entries(about.skills)) {
    out.push(`- ${group}: ${items.join(", ")}`);
  }

  out.push(`\nEXPERIENCE`);
  for (const e of experience) {
    out.push(`* ${e.role} — ${e.company} (${e.period})`);
    for (const p of e.points) out.push(`  - ${p}`);
  }

  out.push(`\nPROJECTS`);
  for (const p of projects) {
    out.push(`* ${p.title} [${p.kind}] — ${p.blurb} Stack: ${p.stack.join(", ")}.` +
      (p.github ? ` Code: ${p.github}.` : "") +
      (p.live ? ` Demo: ${p.live}.` : ""));
  }
  return out.join("\n");
}
