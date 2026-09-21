import { NextResponse } from "next/server";
import {
  adminCookieMaxAge,
  adminCookieName,
  createSessionValue,
  isAdminConfigured,
  passwordMatches,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Connexion impossible." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!(await passwordMatches(String(body?.password ?? "")))) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName(), await createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminCookieMaxAge(),
  });
  return response;
}
