import { PageHeader } from "@/components/PageHeader";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { toolPairs } from "@/lib/content";

const gapLabel = {
  same: { text: "Same thing", cls: "border-success/40 bg-success/10 text-success" },
  close: { text: "Close enough", cls: "border-warning/40 bg-warning/10 text-warning" },
  workaround: {
    text: "Needs a workaround",
    cls: "border-destructive/40 bg-destructive/10 text-destructive",
  },
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
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          {toolPairs.map((t) => {
            const g = gapLabel[t.gap];
            return (
              <article
                key={t.task}
                className="rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md sm:p-6"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <h2 className="min-w-0 font-display text-lg tracking-tight text-foreground">
                    {t.task}
                  </h2>
                  <span
                    className={`shrink-0 rounded-lg border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider ${g.cls}`}
                  >
                    {g.text}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[420px]:items-center">
                  <span className="rounded-lg bg-secondary px-2.5 py-2 font-mono text-xs break-words text-muted-foreground">
                    {t.pc}
                  </span>
                  <span
                    aria-hidden
                    className="rotate-90 justify-self-center font-semibold text-accent min-[420px]:rotate-0"
                  >
                    →
                  </span>
                  <span className="rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-2 font-mono text-xs break-words text-primary">
                    {t.android}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
