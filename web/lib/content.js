// Single source of truth for portfolio content.

export const profile = {
  name: "Ayush Ranjan Roy",
  role: "AI Security Engineer",
  company: "Accenture",
  location: "Gurugram, India",
  email: "royayush0611@gmail.com",
  phone: "+91 95409 68483",
  github: "https://github.com/AyushRanjanRoy-01",
  linkedin: "https://www.linkedin.com/in/ayush-ranjan-roy",
  resume: "/resume.pdf",
  site: "https://ayushranjanroy.com",
};

export const hero = {
  kicker: "AI Security · Accenture · Gurugram",
  title: "I build secure multi-agent systems that ship and stay governed.",
  subtitle:
    "Policy-enforced agent workflows, human-in-the-loop approvals, governed MCP tool access, " +
    "and audit-grade telemetry for enterprise GenAI — grounded in two years of platform and " +
    "security infrastructure engineering before agents.",
};

export const about = {
  paragraphs: [
    "I'm an AI Security Engineer at Accenture. I make agentic systems safe to run in production: least-privilege tool use, policy gates, human approval paths, and full decision traces — not just prompts that work in a demo.",
    "Before GenAI I spent two years on platform and security infrastructure (Terraform, production incidents, SIEM-bound telemetry). That background shapes how I design multi-agent pipelines: assume failure, assume misuse, require proof. Outside work I ship open-source tools for safe remediation (HelixOps) and RAG learning (RAGGym).",
  ],
  facts: [
    { label: "Role", value: "AI Security Engineer, Accenture · GenAI & Data" },
    { label: "Focus", value: "AI Security · Agent governance · Secure tool use" },
    { label: "Cert", value: "Claude Certified Architect, Foundations (Anthropic)" },
    { label: "Education", value: "B.Tech ECE, VIT (2019–2023)" },
    { label: "Location", value: "Gurugram, India" },
  ],
  skills: {
    "AI Security & controls": [
      "Policy enforcement",
      "Human-in-the-loop",
      "RBAC / least privilege",
      "Audit trails",
      "Secure tool invocation",
      "Approval workflows",
    ],
    "Agents & orchestration": [
      "LangGraph",
      "LangChain",
      "Multi-agent systems",
      "MCP",
      "Stateful workflows",
      "Decision traces",
    ],
    "Models & retrieval": [
      "Claude",
      "GPT-4o / 5",
      "Azure AI Foundry",
      "RAG",
      "pgvector",
      "PostgreSQL",
    ],
    "Platform & security infra": [
      "Python (async)",
      "FastAPI",
      "Terraform",
      "AWS",
      "Azure AKS",
      "OpenTelemetry",
      "SIEM telemetry",
      "CI/CD",
    ],
  },
};

export const experience = [
  {
    role: "AI Security Engineer",
    company: "Accenture · GenAI & Data",
    period: "Aug 2025 – Present",
    points: [
      "Co-architected a stateful LangGraph multi-agent pipeline for document classification and extraction — with production guardrails from day one, not bolted on later.",
      "Designed confidence-gated model routing and ensemble consensus so low-trust model outputs never silently drive enterprise actions.",
      "Built an MCP server and tool-invocation protocol for governed, least-privilege database access — agents only get tools the policy allows.",
      "Shipped policy-enforcement workflows with human-in-the-loop checkpoints, agent decision-trace consoles, and audit surfaces via OpenTelemetry / Datadog.",
    ],
  },
  {
    role: "Platform Engineer",
    company: "Accenture · Security / Distributed Systems",
    period: "Aug 2023 – Aug 2025",
    points: [
      "Led platform migration as lead engineer: Terraform IaC, CI/CD, and live-incident debugging across a large microservice fleet in a security product ecosystem.",
      "Owned multi-environment Terraform and modernized AWS Lambda services; VPN-secured OpenTelemetry feeding centralized SIEM audit trails.",
    ],
  },
];

export const projects = [
  {
    title: "Production Multi-Agent Document Pipeline",
    kind: "Enterprise · Accenture",
    featured: true,
    blurb:
      "Stateful LangGraph pipeline for document classification and extraction — production path with controlled model use, not an unconstrained agent free-for-all.",
    stack: ["LangGraph", "Guarded routing", "Azure AI", "PostgreSQL"],
  },
  {
    title: "Confidence-Gated Model Gateway",
    kind: "Enterprise · Accenture",
    featured: true,
    blurb:
      "Ensemble majority-voting and confidence-score routing so weak or disputed model outputs fail closed instead of flowing into finance workflows.",
    stack: ["Python (async)", "Consensus routing", "Fail-closed design"],
  },
  {
    title: "Governed MCP Tool Gateway",
    kind: "Enterprise · Accenture",
    featured: true,
    blurb:
      "MCP server and tool protocol for live DB access with policy boundaries — agents invoke tools under explicit authorization, not raw credentials in prompts.",
    stack: ["MCP", "FastAPI", "Least privilege", "PostgreSQL"],
  },
  {
    title: "Policy Enforcement & HITL Approvals",
    kind: "Enterprise · Accenture",
    featured: false,
    blurb:
      "Rule-based policy engine with LangGraph human-in-the-loop checkpoints, full audit trail, and live agent decision-trace UI for operators.",
    stack: ["LangGraph HIL", "Policy engine", "OpenTelemetry", "Datadog"],
  },
  {
    title: "HelixOps",
    kind: "Open source",
    featured: true,
    blurb:
      "AI-SRE Incident IDE with security-first defaults: human-approved remediation, mock-safe integrations, JWT/RBAC, decision traces — agents propose, operators authorize.",
    stack: ["FastAPI", "RBAC", "HITL", "RAG", "React"],
    github: "https://github.com/AyushRanjanRoy-01/HelixOps",
  },
  {
    title: "RAGGym",
    kind: "Open source",
    featured: true,
    blurb:
      "Learn RAG by doing: chat with books, self-correcting retrieval loop, hot-swappable LLM/embeddings/vector store, and AI-graded practice mode.",
    stack: ["LangGraph", "Qdrant", "RAGAS", "Streamlit"],
    live: "https://rag-gym.streamlit.app/",
    github: "https://github.com/AyushRanjanRoy-01/RaGGym-Chatbot-CLI",
  },
  {
    title: "Startup Incubator (LangGraph)",
    kind: "Open source",
    featured: false,
    blurb:
      "AI-powered startup incubator workflow on LangGraph — idea → research → structured outputs in a Gradio space.",
    stack: ["LangGraph", "Gradio", "LLMs"],
    live: "https://huggingface.co/spaces/ayushroy/my-gradio-app",
    github: "https://github.com/AyushRanjanRoy-01/Startup_Incubator_LangGraph",
  },
];

export const writing = [
  {
    title: "Securing agents that take real actions",
    note: "Coming soon — policy gates, tool privilege, and human approval under load.",
  },
];
