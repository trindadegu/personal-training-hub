import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { THEME_KEY } from "@/lib/types";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as "light" | "dark" | null) ?? "light";
    apply(saved);
    setTheme(saved);
  }, []);

  function apply(t: "light" | "dark") {
    document.documentElement.classList.toggle("dark", t === "dark");
    localStorage.setItem(THEME_KEY, t);
  }

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    apply(next);
    setTheme(next);
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema">
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}