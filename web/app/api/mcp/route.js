// A minimal MCP-style endpoint: JSON-RPC 2.0 over HTTP POST.
// Lets other people's agents query Ayush's work. (The medium is the message.)
import { buildKnowledge } from "@/lib/knowledge";
import { profile, projects } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOOLS = [
  {
    name: "get_profile",
    description: "Get Ayush Ranjan Roy's role, location and contact links.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_projects",
    description: "List Ayush's projects with descriptions, tech stack and links.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "ask_ayush",
    description: "Ask a natural-language question about Ayush's work and experience.",
    inputSchema: {
      type: "object",
      properties: { question: { type: "string", description: "The question." } },
      required: ["question"],
    },
  },
];

async function callTool(name, args) {
  if (name === "get_profile") {
    return `${profile.name} — ${profile.role}, ${profile.location}. ` +
      `Email ${profile.email}. GitHub ${profile.github}. LinkedIn ${profile.linkedin}.`;
  }
  if (name === "list_projects") {
    return projects
      .map((p) => `- ${p.title} [${p.kind}]: ${p.blurb} Stack: ${p.stack.join(", ")}.` +
        (p.github ? ` Code: ${p.github}.` : "") + (p.live ? ` Demo: ${p.live}.` : ""))
      .join("\n");
  }
  if (name === "ask_ayush") {
    const key = process.env.OPENAI_API_KEY;
    const question = String(args?.question ?? "").slice(0, 500).trim();
    if (!key) return "The assistant isn't configured. Contact " + profile.email;
    if (!question) return "Provide a 'question'.";
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        max_tokens: 320,
        messages: [
          { role: "system", content: `Answer about Ayush using ONLY these facts; concise, no invented facts. If unknown, say so.\n\n${buildKnowledge()}` },
          { role: "user", content: question },
        ],
      }),
    });
    if (!r.ok) return "Model error.";
    const d = await r.json();
    return d?.choices?.[0]?.message?.content?.trim() || "No answer.";
  }
  throw new Error("Unknown tool: " + name);
}

const ok = (id, result) => Response.json({ jsonrpc: "2.0", id, result });
const err = (id, code, message) => Response.json({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

export async function POST(req) {
  let m;
  try { m = await req.json(); } catch { return err(null, -32700, "Parse error"); }
  const { id = null, method, params } = m || {};
  try {
    switch (method) {
      case "initialize":
        return ok(id, {
          protocolVersion: "2024-11-05",
          serverInfo: { name: "ayush-portfolio", version: "1.0.0" },
          capabilities: { tools: {} },
          instructions: "Tools to query Ayush Ranjan Roy's work and experience.",
        });
      case "ping":
        return ok(id, {});
      case "notifications/initialized":
        return new Response(null, { status: 202 });
      case "tools/list":
        return ok(id, { tools: TOOLS });
      case "tools/call": {
        const text = await callTool(params?.name, params?.arguments || {});
        return ok(id, { content: [{ type: "text", text }], isError: false });
      }
      default:
        return err(id, -32601, "Method not found: " + method);
    }
  } catch (e) {
    return err(id, -32603, String(e?.message || "Internal error"));
  }
}

// GET = human/agent-readable description of the endpoint.
export async function GET() {
  return Response.json({
    name: "ayush-portfolio",
    description: "MCP-style JSON-RPC endpoint. POST JSON-RPC 2.0 to call tools.",
    transport: "JSON-RPC 2.0 over HTTP POST",
    methods: ["initialize", "tools/list", "tools/call", "ping"],
    tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
  });
}
