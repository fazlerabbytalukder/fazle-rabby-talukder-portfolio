import { NextResponse } from "next/server";
import { contactPage, site } from "@/data/site";

/** Sends contact-form messages through Resend. The API key only ever lives on the server. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, message: 5000 };

// Light per-IP rate limit (per server instance): 5 messages / 10 minutes
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const DEFAULT_FROM = "Portfolio Contact <onboarding@resend.dev>";
// Resend can only send from domains you've verified — never from a free mailbox like Gmail
const FREE_MAIL = /@(gmail|googlemail|yahoo|outlook|hotmail|live|icloud|proton(mail)?)\.[a-z.]+>?\s*$/i;

function fromAddress() {
  const configured = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!configured) return DEFAULT_FROM;
  if (FREE_MAIL.test(configured)) {
    console.warn(`[contact] CONTACT_FROM_EMAIL "${configured}" is a free-mail address Resend can't send from; using ${DEFAULT_FROM}`);
    return DEFAULT_FROM;
  }
  return configured;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bot checks: hidden honeypot filled, or submitted faster than a person could type.
  // Pretend success so bots move on, but log it so a misfire on a real visitor is visible.
  const trap = typeof body.hp_trap === "string" && body.hp_trap.trim();
  const started = Number(body.started);
  const tooFast = Number.isFinite(started) && started > 0 && Date.now() - started < 2000;
  if (trap || tooFast) {
    console.warn(`[contact] dropped as bot (${trap ? "honeypot filled" : "submitted too fast"})`);
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > LIMITS.name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (message.length < 10 || message.length > LIMITS.message)
    return NextResponse.json({ error: "Message should be between 10 and 5000 characters." }, { status: 400 });
  const topic = contactPage.subjects.includes(subject) ? subject : "General Inquiry";

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages — please try again in a few minutes." }, { status: 429 });
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
      <h2 style="margin:0 0 4px">New message from your portfolio</h2>
      <p style="margin:0 0 20px;color:#666">${escapeHtml(topic)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#666;width:80px">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;border-radius:8px;background:#f5f5f7;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(message)}</div>
      <p style="margin-top:20px;font-size:12px;color:#999">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: fromAddress(),
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      reply_to: email,
      subject: `[Portfolio] ${topic} — ${name}`,
      html,
      text: `${topic}\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "Couldn't send your message right now. Please email me directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
