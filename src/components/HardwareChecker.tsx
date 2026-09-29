import { useMemo, useRef, useState } from "react";
import { Button } from "./Button";
import { FilterChip } from "./FilterChip";

type Answers = {
  ram: number;
  storage: number;
  android: number;
  chip: "arm64" | "arm32" | "unknown";
};

const ramOptions = [2, 3, 4, 6, 8, 12];
const storageOptions = [4, 8, 16, 32, 64];
const androidOptions = [7, 8, 9, 10, 11, 12, 13, 14, 15];

function verdict(a: Answers) {
  const notes: string[] = [];
  let score = 0;

  if (a.ram >= 6) {
    score += 2;
    notes.push("Plenty of memory: Next.js builds and a dev server can run together.");
  } else if (a.ram >= 4) {
    score += 1;
    notes.push("Enough memory for React and Vite. Cap Node's heap before Next.js builds.");
  } else {
    notes.push("Tight memory. Stick to Vite projects and close other apps while building.");
  }

  if (a.storage >= 16) {
    score += 2;
    notes.push("Free space is comfortable for several projects with dependencies.");
  } else if (a.storage >= 8) {
    score += 1;
    notes.push("Workable space. Keep one or two projects and prune caches regularly.");
  } else {
    notes.push("Very little free space. A single small project only; dependencies eat gigabytes.");
  }

  if (a.android >= 12) {
    score += 2;
    notes.push("Modern Android. Expect aggressive background limits, so use the Termux wake lock.");
  } else if (a.android >= 8) {
    score += 1;
    notes.push("Supported Android version with no unusual restrictions.");
  } else {
    notes.push("Older Android. Some Termux packages may no longer publish builds for it.");
  }

  if (a.chip === "arm64") {
    score += 2;
    notes.push("64-bit ARM is the best supported Termux architecture.");
  } else if (a.chip === "arm32") {
    notes.push("32-bit ARM works, but several Node builds and native modules are unavailable.");
  } else {
    score += 1;
    notes.push("Almost every phone from the last eight years is 64-bit ARM.");
  }

  if (score >= 7)
    return {
      level: "Ready to build",
      tone: "success" as const,
      notes,
      blurb: "Your phone can run the whole stack in this guide, including Next.js.",
    };
  if (score >= 4)
    return {
      level: "Good with care",
      tone: "warning" as const,
      notes,
      blurb: "Everything here works, as long as you follow the memory and storage tips.",
    };
  return {
    level: "Limited",
    tone: "destructive" as const,
    notes,
    blurb: "Start with Termux, Git, and a small Vite project before attempting heavier frameworks.",
  };
}

function Choice<T extends string | number>({
  label,
  options,
  value,
  onChange,
  format,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  format: (v: T) => string;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <FilterChip key={String(o)} active={o === value} onClick={() => onChange(o)}>
            {format(o)}
          </FilterChip>
        ))}
      </div>
    </fieldset>
  );
}

export function HardwareChecker() {
  const [answers, setAnswers] = useState<Answers>({
    ram: 4,
    storage: 16,
    android: 13,
    chip: "arm64",
  });
  const [checked, setChecked] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const result = useMemo(() => verdict(answers), [answers]);

  const toneClass =
    result.tone === "success"
      ? "border-success/50 bg-success/10 text-success"
      : result.tone === "warning"
        ? "border-warning/50 bg-warning/10 text-warning"
        : "border-destructive/50 bg-destructive/10 text-destructive";

  return (
    <section
      id="checker"
      className="scroll-mt-24 rounded-xl border border-border/70 bg-card p-5 shadow-sm sm:p-6"
    >
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
        Compatibility check
      </p>
      <h2 className="mt-2 font-display text-xl tracking-tight text-foreground sm:text-2xl">
        Will your phone handle it?
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Four questions. Answers come from Settings, About phone.
      </p>

      <div className="mt-6 space-y-6">
        <Choice
          label="Memory (RAM)"
          options={ramOptions}
          value={answers.ram}
          onChange={(ram) => setAnswers((a) => ({ ...a, ram }))}
          format={(v) => `${v} GB`}
        />
        <Choice
          label="Free storage"
          options={storageOptions}
          value={answers.storage}
          onChange={(storage) => setAnswers((a) => ({ ...a, storage }))}
          format={(v) => `${v} GB`}
        />
        <Choice
          label="Android version"
          options={androidOptions}
          value={answers.android}
          onChange={(android) => setAnswers((a) => ({ ...a, android }))}
          format={(v) => `${v}`}
        />
        <Choice
          label="Processor"
          options={["arm64", "arm32", "unknown"] as const}
          value={answers.chip}
          onChange={(chip) => setAnswers((a) => ({ ...a, chip }))}
          format={(v) => (v === "arm64" ? "64-bit" : v === "arm32" ? "32-bit" : "Not sure")}
        />
      </div>

      <Button
        onClick={() => {
          setChecked(true);
          requestAnimationFrame(() => resultRef.current?.focus());
        }}
        className="mt-6 w-full"
      >
        Check compatibility
      </Button>

      {checked && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          className={`mt-6 rounded-lg border p-5 outline-none ${toneClass}`}
        >
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] opacity-90">
            Result
          </p>
          <p className="mt-1 font-display text-xl tracking-tight text-foreground">{result.level}</p>
          <p className="mt-1 text-sm text-foreground">{result.blurb}</p>
          <ul className="mt-3 space-y-2">
            {result.notes.map((n) => (
              <li key={n} className="flex gap-2 text-sm text-muted-foreground">
                <span aria-hidden className="font-semibold text-accent">
                  •
                </span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
