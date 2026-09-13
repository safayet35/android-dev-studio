import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { TerminalSim } from "@/components/TerminalSim";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function TerminalPage() {
  useDocumentMeta({
    title: "Terminal Simulator — Android Web Development",
    description:
      "Practice Termux commands in a safe simulated terminal before you run anything on your own phone.",
    ogTitle: "Termux Terminal Simulator",
    ogDescription: "Try pkg update, node -v, and a Vite scaffold without installing anything.",
  });

  return (
    <div>
      <PageHeader
        eyebrow="Practice"
        title="Try the terminal before you install it"
        intro="This is a safe imitation of Termux. Nothing is installed and nothing can break. Type help for the list of commands it understands."
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-8 sm:px-6">
        <TerminalSim />
        <Card>
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
              <span className="font-mono text-accent">&amp;&amp;</span> runs the next command only
              if the first one succeeded.
            </li>
            <li>
              <span className="font-mono text-accent">~</span> is shorthand for your home folder.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
