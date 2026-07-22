// Portfolio content — impact + tech only.
// Datadog / OpenTelemetry → MxDR only.
// GenAI → multi-agent, MCP, HITL, inference. No process jargon.

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
    "AI Engineer at Accenture. Multi-agent systems, MCP, and human-in-the-loop workflows.",
  blurb:
    "I build multi-agent systems for enterprise finance workflows (Order-to-Cash / Dispute & Deduction) " +
    "with LangGraph, MCP tool access, and human review. Previously platform engineering on " +
    "Accenture’s MxDR / Adaptive MxDR product on AWS — including OpenTelemetry, Datadog, and SIEM telemetry.",
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
    "AI engineer at Accenture (GenAI & Data). I build multi-agent systems with LangGraph, MCP for governed tool calls, human-in-the-loop review, FastAPI, and PostgreSQL — on multi-engineer teams shipping enterprise finance workflows.",
    "I also build multi-model inference (Claude, GPT, Azure): async execution, routing, retries, and latency / token / cost metrics.",
    "2023–2025: platform engineer on Accenture Security’s MxDR → Adaptive MxDR product — Terraform, shared services, CI/CD, secrets, and production observability (OpenTelemetry, Datadog, SIEM) on AWS.",
    "Open source: HelixOps, RAGGym. Gurugram. Open to senior AI roles.",
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
    group: "GenAI & Data",
    period: "Aug 2025 — Present",
    href: "https://www.accenture.com",
    points: [
      "Multi-agent systems for enterprise Order-to-Cash / Dispute & Deduction using LangGraph, FastAPI, and PostgreSQL — durable state so long-running workflows resume reliably.",
      "MCP tool access so agents call production tools under policy instead of unconstrained side effects.",
      "Human-in-the-loop gates so uncertain or high-impact steps pause for analyst approval before the run continues.",
      "Multi-model inference (Claude, GPT, Azure) with async execution, routing, retries, and latency / token / cost metrics for evaluation.",
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
      "AWS platform for MxDR → Adaptive MxDR: Terraform, CI/CD, and production support across shared services and multi-account environments.",
      "Redis-backed shared metadata services; Lambda upgrades (Python 3.8 → 3.12); multi-environment operations.",
      "Secrets Manager and IAM automation; service hardening; restricted-egress proxy automation.",
      "Observability on the security platform: OpenTelemetry health paths, Datadog monitoring, mTLS telemetry into enterprise SIEMs; blue-green deploys on live upgrades.",
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
    title: "Multi-agent finance workflows",
    kind: "Enterprise · GenAI",
    blurb:
      "LangGraph multi-agent systems for Order-to-Cash / Dispute & Deduction — MCP tools, human review gates, FastAPI, PostgreSQL. Contributor on a multi-engineer team.",
    stack: ["LangGraph", "MCP", "HITL", "FastAPI", "PostgreSQL"],
  },
  {
    title: "MCP + human-in-the-loop",
    kind: "Enterprise · GenAI",
    blurb:
      "MCP servers and tool bindings for governed agent tool use, with human approval before high-impact actions.",
    stack: ["MCP", "HITL", "LangGraph"],
  },
  {
    title: "Multi-model inference",
    kind: "Enterprise · GenAI",
    blurb:
      "Async inference across Claude, GPT, and Azure with concurrency control, retries, routing, and latency / token / cost metrics.",
    stack: ["Claude", "GPT", "Azure AI", "Async Python"],
  },
  {
    title: "MxDR → Adaptive MxDR on AWS",
    kind: "Enterprise · Platform",
    blurb:
      "Platform modernization: Terraform, shared services, CI/CD, secrets, plus OpenTelemetry, Datadog, and SIEM health telemetry.",
    stack: ["AWS", "Terraform", "OpenTelemetry", "Datadog", "Redis"],
  },
  {
    title: "HelixOps",
    kind: "Open source",
    blurb:
      "Incident IDE: multi-agent RCA over runbooks, then human-approved fixes. Mock-safe by default.",
    stack: ["LangGraph", "RAG", "FastAPI", "HITL"],
    github: "https://github.com/AyushRanjanRoy-01/HelixOps",
  },
  {
    title: "RAGGym",
    kind: "Open source",
    blurb:
      "Retrieval practice platform: swappable models and stores, self-correction, evaluation harness.",
    stack: ["RAG", "LangGraph", "Streamlit"],
    live: "https://rag-gym.streamlit.app/",
    github: "https://github.com/AyushRanjanRoy-01/RaGGym-Chatbot-CLI",
  },
];
