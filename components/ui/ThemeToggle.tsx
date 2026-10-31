"use client";

import { Moon, Sun } from "@/components/ui/Icons";

/** Round dark/light switch; the theme lives on <html data-theme> and in localStorage */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    if (next === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className="grid h-[34px] w-[34px] place-items-center rounded-full border border-white/20 transition-colors hover:border-white/60 hover:bg-white/5"
    >
      {/* Shows the theme you'll switch to; CSS picks the icon so SSR markup never mismatches */}
      <Sun className="h-3.5 w-3.5 light:hidden" />
      <Moon className="hidden h-3.5 w-3.5 light:block" />
    </button>
  );
}
