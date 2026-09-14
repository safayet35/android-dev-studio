import type { ButtonHTMLAttributes } from "react";

export const btnBase = "inline-flex items-center justify-center font-mono transition";

export const btnPrimary = `${btnBase} rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90`;

export const btnSecondary = `${btnBase} rounded-xl border border-border px-5 py-3 text-sm text-foreground hover:border-accent hover:text-accent`;

type Variant = "primary" | "secondary";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const cls = variant === "primary" ? btnPrimary : btnSecondary;
  return <button type="button" {...props} className={`${cls} ${className}`.trim()} />;
}
