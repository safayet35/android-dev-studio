import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/setup", label: "Setup" },
  { to: "/terminal", label: "Terminal" },
  { to: "/troubleshooting", label: "Fixes" },
  { to: "/glossary", label: "Glossary" },
] as const;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  "shrink-0 whitespace-nowrap rounded-md px-3 py-2 font-mono text-xs transition-colors hover:text-foreground " +
  (isActive ? "text-primary" : "text-muted-foreground");

export function SiteNav() {
  return (
    <div className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-2.5 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-3 sm:py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Android Web Dev home">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground">
            &gt;_
          </span>
          <span className="truncate font-display text-sm font-semibold text-foreground sm:text-base">
            Android Web Dev
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="-mx-1 flex w-full items-center gap-1 overflow-x-auto px-1 py-0.5 sm:mx-0 sm:w-auto sm:px-0"
        >
          {links.slice(1).map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass}>
              {l.label}
            </NavLink>
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
