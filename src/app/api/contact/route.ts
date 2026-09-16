import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.dealership !== "string" ||
    !body.name.trim() ||
    !body.email.trim() ||
    !body.dealership.trim()
  ) {
    return NextResponse.json({ error: "Name, email, and dealership name are required." }, { status: 400 });
  }

  // NOTE: this only logs the submission. Wire this up to a real email/CRM
  // provider (e.g. Resend, SendGrid, HubSpot) before relying on it in production.
  console.log("New consultation request:", body);

  return NextResponse.json({ ok: true });
}
