import { useCallback, useEffect, useState } from "react";

const KEY = "awd-progress-v1";

export function useProgress() {
  const [done, setDone] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every((v) => typeof v === "string")) {
          setDone(parsed);
        }
      }
    } catch {
      /* ignore unreadable storage */
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    setDone(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore full storage */
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore full storage */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => persist([]), [persist]);

  return { done, loaded, toggle, reset, isDone: (id: string) => done.includes(id) };
}
