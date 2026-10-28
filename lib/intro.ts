/** Set by the language switch so changing language doesn't replay the welcome screen. */
export const SKIP_INTRO_KEY = "skip-intro";

/** Where the reader was when switching language: which section, and how far into it. */
const SPOT_KEY = "locale-switch-spot";

// both languages render the same sections in the same order, so the index carries over
const sections = () => Array.from(document.querySelectorAll<HTMLElement>("main section"));
const topOf = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

export function saveSpot() {
  const y = window.scrollY;
  const all = sections();
  let i = 0;
  all.forEach((el, k) => topOf(el) <= y + 1 && (i = k));
  const el = all[i];
  const ratio = el ? Math.min(1, Math.max(0, (y - topOf(el)) / el.offsetHeight)) : 0;
  try {
    sessionStorage.setItem(SPOT_KEY, JSON.stringify({ i, ratio }));
  } catch {}
}

export function restoreSpot() {
  let spot: { i: number; ratio: number } | null = null;
  try {
    spot = JSON.parse(sessionStorage.getItem(SPOT_KEY) ?? "null");
    sessionStorage.removeItem(SPOT_KEY);
  } catch {}
  const el = spot && sections()[spot.i];
  if (!spot || !el) return;
  window.scrollTo({ top: topOf(el) + spot.ratio * el.offsetHeight, behavior: "instant" });
}
