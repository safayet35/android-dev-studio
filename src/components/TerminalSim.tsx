import { useEffect, useRef, useState } from "react";

type Line = { text: string; kind: "in" | "out" | "err" };

const DEFAULT_FILES = ["projects", "storage"];

function respond(cmd: string, files: readonly string[]): Line[] {
  const c = cmd.trim();
  const out = (text: string): Line => ({ text, kind: "out" });
  if (!c) return [];
  if (c === "help")
    return [
      out("Try: pkg update, pkg install nodejs-lts, node -v, npm -v,"),
      out("git --version, ls, pwd, whoami, npm create vite, clear"),
    ];
  if (c === "pwd") return [out("/data/data/com.termux/files/home")];
  if (c === "whoami") return [out("u0_a231")];
  if (c === "ls") return [out(files.join("  "))];
  if (c === "node -v") return [out("v22.11.0")];
  if (c === "npm -v") return [out("10.9.0")];
  if (c === "git --version") return [out("git version 2.47.0")];
  if (c.startsWith("pkg update"))
    return [
      out("Hit:1 https://packages.termux.dev/apt/termux-main stable InRelease"),
      out("Reading package lists... Done"),
      out("All packages are up to date."),
    ];
  if (c.startsWith("pkg install"))
    return [
      out(`Reading package lists... Done`),
      out(`Setting up ${c.replace(/^pkg install\s*(-y)?\s*/, "") || "package"} ...`),
      out("Done."),
    ];
  if (c.startsWith("termux-setup-storage"))
    return [out("Storage permission granted. ~/storage created.")];
  if (c.startsWith("npm create vite"))
    return [
      out("Scaffolding project in ~/projects/my-app..."),
      out("Done. Now run: cd my-app && npm install"),
    ];
  if (c.startsWith("npm run dev"))
    return [
      out("VITE v6.0.1  ready in 1284 ms"),
      out("  ➜  Local:   http://127.0.0.1:5173/"),
      out("  ➜  press h to show help"),
    ];
  if (c === "clear") return [];
  return [{ text: `bash: ${c.split(" ")[0]}: command not found`, kind: "err" }];
}

export function TerminalSim() {
  const [lines, setLines] = useState<Line[]>([
    { text: "Welcome to Termux (simulated). Type help to see what works.", kind: "out" },
  ]);
  const [value, setValue] = useState("");
  const files = useRef(DEFAULT_FILES).current;
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView(false);
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = value;
    setValue("");
    if (cmd.trim() === "clear") {
      setLines([]);
      return;
    }
    setLines((l) => [...l, { text: cmd, kind: "in" }, ...respond(cmd, files)]);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-terminal">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span aria-hidden className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning" />
          <span className="h-2.5 w-2.5 rounded-full bg-success" />
        </span>
        <span className="ml-2 font-mono text-xs text-muted-foreground">termux</span>
      </div>
      <div
        role="log"
        aria-live="polite"
        aria-label="Simulated terminal output"
        className="h-72 overflow-y-auto px-3 py-3 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((l, i) => (
          <p
            key={`${i}-${l.kind}-${l.text.slice(0, 8)}`}
            className={
              l.kind === "in"
                ? "text-terminal-foreground"
                : l.kind === "err"
                  ? "text-destructive"
                  : "text-muted-foreground"
            }
          >
            {l.kind === "in" && <span className="text-accent">~ $ </span>}
            <span className="whitespace-pre-wrap break-words">{l.text}</span>
          </p>
        ))}
        <div ref={endRef} />
      </div>
      <form
        onSubmit={submit}
        className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 border-t border-border px-3 py-2"
      >
        <span className="shrink-0 font-mono text-sm text-accent">~ $</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Simulated terminal input"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="type a command"
          className="min-w-0 bg-transparent font-mono text-[13px] text-terminal-foreground outline-none placeholder:text-muted-foreground"
        />
      </form>
    </div>
  );
}
