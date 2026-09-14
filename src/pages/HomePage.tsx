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
      <section className="relative overflow-hidden border-b border-border px-4 py-14 sm:px-6 sm:py-20">
        <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl">
          <p className="inline-block rounded-full border border-accent/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            No laptop required
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.1] text-foreground sm:text-5xl">
            Your phone is already a<span className="text-primary"> web development machine.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            A Linux terminal, a code editor, Node.js, Git, React and Next.js all run on Android.
            This guide takes you from a freshly unlocked phone to a running app, one copyable
            command at a time.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/setup" className={btnPrimary}>
              Start the setup
            </Link>
            <a href="#checker" className={btnSecondary}>
              Check my phone
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6">
        <HardwareChecker />

        <section>
          <h2 className="font-display text-2xl text-foreground">Six modules, about an hour</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Each one ends with something working on your screen.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {modules.map((m, i) => (
              <Link
                key={m.slug}
                to={{ pathname: "/setup", hash: m.slug }}
                className="group rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                  <h3 className="min-w-0 font-display text-base text-foreground">{m.title}</h3>
                  <span className="shrink-0 font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{m.tagline}</p>
                <p className="mt-2 font-mono text-xs text-muted-foreground">~{m.minutes} min</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl text-foreground">How close is it to a laptop?</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Closer than you would guess. {toolPairs.filter((t) => t.gap === "same").length} of{" "}
            {toolPairs.length} core tools are literally the same software.
          </p>
          <Link to="/tools" className={`${btnSecondary} mt-4`}>
            See the comparison →
          </Link>
        </section>

        <section className="grid gap-3 sm:grid-cols-3">
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
              className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <h3 className="font-display text-base text-foreground">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.copy}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
