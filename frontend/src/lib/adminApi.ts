import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminCookieName, verifySessionValue } from "./adminAuth";

export async function requireAdmin() {
  const jar = await cookies();
  const ok = await verifySessionValue(jar.get(adminCookieName())?.value);
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export function requireWriter() {
  return null;
}
