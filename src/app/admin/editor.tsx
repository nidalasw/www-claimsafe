"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { editable, fields, label, replaceText, type Content } from "@/lib/admin/content";

type Locale = "en" | "fr";
type Draft = { content: Content; original: Content; sha: string };
class RequestError extends Error {
  constructor(message: string, public status: number) { super(message); }
}
async function api(path: string, method = "GET", body?: unknown) {
  const response = await fetch(`/api/admin/${path}`, {
    method, cache: "no-store", headers: { "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) throw new RequestError(data.error ?? "Something went wrong. Try again.", response.status);
  return data;
}

export function Editor() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [lang, setLang] = useState<Locale>("en");
  const [drafts, setDrafts] = useState<Partial<Record<Locale, Draft>>>({});
  const [section, setSection] = useState("home");
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [review, setReview] = useState(false);
  const draft = drafts[lang];
  const originalFields = draft ? new Map(fields(draft.original).map((field) => [field.path.join("."), field.value])) : new Map<string, string>();
  const changed = draft ? fields(draft.content).filter((field) => field.value !== originalFields.get(field.path.join("."))) : [];
  const dirty = Object.values(drafts).some((item) => JSON.stringify(item.content) !== JSON.stringify(item.original));

  function handleError(reason: unknown) {
    setError(reason instanceof Error ? reason.message : "Something went wrong. Your edits are still here.");
    if (reason instanceof RequestError && reason.status === 401) setSignedIn(false);
  }

  useEffect(() => {
    api("session").then((data) => setSignedIn(data.authenticated)).catch((reason) => { setSignedIn(false); handleError(reason); });
  }, []);

  useEffect(() => {
    if (!signedIn || draft) return;
    let active = true;
    api(`content?lang=${lang}`).then((data) => {
      if (active) setDrafts((current) => ({ ...current, [lang]: { ...data, original: data.content } }));
    }).catch((reason) => { if (active) handleError(reason); });
    return () => { active = false; };
  }, [signedIn, lang, draft]);

  useEffect(() => {
    function warn(event: BeforeUnloadEvent) { if (dirty) { event.preventDefault(); event.returnValue = ""; } }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try { await api("session", "POST", { password }); setPassword(""); setSignedIn(true); }
    catch (reason) { handleError(reason); }
    finally { setBusy(false); }
  }

  async function logout() {
    if (dirty && !window.confirm("Sign out and discard unpublished changes in both languages?")) return;
    setBusy(true); setError("");
    try { await api("session", "DELETE"); setDrafts({}); setSignedIn(false); setNotice(""); setReview(false); }
    catch (reason) { handleError(reason); }
    finally { setBusy(false); }
  }

  async function reload() {
    if (changed.length && !window.confirm("Discard unpublished changes for this language and load the latest saved text?")) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const data = await api(`content?lang=${lang}`);
      setDrafts((current) => ({ ...current, [lang]: { ...data, original: data.content } })); setReview(false);
    } catch (reason) { handleError(reason); }
    finally { setBusy(false); }
  }

  async function publish() {
    if (!draft) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const result = await api("content", "PUT", { lang, content: draft.content, sha: draft.sha });
      setDrafts((current) => ({ ...current, [lang]: { ...draft, sha: result.sha, original: draft.content } }));
      setReview(false);
      setNotice(result.unchanged ? "This text is already saved." : "Text saved. Vercel will publish it when the new deployment finishes. This usually takes a few minutes.");
    } catch (reason) { handleError(reason); }
    finally { setBusy(false); }
  }

  function download() {
    if (!draft) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(draft.content, null, 2) + "\n"], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${lang}-draft.json`; anchor.click(); URL.revokeObjectURL(url);
  }

  if (signedIn === null) return <main className="admin-login"><p role="status">Opening website editor…</p></main>;
  if (!signedIn) return (
    <main className="admin-login">
      <form className="admin-card" onSubmit={login}>
        <span className="admin-brand">CLAIMSAFE</span>
        <h1>Website editor</h1><p>Sign in to update your website’s English and French text.</p>
        {dirty && <p>Your unpublished edits are kept here while you sign in again.</p>}
        <label htmlFor="password">Admin password</label>
        <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button className="admin-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        <Link href="/en">Back to website</Link>
      </form>
    </main>
  );

  const visible = draft ? fields(draft.content).filter((field) => editable(field.path) && field.path[0] === section &&
    `${field.path.map(label).join(" ")} ${field.value}`.toLowerCase().includes(search.toLowerCase())) : [];
  return (
    <div className="admin-shell">
      <header className="admin-header"><div><span className="admin-brand">CLAIMSAFE</span><h1>Website editor</h1></div>
        <div className="admin-actions"><a href={`/${lang}`} target="_blank" rel="noreferrer">View website ↗</a><button disabled={busy} onClick={logout}>Sign out</button></div>
      </header>
      <div className="admin-intro"><h2>Your words. Your website.</h2><p>Choose a language and section, edit the text, then review and publish your changes.</p></div>
      <div className="admin-toolbar">
        <label>Language<select disabled={busy} value={lang} onChange={(event) => { setLang(event.target.value as Locale); setError(""); setNotice(""); setReview(false); }}><option value="en">English</option><option value="fr">Français</option></select></label>
        <div className="admin-actions"><span>{changed.length ? `${changed.length} unpublished change${changed.length === 1 ? "" : "s"}` : "No unpublished changes"}</span>
          <button disabled={busy} onClick={reload}>Reload saved text</button>
          <button disabled={!draft || busy} onClick={download}>Download draft</button>
          <button className="admin-primary" disabled={!changed.length || busy} onClick={() => setReview(true)}>Review changes</button>
        </div>
      </div>
      {error && <div className="admin-error" role="alert">{error}</div>}
      {notice && <div className="admin-success" role="status">{notice}</div>}
      {!draft ? <p role="status">{error ? "Use Reload saved text to try again." : "Loading your latest text…"}</p> : review ? (
        <main className="admin-card admin-review"><h2>Review {lang === "en" ? "English" : "French"} changes</h2>
          <p>Publishing saves this language and starts a website update. The live website changes after deployment finishes.</p>
          {changed.map((field) => <div className="admin-change" key={field.path.join(".")}><h3>{field.path.map(label).join(" / ")}</h3>
            <div className="admin-comparison"><div><strong>Before</strong><p>{originalFields.get(field.path.join(".")) || "(empty)"}</p></div><div><strong>After</strong><p>{field.value || "(empty)"}</p></div></div></div>)}
          <div className="admin-actions"><button disabled={busy} onClick={() => setReview(false)}>Keep editing</button><button className="admin-primary" disabled={busy || !changed.length} onClick={publish}>{busy ? "Publishing…" : `Publish ${lang === "en" ? "English" : "French"} changes`}</button></div>
        </main>
      ) : (
        <div className="admin-workspace">
          <nav className="admin-sections" aria-label="Website sections">{Object.keys(draft.content).map((key) => <button key={key} aria-current={section === key ? "page" : undefined} onClick={() => { setSection(key); setSearch(""); }}>{label(key)}</button>)}</nav>
          <main className="admin-card admin-fields"><div className="admin-section-heading"><div><h2>{label(section)}</h2><p>{lang === "en" ? "English" : "French"} website text</p></div><label>Find text<input type="search" placeholder="Search this section" value={search} onChange={(event) => setSearch(event.target.value)} /></label></div>
            {visible.length === 0 && <p>No matching text in this section.</p>}
            {visible.map((field) => {
              const id = field.path.join(".");
              return <div className="admin-field" key={id}><label htmlFor={id}><span>{field.path.slice(1, -1).map(label).join(" / ")}</span>{label(field.path.at(-1)!)}</label>
                <textarea id={id} lang={lang} disabled={busy} maxLength={12000} rows={field.value.length > 120 ? 4 : 2} value={field.value} onChange={(event) => {
                  const content = replaceText(draft.content, field.path, event.target.value);
                  setDrafts((current) => ({ ...current, [lang]: { ...draft, content } })); setNotice("");
                }} />
                {id === "meta.titleTemplate" && <small>Keep %s — it is replaced with each page’s title.</small>}
              </div>;
            })}
          </main>
        </div>
      )}
      <footer className="admin-footnote">English and French are published separately. Edits stay in this tab until you publish or leave.</footer>
    </div>
  );
}
