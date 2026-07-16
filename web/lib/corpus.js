/**
 * Grounded corpus for the citation-only Site Brain.
 * Compliance: no client process detail, internal tool codenames, or proprietary playbooks.
 * Industry domain names (Dispute & Deduction, Order-to-Cash) are OK.
 */

export const corpus = [
  {
    id: "role-now",
    title: "Current role",
    source: "About",
    tags: ["role", "accenture", "genai", "ai engineer", "work"],
    text:
      "Ayush Ranjan Roy is an AI Engineer at Accenture (GenAI & Data) building production multi-agent systems for enterprise Order-to-Cash domains, including Dispute & Deduction. He works with agents, RAG, APIs, workflows, cloud infrastructure, and human-in-the-loop controls.",
  },
  {
    id: "platform-past",
    title: "Platform engineering background",
    source: "Experience · Platform",
    tags: ["platform", "terraform", "aws", "security", "siem", "secrets", "redis"],
    text:
      "Before GenAI he spent ~2 years as a Platform Engineer on Accenture’s security-product cloud platform: Terraform modernization, Redis-backed shared services, CI/CD migration, AWS runtime upgrades, Secrets Manager migrations, mTLS telemetry into enterprise SIEMs, restricted-egress proxy automation, and production incident debugging.",
  },
  {
    id: "dd-workflow",
    title: "Dispute & Deduction · Order-to-Cash agents",
    source: "Work · GenAI",
    tags: ["dispute", "deduction", "order-to-cash", "langgraph", "hitl", "agent", "o2c"],
    text:
      "He contributes to multi-agent systems for enterprise Dispute & Deduction and Order-to-Cash workflows using LangGraph orchestration, durable workflow state, APIs, HITL control points, and production-minded deployment practices. Public descriptions stay at the industry-domain level only.",
  },
  {
    id: "rag-helixops",
    title: "HelixOps RAG-assisted RCA",
    source: "Work · HelixOps",
    tags: ["helixops", "rag", "incident", "rca", "remediation", "rbac", "open source"],
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
    id: "mcp-obs",
    title: "MCP & agent observability",
    source: "Work · GenAI",
    tags: ["mcp", "observability", "tools", "governance", "otel"],
    text:
      "He implements MCP-style governed tool access and operator-facing agent observability so decisions and retrieval context stay reviewable, with OpenTelemetry / Datadog audit surfaces.",
  },
  {
    id: "benchmarks",
    title: "Document inference benchmarks",
    source: "Work · Extraction",
    tags: ["benchmark", "latency", "documents", "inference", "rag"],
    text:
      "Controlled internal benchmarks only (not client SLAs or production throughput): multi-model inference experiments with retries and telemetry on multi-page documents.",
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
    tags: ["philosophy", "production", "prompt", "systems"],
    text:
      "His differentiator is not prompt engineering alone. It is combining enterprise workflows, AI agents, RAG, APIs, cloud infrastructure, human-in-the-loop controls, and production deployment into systems teams can run — described without client-specific process detail.",
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
    if (
      (lower.includes("hire") || lower.includes("available") || lower.includes("contact")) &&
      doc.id === "availability"
    )
      score += 6;
    if (lower.includes("platform") || lower.includes("terraform") || lower.includes("secrets")) {
      if (doc.id === "platform-past" || doc.id === "security-controls") score += 3;
    }
    if (lower.includes("dispute") || lower.includes("deduction") || lower.includes("order-to-cash") || lower.includes("o2c")) {
      if (doc.id === "dd-workflow") score += 5;
    }
    return { doc, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.doc);
}

export function answerFromCorpus(query) {
  const hits = searchCorpus(query, 3);
  if (!hits.length) {
    return {
      answer:
        "Not in my corpus. Try agents, RAG, HelixOps, RAGGym, platform engineering, Dispute & Deduction / Order-to-Cash at a high level, or contact.",
      citations: [],
      refused: true,
    };
  }

  return {
    answer: hits.map((h) => h.text).join(" "),
    citations: hits.map((h) => ({ id: h.id, title: h.title, source: h.source })),
    refused: false,
  };
}

export const SUGGESTED_QUERIES = [
  "What do you build with RAG?",
  "Tell me about HelixOps",
  "Dispute & Deduction / Order-to-Cash agents?",
  "Platform and security foundation?",
  "Are you available for senior AI roles?",
];
