// Single source of truth for portfolio content.

export const profile = {
  name: "Ayush Ranjan Roy",
  role: "AI Engineer",
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
  kicker: "AI Engineer · Accenture · Gurugram",
  title: "I build production multi-agent systems that ship and stay reliable.",
  subtitle:
    "Stateful LangGraph pipelines, MCP tool gateways, model routing, and the governance " +
    "layer that keeps LLMs observable under real enterprise load — with two years of platform " +
    "engineering behind the GenAI work.",
};

export const about = {
  paragraphs: [
    "I'm an AI Engineer at Accenture focused on production-grade agentic systems for enterprise workflows. Before GenAI I spent two years as a platform engineer on distributed systems, Terraform, and production incident response — so I treat LLM systems like critical infrastructure: instrumented, governed, and hard to break.",
    "Day to day I design multi-agent orchestration, model gateways with consensus routing, MCP-based tool access, and human-in-the-loop policy checkpoints. Outside work I ship open-source AI SRE and RAG learning tools.",
  ],
  facts: [
    { label: "Role", value: "AI Engineer, Accenture · GenAI & Data" },
    { label: "Focus", value: "Multi-agent systems · LLMOps · RAG" },
    { label: "Cert", value: "Claude Certified Architect, Foundations (Anthropic)" },
    { label: "Education", value: "B.Tech ECE, VIT (2019–2023)" },
    { label: "Location", value: "Gurugram, India" },
  ],
  skills: {
    "Agents & orchestration": [
      "LangGraph",
      "LangChain",
      "Multi-agent systems",
      "MCP",
      "Human-in-the-loop",
      "Stateful workflows",
    ],
    "LLMOps & governance": [
      "Model gateway / routing",
      "Cost control",
      "Policy enforcement",
      "Audit trails",
      "OpenTelemetry",
      "Datadog",
    ],
    "Models & retrieval": [
      "Claude",
      "GPT-4o / 5",
      "Azure AI Foundry",
      "RAG",
      "pgvector",
      "PostgreSQL",
    ],
    Infrastructure: [
      "Python (async)",
      "FastAPI",
      "Docker",
      "Terraform",
      "AWS",
      "Azure AKS",
      "CI/CD",
    ],
  },
};

export const experience = [
  {
    role: "AI Engineer",
    company: "Accenture · GenAI & Data",
    period: "Aug 2025 – Present",
    points: [
      "Co-architected a stateful LangGraph multi-agent pipeline for document classification and extraction — taken from proof-of-concept to production.",
      "Designed ensemble-consensus classification with confidence-score routing through a model gateway, plus zero-redeploy live config for model management.",
      "Built an MCP server and tool-invocation protocol for governed, live database access beyond static prompting.",
      "Shipped an agent-observability console (decision traces, live state) and policy-enforcement workflows with human-in-the-loop checkpoints.",
    ],
  },
  {
    role: "Platform Engineer",
    company: "Accenture · Distributed Systems & Infrastructure",
    period: "Aug 2023 – Aug 2025",
    points: [
      "Led platform migration as lead engineer: Terraform IaC, CI/CD, and live-incident debugging across a large microservice fleet.",
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
      "Stateful LangGraph pipeline orchestrating several LLMs for document classification and extraction — designed for production reliability, not demos.",
    stack: ["LangGraph", "Model Gateway", "Azure AI", "PostgreSQL"],
  },
  {
    title: "Model Gateway & Consensus Routing",
    kind: "Enterprise · Accenture",
    featured: true,
    blurb:
      "Ensemble majority-voting classification with confidence-score routing and zero-redeploy live configuration for LLM traffic and cost control.",
    stack: ["Python (async)", "Model routing", "Cost control"],
  },
  {
    title: "MCP Tool Gateway",
    kind: "Enterprise · Accenture",
    featured: true,
    blurb:
      "MCP server and tool-invocation protocol giving agents governed, live access to databases — real tool use with policy boundaries.",
    stack: ["MCP", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Agent Observability & Governance",
    kind: "Enterprise · Accenture",
    featured: false,
    blurb:
      "Live agent-observability console plus policy-enforcement workflow with human-in-the-loop approvals and full audit surface.",
    stack: ["LangGraph HIL", "OpenTelemetry", "Datadog"],
  },
  {
    title: "HelixOps",
    kind: "Open source",
    featured: true,
    blurb:
      "Multi-agent RCA and human-approved self-healing Incident IDE: alert → triage → RAG knowledge → root-cause → gated remediation. Offline-first, mock-safe by default.",
    stack: ["FastAPI", "Multi-agent graph", "RAG", "React"],
    github: "https://github.com/AyushRanjanRoy-01/HelixOps",
  },
  {
    title: "IncidentIQ",
    kind: "Open source",
    featured: false,
    blurb:
      "AI-SRE platform: multi-agent triage, context, RAG knowledge, RCA synthesis, and human-gated remediation with RBAC and observability.",
    stack: ["LangGraph", "FastAPI", "pgvector", "RBAC"],
    github: "https://github.com/AyushRanjanRoy-01/IncidentIQ",
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
    title: "Building agents that survive production",
    note: "Coming soon — notes on gateways, eval, and human-in-the-loop.",
  },
];
