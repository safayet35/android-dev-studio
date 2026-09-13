import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { CommandBlock } from "@/components/CommandBlock";
import { issues } from "@/lib/content";

export const Route = createFileRoute("/troubleshooting")({
  head: () => ({
    meta: [
      { title: "Troubleshooting Hub — Android Web Development" },
      {
        name: "description",
        content:
          "Searchable fixes for the errors you hit setting up Termux, Node.js, Git, Vite and Next.js on an Android phone.",
      },
      { property: "og:title", content: "Android Web Dev Troubleshooting" },
      {
        property: "og:description",
        content: "Signature errors, permission failures, killed builds and sleeping dev servers, all with fixes.",
      },
    ],
  }),
  component: TroublePage,
});

const allTags = Array.from(new Set(issues.flatMap((i) => i.tags))).sort();

function TroublePage() {
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
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. permission denied, killed, signature"
          aria-label="Search troubleshooting"
          className="w-full rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTag(null)}
            aria-pressed={tag === null}
            className={
              "rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors " +
              (tag === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary text-muted-foreground hover:text-foreground")
            }
          >
            all
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t === tag ? null : t)}
              aria-pressed={t === tag}
              className={
                "rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors " +
                (t === tag
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground")
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {results.map((i) => {
            const isOpen = open === i.id;
            return (
              <article key={i.id} className="overflow-hidden rounded-2xl border border-border bg-card">
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
