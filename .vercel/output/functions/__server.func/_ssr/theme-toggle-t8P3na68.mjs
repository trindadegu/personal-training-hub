import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-DWfIo_Ug.mjs";
import { T as THEME_KEY } from "./types-DN-33vrr.mjs";
import { d as Moon, S as Sun } from "../_libs/lucide-react.mjs";
function ThemeToggle() {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) ?? "light";
    apply(saved);
    setTheme(saved);
  }, []);
  function apply(t) {
    document.documentElement.classList.toggle("dark", t === "dark");
    localStorage.setItem(THEME_KEY, t);
  }
  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    apply(next);
    setTheme(next);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: toggle, "aria-label": "Alternar tema", children: theme === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }) });
}
export {
  ThemeToggle as T
};
