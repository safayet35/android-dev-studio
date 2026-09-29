import { Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CommandBlock } from "@/components/CommandBlock";
import { ExtensionCard } from "@/components/ExtensionCard";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { modules, acodeExtensions, allSteps } from "@/lib/content";
import { useProgress } from "@/hooks/use-progress";

const materialFilesSteps = [
  "Install Material Files from the Play Store",
  "Open the app and tap the \u2630 menu",
  "Tap Add Storage +",
  "Select External Storage",
  "Navigate to and select the Termux folder",
  "Tap Use This Folder and grant permission",
  "Browse and manage your project files",
];

export default function SetupPage() {
  useDocumentMeta({
    title: "Setup Guide: Termux to Next.js — Code With Android",
    description:
      "Step-by-step Android setup for Termux, Node.js, Acode, Git, React with Vite and Next.js, with copyable commands and a saved progress checklist.",
    ogTitle: "Android Setup Guide: Termux to Next.js — Code With Android",
    ogDescription:
      "Six modules of copy-and-run commands that turn a phone into a web development machine.",
  });

  const { isDone, toggle, reset, done, loaded } = useProgress();
  const total = allSteps.length;
  const pct = loaded ? Math.round((done.length / total) * 100) : 0;

  return (
    <div>
      <PageHeader
        eyebrow="Setup"
        title="From a blank phone to a running app"
        intro="Work through the modules in order. Tap a step to mark it done; your progress is saved on this device and will still be here tomorrow."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="sticky top-[calc(var(--nav-h)+8px)] z-40 rounded-xl border border-border/70 bg-card/95 p-4 shadow-md backdrop-blur-md sm:p-5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <div className="min-w-0">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Your progress
              </p>
              <p className="mt-0.5 font-display text-lg text-foreground">
                {loaded ? `${done.length} of ${total} steps` : "Loading…"}
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="shrink-0 rounded-xl border border-border px-4 py-2.5 font-mono text-xs text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground active:scale-95"
            >
              Reset
            </button>
          </div>
          <div
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Setup progress"
            className="mt-3 h-2 overflow-hidden rounded-full bg-secondary"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-10 space-y-12">
          {modules.map((m, mi) => {
            const moduleDone = m.steps.filter((s) => isDone(s.id)).length;
            return (
              <section key={m.slug} id={m.slug} className="scroll-mt-32">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-primary">
                    {String(mi + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-xl tracking-tight text-foreground">
                      {m.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {m.tagline}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
                      ~{m.minutes} min · {moduleDone}/{m.steps.length} done
                    </p>
                  </div>
                </div>

                <ol className="mt-5 space-y-4">
                  {m.steps.map((s) => {
                    const checked = isDone(s.id);
                    return (
                      <li
                        key={s.id}
                        className={
                          "rounded-xl border p-5 shadow-sm transition-all duration-200 sm:p-6 " +
                          (checked
                            ? "border-primary/50 bg-primary/[0.04]"
                            : "border-border/70 bg-card")
                        }
                      >
                        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
                          <button
                            type="button"
                            onClick={() => toggle(s.id)}
                            aria-pressed={checked}
                            aria-label={`Mark step complete: ${s.title}`}
                            className={
                              "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-all duration-150 active:scale-95 " +
                              (checked
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-border bg-card hover:border-primary/60")
                            }
                          >
                            {checked && <Check className="h-3.5 w-3.5" />}
                          </button>
                          <div className="min-w-0">
                            <h3
                              className={
                                "font-display text-base tracking-tight " +
                                (checked ? "text-muted-foreground line-through" : "text-foreground")
                              }
                            >
                              {s.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {s.body}
                            </p>
                            {s.commands && (
                              <div className="mt-4">
                                <CommandBlock commands={s.commands} />
                              </div>
                            )}
                            {s.id === "acode-plugins" && (
                              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                                {acodeExtensions.map((e) => (
                                  <ExtensionCard key={e.slug} extension={e} />
                                ))}
                              </ul>
                            )}
                            {s.id === "material-files" && (
                              <div className="mt-5 rounded-lg border border-border/70 bg-secondary/60 p-5 sm:p-6">
                                <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                                  Setup flow
                                </p>
                                <ol className="space-y-2.5">
                                  {materialFilesSteps.map((step, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                      <span className="mt-px grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 font-mono text-xs font-semibold text-primary">
                                        {i + 1}
                                      </span>
                                      <span className="min-w-0 pt-1 text-sm leading-snug text-muted-foreground">
                                        {step}
                                      </span>
                                    </li>
                                  ))}
                                </ol>
                                <p className="mt-5 rounded-lg border-l-2 border-primary bg-card px-4 py-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                  Termux is primarily a terminal environment, so managing files
                                  through a graphical file manager can be much more convenient when
                                  working with images, assets, downloads, or project files. You can
                                  continue doing everything through Termux commands if you prefer.
                                </p>
                                <p className="mt-3 rounded-lg border-l-2 border-warning bg-card px-4 py-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                  Only grant folder access when you understand what you&apos;re
                                  sharing with the file manager. Avoid deleting files or folders you
                                  don&apos;t recognize, especially inside your development
                                  environment.
                                </p>
                              </div>
                            )}
                            {s.note && (
                              <p className="mt-4 rounded-lg border-l-2 border-accent bg-secondary/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                                {s.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
