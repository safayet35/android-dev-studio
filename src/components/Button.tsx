import type { ButtonHTMLAttributes } from "react";

export const btnBase =
  "inline-flex min-h-11 items-center justify-center gap-2 font-mono transition-all duration-150 ease-out active:scale-[0.98]";

export const btnPrimary = `${btnBase} rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow-md hover:brightness-110`;

export const btnSecondary = `${btnBase} rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground hover:border-primary/60 hover:text-primary`;

type Variant = "primary" | "secondary";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const cls = variant === "primary" ? btnPrimary : btnSecondary;
  return <button type="button" {...props} className={`${cls} ${className}`.trim()} />;
}
