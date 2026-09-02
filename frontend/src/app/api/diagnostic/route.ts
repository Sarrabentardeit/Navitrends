import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO = process.env.DIAGNOSTIC_TO ?? "contact@navitrends.com";

const MAX = {
  name: 120,
  company: 160,
  email: 254,
  phone: 40,
  role: 120,
  companySize: 32,
  problem: 4000,
  systems: 200,
  preferredContact: 32,
} as const;

function str(value: unknown, max: number) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: string) {
  const v = value.trim();
  if (!v) return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e6e9f2;color:#5b6178;width:160px;vertical-align:top">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e6e9f2;color:#0a1638">${escapeHtml(v).replaceAll("\n", "<br>")}</td>
  </tr>`;
}

function smtpReady() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (str(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, MAX.name);
  const company = str(body.company, MAX.company);
  const email = str(body.email, MAX.email);
  const phone = str(body.phone, MAX.phone);
  const role = str(body.role, MAX.role);
  const companySize = str(body.companySize, MAX.companySize);
  const problem = str(body.problem, MAX.problem);
  const systems = str(body.systems, MAX.systems);
  const preferredContact = str(body.preferredContact, MAX.preferredContact);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !company || !emailOk) {
    return NextResponse.json({ error: "Name, company and a valid work email are required." }, { status: 400 });
  }

  if (!smtpReady()) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 503 });
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const fromUser = process.env.SMTP_USER as string;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: fromUser,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `Navitrends Website <${fromUser}>`,
      to: TO,
      replyTo: email,
      subject: `Diagnostic request — ${company}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#fbfbfd">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#e31c23">Navitrends</p>
          <h1 style="margin:0 0 20px;font-size:22px;color:#0a1638">New 30-minute diagnostic request</h1>
          <table style="width:100%;border-collapse:collapse;background:#fff;padding:8px 20px;border:1px solid #e6e9f2">
            ${row("Name", name)}
            ${row("Company", company)}
            ${row("Work email", email)}
            ${row("Phone", phone)}
            ${row("Role", role)}
            ${row("Company size", companySize)}
            ${row("Problem", problem)}
            ${row("Systems / ERP", systems)}
            ${row("Preferred contact", preferredContact)}
          </table>
          <p style="margin:20px 0 0;font-size:12px;color:#8b91a5">Reply to this email to contact ${escapeHtml(name)} directly.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("diagnostic email failed", error);
    return NextResponse.json({ error: "Could not send the request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
