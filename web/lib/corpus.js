/**
 * Grounded corpus for citation-only Site Brain.
 * Impact + tech only. Datadog/OTel on MxDR; multi-agent/MCP/HITL on GenAI.
 * No client process steps or jargon outsiders wouldn't parse.
 */

export const corpus = [
  {
    id: "role-now",
    title: "Current role",
    source: "About",
    tags: ["role", "accenture", "genai", "ai engineer", "multi-agent", "mcp", "hitl"],
    text:
      "Ayush Ranjan Roy is an AI Engineer at Accenture (GenAI & Data). He builds multi-agent systems for enterprise Order-to-Cash / Dispute & Deduction using LangGraph, MCP for governed tool access, human-in-the-loop review, FastAPI, and PostgreSQL — as a contributor on multi-engineer teams.",
  },
  {
    id: "agents-mcp-hitl",
    title: "Multi-agent systems, MCP, human-in-the-loop",
    source: "Work · GenAI",
    tags: ["multi-agent", "mcp", "hitl", "langgraph", "tools", "agent"],
    text:
      "On GenAI programs he implements multi-agent workflows in LangGraph, MCP for governed live tool execution, and human-in-the-loop so high-impact or uncertain steps wait for analyst approval. Datadog and OpenTelemetry are not claimed on this workstream.",
  },
  {
    id: "dd-workflow",
    title: "Order-to-Cash / Dispute & Deduction agents",
    source: "Work · GenAI",
    tags: ["dispute", "deduction", "order-to-cash", "langgraph", "hitl", "agent", "o2c"],
    text:
      "He contributes multi-agent systems for enterprise Order-to-Cash and Dispute & Deduction workflows using LangGraph, MCP, human review, FastAPI, and PostgreSQL. Public descriptions stay at domain and tech level only.",
  },
  {
    id: "inference",
    title: "Multi-model inference",
    source: "Work · GenAI",
    tags: ["inference", "latency", "tokens", "cost", "async", "claude", "gpt", "azure"],
    text:
      "He builds async multi-model inference (Claude, GPT, Azure) with concurrency control, retries, routing, and latency / token / cost metrics for evaluation — separate from Datadog / OpenTelemetry product monitoring on MxDR.",
  },
  {
    id: "platform-past",
    title: "Platform engineering background",
    source: "Experience · Platform",
    tags: ["platform", "terraform", "aws", "security", "siem", "secrets", "redis", "mxdr"],
    text:
      "From 2023–2025 he was a Platform Engineer on Accenture’s MxDR / Adaptive MxDR security product on AWS: Terraform, Redis shared services, CI/CD, runtime upgrades, Secrets Manager and IAM, and production debugging.",
  },
  {
    id: "mxdr-telemetry",
    title: "MxDR observability · Datadog & OpenTelemetry",
    source: "Experience · Platform",
    tags: ["datadog", "opentelemetry", "otel", "telemetry", "siem", "mtls", "observability", "mxdr"],
    text:
      "Production observability on MxDR / Adaptive MxDR: OpenTelemetry health paths, Datadog for monitoring and debugging, mTLS telemetry into enterprise SIEMs. Not attributed to the GenAI multi-agent workstream.",
  },
  {
    id: "security-controls",
    title: "Security & platform controls",
    source: "Experience · Security",
    tags: ["security", "secrets", "iam", "mtls", "siem", "proxy"],
    text:
      "Platform security work includes Secrets Manager migrations, IAM updates, mTLS health paths, SIEM-bound telemetry, runtime hardening, and restricted-egress proxy automation.",
  },
  {
    id: "mxdr-platform",
    title: "MxDR / AMxDR AWS modernization",
    source: "Experience · Platform",
    tags: ["mxdr", "amxdr", "adaptive", "aws", "terraform", "platform", "modernization"],
    text:
      "Platform Engineer on Accenture MxDR / Adaptive MxDR: multi-environment Terraform, Redis metadata services, CI/CD, secrets/IAM, runtime upgrades, Datadog/OpenTelemetry observability, multi-tenant production ops.",
  },
  {
    id: "rag-helixops",
    title: "HelixOps",
    source: "Work · HelixOps",
    tags: ["helixops", "rag", "incident", "rca", "open source", "hitl"],
    text:
      "HelixOps is an open-source incident IDE: multi-agent RCA with RAG over sample runbooks, then human-approved remediation. Mock-safe by default. github.com/AyushRanjanRoy-01/HelixOps.",
  },
  {
    id: "rag-raggym",
    title: "RAGGym",
    source: "Work · RAGGym",
    tags: ["raggym", "rag", "evaluation", "open source"],
    text:
      "RAGGym is a hands-on RAG platform: swappable models and stores, self-correction, evaluation harness. Live: rag-gym.streamlit.app. Code: github.com/AyushRanjanRoy-01/RaGGym-Chatbot-CLI.",
  },
  {
    id: "cert-claude",
    title: "Claude Certified Architect",
    source: "Certifications",
    tags: ["claude", "anthropic", "certification"],
    text:
      "Claude Certified Architect — Foundations (Anthropic, May 2026).",
  },
  {
    id: "education",
    title: "Education",
    source: "About · Education",
    tags: ["education", "vit", "coursework"],
    text:
      "B.Tech Electronics and Communication Engineering, VIT Chennai (2019–2023). Coursework includes AI, ML, cryptography, information security, DSA, operating systems.",
  },
  {
    id: "availability",
    title: "Availability",
    source: "Contact",
    tags: ["hire", "roles", "available", "contact", "email"],
    text:
      "Available for senior AI roles. royayush0611@gmail.com · linkedin.com/in/ayush-ranjan-roy · github.com/AyushRanjanRoy-01 · /resume.pdf.",
  },
  {
    id: "differentiators",
    title: "How he works",
    source: "About",
    tags: ["philosophy", "production", "systems", "platform"],
    text:
      "Multi-agent systems, MCP tool governance, human-in-the-loop, APIs, plus a platform foundation on AWS/Terraform and MxDR observability — tech and outcomes, without client process detail.",
  },
];

const STOP = new Set(
  "a an the and or of to in for on with by is are was were be been being this that those these it its as at from into about over under not no yes how what when where who why which can could should would will your my our their".split(
    " "
  )
);

function tokens(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9#+./\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

export function searchCorpus(query, limit = 4) {
  const q = tokens(query);
  if (!q.length) return [];

  const scored = corpus.map((doc) => {
    const bag = tokens(`${doc.title} ${doc.text} ${doc.tags.join(" ")}`);
    let score = 0;
    for (const t of q) {
      if (bag.includes(t)) score += 2;
      if (doc.tags.some((tag) => tag.includes(t) || t.includes(tag))) score += 3;
      if (doc.title.toLowerCase().includes(t)) score += 2;
    }
    const lower = query.toLowerCase();
    if (lower.includes("rag") && bag.includes("rag")) score += 4;
    if (lower.includes("helix") && bag.includes("helixops")) score += 5;
    if (lower.includes("mcp") && bag.includes("mcp")) score += 5;
    if (
      (lower.includes("datadog") || lower.includes("opentelemetry") || lower.includes("otel")) &&
      doc.id === "mxdr-telemetry"
    )
      score += 6;
    if (
      (lower.includes("hire") || lower.includes("available") || lower.includes("contact")) &&
      doc.id === "availability"
    )
      score += 6;
    if (lower.includes("platform") || lower.includes("terraform") || lower.includes("secrets")) {
      if (doc.id === "platform-past" || doc.id === "security-controls" || doc.id === "mxdr-telemetry")
        score += 3;
    }
    if (
      lower.includes("agent") ||
      lower.includes("hitl") ||
      lower.includes("human") ||
      lower.includes("mcp")
    ) {
      if (doc.id === "agents-mcp-hitl" || doc.id === "role-now" || doc.id === "dd-workflow") score += 4;
    }
    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.doc);
}
