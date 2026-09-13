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
      className="w-full rounded-xl border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
    />
  );
}
