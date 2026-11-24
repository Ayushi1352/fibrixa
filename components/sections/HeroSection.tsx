import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { sectionMarginBottom, sidePadding } from "@/components/ui/sectionSpace";
import { CornerArcs, HeroWave } from "@/components/ui/LineArt";

/**
 * Under the header: the label with a maroon line, the three-line title ("Your Brand" larger, in maroon) and the text
 * with a tan bar beside it, on the soft pink wall of the packaging photo; the photo fills the right part, and the
 * maroon wave runs along the bottom. The background continues the photo's wall and table to the left, so the photo has
 * no visible edge. Phones and tablets: the text, then the photo under it.
 */
export const HeroSection = ({ data }: { data?: HeroData }) => {
  if (!data) return null;
  const titleLines = data.titleTop.split("\n");

  return (
    <section
      id={data.id}
      className={`relative mt-[4.5rem] flex flex-col overflow-hidden bg-[var(--color-hero-wall)] sm:mt-[5.5rem] lg:mt-[10.3125rem] lg:block lg:h-[59.0625rem] ${sectionMarginBottom}`}
    >
      <CornerArcs className="pointer-events-none absolute left-0 top-0 hidden h-auto w-[22rem] -scale-x-100 text-[var(--color-arc)] lg:block" />

      {/*
        One picture for the whole hero (2304 × 1134, the hero's shape): the packaging photo on its right and, to the left of
        it, the photo's own wall and table continued behind the text, so there is no edge and no fade, like the design.
        Phones and tablets show only its photo part (its right 1387 px), under the text.
      */}
      <div className="relative order-2 aspect-[1387/1134] w-full lg:absolute lg:inset-0 lg:aspect-auto">
        <Image src={data.image} alt={data.imageAlt} fill preload quality={90} sizes="(min-width: 1024px) 100vw, 166vw" className="object-cover object-right" />
      </div>

      <div data-reveal className={`relative order-1 pb-2 pt-12 sm:pt-16 lg:p-0 lg:pl-[6.5rem] lg:pt-[8.7rem] ${sidePadding}`}>
        <Eyebrow
          label={data.label}
          lines="before"
          className="font-display text-[0.8rem] font-semibold text-[var(--color-maroon-muted)] sm:text-[0.95rem] lg:text-[1.52rem]"
          trackClassName="tracking-[0.3em] -mr-[0.3em] lg:tracking-[0.337em] lg:-mr-[0.337em]"
          lineClassName="h-[0.2rem] w-10 sm:w-12 lg:h-[0.25rem] lg:w-[4.5rem]"
          gapClassName="gap-3 sm:gap-4 lg:gap-[1.8rem]"
        />
        {/* phones and tablets: the title shrinks with the screen width so each line of the design stays one line */}
        <h1 className="mt-5 font-display text-[length:min(2.4rem,calc((100vw-2rem)/10.9))] font-semibold leading-[1.12] text-[var(--color-text-hero-title)] sm:text-[3.4rem] lg:mt-[3.8rem] lg:text-[5.375rem] lg:leading-[5.875rem]">
          {titleLines.map((line, index) => (
            // the design sets its second line a little larger than the first
            <span key={line} className={`block ${index > 0 ? "lg:text-[5.625rem]" : ""}`}>
              {line}
            </span>
          ))}
          <span className="block text-[1.26em] font-bold leading-[1.1] text-[var(--color-maroon)] lg:text-[6.875rem] lg:leading-[5.375rem]">{data.titleAccent}</span>
        </h1>
        {/* the tan bar runs beside the text; the design's line breaks (\n in the JSON) are kept from 640px up */}
        <p className="relative mt-6 max-w-[34rem] pl-5 font-display text-base leading-[1.6] text-[var(--color-text-hero)] before:absolute before:inset-y-1 before:left-0 before:w-[0.2rem] before:bg-[var(--color-tan)] sm:whitespace-pre-line sm:text-lg lg:ml-[0.5rem] lg:mt-[3.16rem] lg:max-w-none lg:pl-[2.06rem] lg:text-[1.77rem] lg:font-medium lg:leading-[2.44rem] lg:before:inset-y-[0.3rem] lg:before:w-[0.25rem]">
          {data.description}
        </p>
      </div>

      {/* z-[1]: on phones the hero is a flex column whose reordered photo would otherwise paint over the wave */}
      <HeroWave className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-auto w-full" />
    </section>
  );
};
