// ---------------------------------------------------------------------------
// Single source of truth for portfolio content.
// Metrics are real (from résumé); enterprise work is described generically —
// no client names or internal project codenames.
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
  h1: "I build production Gen AI systems that ship — and survive real data.",
  sub:
    "Full Stack Gen AI Engineer at Accenture. I design stateful multi-agent pipelines, " +
    "MCP tool gateways, and the routing, governance and eval that keep them reliable in production.",
};

export const stats = [
  { value: "300+/day", label: "docs in production" },
  { value: "97%+", label: "extraction accuracy" },
  { value: "55%", label: "latency cut" },
  { value: "800+", label: "enterprise accounts served" },
];

export const about = {
  bio: [
    "I'm a Full Stack Gen AI Engineer at Accenture, architecting production agent infrastructure — " +
      "stateful multi-agent orchestration, MCP-based tool gateways, and cost-controlled, policy-governed routing.",
    "Before GenAI, I spent two years in distributed-systems engineering (Terraform, Kubernetes, CI/CD) " +
      "running platforms at production scale — so I build LLM systems the way you'd build any critical " +
      "service: observable, governed, and hard to break.",
  ],
  facts: [
    { k: "Role", v: "Full Stack Gen AI Engineer @ Accenture" },
    { k: "Based in", v: "Gurugram, India" },
    { k: "Cert", v: "Claude Certified Architect — Foundations (Anthropic)" },
    { k: "Education", v: "B.Tech ECE, VIT (2019–2023)" },
  ],
  skills: {
    "Agents & Orchestration": ["LangGraph", "LangChain", "Multi-Agent", "MCP", "Human-in-the-Loop", "Stateful Workflows"],
    "LLMOps & Governance": ["Model Gateway / Routing", "Cost Control", "Policy Enforcement", "Audit Trails", "OpenTelemetry", "Datadog"],
    "Models & Retrieval": ["Claude", "GPT-4o / 5", "Azure AI Foundry", "RAG", "pgvector", "PostgreSQL"],
    "Infrastructure": ["Python (async)", "FastAPI", "Docker", "Terraform", "AWS", "Azure AKS", "CI/CD"],
  },
};

export const experience = [
  {
    role: "Full Stack Gen AI Engineer",
    company: "Accenture · GenAI & Data",
    period: "Aug 2025 — Present",
    points: [
      "Co-architected a stateful, graph-based multi-agent pipeline (LangGraph) orchestrating 4 LLMs for document classification and extraction — taken from PoC to production at 300+ docs/day and 97%+ accuracy.",
      "Designed an ensemble-consensus classification layer with confidence-score routing through a model gateway and zero-redeployment config: +40% accuracy, batch capacity 9 → 50 pages, and −55% / −30% latency via async parallel inference and per-model cost control.",
      "Built an MCP server and tool-invocation protocol giving agents governed, live access to PostgreSQL — extending them beyond static prompting into real tool use.",
      "Built an agent-observability console surfacing live agent state and decision traces, and a from-scratch policy-enforcement workflow (20+ rules) with human-in-the-loop checkpoints — zero unhandled errors in production.",
    ],
  },
  {
    role: "Platform Engineer",
    company: "Accenture · Distributed Systems & Infrastructure",
    period: "Aug 2023 — Aug 2025",
    points: [
      "Led a platform migration as lead engineer — Terraform IaC, GitHub Actions pipelines, and live-incident debugging across 20 microservices serving 800+ enterprise accounts: −35% deployment turnaround, −30% infra cost, directing a 4-person team.",
      "Owned Terraform IaC across 6 environments and modernized 8+ AWS Lambda functions (−50% runtime failures), with a VPN-secured OpenTelemetry observability protocol feeding centralized SIEM audit trails.",
    ],
  },
];

// Curated highlight projects — production work first, then open-source.
export const projects = [
  {
    title: "Production Multi-Agent Document Pipeline",
    kind: "Enterprise · Accenture",
    blurb:
      "A stateful LangGraph pipeline orchestrating 4 LLMs for document classification & extraction, taken PoC → production.",
    metric: "300+ docs/day · 97%+ accuracy",
    stack: ["LangGraph", "Model Gateway", "Azure AI", "PostgreSQL"],
    accent: "from-[#7C5CFF]/25 to-[#4C9BFF]/10",
    icon: "network",
  },
  {
    title: "Model Gateway & Consensus Routing",
    kind: "Enterprise · Accenture",
    blurb:
      "Ensemble majority-voting classification with confidence-score routing and zero-redeploy live config for LLM traffic.",
    metric: "+40% accuracy · −55% latency · 9→50 page batches",
    stack: ["Python (async)", "Model Routing", "Cost Control"],
    accent: "from-[#4C9BFF]/25 to-[#7C5CFF]/10",
    icon: "route",
  },
  {
    title: "MCP Tool Gateway",
    kind: "Enterprise · Accenture",
    blurb:
      "An MCP server and tool-invocation protocol giving agents governed, live access to databases — beyond static prompting.",
    metric: "Autonomous, audited tool use",
    stack: ["MCP", "FastAPI", "PostgreSQL"],
    accent: "from-[#7C5CFF]/25 to-[#22D3AA]/10",
    icon: "plug",
  },
  {
    title: "Agent Observability & Governance",
    kind: "Enterprise · Accenture",
    blurb:
      "A live agent-observability console plus a from-scratch policy-enforcement workflow (20+ rules) with human-in-the-loop approvals.",
    metric: "Zero unhandled errors in prod",
    stack: ["LangGraph HIL", "OpenTelemetry", "Datadog"],
    accent: "from-[#22D3AA]/20 to-[#7C5CFF]/10",
    icon: "shield",
  },
  {
    title: "IncidentIQ — AI-SRE Platform",
    kind: "Open source",
    blurb:
      "A 5-agent LangGraph pipeline (triage → context → RAG knowledge → root-cause synthesis → supervision) producing confidence-scored diagnoses with human-gated rollback.",
    metric: "Confidence-scored RCA + audit logging",
    stack: ["LangGraph", "FastAPI", "pgvector", "RBAC"],
    github: "https://github.com/AyushRanjanRoy-01/IncidentIQ",
    accent: "from-[#7C5CFF]/25 to-[#4C9BFF]/10",
    icon: "activity",
  },
  {
    title: "RAGGym — Learn RAG by Coding",
    kind: "Open source",
    blurb:
      "A fully swappable RAG platform (LLM / embeddings / vector store hot-configurable) with a self-correcting retrieval loop and an AI-graded practice mode.",
    metric: "Self-correcting retrieval · RAGAS eval",
    stack: ["LangGraph", "Qdrant", "RAGAS", "Streamlit"],
    github: "https://github.com/AyushRanjanRoy-01/RAG-Project",
    accent: "from-[#4C9BFF]/25 to-[#22D3AA]/10",
    icon: "book",
  },
];
