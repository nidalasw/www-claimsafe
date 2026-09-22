import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const cookieName = "claimsafe_admin";
export const sessionSeconds = 8 * 60 * 60;

export class AdminError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

function password() {
  const value = process.env.ADMIN_PASSWORD;
  if (!value || value.length < 24) throw new AdminError("Admin login is not configured. Ask your developer to complete the admin setup.", 503);
  return value;
}

function equal(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

export function checkPassword(value: string) { return equal(value, password()); }

function signature(expires: string) {
  return createHmac("sha256", password()).update(`claimsafe-admin-v1:${expires}`).digest("base64url");
}

export function sessionToken() {
  const expires = String(Date.now() + sessionSeconds * 1000);
  return `${expires}.${signature(expires)}`;
}

export async function authenticated() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2 || !/^\d+$/.test(parts[0])) return false;
  const remaining = Number(parts[0]) - Date.now();
  if (remaining <= 0 || remaining > sessionSeconds * 1000) return false;
  return equal(parts[1], signature(parts[0]));
}

export async function requireAdmin() {
  if (!await authenticated()) throw new AdminError("Your session has expired. Sign in again; your edits are still here.", 401);
}

export const cookieOptions = {
  httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/",
};

export function sameOrigin(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    throw new AdminError("This request must come from the admin page.", 403);
  }
}

export async function readBody(request: Request, maxBytes = 250000) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new AdminError("Expected JSON.", 415);
  const reader = request.body?.getReader();
  if (!reader) throw new AdminError("Missing request body.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) { await reader.cancel(); throw new AdminError("The submitted content is too large.", 413); }
    chunks.push(value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new AdminError("Invalid JSON."); }
}

export function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
}

export function failure(error: unknown) {
  if (error instanceof AdminError) return json({ error: error.message }, error.status);
  return json({ error: "The request could not be completed. Try again. Your edits have been kept." }, 500);
}
