import { useCallback, useEffect, useState } from "react";

const KEY = "awd-progress-v1";

export function useProgress() {
  const [done, setDone] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw) as string[]);
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

  const toggle = useCallback(
    (id: string) => {
      persist(done.includes(id) ? done.filter((d) => d !== id) : [...done, id]);
    },
    [done, persist],
  );

  const reset = useCallback(() => persist([]), [persist]);

  return { done, loaded, toggle, reset, isDone: (id: string) => done.includes(id) };
}
