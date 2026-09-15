import { PageHeader } from "@/components/PageHeader";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { toolPairs } from "@/lib/content";

const gapLabel = {
  same: { text: "Same thing", cls: "border-success text-success" },
  close: { text: "Close enough", cls: "border-warning text-warning" },
  workaround: { text: "Needs a workaround", cls: "border-destructive text-destructive" },
};

export default function ToolsPage() {
  useDocumentMeta({
    title: "PC vs Android Dev Tools — Code With Android",
    description:
      "Side-by-side comparison of desktop web development tools and their Android equivalents: Termux, Acode, Git, devtools, databases and deploys.",
    ogTitle: "PC vs Android Dev Tools — Code With Android",
    ogDescription:
      "What transfers from a laptop to a phone, what is close, and what needs a workaround.",
  });

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
              <article key={t.task} className="rounded-xl border border-border bg-card p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <h2 className="min-w-0 font-display text-lg text-foreground">{t.task}</h2>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${g.cls}`}
                  >
                    {g.text}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-2 min-[420px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[420px]:items-center">
                  <span className="rounded-lg bg-secondary px-2.5 py-1.5 font-mono text-xs break-words text-muted-foreground">
                    {t.pc}
                  </span>
                  <span
                    aria-hidden
                    className="rotate-90 justify-self-center text-accent min-[420px]:rotate-0"
                  >
                    →
                  </span>
                  <span className="rounded-lg bg-primary/15 px-2.5 py-1.5 font-mono text-xs break-words text-primary">
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
