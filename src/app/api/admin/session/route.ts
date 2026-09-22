import { authenticated, checkPassword, cookieName, cookieOptions, failure, json, readBody, sameOrigin, sessionSeconds, sessionToken, AdminError } from "@/lib/admin/server";

export const runtime = "nodejs";

export async function GET() {
  try { return json({ authenticated: await authenticated() }); }
  catch (error) { return failure(error); }
}

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const body = await readBody(request, 4096);
    if (typeof body?.password !== "string" || !checkPassword(body.password)) throw new AdminError("Incorrect password.", 401);
    const response = json({ authenticated: true });
    response.cookies.set(cookieName, sessionToken(), { ...cookieOptions, maxAge: sessionSeconds });
    return response;
  } catch (error) { return failure(error); }
}

export async function DELETE(request: Request) {
  try {
    sameOrigin(request);
    const response = json({ authenticated: false });
    response.cookies.set(cookieName, "", { ...cookieOptions, maxAge: 0 });
    return response;
  } catch (error) { return failure(error); }
}
