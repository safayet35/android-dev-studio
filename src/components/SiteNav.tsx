import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/setup", label: "Setup" },
  { to: "/terminal", label: "Terminal" },
  { to: "/troubleshooting", label: "Fixes" },
  { to: "/glossary", label: "Glossary" },
] as const;

export function SiteNav() {
  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground">
            &gt;_
          </span>
          <span className="truncate font-display text-sm font-semibold text-foreground sm:text-base">
            Android Web Dev
          </span>
        </Link>
        <nav className="-mr-1 flex shrink-0 items-center gap-1 overflow-x-auto">
          {links.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="whitespace-nowrap rounded-md px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-8 text-center">
      <p className="font-mono text-xs text-muted-foreground">
        Built for people whose only computer fits in a pocket.
      </p>
    </footer>
  );
}
