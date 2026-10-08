import type { Variants } from "motion/react";

// Taste notes (animate + emil-design-eng skills):
// - The table is seen often, so the whole entrance stays brief: the cascade spans CASCADE seconds in
//   total no matter how many rows there are, and each row only takes DURATION.
// - Front-loaded wave: the first rows are spaced ~40ms apart (inside the 30-80ms band), later rows bunch
//   together. Rows further down need the least attention, so they never make you wait.
// - Opacity starts at 0 so each row's arrival is legible; blur(2px) + 6px of lift just soften it.
const CASCADE = 0.36;
const STEP = 0.03;
const DURATION = 0.24;
// Same curve as --ease-out in globals.css
const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

function cascadeDelay(index: number, total: number) {
  if (total <= 1) return 0;
  const span = Math.min((total - 1) * STEP, CASCADE);
  return span * easeOutQuad(index / (total - 1));
}

// The hidden state is identical for everyone so the server HTML and hydrated client always agree.
// Reduced motion keeps only a short fade (shorter transition + the .company-motion CSS override).
export function createTableEntrance(reducedMotion: boolean): { container: Variants; item: Variants } {
  return {
    container: {
      hidden: {},
      visible: { transition: { delayChildren: reducedMotion ? 0 : cascadeDelay } },
      settled: { transition: { delayChildren: 0 } },
    },
    item: {
      hidden: { opacity: 0, transform: "translateY(6px)", filter: "blur(2px)" },
      visible: {
        opacity: 1,
        transform: "translateY(0px)",
        filter: "blur(0px)",
        transition: { type: "tween", duration: reducedMotion ? 0.15 : DURATION, ease: EASE_OUT },
      },
      // After the intro, drop the no-op filter/transform so rows don't keep a stacking context.
      settled: { opacity: 1, transform: "none", filter: "none", transition: { duration: 0 } },
    },
  };
}
