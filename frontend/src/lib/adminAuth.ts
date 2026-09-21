const COOKIE = "nt_admin_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function secret() {
  return (process.env.ADMIN_PASSWORD || "").trim();
}

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function hmac(message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toHex(sig);
}

export function adminCookieName() {
  return COOKIE;
}

export function adminCookieMaxAge() {
  return MAX_AGE_SEC;
}

export function isAdminConfigured() {
  return Boolean(secret());
}

export async function passwordMatches(input: string) {
  const expected = secret();
  if (!expected || !input) return false;
  return safeEqual(input.trim(), expected);
}

export async function createSessionValue() {
  const exp = String(Date.now() + MAX_AGE_SEC * 1000);
  const sig = await hmac(exp);
  return `${exp}.${sig}`;
}

export async function verifySessionValue(value: string | undefined) {
  if (!value || !secret()) return false;
  const [exp, sig] = value.split(".");
  if (!exp || !sig) return false;
  if (Date.now() > Number(exp)) return false;
  const expected = await hmac(exp);
  return safeEqual(sig, expected);
}
