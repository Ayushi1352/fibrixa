import type { SplitTitle } from "@/types/templates.types";

/*
  Sizes from 1024px up are taken from the 1920px design: 1 design pixel = 0.0625rem
  (the root font is 100vw / 120 there, at most 16px, so a 1920px screen shows the design 1:1).
*/

/**
 * Size of every section title on phones and tablets, so all titles match (desktop sizes follow the design per section).
 * Phones: shrinks with the screen width so the longest title line still fits; tablets: 2.6rem.
 */
export const titleSize = "text-[length:min(2.1rem,calc((100vw-2rem)/12.5))] leading-[1.18] sm:text-[2.6rem]";

/** Size of every section label ("About Us", "Our Services"…) on phones and tablets */
export const labelSize = "text-[0.8rem] sm:text-[0.95rem]";

/** Size of the text under a title on phones and tablets */
export const introSize = "text-base leading-[1.6] sm:text-lg";

type EyebrowProps = {
  label: string;
  /** "before": one line before the label (left headings); "both": a line on each side (centred headings) */
  lines?: "before" | "both";
  /** font, size and colour of this section's label */
  className?: string;
  /**
   * letter spacing of the label; the same amount is taken off after the last letter (`-mr-[…]`), so the label's box
   * ends at its last letter and a centred label stays centred
   */
  trackClassName?: string;
  /** length, thickness and colour of the lines */
  lineClassName?: string;
  /** space between the label and its lines */
  gapClassName?: string;
};

/** Upper-case spaced label with short maroon lines beside it: "—— About Us" or "—— Our Products ——" */
export const Eyebrow = ({
  label,
  lines = "both",
  className = "",
  trackClassName = "tracking-[0.3em] -mr-[0.3em]",
  lineClassName = "h-[0.125rem] w-10 sm:w-12",
  gapClassName = "gap-3 sm:gap-4",
}: EyebrowProps) => {
  const line = <span aria-hidden="true" className={`shrink-0 rounded-full bg-[var(--color-maroon-label)] ${lineClassName}`} />;
  return (
    <p className={`flex items-center uppercase leading-none ${gapClassName} ${className}`}>
      {line}
      <span className={trackClassName}>{label}</span>
      {lines === "both" && line}
    </p>
  );
};

/** The title's words in dark ink with the highlighted words in maroon ("What Our Clients Say") */
export const TitleWords = ({ data, accentClassName = "" }: { data: SplitTitle; accentClassName?: string }) => (
  <>
    {data.titleTop} <span className={accentClassName}>{data.titleAccent}</span>
    {data.titleEnd ? ` ${data.titleEnd}` : null}
  </>
);
