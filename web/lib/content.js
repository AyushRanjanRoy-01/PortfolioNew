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
    "Mostly multi-agent GenAI — LangGraph workflows, HITL approvals, MCP tool use, RAG, and " +
    "model routing — backed by a solid platform and security foundation (cloud, secrets, SIEM, " +
    "production ops) from two years on Accenture’s MxDR ecosystem.",
};

/** Hero orbit chips — ~60% AI / ~40% platform·security·ops */
export const orbitSkills = [
  "LangGraph",
  "Multi-agent",
  "MCP",
  "HITL",
  "RAG",
  "Claude / GPT",
  "Terraform",
  "AWS",
  "mTLS",
  "OTel",
];

/** Marquee line — AI-heavy, still shows foundations */
export const tickerItems = [
  "LangGraph multi-agent orchestration",
  "HITL approvals & durable workflow continuation",
  "MCP governed tool access",
  "RAG · ensemble routing · model telemetry",
  "Dispute & Deduction agentic workflows",
  "Watchtower agent observability",
  "Terraform · AWS · multi-env CI/CD",
  "Secrets · IAM · mTLS · SIEM health",
];

export const about = {
  paragraphs: [
    "I’m an AI Engineer at Accenture working on production multi-agent systems for enterprise finance workflows. My differentiator isn’t prompt engineering — it’s combining agents, APIs, queues, databases, cloud infrastructure, security controls, human approvals, and failure handling into systems teams can actually run.",
    "Before GenAI I spent ~2 years as a Platform Engineer on Accenture’s MxDR / Adaptive MxDR security platform: Terraform modernization, Redis-backed shared services, Jenkins→GitHub Actions, AWS runtime upgrades, secrets migration, mTLS telemetry into customer SIEMs, and live production debugging. That foundation is why I design agents with fail-closed paths, approvals, and audit trails.",
    "Outside work I ship HelixOps (human-gated remediation Incident IDE) and RAGGym (hands-on RAG learning). Available for senior AI roles — especially where agents meet production controls and platform discipline.",
  ],
  facts: [
    { label: "Role", value: "AI Engineer, Accenture · GenAI & Data" },
    { label: "Focus", value: "~60% GenAI / agents · ~40% platform & security" },
    { label: "Background", value: "Platform Eng · MxDR / security product ecosystem" },
    { label: "Cert", value: "Claude Certified Architect, Foundations (Anthropic)" },
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
      "HITL / approval orchestration",
      "RAG & retrieval",
      "Claude · GPT-4o/5",
      "Azure AI Foundry",
      "Ensemble / confidence routing",
      "Async inference · retries",
      "Agent observability (Watchtower)",
      "Decision traces",
      "RAGAS / LLM evaluation",
      "FastAPI (agent APIs)",
      "PostgreSQL · CTEs · checkpoints",
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
      "Built components of a greenfield Dispute & Deduction agentic workflow (Order-to-Cash): email/attachment ingestion, categorization, prioritization with human fallback, cross-team handoffs, and case continuity across queues, UI, and APIs — production deployed, MVP ready.",
      "Integrated LangGraph workflows with shared stage/state architecture, UI- and email-based continuation, and human-in-the-loop at uncertain priority, missing documents, approvals, and failure recovery.",
      "Integrated OAuth 2.0 approval APIs (none / L1 / L1+L2), mandatory Team Lead review, sequential approval, rejection restart, and persistence so approvals survive multi-cycle execution.",
      "Built async multi-model inference paths (retries, backoff, concurrency control) with latency/token/cost telemetry; validated multi-page documents in controlled benchmarks (up to 50 pages, 100+ docs tested).",
      "Extended Watchtower for agent/workflow visibility and MCP-based governed tool access patterns for live operational context — with OpenTelemetry / Datadog audit surfaces.",
    ],
  },
  {
    role: "Platform Engineer",
    company: "Accenture · Security (MxDR / Adaptive MxDR ecosystem)",
    period: "Aug 2023 – Aug 2025",
    points: [
      "Owned modernization of Common Cache — a Redis/ElastiCache-backed shared device-metadata platform used across device classes — including legacy Java/APIs, Terraform, certificates, Auto Scaling Groups, and environment drift across 10+ environments.",
      "Modernized Terraform from 0.11-era code to 1.x standards; worked multi-environment CI/CD (dev → staging → US/EU prod); adapted migrations from Jenkins to GitHub Actions using platform templates across 30+ repositories.",
      "Automated migration of 64 AWS Secrets Manager secrets (Terraform + GHA/scripts + IAM updates) with no production interruption; removed hardcoded Slack webhooks; remediated CodeQL/Dependabot findings and hardened Docker/runtime stacks.",
      "Migrated 8+ AWS Lambda functions Python 3.8 → 3.12 and 3 critical microservices from CentOS-era stacks toward Amazon Linux; decommissioned 22 unused EC2 instances to shrink footprint.",
      "Designed and implemented one-click Squid Proxy enablement for restricted-egress enterprise customers (Python + shell automation).",
      "Owned architecture and implementation of 5-minute synthetic health monitoring over mTLS/gRPC OpenTelemetry paths into customer SIEM systems (BindPlane routing); stabilized multi-tenant log-ingestion incidents with Datadog/CloudWatch and blue-green ASG diagnosis.",
    ],
  },
];

export const projects = [
  {
    title: "Dispute & Deduction Agentic Workflow",
    kind: "Enterprise · Accenture GenAI",
    featured: true,
    blurb:
      "Greenfield enterprise D&D workflow: classify → prioritize → document chase → approvals → analyst review, with HITL interrupts and durable continuation across systems. Production deployed; customer onboarding pending.",
    stack: ["LangGraph", "FastAPI", "PostgreSQL", "HITL", "OAuth approvals"],
  },
  {
    title: "Multi-Model Document Extraction Path",
    kind: "Enterprise · Accenture GenAI",
    featured: true,
    blurb:
      "Async multi-LLM inference with retries, concurrency control, and telemetry. Controlled benchmarks: 100+ documents, up to 50 pages; multi-page latency reduced from ~7 min to ~2.5–3 min in testing (not customer throughput).",
    stack: ["LangGraph", "Claude / GPT", "Azure AI", "Benchmarking"],
  },
  {
    title: "Governed Tool Access & Watchtower",
    kind: "Enterprise · Accenture GenAI",
    featured: true,
    blurb:
      "MCP-oriented governed tool invocation and Watchtower visibility for live agent/workflow state — so operators see decisions and agents don’t get unconstrained production access.",
    stack: ["MCP", "Observability", "OpenTelemetry", "Datadog"],
  },
  {
    title: "Common Cache Platform Modernization",
    kind: "Enterprise · Platform · MxDR",
    featured: true,
    blurb:
      "Owned Redis/ElastiCache-backed shared device-metadata platform modernization: Java services, Terraform, certs, ASGs, multi-environment drift — backbone metadata for the security product fleet.",
    stack: ["Redis", "Terraform", "Java", "AWS", "Multi-env"],
  },
  {
    title: "Secrets, IAM & Supply-Chain Hardening",
    kind: "Enterprise · Security",
    featured: false,
    blurb:
      "Migrated 64 secrets into AWS Secrets Manager with Terraform/GHA automation and IAM updates; CodeQL/Dependabot remediation; Docker/runtime hardening; GitHub Advanced Security workflows.",
    stack: ["Secrets Manager", "IAM", "CodeQL", "Dependabot", "GHA"],
  },
  {
    title: "SIEM Telemetry & Synthetic Health",
    kind: "Enterprise · Security",
    featured: false,
    blurb:
      "5-minute synthetic health checks over mTLS/gRPC OTel into customer SIEMs via BindPlane — closing telemetry blind spots for multi-tenant enterprise clients.",
    stack: ["OpenTelemetry", "mTLS", "gRPC", "SIEM", "BindPlane"],
  },
  {
    title: "Squid Proxy Enablement",
    kind: "Enterprise · Security",
    featured: false,
    blurb:
      "One-click Squid Proxy enablement for air-gapped / restricted-egress enterprise environments — configuration, detection, and deployment automation in Python and shell.",
    stack: ["Python", "Shell", "Network security", "Automation"],
  },
  {
    title: "HelixOps",
    kind: "Open source",
    featured: true,
    blurb:
      "AI-SRE Incident IDE: multi-agent RCA → human-approved remediation. Security-minded defaults — mock-safe integrations, JWT/RBAC, decision traces. Clean rebuild of the earlier IncidentIQ stack.",
    stack: ["FastAPI", "RBAC", "HITL", "RAG", "React"],
    github: "https://github.com/AyushRanjanRoy-01/HelixOps",
  },
  {
    title: "RAGGym",
    kind: "Open source",
    featured: true,
    blurb:
      "Learn RAG by doing: swappable LLM/embeddings/vector store, self-correcting retrieval, RAGAS evaluation, AI-graded practice mode.",
    stack: ["LangGraph", "Qdrant", "RAGAS", "Streamlit"],
    live: "https://rag-gym.streamlit.app/",
    github: "https://github.com/AyushRanjanRoy-01/RaGGym-Chatbot-CLI",
  },
];

export const writing = [
  {
    title: "From MxDR platforms to governed agents",
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
    title: "Platform Engineer · Accenture Security",
    detail:
      "MxDR ecosystem: Terraform, Redis platforms, secrets/IAM, SIEM telemetry, production incidents.",
  },
  {
    year: "2025–now",
    title: "AI Engineer · Accenture GenAI",
    detail:
      "Dispute & Deduction agents, multi-model extraction, HITL approvals, MCP/Watchtower observability.",
  },
  {
    year: "Open source",
    title: "HelixOps · RAGGym",
    detail: "Human-gated remediation IDE and hands-on RAG learning platform.",
  },
];
