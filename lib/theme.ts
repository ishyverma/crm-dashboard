export const THEME_KEY = "crm-theme";

type VT = { finished: Promise<unknown> };
type DocVT = Document & { startViewTransition?: (cb: () => void) => VT };

/** dark -> light wipes left-to-right, light -> dark wipes right-to-left (see globals.css). */
export function toggleTheme() {
  const root = document.documentElement;
  const toDark = !root.classList.contains("dark");

  const apply = () => {
    root.classList.toggle("dark", toDark);
    try {
      localStorage.setItem(THEME_KEY, toDark ? "dark" : "light");
    } catch {}
  };

  const doc = document as DocVT;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof doc.startViewTransition !== "function" || reduce) {
    apply();
    return;
  }

  root.dataset.themeDir = toDark ? "to-dark" : "to-light";
  root.classList.add("theme-switching"); // freezes CSS transitions so the snapshot has final colours
  doc.startViewTransition(apply).finished.finally(() => {
    root.classList.remove("theme-switching");
    delete root.dataset.themeDir;
  });
}
