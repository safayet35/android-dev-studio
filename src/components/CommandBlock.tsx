import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CommandBlock({ commands }: { commands: string[] }) {
  const [copied, setCopied] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async (cmd: string, i: number) => {
    try {
      if (!navigator.clipboard?.writeText) return;
      await navigator.clipboard.writeText(cmd);
      setCopied(i);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-terminal">
      {commands.map((cmd, i) => (
        <div
          key={`${i}-${cmd.slice(0, 16)}`}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 border-b border-border/60 px-3 py-2.5 last:border-b-0"
        >
          <code className="min-w-0 overflow-x-auto whitespace-pre font-mono text-[13px] leading-relaxed text-terminal-foreground">
            <span className="select-none text-accent">$ </span>
            {cmd}
          </code>
          <button
            type="button"
            onClick={() => copy(cmd, i)}
            aria-label={`Copy command: ${cmd}`}
            className="shrink-0 rounded-md border border-border px-2 py-1 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {copied === i ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      ))}
    </div>
  );
}
