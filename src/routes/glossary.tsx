import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { glossary } from "@/lib/content";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Developer Glossary — Android Web Development" },
      {
        name: "description",
        content:
          "Plain-language definitions of the terms you meet while setting up web development on an Android phone.",
      },
      { property: "og:title", content: "Developer Glossary" },
      {
        property: "og:description",
        content: "Termux, npm, commits, ports, builds and more, explained without jargon.",
      },
    ],
  }),
  component: GlossaryPage,
});

const categories = ["All", ...Array.from(new Set(glossary.map((g) => g.category)))];

function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary
      .filter((g) => cat === "All" || g.category === cat)
      .filter((g) => !q || g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q))
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [query, cat]);

  return (
    <div>
      <PageHeader
        eyebrow="Glossary"
        title="Every word, in plain language"
        intro="If a term in this guide is unfamiliar, it is defined here without assuming you already know three other terms."
      />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms"
          aria-label="Search glossary"
          className="w-full rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={c === cat}
              className={
                "rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors " +
                (c === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <dl className="mt-6 space-y-3">
          {results.map((g) => (
            <div key={g.term} className="rounded-2xl border border-border bg-card p-4">
              <dt className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2">
                <span className="truncate font-display text-base text-foreground">{g.term}</span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-accent">
                  {g.category}
                </span>
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{g.definition}</dd>
            </div>
          ))}
          {results.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No terms match that search.
            </p>
          )}
        </dl>
      </div>
    </div>
  );
}
