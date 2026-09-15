import { useEffect, useRef, useState } from "react";
import { btnPrimary } from "@/components/Button";
import { SUPPORT_NAME, buildWhatsAppUrl, LAPTOP_FUND, formatBDT } from "@/lib/support";

export function BuyMeALaptop() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const pct = Math.round((LAPTOP_FUND.current / LAPTOP_FUND.goal) * 100);
  const clamped = Math.min(100, Math.max(0, pct));
  const remaining = Math.max(0, LAPTOP_FUND.goal - LAPTOP_FUND.current);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const items = Array.from(
          root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
        ).filter((el) => el.getClientRects().length > 0);
        const first = items[0];
        const last = items[items.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Support ${SUPPORT_NAME} — Buy Me a Laptop`}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed right-[calc(1rem+env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 overflow-hidden rounded-xl border border-border shadow-lg transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 sm:right-[calc(1.5rem+env(safe-area-inset-right))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        <img
          src="/buy-laptop.png"
          alt=""
          width={168}
          height={56}
          className="block h-11 w-auto sm:h-14"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-background/80 px-4 py-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="buy-laptop-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl border border-border bg-card p-6"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <h2
                id="buy-laptop-title"
                className="font-display text-[18px] font-semibold leading-tight text-foreground"
              >
                Help Me Get My Dev Machine
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close support dialog"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border font-mono text-xs leading-none text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              I’m trying to get a used {LAPTOP_FUND.name} for development. I’ve already collected{" "}
              {formatBDT(LAPTOP_FUND.current)} — only {formatBDT(remaining)} to go.
            </p>

            <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Laptop Fund
                </span>
                <span className="shrink-0 font-mono text-xs font-medium text-foreground">
                  {clamped}% funded
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={clamped}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Laptop fund progress"
                className="mt-3 h-2 overflow-hidden rounded-full bg-background"
              >
                <div className="h-full rounded-full bg-primary" style={{ width: `${clamped}%` }} />
              </div>
              <p className="mt-3 text-center font-mono text-[13px] font-medium text-foreground">
                {formatBDT(LAPTOP_FUND.current)} / {formatBDT(LAPTOP_FUND.goal)}
              </p>
            </div>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              Want to help me get there?
            </p>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimary} mt-4 w-full justify-center`}
            >
              I Can Help With Your Laptop
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-lg border border-border bg-card px-5 py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </>
  );
}
