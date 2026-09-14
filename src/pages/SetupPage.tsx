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

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="sticky top-[calc(var(--nav-h)+8px)] z-40 rounded-2xl border border-border bg-card/95 p-4 backdrop-blur">
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
              className="shrink-0 rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
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
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-8 space-y-10">
          {modules.map((m, mi) => {
            const moduleDone = m.steps.filter((s) => isDone(s.id)).length;
            return (
              <section key={m.slug} id={m.slug} className="scroll-mt-32">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-card font-mono text-sm text-accent">
                    {String(mi + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-xl text-foreground">{m.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{m.tagline}</p>
                    <p className="mt-1 font-mono text-xs text-accent">
                      ~{m.minutes} min · {moduleDone}/{m.steps.length} done
                    </p>
                  </div>
                </div>

                <ol className="mt-4 space-y-3">
                  {m.steps.map((s) => {
                    const checked = isDone(s.id);
                    return (
                      <li
                        key={s.id}
                        className={
                          "rounded-2xl border bg-card p-4 transition-colors " +
                          (checked ? "border-primary/60" : "border-border")
                        }
                      >
                        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                          <button
                            type="button"
                            onClick={() => toggle(s.id)}
                            aria-pressed={checked}
                            aria-label={`Mark step complete: ${s.title}`}
                            className={
                              "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors " +
                              (checked
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-secondary")
                            }
                          >
                            {checked && <Check className="h-3.5 w-3.5" />}
                          </button>
                          <div className="min-w-0">
                            <h3
                              className={
                                "font-display text-base " +
                                (checked ? "text-muted-foreground line-through" : "text-foreground")
                              }
                            >
                              {s.title}
                            </h3>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {s.body}
                            </p>
                            {s.commands && (
                              <div className="mt-3">
                                <CommandBlock commands={s.commands} />
                              </div>
                            )}
                            {s.id === "acode-plugins" && (
                              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                                {acodeExtensions.map((e) => (
                                  <ExtensionCard key={e.slug} extension={e} />
                                ))}
                              </ul>
                            )}
                            {s.id === "material-files" && (
                              <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4 sm:p-5">
                                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                                  Setup flow
                                </p>
                                <ol className="space-y-2">
                                  {materialFilesSteps.map((step, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                      <span className="mt-px grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-card font-mono text-xs text-accent">
                                        {i + 1}
                                      </span>
                                      <span className="min-w-0 pt-1 text-sm leading-snug text-muted-foreground">
                                        {step}
                                      </span>
                                    </li>
                                  ))}
                                </ol>
                                <p className="mt-5 rounded-lg border-l-2 border-accent bg-secondary/60 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                  Termux is primarily a terminal environment, so managing files
                                  through a graphical file manager can be much more convenient when
                                  working with images, assets, downloads, or project files. You can
                                  continue doing everything through Termux commands if you prefer.
                                </p>
                                <p className="mt-3 rounded-lg border-l-2 border-warning bg-secondary/60 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                  Only grant folder access when you understand what you&apos;re
                                  sharing with the file manager. Avoid deleting files or folders you
                                  don&apos;t recognize, especially inside your development
                                  environment.
                                </p>
                              </div>
                            )}
                            {s.note && (
                              <p className="mt-3 rounded-lg border-l-2 border-accent bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
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
