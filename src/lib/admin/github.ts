import "server-only";
import { AdminError } from "./server";
import type { Content } from "./content";

export function locale(value: unknown): "en" | "fr" {
  if (value !== "en" && value !== "fr") throw new AdminError("Choose English or French.");
  return value;
}

function config() {
  const token = process.env.ADMIN_GITHUB_TOKEN;
  const repository = process.env.ADMIN_GITHUB_REPOSITORY;
  const branch = process.env.ADMIN_GITHUB_BRANCH;
  if (!token || !repository || !branch || !/^[\w.-]+\/[\w.-]+$/.test(repository)) {
    throw new AdminError("Publishing is not configured. Ask your developer to complete the GitHub setup.", 503);
  }
  return { token, repository, branch };
}

async function github(lang: "en" | "fr", body?: object) {
  const { token, repository, branch } = config();
  const path = `src/app/[lang]/dictionaries/${lang}.json`.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`https://api.github.com/repos/${repository}/contents/${path}?ref=${encodeURIComponent(branch)}`, {
    method: body ? "PUT" : "GET", cache: "no-store", signal: AbortSignal.timeout(20000),
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2026-03-10", "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify({ ...body, branch }) } : {}),
  });
  if (!response.ok) {
    if (response.status === 409 || response.status === 422) throw new AdminError("The file changed or GitHub blocked the commit. Download your draft before reloading. Your developer may need to check branch rules.", 409);
    if (response.status === 401 || response.status === 403) throw new AdminError("GitHub denied access. Ask your developer to check the token permissions, expiry, and branch rules.", 502);
    if (response.status === 404) throw new AdminError("The dictionary could not be found. Ask your developer to check the repository, branch, and token access.", 502);
    throw new AdminError("GitHub is unavailable. Try again shortly. If you were publishing, reload after downloading your draft to check whether it saved.", 502);
  }
  return response.json();
}

export async function readDictionary(lang: "en" | "fr"): Promise<{ content: Content; sha: string }> {
  const data = await github(lang);
  if (data.type !== "file" || data.encoding !== "base64" || typeof data.content !== "string") throw new AdminError("GitHub returned an unreadable dictionary.", 502);
  return { content: JSON.parse(Buffer.from(data.content, "base64").toString("utf8")), sha: data.sha };
}

export async function saveDictionary(lang: "en" | "fr", content: Content, sha: string) {
  const data = await github(lang, {
    message: `Update ${lang === "en" ? "English" : "French"} website text via admin`, sha,
    content: Buffer.from(`${JSON.stringify(content, null, 2)}\n`, "utf8").toString("base64"),
  });
  return { sha: data.content.sha as string, commitUrl: data.commit.html_url as string };
}
