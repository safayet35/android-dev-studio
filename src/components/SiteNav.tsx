import { Link, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { to: "/", label: "Home" },
  { to: "/tools", label: "Tools" },
  { to: "/setup", label: "Setup" },
  { to: "/terminal", label: "Terminal" },
  { to: "/troubleshooting", label: "Fixes" },
  { to: "/glossary", label: "Glossary" },
] as const;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  "shrink-0 whitespace-nowrap rounded-lg px-3 py-2.5 font-mono text-xs transition-all duration-150 hover:text-foreground " +
  (isActive ? "bg-primary/12 text-primary" : "text-muted-foreground");

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-150 hover:border-primary/50 hover:text-primary active:scale-95"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function SiteNav() {
  return (
    <div className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="Code With Android home"
        >
          <img
            src="/icon.png"
            alt=""
            className="h-9 w-9 shrink-0 rounded-lg object-contain ring-1 ring-border"
          />
          <span className="truncate font-display text-base font-semibold tracking-tight text-foreground">
            Code<span className="text-primary">With</span>Android
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="-mx-1 flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-1 py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {links.slice(1).map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 px-4 py-10 text-center">
      <div aria-hidden className="mx-auto mb-5 h-px w-16 bg-gradient-to-r from-primary to-accent" />
      <p className="font-mono text-xs text-muted-foreground">
        Built for people whose only computer fits in a pocket.
      </p>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        by Safayet{" "}
        <a
          href="https://github.com/safayet35"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/40"
        >
          Follow my work on GitHub <span aria-hidden>→</span>
        </a>
      </p>
    </footer>
  );
}
