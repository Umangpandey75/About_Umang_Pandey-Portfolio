// ─────────────────────────────────────────────────────────────────────────────
// types/index.d.ts
// Only types used by the live multi-page portfolio are kept.
// ─────────────────────────────────────────────────────────────────────────────

export type TMotion = {
  direction: "up" | "down" | "left" | "right" | "";
  type:      "tween" | "spring" | "just" | "";
  delay:     number;
  duration:  number;
};
