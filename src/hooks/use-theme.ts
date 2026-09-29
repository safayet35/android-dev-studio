import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "awd-theme-v1";

function initial(): Theme {
  if (typeof document !== "undefined") {
    const t = document.documentElement.dataset["theme"];
    if (t === "light" || t === "dark") return t;
  }
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);

  useEffect(() => {
    document.documentElement.dataset["theme"] = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      // storage unavailable — theme still applies for this session
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle };
}
