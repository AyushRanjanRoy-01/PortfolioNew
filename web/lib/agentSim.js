/**
 * Playable multi-agent control plane (client-side simulation).
 * Models a LangGraph-style pipeline with HITL + RAG — not a live backend.
 */

export const SCENARIOS = [
  {
    id: "clean",
    label: "Clean path",
    blurb: "High confidence · docs present · auto-propose fix",
    inject: null,
  },
  {
    id: "missing_doc",
    label: "Missing document",
    blurb: "RAG finds gap · human chase · resume",
    inject: "missing_doc",
  },
  {
    id: "low_conf",
    label: "Low confidence",
    blurb: "Ensemble disagrees · fail-closed to HITL",
    inject: "low_conf",
  },
  {
    id: "policy_block",
    label: "Policy block",
    blurb: "Remediation needs approval · no auto-exec",
    inject: "policy_block",
  },
];

/** Graph nodes in display order */
export const NODES = [
  { id: "ingest", label: "Ingest", kind: "data" },
  { id: "triage", label: "Triage", kind: "agent" },
  { id: "rag", label: "RAG knowledge", kind: "rag" },
  { id: "rca", label: "RCA / decide", kind: "agent" },
  { id: "hitl", label: "HITL gate", kind: "control" },
  { id: "act", label: "Propose / act", kind: "action" },
  { id: "end", label: "Done", kind: "end" },
];

/**
 * Returns ordered steps for a scenario simulation.
 * Each step: { nodeId, status, log, confidence?, citation? }
 */
export function buildRun(scenarioId) {
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
  const inj = scenario.inject;
  const steps = [];

  steps.push({
    nodeId: "ingest",
    status: "ok",
    log: "Alert / work item correlated. Fingerprint stored. Idempotent ingest.",
  });
  steps.push({
    nodeId: "triage",
    status: "ok",
    log: "Severity scored. Route to multi-agent analysis. Noise filter passed.",
    confidence: 0.86,
  });

  if (inj === "missing_doc") {
    steps.push({
      nodeId: "rag",
      status: "warn",
      log: "RAG over runbooks: partial hit. Required attachment missing for reason-code path.",
      citation: "runbook · document requirements",
      confidence: 0.52,
    });
    steps.push({
      nodeId: "rca",
      status: "ok",
      log: "Hypothesis: blocked on missing customer PDF. Draft chase message. Pause workflow.",
      confidence: 0.71,
    });
    steps.push({
      nodeId: "hitl",
      status: "hitl",
      log: "HITL interrupt: analyst reviews chase draft · resume when attachment lands.",
    });
    steps.push({
      nodeId: "act",
      status: "ok",
      log: "Document received · workflow resumed · extraction continues. No unsupervised infra action.",
    });
  } else if (inj === "low_conf") {
    steps.push({
      nodeId: "rag",
      status: "ok",
      log: "RAG retrieves 3 chunks (postmortem + latency runbook). Citations attached.",
      citation: "postmortem · payment latency 2024",
      confidence: 0.78,
    });
    steps.push({
      nodeId: "rca",
      status: "warn",
      log: "Ensemble split 2–2. Confidence below threshold → fail-closed, no auto-action.",
      confidence: 0.48,
    });
    steps.push({
      nodeId: "hitl",
      status: "hitl",
      log: "HITL required: operator must confirm root cause before any remediation proposal.",
    });
    steps.push({
      nodeId: "act",
      status: "blocked",
      log: "Action withheld until human confirmation. Audit trail written.",
    });
  } else if (inj === "policy_block") {
    steps.push({
      nodeId: "rag",
      status: "ok",
      log: "RAG: deployment rollback playbook ranked #1 with citations.",
      citation: "runbook · deployment_rollback",
      confidence: 0.91,
    });
    steps.push({
      nodeId: "rca",
      status: "ok",
      log: "RCA: bad canary release. Proposed action: rollback service X (high blast radius).",
      confidence: 0.88,
    });
    steps.push({
      nodeId: "hitl",
      status: "hitl",
      log: "Policy: remediations require human approval. Mock mode default — no live cluster touch.",
    });
    steps.push({
      nodeId: "act",
      status: "pending",
      log: "Proposal queued. Approve → execute (mock-safe) · Reject → log reason.",
    });
  } else {
    steps.push({
      nodeId: "rag",
      status: "ok",
      log: "RAG retrieves runbook + similar incident. Citations bound to answer.",
      citation: "runbook · high_latency",
      confidence: 0.9,
    });
    steps.push({
      nodeId: "rca",
      status: "ok",
      log: "RCA: saturation on checkout-api. Propose scale-out with rationale.",
      confidence: 0.87,
    });
    steps.push({
      nodeId: "hitl",
      status: "ok",
      log: "Low blast radius + high confidence → soft gate logged; operator still notified.",
    });
    steps.push({
      nodeId: "act",
      status: "ok",
      log: "Remediation proposed with audit trail. In live systems: approve before execute.",
    });
  }

  steps.push({
    nodeId: "end",
    status: "ok",
    log: "Trace complete. Every step is attributable — agents propose, controls decide.",
  });

  return { scenario, steps };
}
