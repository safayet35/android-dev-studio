import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CommandBlock({ commands }: { commands: string[] }) {
  const [copied, setCopied] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const flash = (done: () => void) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(done, 1600);
  };

  const copy = async (cmd: string, i: number) => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("unavailable");
      await navigator.clipboard.writeText(cmd);
      setCopied(i);
      flash(() => setCopied(null));
    } catch {
      setFailed(true);
      flash(() => setFailed(false));
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-terminal shadow-md">
      {commands.map((cmd, i) => (
        <div
          key={`${i}-${cmd.slice(0, 16)}`}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-white/10 px-4 py-3 last:border-b-0"
        >
          <code className="min-w-0 overflow-x-auto whitespace-pre font-mono text-[13px] leading-relaxed text-terminal-foreground">
            <span className="select-none font-semibold text-accent">$ </span>
            {cmd}
          </code>
          <button
            type="button"
            onClick={() => copy(cmd, i)}
            aria-label={`Copy command: ${cmd}`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/15 text-terminal-foreground/70 transition-all duration-150 hover:border-primary hover:text-primary active:scale-95"
          >
            {copied === i ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      ))}
      {failed && (
        <p
          role="status"
          className="border-t border-white/10 bg-warning/10 px-3.5 py-2 font-mono text-xs text-warning"
        >
          Copy failed — long-press the command to copy it manually.
        </p>
      )}
    </div>
  );
}
