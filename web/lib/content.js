// Factual portfolio content. Contributor-level claims only.

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
    "AI Engineer at Accenture. Multi-agent systems, retrieval, and the platform work underneath them.",
  blurb:
    "I contribute agent and retrieval components on enterprise Order-to-Cash programs, " +
    "including Dispute & Deduction. Previously I was a platform engineer on Accenture’s " +
    "MxDR / Adaptive MxDR product on AWS.",
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
    "I’m an AI engineer at Accenture (GenAI & Data). Day to day I work on multi-agent workflows, inference routing, tool access, and human review steps for Order-to-Cash / Dispute & Deduction delivery programs — as a contributor on multi-engineer teams.",
    "From 2023–2025 I was a platform engineer on Accenture Security’s MxDR → Adaptive MxDR product: Terraform, shared services, CI/CD, secrets, and telemetry on AWS across multi-account environments.",
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
    "AI & systems": [
      "Multi-agent systems",
      "RAG",
      "LangGraph",
      "Claude",
      "GPT",
      "Azure AI",
      "FastAPI",
      "PostgreSQL",
    ],
    Platform: ["AWS", "Terraform", "IAM", "CI/CD", "OpenTelemetry", "Docker", "Redis"],
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
      "Multi-agent and workflow components for enterprise Order-to-Cash / Dispute & Deduction programs.",
      "Multi-model inference (Claude, GPT, Azure) with routing, telemetry, and retrieval grounding.",
      "Governed tool access and agent observability with OpenTelemetry and Datadog.",
      "Architecture notes and enablement for engineers joining the program.",
    ],
    stack: ["LangGraph", "Claude", "Azure", "FastAPI", "PostgreSQL", "OpenTelemetry"],
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
      "Secrets Manager and IAM automation; service and container hardening.",
      "Telemetry into enterprise SIEMs (mTLS, OpenTelemetry); blue-green deploys on live upgrades.",
    ],
    stack: ["AWS", "Terraform", "Redis", "Secrets Manager", "IAM", "CI/CD"],
  },
];

export const projects = [
  {
    title: "Order-to-Cash / Dispute & Deduction agents",
    kind: "Enterprise",
    blurb:
      "Multi-agent workflow components, durable state, and human review gates on a multi-engineer Accenture GenAI program.",
    stack: ["LangGraph", "RAG", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Multi-model inference",
    kind: "Enterprise",
    blurb:
      "Async inference across Claude, GPT, and Azure with routing and cost/latency telemetry.",
    stack: ["Claude", "GPT", "Azure AI"],
  },
  {
    title: "MxDR → Adaptive MxDR on AWS",
    kind: "Enterprise",
    blurb:
      "Platform modernization for Accenture’s security product: Terraform, shared services, CI/CD, secrets, multi-env ops.",
    stack: ["AWS", "Terraform", "Redis", "CI/CD"],
  },
  {
    title: "HelixOps",
    kind: "Open source",
    blurb:
      "Incident IDE: multi-agent RCA over runbooks, then human-approved remediation. Mock-safe by default.",
    stack: ["FastAPI", "RAG", "React"],
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
