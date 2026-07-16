// Portfolio content — clarity first, metrics second, buzz last.
// Contributor-level claims only (multi-engineer programs).

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
  kicker: "AI Engineer at Accenture · Gurugram",
  title: "I build multi-agent systems that hold up in production.",
  subtitle:
    "I work on agent workflows and retrieval for enterprise Order-to-Cash domains " +
    "(including Dispute & Deduction), and I spent two years modernizing AWS infrastructure " +
    "for Accenture’s MxDR / Adaptive MxDR platform. Clear outcomes over buzzwords.",
};

export const certifications = [
  {
    name: "Claude Certified Architect — Foundations",
    issuer: "Anthropic",
    when: "May 2026",
    highlight: true,
    blurb: "Production-oriented architecture with Claude.",
  },
];

export const techBrands = [
  { id: "claude", name: "Claude", sub: "Anthropic" },
  { id: "azure", name: "Azure", sub: "AI Foundry" },
  { id: "aws", name: "AWS", sub: "Cloud platform" },
];

/** Fewer, calmer orbit labels */
export const orbitSkills = ["Agents", "RAG", "Claude", "AWS", "Terraform", "Observability"];

export const about = {
  paragraphs: [
    "I’m an AI Engineer at Accenture. Day to day I contribute multi-agent and retrieval components on large delivery teams — orchestration, inference, tool access, and human review gates — for Order-to-Cash / Dispute & Deduction programs.",
    "Before that I was a Platform Engineer on Accenture’s MxDR → Adaptive MxDR security product: Terraform, shared services, CI/CD, secrets, and telemetry on AWS. That work shapes how I ship agents: measurable, observable, and fail-closed by default.",
    "Open source: HelixOps (incident RCA + human-approved fixes) and RAGGym (learn retrieval by building). Available for senior AI roles.",
  ],
  facts: [
    { label: "Role", value: "AI Engineer, Accenture · GenAI & Data" },
    { label: "Before", value: "Platform Engineer · MxDR / AMxDR on AWS" },
    { label: "Certification", value: "Claude Certified Architect — Foundations (May 2026)" },
    { label: "Education", value: "B.Tech ECE, VIT Chennai (2019–2023)" },
    { label: "Location", value: "Gurugram, India" },
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
  // Prioritized — not every tool under the sun
  skills: {
    "Primary": [
      "Multi-agent systems",
      "RAG / retrieval",
      "LangGraph",
      "Claude & GPT",
      "Azure AI",
      "Human-in-the-loop",
      "FastAPI",
      "PostgreSQL",
    ],
    "Platform & security": [
      "AWS",
      "Terraform",
      "Secrets & IAM",
      "CI/CD",
      "Observability",
      "Docker",
    ],
  },
};

export const experience = [
  {
    role: "AI Engineer",
    company: "Accenture · GenAI & Data",
    period: "Aug 2025 – Present",
    points: [
      "Contribute multi-agent and workflow components for enterprise Order-to-Cash / Dispute & Deduction programs (large multi-engineer teams).",
      "Implemented multi-model inference (Claude, GPT, Azure) with routing and telemetry — measured ~40% classification lift and ~55% / ~30% latency cuts in controlled runs; batch capacity 9→50 pages; program paths at 300+ docs/day, 97%+ accuracy.",
      "Built governed tool access and agent observability (OpenTelemetry, Datadog); added retrieval grounding on agent paths.",
      "Documented architectures and ran enablement for 4 engineers (~60% faster ramp-up).",
    ],
  },
  {
    role: "Platform Engineer",
    company: "Accenture · Security · MxDR / Adaptive MxDR (AMxDR)",
    period: "Aug 2023 – Aug 2025",
    points: [
      "Led platform work modernizing MxDR → AMxDR AWS architecture: Terraform, CI/CD, production support across ~20 services / 800+ accounts — ~35% faster deploys, ~30% infra cost reduction in measured work.",
      "Owned Redis-backed shared metadata services; 6 environments; upgraded 8+ Lambdas (Python 3.8→3.12), ~50% fewer runtime failures.",
      "Secrets Manager + IAM automation; hardened 12+ services; restricted-egress proxy automation.",
      "Secure telemetry (mTLS, OpenTelemetry) into enterprise SIEMs; blue-green deploys with zero customer-facing downtime on a live upgrade.",
    ],
  },
];

export const projects = [
  {
    title: "Order-to-Cash / Dispute & Deduction agents",
    kind: "Enterprise · Accenture GenAI",
    featured: true,
    impact: "Contributor on multi-engineer program",
    blurb:
      "Multi-agent workflow components, durable state, and human review gates — not sole product ownership.",
    stack: ["LangGraph", "RAG", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Multi-model inference & routing",
    kind: "Enterprise · Accenture GenAI",
    featured: true,
    impact: "~40% accuracy · ~55% multi-page latency",
    blurb:
      "Async inference across Claude / GPT / Azure with ensemble routing and cost/latency telemetry.",
    stack: ["Claude", "GPT", "Azure AI", "Telemetry"],
  },
  {
    title: "Governed tools & observability",
    kind: "Enterprise · Accenture GenAI",
    featured: true,
    impact: "Production traces · fail-closed tools",
    blurb:
      "Tool access with guardrails and operator-visible agent state via OpenTelemetry and Datadog.",
    stack: ["MCP-style tools", "OpenTelemetry", "Datadog"],
  },
  {
    title: "MxDR → AMxDR on AWS",
    kind: "Enterprise · Platform · MxDR / AMxDR",
    featured: true,
    impact: "~35% deploy · ~30% cost · 800+ accounts",
    blurb:
      "AWS platform modernization for Accenture’s security product: Terraform, shared services, CI/CD, secrets, multi-env ops.",
    stack: ["AWS", "Terraform", "Redis", "CI/CD"],
  },
  {
    title: "Secrets, IAM & hardening",
    kind: "Enterprise · Security",
    featured: false,
    impact: "8+ Lambdas · 12+ services",
    blurb: "Secrets automation, IAM updates, runtime upgrades, dependency and container hardening.",
    stack: ["Secrets Manager", "IAM", "Docker"],
  },
  {
    title: "HelixOps",
    kind: "Open source",
    featured: true,
    impact: "Public · human-gated remediation",
    blurb:
      "Incident IDE: multi-agent RCA with retrieval over runbooks, then human-approved fixes. Mock-safe by default.",
    stack: ["FastAPI", "RAG", "React"],
    github: "https://github.com/AyushRanjanRoy-01/HelixOps",
  },
  {
    title: "RAGGym",
    kind: "Open source",
    featured: true,
    impact: "Live demo · retrieval practice",
    blurb:
      "Hands-on retrieval platform: swappable models and vector stores, self-correction, evaluation harness.",
    stack: ["RAG", "LangGraph", "Streamlit"],
    live: "https://rag-gym.streamlit.app/",
    github: "https://github.com/AyushRanjanRoy-01/RaGGym-Chatbot-CLI",
  },
];

export const journey = [
  {
    year: "2019–23",
    title: "B.Tech ECE · VIT Chennai",
    detail: "AI, security, and systems coursework.",
  },
  {
    year: "2023–25",
    title: "Platform · MxDR / AMxDR",
    detail: "AWS modernization: Terraform, services, secrets, telemetry.",
  },
  {
    year: "2025–now",
    title: "AI Engineer · GenAI",
    detail: "Agents, retrieval, inference, and review gates on enterprise programs.",
  },
  {
    year: "Open source",
    title: "HelixOps · RAGGym",
    detail: "Incident RCA tooling and retrieval learning platform.",
  },
];
