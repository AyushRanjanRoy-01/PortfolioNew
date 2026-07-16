/**
 * Grounded corpus for the citation-only Site Brain.
 * Answers must only recombine these chunks — never invent.
 */

export const corpus = [
  {
    id: "role-now",
    title: "Current role",
    source: "About",
    tags: ["role", "accenture", "genai", "ai engineer", "work"],
    text:
      "Ayush Ranjan Roy is an AI Engineer at Accenture (GenAI & Data) building production multi-agent systems for enterprise finance workflows. He combines agents, RAG retrieval, APIs, queues, databases, cloud infrastructure, security controls, human approvals, and failure handling.",
  },
  {
    id: "platform-past",
    title: "Platform engineering background",
    source: "Experience · Platform",
    tags: ["platform", "mxdr", "terraform", "aws", "security", "siem", "secrets"],
    text:
      "Before GenAI he spent ~2 years as a Platform Engineer on Accenture’s MxDR / Adaptive MxDR security ecosystem: Terraform modernization, Redis/ElastiCache Common Cache ownership, Jenkins→GitHub Actions, AWS runtime upgrades, migration of 64 Secrets Manager secrets, mTLS telemetry into customer SIEMs, Squid Proxy enablement, and live production incident debugging.",
  },
  {
    id: "dd-workflow",
    title: "Dispute & Deduction agentic workflow",
    source: "Work · GenAI",
    tags: ["dispute", "deduction", "langgraph", "hitl", "approval", "finance", "agent"],
    text:
      "He built components of a greenfield Dispute & Deduction agentic workflow (Order-to-Cash): email/attachment ingestion, categorization, prioritization with human fallback, cross-team handoffs, UI and email continuation, OAuth approval APIs (none / L1 / L1+L2), and case continuity. Status: production deployed, MVP ready, customer onboarding pending.",
  },
  {
    id: "rag-helixops",
    title: "HelixOps RAG-assisted RCA",
    source: "Work · HelixOps",
    tags: ["helixops", "rag", "incident", "rca", "remediation", "rbac", "open source"],
    text:
      "HelixOps is an open-source AI-SRE Incident IDE: multi-agent RCA with RAG over runbooks/postmortems, then human-approved remediation. Defaults include mock-safe integrations, JWT/RBAC, and decision traces. Code: github.com/AyushRanjanRoy-01/HelixOps.",
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
    id: "mcp-watchtower",
    title: "MCP & Watchtower",
    source: "Work · GenAI",
    tags: ["mcp", "watchtower", "observability", "tools", "governance"],
    text:
      "He extended Watchtower for agent/workflow visibility and MCP-based governed tool access patterns for live operational context, with OpenTelemetry / Datadog audit surfaces so operators see decisions and retrieval context.",
  },
  {
    id: "benchmarks",
    title: "Document inference benchmarks",
    source: "Work · Extraction",
    tags: ["benchmark", "latency", "documents", "inference", "rag"],
    text:
      "Controlled internal benchmarks (not customer throughput): validated 100+ documents, up to 50 pages; multi-page latency reduced from approximately 7 minutes to 2.5–3 minutes in testing with async multi-model inference, retries, and telemetry.",
  },
  {
    id: "security-controls",
    title: "Security & controls foundation",
    source: "Experience · Security",
    tags: ["security", "secrets", "iam", "mtls", "codeql", "siem", "proxy"],
    text:
      "Security-adjacent production work includes AWS Secrets Manager migrations, IAM policy updates, mTLS on synthetic health paths, SIEM-bound telemetry, CodeQL/Dependabot remediation, Docker/runtime hardening, and one-click Squid Proxy enablement for restricted-egress enterprises. Direct AI red-teaming / prompt-injection ownership is not claimed.",
  },
  {
    id: "education",
    title: "Education & coursework",
    source: "About · Education",
    tags: ["education", "vit", "coursework", "ai", "security", "dsa"],
    text:
      "B.Tech Electronics and Communication Engineering, VIT Chennai (2019–2023). Relevant coursework: Artificial Intelligence, Essentials of Machine Learning, Cryptography and Network Security, Information Security Analysis and Audit, Data Structures and Algorithms, Operating Systems. CGPA is intentionally not listed.",
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
      "His differentiator is not prompt engineering alone. It is combining enterprise workflows, AI agents, RAG, APIs, queues, databases, cloud infrastructure, security controls, human approvals, failure handling, and production deployment into systems teams can run.",
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

/**
 * Rank corpus chunks for a query. Pure keyword/overlap scoring — no LLM.
 */
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
    // phrase-ish boosts
    const lower = query.toLowerCase();
    if (lower.includes("rag") && bag.includes("rag")) score += 4;
    if (lower.includes("helix") && bag.includes("helixops")) score += 5;
    if ((lower.includes("hire") || lower.includes("available") || lower.includes("contact")) && doc.id === "availability")
      score += 6;
    if (lower.includes("mxdr") || lower.includes("platform")) {
      if (doc.id === "platform-past") score += 4;
    }
    return { doc, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.doc);
}

/**
 * Build a grounded answer from top chunks. Never invents beyond them.
 */
export function answerFromCorpus(query) {
  const hits = searchCorpus(query, 3);
  if (!hits.length) {
    return {
      answer:
        "Not in my corpus. Try asking about agents, RAG, HelixOps, RAGGym, MxDR/platform work, HITL approvals, or how to contact me.",
      citations: [],
      refused: true,
    };
  }

  const answer = hits.map((h) => h.text).join(" ");
  const citations = hits.map((h) => ({
    id: h.id,
    title: h.title,
    source: h.source,
  }));

  return { answer, citations, refused: false };
}

export const SUGGESTED_QUERIES = [
  "What do you build with RAG?",
  "Tell me about HelixOps",
  "Platform engineering on MxDR?",
  "How do HITL approvals work in your systems?",
  "Are you available for senior AI roles?",
];
