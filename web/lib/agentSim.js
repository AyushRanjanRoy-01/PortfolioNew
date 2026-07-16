/**
 * Playable multi-agent control plane (client-side simulation).
 * Generic SRE / agent-control scenarios only — no client business process detail.
 */

export const SCENARIOS = [
  {
    id: "clean",
    label: "Clean path",
    blurb: "High confidence · RAG hit · propose action",
    inject: null,
  },
  {
    id: "weak_rag",
    label: "Weak retrieval",
    blurb: "Sparse RAG context · escalate to HITL",
    inject: "weak_rag",
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
    blurb: "High blast radius · approval required",
    inject: "policy_block",
  },
];

export const NODES = [
  { id: "ingest", label: "Ingest", kind: "data" },
  { id: "triage", label: "Triage", kind: "agent" },
  { id: "rag", label: "RAG knowledge", kind: "rag" },
  { id: "rca", label: "RCA / decide", kind: "agent" },
  { id: "hitl", label: "HITL gate", kind: "control" },
  { id: "act", label: "Propose / act", kind: "action" },
  { id: "end", label: "Done", kind: "end" },
];

export function buildRun(scenarioId) {
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
  const inj = scenario.inject;
  const steps = [];

  steps.push({
    nodeId: "ingest",
    status: "ok",
    log: "Signal ingested. Fingerprint stored. Idempotent write.",
  });
  steps.push({
    nodeId: "triage",
    status: "ok",
    log: "Severity scored. Route to multi-agent analysis.",
    confidence: 0.86,
  });

  if (inj === "weak_rag") {
    steps.push({
      nodeId: "rag",
      status: "warn",
      log: "RAG over public runbooks: sparse match. Insufficient context to ground a fix.",
      citation: "runbook · index miss",
      confidence: 0.41,
    });
    steps.push({
      nodeId: "rca",
      status: "warn",
      log: "Hypothesis incomplete. Refuse unsupervised action when retrieval is weak.",
      confidence: 0.55,
    });
    steps.push({
      nodeId: "hitl",
      status: "hitl",
      log: "HITL interrupt: operator reviews incomplete context before any proposal.",
    });
    steps.push({
      nodeId: "act",
      status: "blocked",
      log: "No action executed. Trace records retrieval gap + human handoff.",
    });
  } else if (inj === "low_conf") {
    steps.push({
      nodeId: "rag",
      status: "ok",
      log: "RAG retrieves sample postmortem + latency runbook. Citations attached.",
      citation: "sample · latency runbook",
      confidence: 0.78,
    });
    steps.push({
      nodeId: "rca",
      status: "warn",
      log: "Ensemble split. Confidence below threshold → fail-closed.",
      confidence: 0.48,
    });
    steps.push({
      nodeId: "hitl",
      status: "hitl",
      log: "HITL required: human confirms root cause before any remediation proposal.",
    });
    steps.push({
      nodeId: "act",
      status: "blocked",
      log: "Action withheld until confirmation. Audit trail written.",
    });
  } else if (inj === "policy_block") {
    steps.push({
      nodeId: "rag",
      status: "ok",
      log: "RAG ranks a generic rollback playbook with citations.",
      citation: "sample · rollback playbook",
      confidence: 0.91,
    });
    steps.push({
      nodeId: "rca",
      status: "ok",
      log: "RCA suggests high blast-radius change. Proposal only — never auto-apply.",
      confidence: 0.88,
    });
    steps.push({
      nodeId: "hitl",
      status: "hitl",
      log: "Policy: remediations require human approval. Mock mode default.",
    });
    steps.push({
      nodeId: "act",
      status: "pending",
      log: "Proposal queued. Approve → mock-safe execute · Reject → log reason.",
    });
  } else {
    steps.push({
      nodeId: "rag",
      status: "ok",
      log: "RAG retrieves runbook + similar incident. Citations bound to answer.",
      citation: "sample · high latency",
      confidence: 0.9,
    });
    steps.push({
      nodeId: "rca",
      status: "ok",
      log: "RCA: service saturation. Propose scale-out with rationale.",
      confidence: 0.87,
    });
    steps.push({
      nodeId: "hitl",
      status: "ok",
      log: "Low blast radius + high confidence → soft gate logged; operator notified.",
    });
    steps.push({
      nodeId: "act",
      status: "ok",
      log: "Remediation proposed with audit trail. Live systems still require approve-before-execute.",
    });
  }

  steps.push({
    nodeId: "end",
    status: "ok",
    log: "Trace complete. Agents propose; controls decide. Demo uses sample data only.",
  });

  return { scenario, steps };
}
