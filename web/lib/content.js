// Portfolio content grounded in career SoT + owner corrections.
// Rules:
// - Datadog / OpenTelemetry / SIEM product telemetry → MxDR platform only
// - GenAI agentic work → multi-agent systems, MCP, HITL, LangGraph, inference
// - Contributor-level claims; no client process codenames (e.g. Synops)

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
  title: profile.name,
  subtitle:
    "AI Engineer at Accenture. Multi-agent systems, MCP tool access, and human-in-the-loop workflows.",
  blurb:
    "I build multi-agent systems for enterprise Order-to-Cash / Dispute & Deduction programs — " +
    "LangGraph orchestration, MCP-governed tools, and human review gates. " +
    "Before that I was a platform engineer on Accenture’s MxDR / Adaptive MxDR product on AWS, " +
    "including production telemetry (OpenTelemetry, Datadog, SIEM).",
};

export const certifications = [
  {
    name: "Claude Certified Architect — Foundations",
    issuer: "Anthropic",
    when: "May 2026",
  },
];

export const about = {
  paragraphs: [
    "I’m an AI engineer at Accenture (GenAI & Data). I work on multi-agent systems for Order-to-Cash and Dispute & Deduction: LangGraph workflows, MCP for governed tool calls, human-in-the-loop continuation (UI and email), approvals, durable state, and FastAPI services — as a contributor on multi-engineer teams.",
    "I also work on multi-model inference (Claude, GPT, Azure) with routing, retries, concurrency control, and latency / token / cost instrumentation for evaluation.",
    "From 2023–2025 I was a platform engineer on Accenture Security’s MxDR → Adaptive MxDR product: Terraform, shared services, CI/CD, secrets, and production observability — OpenTelemetry, Datadog, and mTLS health into enterprise SIEMs — on AWS.",
    "Outside work I maintain HelixOps and RAGGym. Based in Gurugram. Open to senior AI roles.",
  ],
  education: {
    degree: "B.Tech, Electronics and Communication Engineering",
    school: "VIT Chennai",
    period: "2019–2023",
    coursework: [
      "Artificial Intelligence",
      "Essentials of Machine Learning",
      "Cryptography and Network Security",
      "Information Security Analysis and Audit",
      "Data Structures and Algorithms",
      "Operating Systems",
    ],
  },
  skills: {
    "Agents & GenAI": [
      "Multi-agent systems",
      "LangGraph",
      "MCP",
      "Human-in-the-loop",
      "RAG",
      "Claude",
      "GPT",
      "Azure AI",
      "FastAPI",
      "PostgreSQL",
    ],
    "Platform & observability": [
      "AWS",
      "Terraform",
      "IAM",
      "Secrets Manager",
      "CI/CD",
      "OpenTelemetry",
      "Datadog",
      "Docker",
      "Redis",
    ],
  },
};

export const experience = [
  {
    role: "AI Engineer",
    company: "Accenture",
    group: "GenAI & Data · multi-agent systems",
    period: "Aug 2025 — Present",
    href: "https://www.accenture.com",
    points: [
      "Build multi-agent systems for enterprise Order-to-Cash / Dispute & Deduction: LangGraph orchestration, durable workflow state, and cross-step continuation.",
      "MCP for governed tool access — live tool execution behind reviewable controls, not free-form agent side effects.",
      "Human-in-the-loop at uncertain classification, prioritization, missing documents, approvals, and failure recovery (UI and email continuation).",
      "Multi-model inference (Claude, GPT, Azure) with async execution, routing, retries, and latency / token / cost instrumentation for evaluation.",
      "FastAPI services, PostgreSQL persistence, and architecture notes / enablement for engineers joining the program.",
    ],
    stack: [
      "LangGraph",
      "MCP",
      "HITL",
      "Claude",
      "GPT",
      "Azure AI",
      "FastAPI",
      "PostgreSQL",
    ],
  },
  {
    role: "Platform Engineer",
    company: "Accenture",
    group: "Security · MxDR / Adaptive MxDR",
    period: "Aug 2023 — Aug 2025",
    href: "https://www.accenture.com",
    points: [
      "AWS platform work modernizing MxDR → Adaptive MxDR: Terraform, CI/CD, production support across shared services and multi-account environments.",
      "Redis-backed shared metadata services; multi-environment ops; Lambda runtime upgrades (Python 3.8 → 3.12).",
      "Secrets Manager and IAM automation; service and container hardening; restricted-egress proxy automation.",
      "Production observability on the security platform: OpenTelemetry / gRPC health paths, Datadog for monitoring and debugging, mTLS telemetry into enterprise SIEMs; blue-green deploys on live upgrades.",
    ],
    stack: [
      "AWS",
      "Terraform",
      "Redis",
      "OpenTelemetry",
      "Datadog",
      "Secrets Manager",
      "IAM",
      "CI/CD",
    ],
  },
];

export const projects = [
  {
    title: "Multi-agent O2C / Dispute & Deduction systems",
    kind: "Enterprise · GenAI",
    blurb:
      "LangGraph multi-agent workflows for dispute intake, prioritization, document chase, and approvals — with MCP-governed tools and human-in-the-loop gates. Contributor on a multi-engineer delivery program.",
    stack: ["LangGraph", "MCP", "HITL", "FastAPI", "PostgreSQL"],
  },
  {
    title: "MCP tool access & human review",
    kind: "Enterprise · GenAI",
    blurb:
      "MCP servers and tool bindings so agents call live capabilities under policy, with analyst review for uncertain steps, approvals, and failure recovery.",
    stack: ["MCP", "HITL", "LangGraph", "OAuth"],
  },
  {
    title: "Multi-model inference",
    kind: "Enterprise · GenAI",
    blurb:
      "Async inference across Claude, GPT, and Azure with concurrency control, retries, routing, and latency / token / cost metrics for benchmarking and evaluation.",
    stack: ["Claude", "GPT", "Azure AI", "Async Python"],
  },
  {
    title: "MxDR → Adaptive MxDR on AWS",
    kind: "Enterprise · Platform",
    blurb:
      "Platform modernization for Accenture’s security product: Terraform, shared services, CI/CD, secrets, multi-env ops, plus OpenTelemetry, Datadog, and SIEM-bound health telemetry.",
    stack: ["AWS", "Terraform", "OpenTelemetry", "Datadog", "Redis"],
  },
  {
    title: "HelixOps",
    kind: "Open source",
    blurb:
      "Incident IDE: multi-agent RCA over runbooks, then human-approved remediation. Mock-safe by default.",
    stack: ["LangGraph", "RAG", "FastAPI", "HITL"],
    github: "https://github.com/AyushRanjanRoy-01/HelixOps",
  },
  {
    title: "RAGGym",
    kind: "Open source",
    blurb:
      "Retrieval practice platform with swappable models and stores, self-correction, and an evaluation harness.",
    stack: ["RAG", "LangGraph", "Streamlit"],
    live: "https://rag-gym.streamlit.app/",
    github: "https://github.com/AyushRanjanRoy-01/RaGGym-Chatbot-CLI",
  },
];
