// Single source of truth for portfolio content.
// Grounded in AYUSH_ROY_MASTER_CAREER_SOURCE_OF_TRUTH.md + career intelligence skill.
// Rule: no fabricated metrics, ownership, or AI-security depth beyond documented work.

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
  title: "I build agent platforms that ship — with security controls, not demos.",
  subtitle:
    "Mostly multi-agent GenAI — LangGraph workflows, RAG-backed knowledge retrieval, HITL " +
    "gates, MCP tool use, Claude / Azure AI model paths — backed by modernizing Accenture " +
    "MxDR → Adaptive MxDR (AMxDR) AWS cloud architecture: Terraform, shared services, secrets, " +
    "secure telemetry, and production ops.",
};

/** Highlight certs (public) */
export const certifications = [
  {
    name: "Claude Certified Architect — Foundations",
    issuer: "Anthropic",
    when: "May 2026",
    highlight: true,
    blurb: "Architecture fundamentals for building with Claude in production systems.",
  },
];

/** Brand strip — technology ecosystem (names only; simple icons) */
export const techBrands = [
  { id: "claude", name: "Claude", sub: "Anthropic" },
  { id: "azure", name: "Azure", sub: "AI Foundry" },
  { id: "aws", name: "AWS", sub: "Cloud platform" },
];

/** Hero orbit chips — ~60% AI / ~40% platform·security·ops */
export const orbitSkills = [
  "LangGraph",
  "Multi-agent",
  "RAG",
  "MCP",
  "HITL",
  "Claude / GPT",
  "Terraform",
  "AWS",
  "mTLS",
  "OTel",
];

/** Marquee line — AI-heavy, still shows foundations */
export const tickerItems = [
  "LangGraph multi-agent orchestration",
  "HITL gates on agent actions",
  "MCP governed tool access",
  "RAG pipelines · retrieval + evaluation",
  "Dispute & Deduction · Order-to-Cash agents",
  "RAGGym — learn RAG by building",
  "Agent observability & decision traces",
  "Terraform · AWS · multi-env CI/CD",
  "Secrets · IAM · mTLS · SIEM health",
];

export const about = {
  paragraphs: [
    "I’m an AI Engineer at Accenture working on production multi-agent systems in enterprise Order-to-Cash domains (including Dispute & Deduction) — LangGraph, RAG, Claude / Azure model paths, MCP-style tools, and human-in-the-loop controls.",
    "Before GenAI I spent ~2 years as a Platform Engineer on Accenture’s MxDR / Adaptive MxDR (AMxDR) security platform, modernizing the AWS cloud architecture: Terraform, shared services, CI/CD, runtimes, secrets, secure telemetry into enterprise SIEMs, and live production incident response. That platform work is the backbone of how I ship agents — observable, governed, fail-closed by default.",
    "Outside work I ship HelixOps (RAG-assisted RCA + human-gated remediation) and RAGGym (hands-on RAG learning and evaluation). Available for senior AI roles — especially where agents, RAG, and production controls meet.",
  ],
  facts: [
    { label: "Role", value: "AI Engineer, Accenture · GenAI & Data" },
    { label: "Focus", value: "Agents · RAG · platform & security foundations" },
    { label: "Platform story", value: "MxDR → AMxDR AWS cloud modernization" },
    { label: "Certification", value: "Claude Certified Architect — Foundations (Anthropic, May 2026)" },
    { label: "Education", value: "B.Tech ECE, VIT Chennai (2019–2023)" },
    { label: "Location", value: "Gurugram, India" },
  ],
  education: {
    degree: "B.Tech, Electronics and Communication Engineering",
    school: "VIT Chennai",
    period: "2019–2023",
    // From consolidated marksheet — few cyber / AI / CS relevant only (no CGPA)
    coursework: [
      "Artificial Intelligence",
      "Essentials of Machine Learning",
      "Cryptography and Network Security",
      "Information Security Analysis and Audit",
      "Data Structures and Algorithms",
      "Operating Systems",
    ],
  },
  // Display order: AI first (majority), foundations second (~40%).
  skills: {
    "AI & agents": [
      "LangGraph",
      "LangChain",
      "Multi-agent workflows",
      "MCP",
      "HITL orchestration",
      "RAG & retrieval",
      "Claude · GPT-4o/5",
      "Azure AI Foundry",
      "Ensemble / confidence routing",
      "Async inference · retries",
      "Agent observability",
      "Decision traces",
      "RAGAS / LLM evaluation",
      "FastAPI (agent APIs)",
      "PostgreSQL · workflow state",
    ],
    "Platform, security & ops": [
      "Terraform",
      "AWS (Lambda, EC2, ASG, S3)",
      "GitHub Actions / CI/CD",
      "Docker · multi-env deploys",
      "Redis / ElastiCache",
      "Secrets Manager · IAM",
      "mTLS · SIEM telemetry",
      "OpenTelemetry · Datadog",
      "CodeQL / Dependabot",
      "Production incident response",
    ],
  },
};

export const experience = [
  {
    role: "Full Stack LLM Development Analyst · AI Engineer",
    company: "Accenture · GenAI & Data",
    period: "Aug 2025 – Present",
    points: [
      "Build multi-agent systems for enterprise Order-to-Cash domains, including Dispute & Deduction, using LangGraph orchestration, durable workflow state, and human-in-the-loop control points.",
      "Design async multi-model inference services with retries, backoff, concurrency control, and latency/token/cost telemetry.",
      "Implement MCP-style governed tool access and operator-facing agent observability with OpenTelemetry and Datadog tracing.",
      "Contribute RAG-style retrieval and knowledge grounding alongside agent decision paths.",
      "Author technical documentation and run knowledge-transfer sessions on LangGraph / LangChain patterns.",
    ],
  },
  {
    role: "Platform Engineer",
    company: "Accenture · Security · MxDR / Adaptive MxDR (AMxDR)",
    period: "Aug 2023 – Aug 2025",
    points: [
      "Helped modernize the MxDR → Adaptive MxDR (AMxDR) platform’s AWS cloud architecture: multi-environment Terraform, CI/CD, shared services, and production reliability for a security-product estate.",
      "Owned Redis/ElastiCache-backed shared metadata platform services, certificates, Auto Scaling Groups, and environment consistency across the fleet.",
      "Modernized infrastructure-as-code (legacy Terraform → 1.x) and migrated pipelines from Jenkins to GitHub Actions across a large service set.",
      "Automated AWS Secrets Manager migrations and IAM updates; remediated CodeQL/Dependabot findings; hardened container/runtime baselines; upgraded Lambda and microservice runtimes.",
      "Built restricted-egress proxy automation and synthetic health monitoring over mTLS/gRPC OpenTelemetry into enterprise SIEM paths; supported multi-tenant production incidents and blue-green deployments.",
    ],
  },
];

export const projects = [
  {
    title: "Dispute & Deduction · Order-to-Cash Agents",
    kind: "Enterprise · Accenture GenAI",
    featured: true,
    blurb:
      "Multi-agent orchestration for enterprise Dispute & Deduction / Order-to-Cash workflows — LangGraph, durable state, HITL control points, and production-minded APIs. Industry domain only; no client process detail.",
    stack: ["LangGraph", "FastAPI", "PostgreSQL", "HITL", "RAG"],
  },
  {
    title: "Multi-Model Document Intelligence",
    kind: "Enterprise · Accenture GenAI",
    featured: true,
    blurb:
      "Async multi-LLM inference services with retries, concurrency control, and latency/token/cost telemetry — plus RAG-style grounding for agent decisions.",
    stack: ["LangGraph", "Claude / GPT", "Azure AI", "RAG", "Telemetry"],
  },
  {
    title: "Governed Tools & Agent Observability",
    kind: "Enterprise · Accenture GenAI",
    featured: true,
    blurb:
      "MCP-style governed tool invocation plus operator-facing agent/workflow visibility — decisions and retrieval context stay reviewable; agents don’t get unconstrained production access.",
    stack: ["MCP", "Observability", "OpenTelemetry", "Datadog"],
  },
  {
    title: "MxDR → AMxDR AWS Platform Modernization",
    kind: "Enterprise · Platform · MxDR / AMxDR",
    featured: true,
    blurb:
      "Platform engineering on Accenture MxDR / Adaptive MxDR: modernized AWS cloud architecture — Terraform, shared Redis metadata services, CI/CD, secrets/IAM, runtime upgrades, and multi-env production operations.",
    stack: ["AWS", "Terraform", "Redis", "GitHub Actions", "Secrets Manager"],
  },
  {
    title: "Secrets, IAM & Supply-Chain Hardening",
    kind: "Enterprise · Security",
    featured: false,
    blurb:
      "Bulk Secrets Manager migration with Terraform/GHA automation and IAM updates; CodeQL/Dependabot remediation; Docker/runtime hardening.",
    stack: ["Secrets Manager", "IAM", "CodeQL", "Dependabot", "GHA"],
  },
  {
    title: "SIEM Telemetry & Synthetic Health",
    kind: "Enterprise · Security",
    featured: false,
    blurb:
      "Synthetic health checks over mTLS/gRPC OpenTelemetry into enterprise SIEM paths — multi-tenant monitoring and production incident support.",
    stack: ["OpenTelemetry", "mTLS", "gRPC", "SIEM"],
  },
  {
    title: "Restricted-Egress Proxy Automation",
    kind: "Enterprise · Security",
    featured: false,
    blurb:
      "Automation for enabling proxy-based restricted egress in enterprise network environments (Python + shell).",
    stack: ["Python", "Shell", "Network security", "Automation"],
  },
  {
    title: "HelixOps",
    kind: "Open source",
    featured: true,
    blurb:
      "AI-SRE Incident IDE: multi-agent RCA with RAG over runbooks → human-approved remediation. Mock-safe defaults, JWT/RBAC, decision traces. Public open-source project.",
    stack: ["FastAPI", "RAG", "RBAC", "HITL", "React"],
    github: "https://github.com/AyushRanjanRoy-01/HelixOps",
  },
  {
    title: "RAGGym",
    kind: "Open source",
    featured: true,
    blurb:
      "Learn RAG by doing: swappable LLM/embeddings/vector store, self-correcting retrieval, RAGAS evaluation, AI-graded practice mode.",
    stack: ["RAG", "LangGraph", "Qdrant", "RAGAS", "Streamlit"],
    live: "https://rag-gym.streamlit.app/",
    github: "https://github.com/AyushRanjanRoy-01/RaGGym-Chatbot-CLI",
  },
];

export const writing = [
  {
    title: "From platform engineering to governed agents",
    note: "Coming soon — what platform/security years teach you about agent design.",
  },
];

/** Career arc for the timeline UI */
export const journey = [
  {
    year: "2019–23",
    title: "B.Tech ECE · VIT Chennai",
    detail:
      "AI, ML essentials, cryptography & network security, InfoSec audit, DSA, operating systems.",
  },
  {
    year: "2023–25",
    title: "Platform Engineer · MxDR / AMxDR",
    detail:
      "Modernized AWS cloud architecture for Accenture MxDR → Adaptive MxDR: Terraform, Redis, secrets, SIEM telemetry, production ops.",
  },
  {
    year: "2025–now",
    title: "AI Engineer · Accenture GenAI",
    detail:
      "Order-to-Cash / Dispute & Deduction agents, RAG, Claude & Azure AI paths, HITL, MCP observability.",
  },
  {
    year: "Open source",
    title: "HelixOps · RAGGym",
    detail: "RAG-assisted incident RCA (HelixOps) and hands-on RAG learning (RAGGym).",
  },
];
