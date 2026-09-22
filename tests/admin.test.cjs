/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Run actual handlers with framework boundaries and GitHub I/O replaced.
function load(file, dependencies = {}) {
  const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const compiled = { exports: {} };
  const resolve = (name) => Object.hasOwn(dependencies, name) ? dependencies[name] : require(name);
  new Function("require", "module", "exports", code)(resolve, compiled, compiled.exports);
  return compiled.exports;
}
const en = require("../src/app/[lang]/dictionaries/en.json");
const fr = require("../src/app/[lang]/dictionaries/fr.json");
const content = load("src/lib/admin/content.ts");
let session;
const server = load("src/lib/admin/server.ts", {
  "server-only": {}, "next/headers": { cookies: async () => ({ get: () => session ? { value: session } : undefined }) },
});
const github = load("src/lib/admin/github.ts", { "server-only": {}, "./server": server });
const handlers = load("src/app/api/admin/content/route.ts", {
  "@/lib/admin/server": server, "@/lib/admin/github": github, "@/lib/admin/content": content,
  "@/app/[lang]/dictionaries/en.json": en, "@/app/[lang]/dictionaries/fr.json": fr,
});
const sessions = load("src/app/api/admin/session/route.ts", { "@/lib/admin/server": server });
const sha = "a".repeat(40);
function request(method, body, origin = "https://claimsafe.test") {
  return new Request("https://claimsafe.test/api/admin/content?lang=en", {
    method, headers: { origin, "content-type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

test("dictionary validation preserves structure, internal IDs, and Unicode", () => {
  for (const dictionary of [en, fr]) {
    assert.equal(content.validContent(dictionary, dictionary), true);
    const edited = content.replaceText(dictionary, ["home", "hero", "titleLine1"], "Réclamations — été 🚗");
    assert.equal(content.validContent(edited, dictionary), true);
    assert.notEqual(edited.home.hero.titleLine1, dictionary.home.hero.titleLine1);
    assert.equal(content.validContent({ ...edited, unexpected: "x" }, dictionary), false);
    assert.equal(content.validContent(content.replaceText(dictionary, ["meta", "titleTemplate"], "Missing placeholder"), dictionary), false);
    assert.equal(content.validContent(content.replaceText(dictionary, ["contact", "form", "services", "0", "value"], "changed-id"), dictionary), false);
    const shorter = structuredClone(dictionary); shorter.home.services.items.pop();
    assert.equal(content.validContent(shorter, dictionary), false);
    assert.equal(content.validContent(content.replaceText(dictionary, ["home", "hero", "titleLine1"], "a".repeat(12001)), dictionary), false);
  }
});

test("authentication, CSRF, conflict detection, and GitHub publication", async (t) => {
  const previous = { ...process.env };
  const realFetch = global.fetch;
  process.env.ADMIN_PASSWORD = "test-only-random-password-1234567890";
  process.env.ADMIN_GITHUB_TOKEN = "test-token";
  process.env.ADMIN_GITHUB_REPOSITORY = "example/claimsafe";
  process.env.ADMIN_GITHUB_BRANCH = "test-branch";
  let calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, options });
    const dictionary = url.includes("fr.json") ? fr : en;
    return Response.json(options.method === "PUT" ? { content: { sha: "b".repeat(40) }, commit: { html_url: "https://github.com/example/claimsafe/commit/test" } } : {
      type: "file", encoding: "base64", sha, content: Buffer.from(JSON.stringify(dictionary)).toString("base64"),
    });
  };
  try {
    await t.test("unauthenticated reads and writes never reach GitHub", async () => {
      session = undefined;
      assert.equal((await handlers.GET(request("GET"))).status, 401);
      assert.equal((await handlers.PUT(request("PUT", {}))).status, 401);
      assert.equal(calls.length, 0);
    });
    await t.test("login rejects incorrect passwords and foreign origins", async () => {
      assert.equal((await sessions.POST(request("POST", { password: "wrong" }))).status, 401);
      assert.equal((await sessions.POST(request("POST", { password: process.env.ADMIN_PASSWORD }, "https://evil.test"))).status, 403);
      const response = await sessions.POST(request("POST", { password: process.env.ADMIN_PASSWORD }));
      assert.equal(response.status, 200);
      assert.match(response.headers.get("set-cookie"), /HttpOnly/i);
      assert.match(response.headers.get("set-cookie"), /SameSite=strict/i);
    });
    await t.test("sessions reject tampering, expiry, and password rotation", async () => {
      session = server.sessionToken(); assert.equal(await server.authenticated(), true);
      session += "tampered"; assert.equal(await server.authenticated(), false);
      session = "1.invalid"; assert.equal(await server.authenticated(), false);
      session = server.sessionToken();
      process.env.ADMIN_PASSWORD += "rotated"; assert.equal(await server.authenticated(), false);
      session = server.sessionToken();
    });
    await t.test("authenticated reads return current GitHub content without caching", async () => {
      const response = await handlers.GET(request("GET"));
      assert.equal(response.status, 200); assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal((await response.json()).sha, sha);
      assert.match(calls.at(-1).url, /ref=test-branch/);
    });
    await t.test("foreign origins and unknown locales cannot publish", async () => {
      calls = [];
      assert.equal((await handlers.PUT(request("PUT", {}, "https://evil.test"))).status, 403);
      assert.equal((await handlers.PUT(request("PUT", { lang: "../../other" }))).status, 400);
      assert.equal(calls.length, 0);
    });
    await t.test("stale or structurally invalid drafts cannot write", async () => {
      calls = [];
      assert.equal((await handlers.PUT(request("PUT", { lang: "en", sha: "b".repeat(40), content: en }))).status, 409);
      assert.equal((await handlers.PUT(request("PUT", { lang: "en", sha, content: { ...en, extra: "x" } }))).status, 400);
      assert.equal(calls.some((call) => call.options.method === "PUT"), false);
    });
    await t.test("no-op publication does not create a commit", async () => {
      calls = [];
      const response = await handlers.PUT(request("PUT", { lang: "en", sha, content: en }));
      assert.equal((await response.json()).unchanged, true);
      assert.equal(calls.length, 1);
    });
    await t.test("both languages publish UTF-8 content with SHA, branch, and exact path", async () => {
      for (const [lang, dictionary] of [["en", en], ["fr", fr]]) {
        calls = [];
        const edited = content.replaceText(dictionary, ["home", "hero", "titleLine1"], "Réclamations — été 🚗");
        const response = await handlers.PUT(request("PUT", { lang, sha, content: edited }));
        assert.equal(response.status, 200);
        assert.equal((await response.json()).sha, "b".repeat(40));
        const write = calls.at(-1);
        assert.ok(write.url.includes(`/contents/src/app/%5Blang%5D/dictionaries/${lang}.json`));
        const body = JSON.parse(write.options.body);
        assert.equal(body.branch, "test-branch"); assert.equal(body.sha, sha);
        assert.deepEqual(JSON.parse(Buffer.from(body.content, "base64").toString("utf8")), edited);
      }
    });
    await t.test("GitHub errors are actionable and do not expose credentials", async () => {
      global.fetch = async () => Response.json({ message: "private details" }, { status: 403 });
      const response = await handlers.GET(request("GET"));
      assert.equal(response.status, 502);
      const text = await response.text(); assert.match(text, /permissions/); assert.doesNotMatch(text, /private details|test-token/);
    });
    await t.test("logout clears the session cookie", async () => {
      const response = await sessions.DELETE(request("DELETE"));
      assert.equal(response.status, 200); assert.match(response.headers.get("set-cookie"), /Max-Age=0/i);
    });
  } finally {
    global.fetch = realFetch; session = undefined;
    for (const name of ["ADMIN_PASSWORD", "ADMIN_GITHUB_TOKEN", "ADMIN_GITHUB_REPOSITORY", "ADMIN_GITHUB_BRANCH"]) {
      if (previous[name] === undefined) delete process.env[name]; else process.env[name] = previous[name];
    }
  }
});
