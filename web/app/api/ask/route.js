import { buildKnowledge } from "@/lib/knowledge";
import { profile } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "gpt-4o-mini";

export async function POST(req) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return Response.json(
      { error: "The assistant isn't configured yet. Email me instead: " + profile.email },
      { status: 503 }
    );
  }

  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Bad request." }, { status: 400 }); }

  const question = String(body?.question ?? "").slice(0, 500).trim();
  if (!question) return Response.json({ error: "Ask a question first." }, { status: 400 });

  const system =
    `You are the assistant on ${profile.name}'s personal site. Answer questions about ${profile.name} ` +
    `using ONLY the facts below. Be concise (2-4 sentences), specific and calm; no hype, no invented ` +
    `numbers, employers or dates. If the facts don't cover it, say you don't have that detail and suggest ` +
    `emailing ${profile.email}. Refer to him as "Ayush".\n\nFACTS:\n${buildKnowledge()}`;

  const t0 = Date.now();
  let r;
  try {
    r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        max_tokens: 320,
        messages: [
          { role: "system", content: system },
          { role: "user", content: question },
        ],
      }),
    });
  } catch {
    return Response.json({ error: "Couldn't reach the model. Try again." }, { status: 502 });
  }

  if (!r.ok) {
    return Response.json({ error: "The model returned an error. Try again shortly." }, { status: 502 });
  }

  const data = await r.json();
  const answer = data?.choices?.[0]?.message?.content?.trim() || "I don't have an answer for that.";
  return Response.json({ answer, model: data?.model || MODEL, ms: Date.now() - t0 });
}
