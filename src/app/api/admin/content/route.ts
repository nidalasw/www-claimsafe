import { failure, json, readBody, requireAdmin, sameOrigin, AdminError } from "@/lib/admin/server";
import { locale, readDictionary, saveDictionary } from "@/lib/admin/github";
import { validContent } from "@/lib/admin/content";
import en from "@/app/[lang]/dictionaries/en.json";
import fr from "@/app/[lang]/dictionaries/fr.json";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const lang = locale(new URL(request.url).searchParams.get("lang"));
    return json(await readDictionary(lang));
  } catch (error) { return failure(error); }
}

export async function PUT(request: Request) {
  try {
    sameOrigin(request);
    await requireAdmin();
    const body = await readBody(request);
    const lang = locale(body?.lang);
    if (typeof body.sha !== "string" || !/^[a-f0-9]{40}$/.test(body.sha)) throw new AdminError("Missing file version. Reload the editor.");
    const current = await readDictionary(lang);
    if (current.sha !== body.sha) throw new AdminError("Someone has changed this language since you opened it. Download your draft, then reload and apply your changes to the latest text.", 409);
    if (!validContent(body.content, lang === "en" ? en : fr) || !validContent(body.content, current.content)) {
      throw new AdminError("The text structure is invalid. Keep the existing fields, limit each field to 12,000 characters, and keep %s in the page title template.");
    }
    if (JSON.stringify(body.content) === JSON.stringify(current.content)) return json({ sha: current.sha, unchanged: true });
    return json(await saveDictionary(lang, body.content, current.sha));
  } catch (error) { return failure(error); }
}
