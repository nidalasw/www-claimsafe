"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <Reveal key={item.question} delay={Math.min(i, 6) * 40}>
            <div
              className={`overflow-hidden rounded-2xl border bg-card transition-all duration-250 ${
                isOpen ? "border-accent/30 shadow-md" : "border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-5 px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-primary">{item.question}</span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-accent text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" aria-hidden="true">
                    <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className="faq-body px-6" data-open={isOpen}>
                <div>
                  <p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.answer}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
