import { useState } from "react";
import type { AcodeExtension } from "@/lib/content";

export function ExtensionCard({ extension }: { extension: AcodeExtension }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <li className="min-w-0 rounded-2xl border border-border bg-card p-4">
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
        {imgOk ? (
          <img
            src={extension.icon}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-10 w-10 shrink-0 rounded-lg border border-border bg-secondary object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-secondary font-mono text-sm font-semibold text-accent"
          >
            {extension.name.slice(0, 1)}
          </span>
        )}
        <div className="min-w-0">
          <h4 className="truncate font-display text-base text-foreground">{extension.name}</h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {extension.description}
          </p>
        </div>
      </div>
    </li>
  );
}
