import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { FilterChip } from "@/components/FilterChip";
import { SearchInput } from "@/components/SearchInput";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { glossary } from "@/lib/content";

const categories = ["All", ...Array.from(new Set(glossary.map((g) => g.category)))];

export default function GlossaryPage() {
  useDocumentMeta({
    title: "Developer Glossary — Code With Android",
    description:
      "Plain-language definitions of the terms you meet while setting up web development on an Android phone.",
    ogTitle: "Developer Glossary — Code With Android",
    ogDescription: "Termux, npm, commits, ports, builds and more, explained without jargon.",
  });

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary
      .filter((g) => cat === "All" || g.category === cat)
      .filter(
        (g) => !q || g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q),
      )
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
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search terms"
          label="Search glossary"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <FilterChip key={c} active={c === cat} onClick={() => setCat(c)}>
              {c}
            </FilterChip>
          ))}
        </div>

        <dl className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-2">
          {results.map((g) => (
            <div
              key={g.term}
              className="rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/40 sm:p-6"
            >
              <dt className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-2">
                <span className="min-w-0 font-display text-base tracking-tight break-words text-foreground">
                  {g.term}
                </span>
                <span className="shrink-0 rounded-lg border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
                  {g.category}
                </span>
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.definition}</dd>
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
