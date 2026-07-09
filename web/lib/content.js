// ---------------------------------------------------------------------------
// Single source of truth for portfolio content.
// Understated by design — describes the work, not the numbers.
// Enterprise work is described generically (no client names / internal codenames).
// ---------------------------------------------------------------------------

export const profile = {
  name: "Ayush Ranjan Roy",
  role: "Full Stack Gen AI Engineer",
  location: "Gurugram, India",
  email: "royayush0611@gmail.com",
  phone: "+919540968483",
  github: "https://github.com/AyushRanjanRoy-01",
  // TODO: confirm exact LinkedIn vanity URL
  linkedin: "https://www.linkedin.com/in/ayushranjanroy",
  resume: "/resume.pdf",
};

export const hero = {
  h1: "I build production Gen AI systems that ship and survive real data.",
  sub:
    "Full Stack Gen AI Engineer at Accenture. I design stateful multi-agent pipelines, " +
    "MCP tool gateways, and the routing, governance and eval that keep them reliable in production.",
};

export const about = {
  bio: [
    "Gen AI engineer at Accenture, with two years in distributed systems before that. " +
      "I build LLM systems like critical infrastructure: observable, governed, and hard to break.",
  ],
  facts: [
    { k: "Cert", v: "Claude Certified Architect, Foundations (Anthropic)" },
    { k: "Education", v: "B.Tech ECE, VIT (2019–2023)" },
  ],
  skills: {
    "Agents & orchestration": ["LangGraph", "LangChain", "Multi-Agent", "MCP", "Human-in-the-Loop", "Stateful Workflows"],
    "LLMOps & governance": ["Model Gateway / Routing", "Cost Control", "Policy Enforcement", "Audit Trails", "OpenTelemetry", "Datadog"],
    "Models & retrieval": ["Claude", "GPT-4o / 5", "Azure AI Foundry", "RAG", "pgvector", "PostgreSQL"],
    "Infrastructure": ["Python (async)", "FastAPI", "Docker", "Terraform", "AWS", "Azure AKS", "CI/CD"],
  },
};

export const experience = [
  {
    role: "Full Stack Gen AI Engineer",
    company: "Accenture · GenAI & Data",
    period: "Aug 2025 – Present",
    points: [
      "Co-architected a stateful, graph-based multi-agent pipeline (LangGraph) that orchestrates several LLMs for document classification and extraction, and took it from proof-of-concept to production.",
      "Designed an ensemble-consensus classification layer with confidence-score routing through a model gateway, plus zero-redeployment live config for model management.",
      "Built an MCP server and tool-invocation protocol giving agents governed, live access to databases, beyond static prompting into real tool use.",
      "Built an agent-observability console surfacing live agent state and decision traces, and a policy-enforcement workflow with human-in-the-loop checkpoints.",
    ],
  },
  {
    role: "Platform Engineer",
    company: "Accenture · Distributed Systems & Infrastructure",
    period: "Aug 2023 – Aug 2025",
    points: [
      "Led a platform migration as lead engineer: Terraform IaC, CI/CD pipelines, and live-incident production debugging across a large microservice fleet serving enterprise customers.",
      "Owned Terraform infrastructure across multiple environments and modernized AWS Lambda services, with a VPN-secured OpenTelemetry observability protocol feeding centralized SIEM audit trails.",
    ],
  },
];

// Curated work — production first, then open-source. Described, not quantified.
export const projects = [
  {
    title: "Production Multi-Agent Document Pipeline",
    kind: "Enterprise · Accenture",
    blurb:
      "A stateful LangGraph pipeline orchestrating several LLMs for document classification and extraction, taken from proof-of-concept to production.",
    stack: ["LangGraph", "Model Gateway", "Azure AI", "PostgreSQL"],
  },
  {
    title: "Model Gateway & Consensus Routing",
    kind: "Enterprise · Accenture",
    blurb:
      "Ensemble majority-voting classification with confidence-score routing and zero-redeploy live config for LLM traffic.",
    stack: ["Python (async)", "Model Routing", "Cost Control"],
  },
  {
    title: "MCP Tool Gateway",
    kind: "Enterprise · Accenture",
    blurb:
      "An MCP server and tool-invocation protocol giving agents governed, live access to databases, beyond static prompting.",
    stack: ["MCP", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Agent Observability & Governance",
    kind: "Enterprise · Accenture",
    blurb:
      "A live agent-observability console plus a policy-enforcement workflow with human-in-the-loop approvals.",
    stack: ["LangGraph HIL", "OpenTelemetry", "Datadog"],
  },
  {
    title: "IncidentIQ, AI-SRE Platform",
    kind: "Open source",
    blurb:
      "A 5-agent LangGraph pipeline (triage, context, RAG knowledge, root-cause synthesis, supervision) that produces confidence-scored diagnoses with human-gated rollback.",
    stack: ["LangGraph", "FastAPI", "pgvector", "RBAC"],
    github: "https://github.com/AyushRanjanRoy-01/IncidentIQ",
  },
  {
    title: "RAGGym, Learn RAG by Coding",
    kind: "Open source",
    blurb:
      "A fully swappable RAG platform (LLM, embeddings and vector store hot-configurable) with a self-correcting retrieval loop and an AI-graded practice mode.",
    stack: ["LangGraph", "Qdrant", "RAGAS", "Streamlit"],
    github: "https://github.com/AyushRanjanRoy-01/RAG-Project",
  },
];
