export function SearchInput({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={label}
      className="min-h-11 w-full rounded-xl border border-border bg-card px-4 py-2.5 font-mono text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary sm:text-sm"
    />
  );
}
