export function FilterChip({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={
        "rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors " +
        (active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-secondary text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
