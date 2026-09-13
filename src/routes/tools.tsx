import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { toolPairs } from "@/lib/content";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "PC vs Android Dev Tools — Android Web Development" },
      {
        name: "description",
        content:
          "Side-by-side comparison of desktop web development tools and their Android equivalents: Termux, Acode, Git, devtools, databases and deploys.",
      },
      { property: "og:title", content: "PC vs Android Dev Tools" },
      {
        property: "og:description",
        content: "What transfers from a laptop to a phone, what is close, and what needs a workaround.",
      },
    ],
  }),
  component: ToolsPage,
});

const gapLabel = {
  same: { text: "Same thing", cls: "border-success text-success" },
  close: { text: "Close enough", cls: "border-warning text-warning" },
  workaround: { text: "Needs a workaround", cls: "border-destructive text-destructive" },
};

function ToolsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Comparison"
        title="What you use on a PC, and what replaces it"
        intro="Most of a web development workflow moves to a phone unchanged. These cards show which parts are identical, which are a slight step down, and where you need a different approach."
      />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {toolPairs.map((t) => {
            const g = gapLabel[t.gap];
            return (
              <article key={t.task} className="rounded-2xl border border-border bg-card p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <h2 className="truncate font-display text-lg text-foreground">{t.task}</h2>
                  <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${g.cls}`}>
                    {g.text}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                  <span className="truncate rounded-lg bg-secondary px-2.5 py-1.5 font-mono text-xs text-muted-foreground">
                    {t.pc}
                  </span>
                  <span aria-hidden className="text-accent">
                    →
                  </span>
                  <span className="truncate rounded-lg bg-primary/15 px-2.5 py-1.5 font-mono text-xs text-primary">
                    {t.android}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
