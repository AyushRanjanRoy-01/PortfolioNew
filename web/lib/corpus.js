/**
 * Grounded corpus for the citation-only Site Brain.
 * Compliance: no client process detail, internal product codenames, or proprietary playbooks.
 * Correct split: Datadog / OpenTelemetry on MxDR; multi-agent / MCP / HITL on GenAI.
 */

export const corpus = [
  {
    id: "role-now",
    title: "Current role",
    source: "About",
    tags: ["role", "accenture", "genai", "ai engineer", "multi-agent", "mcp", "hitl"],
    text:
      "Ayush Ranjan Roy is an AI Engineer at Accenture (GenAI & Data). He builds multi-agent systems for enterprise Order-to-Cash domains, including Dispute & Deduction: LangGraph orchestration, MCP for governed tool access, human-in-the-loop controls, FastAPI services, and PostgreSQL-backed workflow state — as a contributor on multi-engineer teams.",
  },
  {
    id: "agents-mcp-hitl",
    title: "Multi-agent systems, MCP, human-in-the-loop",
    source: "Work · GenAI",
    tags: ["multi-agent", "mcp", "hitl", "langgraph", "tools", "approvals", "agent"],
    text:
      "On GenAI programs he implements multi-agent workflows in LangGraph, MCP servers/bindings for governed live tool execution, and human-in-the-loop at uncertain classification, prioritization, missing documents, approvals, and failure recovery (UI and email continuation). Product APM (Datadog / OpenTelemetry) is not claimed on this workstream.",
  },
  {
    id: "dd-workflow",
    title: "Dispute & Deduction · Order-to-Cash agents",
    source: "Work · GenAI",
    tags: ["dispute", "deduction", "order-to-cash", "langgraph", "hitl", "agent", "o2c"],
    text:
      "He contributes multi-agent components for Dispute & Deduction and Order-to-Cash workflows: intake, prioritization, document chase, approvals, and case continuation. Descriptions stay at the industry-domain level only — no client process codenames.",
  },
  {
    id: "inference",
    title: "Multi-model inference",
    source: "Work · GenAI",
    tags: ["inference", "latency", "tokens", "cost", "async", "claude", "gpt", "azure"],
    text:
      "He builds async multi-model inference (Claude, GPT, Azure) with concurrency control, retries, routing, and latency / token / cost instrumentation for benchmarking and evaluation. That is LLMOps-style metrics, separate from Datadog / OpenTelemetry product monitoring on MxDR.",
  },
  {
    id: "platform-past",
    title: "Platform engineering background",
    source: "Experience · Platform",
    tags: ["platform", "terraform", "aws", "security", "siem", "secrets", "redis", "mxdr"],
    text:
      "From 2023–2025 he was a Platform Engineer on Accenture’s MxDR / Adaptive MxDR (AMxDR) security product on AWS: Terraform modernization, Redis-backed shared services, CI/CD, runtime upgrades, Secrets Manager and IAM, restricted-egress proxy automation, and production incident debugging.",
  },
  {
    id: "mxdr-telemetry",
    title: "MxDR observability · Datadog & OpenTelemetry",
    source: "Experience · Platform",
    tags: ["datadog", "opentelemetry", "otel", "telemetry", "siem", "mtls", "observability", "mxdr"],
    text:
      "Production telemetry and observability belonged to the MxDR / Adaptive MxDR platform work: OpenTelemetry / gRPC health paths, Datadog for monitoring and debugging, mTLS synthetic health into enterprise SIEMs, CloudWatch for Lambda/service debugging. These tools are not attributed to the GenAI multi-agent workstream.",
  },
  {
    id: "security-controls",
    title: "Security & platform controls",
    source: "Experience · Security",
    tags: ["security", "secrets", "iam", "mtls", "codeql", "siem", "proxy"],
    text:
      "Platform security work includes Secrets Manager migrations, IAM updates, mTLS on synthetic health paths, SIEM-bound telemetry, CodeQL/Dependabot remediation, runtime hardening, and restricted-egress proxy automation. He does not claim proprietary client control catalogs or AI red-team product ownership.",
  },
  {
    id: "mxdr-platform",
    title: "MxDR / AMxDR AWS modernization",
    source: "Experience · Platform",
    tags: ["mxdr", "amxdr", "adaptive", "aws", "terraform", "platform", "modernization"],
    text:
      "As Platform Engineer on Accenture MxDR / Adaptive MxDR (AMxDR), he contributed to modernizing the product’s AWS architecture: multi-environment Terraform, shared Redis metadata services, CI/CD, secrets/IAM, runtime upgrades, Datadog/OpenTelemetry observability, and multi-tenant production operations.",
  },
  {
    id: "rag-helixops",
    title: "HelixOps RAG-assisted RCA",
    source: "Work · HelixOps",
    tags: ["helixops", "rag", "incident", "rca", "remediation", "rbac", "open source", "hitl"],
    text:
      "HelixOps is an open-source AI-SRE Incident IDE: multi-agent RCA with RAG over sample runbooks, then human-approved remediation. Defaults include mock-safe integrations, JWT/RBAC, and decision traces. Code: github.com/AyushRanjanRoy-01/HelixOps.",
  },
  {
    id: "rag-raggym",
    title: "RAGGym learning platform",
    source: "Work · RAGGym",
    tags: ["raggym", "rag", "qdrant", "ragas", "evaluation", "learning", "open source"],
    text:
      "RAGGym is a hands-on RAG learning platform: swappable LLM/embeddings/vector store, self-correcting retrieval, RAGAS evaluation, AI-graded practice mode. Live demo: rag-gym.streamlit.app. Code: github.com/AyushRanjanRoy-01/RaGGym-Chatbot-CLI.",
  },
  {
    id: "cert-claude",
    title: "Claude Certified Architect",
    source: "Certifications",
    tags: ["claude", "anthropic", "certification", "certified", "architect"],
    text:
      "Claude Certified Architect — Foundations (Anthropic, May 2026). Production-oriented Claude architecture fundamentals.",
  },
  {
    id: "education",
    title: "Education & coursework",
    source: "About · Education",
    tags: ["education", "vit", "coursework", "ai", "security", "dsa"],
    text:
      "B.Tech Electronics and Communication Engineering, VIT Chennai (2019–2023). Relevant coursework: Artificial Intelligence, Essentials of Machine Learning, Cryptography and Network Security, Information Security Analysis and Audit, Data Structures and Algorithms, Operating Systems.",
  },
  {
    id: "availability",
    title: "Availability",
    source: "Contact",
    tags: ["hire", "roles", "available", "contact", "email"],
    text:
      "Available for senior AI roles. Contact: royayush0611@gmail.com · LinkedIn linkedin.com/in/ayush-ranjan-roy · GitHub github.com/AyushRanjanRoy-01 · Resume at /resume.pdf.",
  },
  {
    id: "differentiators",
    title: "How he works",
    source: "About",
    tags: ["philosophy", "production", "systems", "platform"],
    text:
      "Differentiator is not prompt engineering alone: multi-agent systems, MCP tool governance, human-in-the-loop, APIs, and a platform/security engineering foundation (AWS, Terraform, production observability on MxDR) — described without client-specific process detail.",
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
