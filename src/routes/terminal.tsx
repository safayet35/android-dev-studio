import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { TerminalSim } from "@/components/TerminalSim";

export const Route = createFileRoute("/terminal")({
  head: () => ({
    meta: [
      { title: "Terminal Simulator — Android Web Development" },
      {
        name: "description",
        content:
          "Practice Termux commands in a safe simulated terminal before you run anything on your own phone.",
      },
      { property: "og:title", content: "Termux Terminal Simulator" },
      {
        property: "og:description",
        content: "Try pkg update, node -v, and a Vite scaffold without installing anything.",
      },
    ],
  }),
  component: TerminalPage,
});

function TerminalPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Practice"
        title="Try the terminal before you install it"
        intro="This is a safe imitation of Termux. Nothing is installed and nothing can break. Type help for the list of commands it understands."
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-8 sm:px-6">
        <TerminalSim />
        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="font-display text-lg text-foreground">Reading a command</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-mono text-accent">$</span> marks where your typing starts. Never
              type the dollar sign itself.
            </li>
            <li>
              <span className="font-mono text-accent">-y</span> and similar flags answer prompts in
              advance so a long install does not stop to ask you.
            </li>
            <li>
              <span className="font-mono text-accent">&amp;&amp;</span> runs the next command only if
              the first one succeeded.
            </li>
            <li>
              <span className="font-mono text-accent">~</span> is shorthand for your home folder.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
