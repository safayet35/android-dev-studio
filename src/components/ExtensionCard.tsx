import { useState } from "react";
import type { AcodeExtension } from "@/lib/content";

export function ExtensionCard({ extension }: { extension: AcodeExtension }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <li className="min-w-0">
      <a
        href={extension.src}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-w-0 rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md"
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
          {imgOk ? (
            <img
              src={extension.icon}
              alt=""
              width={44}
              height={44}
              loading="lazy"
              onError={() => setImgOk(false)}
              className="h-11 w-11 shrink-0 rounded-lg border border-border/70 bg-secondary object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 font-mono text-sm font-semibold text-primary"
            >
              {extension.name.slice(0, 1)}
            </span>
          )}
          <div className="min-w-0">
            <h4 className="font-display text-base tracking-tight break-words text-foreground group-hover:text-primary">
              {extension.name}
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {extension.description}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
}
