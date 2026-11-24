/**
 * Drawings used as decoration (the faint arcs in the corners, the hero's maroon wave). They are SVG, so they stay sharp
 * at every size; the arcs draw in `currentColor`, so each place sets the colour and size with classes.
 */
type ArtProps = { className?: string };

// Radii of the concentric arcs, measured on the 1920px design (centre just outside the corner)
const radii = [250, 266, 282, 298, 314, 330, 346, 362, 378];

/** Concentric arcs coming in from the top-right corner (mirror it with `-scale-x-100` / `-scale-y-100` for other corners) */
export const CornerArcs = ({ className }: ArtProps) => (
  <svg viewBox="0 0 400 260" fill="none" aria-hidden="true" className={className}>
    <g stroke="currentColor" strokeWidth="1.6">
      {radii.map((r) => (
        <circle key={r} cx="450" cy="-90" r={r} />
      ))}
    </g>
  </svg>
);

/**
 * The wave at the bottom of the hero, traced from the 1920px design: a maroon curve rising from the left edge and
 * falling to the bottom near the middle, with a thin pink band just above it. It spans the full width (1920 × 120
 * design px), so its height follows the screen width.
 */
export const HeroWave = ({ className }: ArtProps) => (
  <svg viewBox="0 0 1920 120" fill="none" aria-hidden="true" preserveAspectRatio="none" className={className}>
    <path d="M0 22C110 4 220 2 330 15C510 37 720 82 990 121" stroke="var(--color-wave-band)" strokeWidth="9" />
    <path d="M0 33C120 14 220 12 330 26C500 48 700 92 910 120H0Z" fill="var(--color-maroon)" />
  </svg>
);
