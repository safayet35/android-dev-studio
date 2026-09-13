import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { CommandBlock } from "@/components/CommandBlock";
import { FilterChip } from "@/components/FilterChip";
import { SearchInput } from "@/components/SearchInput";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { issues } from "@/lib/content";

const allTags = Array.from(new Set(issues.flatMap((i) => i.tags))).sort();

export default function TroubleshootingPage() {
  useDocumentMeta({
    title: "Troubleshooting Hub — Android Web Development",
    description:
      "Searchable fixes for the errors you hit setting up Termux, Node.js, Git, Vite and Next.js on an Android phone.",
    ogTitle: "Android Web Dev Troubleshooting",
    ogDescription:
      "Signature errors, permission failures, killed builds and sleeping dev servers, all with fixes.",
  });

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return issues
      .filter((i) => !tag || i.tags.includes(tag))
      .filter(
        (i) =>
          !q ||
          i.title.toLowerCase().includes(q) ||
          i.symptoms.toLowerCase().includes(q) ||
          i.fix.toLowerCase().includes(q) ||
          i.tags.some((t) => t.includes(q)),
      );
  }, [query, tag]);

  return (
    <div>
      <PageHeader
        eyebrow="Troubleshooting"
        title="Something broke. Search for it."
        intro="Paste part of the error message or describe what happened. These are the failures that actually come up on Android, with the fix that works."
      />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="e.g. permission denied, killed, signature"
          label="Search troubleshooting"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip active={tag === null} onClick={() => setTag(null)}>
            all
          </FilterChip>
          {allTags.map((t) => (
            <FilterChip key={t} active={t === tag} onClick={() => setTag(t === tag ? null : t)}>
              {t}
            </FilterChip>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {results.map((i) => {
            const isOpen = open === i.id;
            return (
              <article
                key={i.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i.id)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-base text-foreground">{i.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{i.symptoms}</span>
                  </span>
                  <span aria-hidden className="shrink-0 font-mono text-accent">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-border px-4 py-4">
                    <p className="text-sm leading-relaxed text-foreground">{i.fix}</p>
                    {i.commands && (
                      <div className="mt-3">
                        <CommandBlock commands={i.commands} />
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
          {results.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nothing matches. Try a shorter phrase from the error message.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
