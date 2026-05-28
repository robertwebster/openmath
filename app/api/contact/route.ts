import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  firstName?: string;
  surname?: string;
  email?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TO_EMAIL = "info@openmath.au";
const FROM_EMAIL = "Open Math <no-reply@openmath.au>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const firstName = body.firstName?.trim() ?? "";
  const surname = body.surname?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!firstName || !surname || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const fullName = `${firstName} ${surname}`;
  const subject = `Open Math contact from ${fullName}`;
  const text = `From: ${fullName} <${email}>\n\n${message}`;
  const html = `
    <p><strong>From:</strong> ${escapeHtml(fullName)} &lt;${escapeHtml(email)}&gt;</p>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  `;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return NextResponse.json(
      { error: "Couldn't send the message. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
