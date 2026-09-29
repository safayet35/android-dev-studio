export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-200 sm:p-6">
      {children}
    </div>
  );
}
