export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-card px-4 py-10 sm:px-6 sm:py-14">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-[clamp(1.75rem,1.4rem+2vw,2.5rem)] leading-[1.15] text-foreground">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
      </div>
    </header>
  );
}
