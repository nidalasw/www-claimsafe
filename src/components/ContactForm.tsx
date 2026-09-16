"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="animate-entrance rounded-2xl border border-border bg-card p-8 text-center" role="status">
        <p className="font-serif text-xl font-semibold text-primary">Thank you.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your request has been received. A member of our team will be in touch shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:border-accent focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-secondary">
          Name <span className="text-destructive">*</span>
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-secondary">
          Email <span className="text-destructive">*</span>
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>

      <div>
        <label htmlFor="dealership" className="mb-1.5 block text-sm font-medium text-secondary">
          Dealership Name <span className="text-destructive">*</span>
        </label>
        <input id="dealership" name="dealership" type="text" required className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-secondary">
          How Can We Help?
        </label>
        <textarea id="message" name="message" rows={4} className={inputClass} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-destructive">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gradient w-full cursor-pointer rounded-full px-6 py-3.5 text-base font-semibold text-accent-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request a Consultation"}
      </button>
    </form>
  );
}
