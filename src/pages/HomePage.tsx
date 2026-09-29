import { Link } from "react-router-dom";
import { btnPrimary, btnSecondary } from "@/components/Button";
import { HardwareChecker } from "@/components/HardwareChecker";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { modules, toolPairs } from "@/lib/content";

export default function HomePage() {
  useDocumentMeta({
    title: "Code With Android — Web Development on Android | by Safayet",
    description:
      "Learn how to build and run real web development projects using an Android phone. Set up Termux, Acode, Node.js, Git, React, Next.js, MongoDB and more — all from Android.",
    ogTitle: "Code With Android — Web Development on Android",
    ogDescription:
      "Learn web development using only an Android phone. Set up your complete coding environment and build real projects with Termux, Acode, Node.js, React, Next.js, Git and more.",
  });

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/70 px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              No laptop required
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,1.8rem+3vw,3.5rem)] leading-[1.05] tracking-tight text-foreground">
              Your phone is already a
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}
                web development machine.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A Linux terminal, a code editor, Node.js, Git, React and Next.js all run on Android.
              This guide takes you from a freshly unlocked phone to a running app, one copyable
              command at a time.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
              <Link to="/setup" className={btnPrimary}>
                Start the setup
              </Link>
              <a href="#checker" className={btnSecondary}>
                Check my phone
              </a>
            </div>
            <p className="mt-5 font-mono text-xs text-muted-foreground">
              6 modules · ~60 min · 20 copy-paste steps
            </p>
          </div>
          <div className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-terminal shadow-xl">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span aria-hidden className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                </span>
                <span className="ml-2 font-mono text-[11px] text-terminal-foreground/70">
                  termux — live on your phone
                </span>
              </div>
              <div className="space-y-2.5 px-4 py-5 font-mono text-[13px] leading-relaxed sm:px-5">
                <p className="text-terminal-foreground/65">Welcome to Termux. Let&apos;s build.</p>
                <p className="whitespace-pre-wrap break-words text-terminal-foreground">
                  <span className="font-semibold text-accent">~ $ </span>pkg install nodejs-lts git
                </p>
                <p className="text-terminal-foreground/65">Setting up nodejs-lts … Done.</p>
                <p className="whitespace-pre-wrap break-words text-terminal-foreground">
                  <span className="font-semibold text-accent">~ $ </span>npm create vite my-app
                </p>
                <p className="text-terminal-foreground/65">Scaffolding project … Done.</p>
                <p className="whitespace-pre-wrap break-words text-terminal-foreground">
                  <span className="font-semibold text-accent">~ $ </span>
                  <span className="animate-pulse">npm run dev</span>
                </p>
              </div>
              <div className="border-t border-white/10 bg-white/[0.02] px-4 py-3">
                <Link to="/terminal" className="font-mono text-xs text-accent hover:text-primary">
                  Try it live in the simulator →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-20 px-4 py-14 sm:space-y-24 sm:px-6 sm:py-20">
        <HardwareChecker />

        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                Curriculum
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                Six modules, about an hour
              </h2>
              <p className="mt-1.5 max-w-xl text-sm text-muted-foreground sm:text-base">
                Each one ends with something working on your screen.
              </p>
            </div>
            <Link to="/setup" className="font-mono text-xs text-primary hover:brightness-110">
              Open the guide →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
            {modules.map((m, i) => (
              <Link
                key={m.slug}
                to={{ pathname: "/setup", hash: m.slug }}
                className={`group rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md sm:p-6 ${i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <h3 className="min-w-0 font-display text-base tracking-tight text-foreground group-hover:text-primary">
                    {m.title}
                  </h3>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 font-mono text-[11px] font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{m.tagline}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
                  ~{m.minutes} min
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-xl border border-primary/25 bg-gradient-to-br from-primary/12 via-card to-accent/10 p-6 sm:p-8">
          <div className="relative grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0">
              <h2 className="font-display text-2xl tracking-tight text-foreground">
                How close is it to a laptop?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Closer than you would guess. {toolPairs.filter((t) => t.gap === "same").length} of{" "}
                {toolPairs.length} core tools are literally the same software.
              </p>
            </div>
            <Link to="/tools" className={`${btnSecondary} shrink-0`}>
              See the comparison →
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          {[
            {
              to: "/terminal",
              title: "Terminal simulator",
              copy: "Practice commands with nothing at stake.",
            },
            {
              to: "/troubleshooting",
              title: "Troubleshooting",
              copy: "Searchable fixes for real Android errors.",
            },
            { to: "/glossary", title: "Glossary", copy: "Every term explained in plain language." },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md sm:p-6"
            >
              <h3 className="font-display text-base tracking-tight text-foreground group-hover:text-primary">
                {c.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.copy}</p>
              <p className="mt-3 font-mono text-xs text-primary">Open →</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
