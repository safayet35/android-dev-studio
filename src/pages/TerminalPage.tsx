import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { TerminalSim } from "@/components/TerminalSim";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function TerminalPage() {
  useDocumentMeta({
    title: "Terminal Simulator — Code With Android",
    description:
      "Practice Termux commands in a safe simulated terminal before you run anything on your own phone.",
    ogTitle: "Termux Terminal Simulator — Code With Android",
    ogDescription: "Try pkg update, node -v, and a Vite scaffold without installing anything.",
  });

  return (
    <div>
      <PageHeader
        eyebrow="Practice"
        title="Try the terminal before you install it"
        intro="This is a safe imitation of Termux. Nothing is installed and nothing can break. Type help for the list of commands it understands."
      />
      <div className="mx-auto grid max-w-5xl gap-5 px-4 py-10 sm:gap-6 sm:px-6 sm:py-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <TerminalSim />
        <Card>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
            Cheat sheet
          </p>
          <h2 className="mt-2 font-display text-lg tracking-tight text-foreground">
            Reading a command
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-mono font-semibold text-accent">$</span>
              <span>marks where your typing starts. Never type the dollar sign itself.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono font-semibold text-accent">-y</span>
              <span>
                and similar flags answer prompts in advance so a long install does not stop to ask
                you.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono font-semibold text-accent">&amp;&amp;</span>
              <span>runs the next command only if the first one succeeded.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-mono font-semibold text-accent">~</span>
              <span>is shorthand for your home folder.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
