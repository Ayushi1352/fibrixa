import Image from "next/image";
import type { AboutData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";

/**
 * On the left the label, the two-line title (the second line in maroon), the text and six strengths in two columns
 * with a thin line between them; on the right the paper-machine photo in a thin white frame on a tan panel that
 * sticks out at its bottom-right corner. Phones and tablets: the photo under the text.
 */
export const AboutSection = ({ data }: { data?: AboutData }) => {
  if (!data) return null;
  const half = Math.ceil(data.features.length / 2);
  const columns = [data.features.slice(0, half), data.features.slice(half)];

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div className={`mx-auto flex max-w-[44rem] flex-col gap-12 ${sidePadding} sm:gap-14 lg:max-w-none lg:flex-row lg:items-start lg:gap-0 lg:px-0 lg:pl-[7.125rem]`}>
        <div className="min-w-0 lg:w-[57.125rem] lg:shrink-0">
          <div data-reveal>
            <Eyebrow
              label={data.label}
              lines="before"
              className={`font-about font-medium text-[var(--color-maroon-label)] ${labelSize} lg:text-[1.475rem]`}
              trackClassName="tracking-[0.3em] -mr-[0.3em]"
              lineClassName="h-[0.2rem] w-10 sm:w-12 lg:h-[0.3125rem] lg:w-[3.875rem]"
              gapClassName="gap-4 lg:gap-[2.3rem]"
            />
            <h2 className={`mt-4 font-about font-medium text-[var(--color-ink)] ${titleSize} lg:mt-[2.85rem] lg:text-[4.75rem] lg:leading-[5.25rem]`}>
              {data.titleTop} <span className="font-semibold text-[var(--color-maroon-bright)] lg:block">{data.titleAccent}</span>
            </h2>
            {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
            <p className="mt-5 font-about text-base leading-[1.65] text-[var(--color-text)] sm:text-lg lg:mt-[1.66rem] lg:whitespace-pre-line lg:text-[1.875rem] lg:leading-[2.72rem]">
              {data.description}
            </p>
          </div>

          <ul
            data-reveal
            aria-label={data.featuresLabel}
            className="mt-8 grid gap-y-4 sm:grid-cols-2 sm:gap-x-8 lg:mt-[3.18rem] lg:grid-cols-[26rem_auto] lg:gap-x-0"
          >
            {columns.map((column, index) => (
              <li
                key={column[0]?.id ?? index}
                className={index > 0 ? "sm:border-l-2 sm:border-[var(--color-divider-soft)] sm:pl-8 lg:pl-[1.94rem]" : "lg:-ml-[0.375rem]"}
              >
                <ul className="grid gap-y-4 lg:gap-y-[1.3rem]">
                  {column.map((feature) => (
                    <li key={feature.id} className="flex items-center gap-4 lg:h-[3.25rem] lg:gap-[1.55rem]">
                      <Icon name={feature.icon} className="size-8 shrink-0 text-[var(--color-maroon-bright)] lg:size-[3.375rem]" strokeWidth={1.4} />
                      <span className="font-about text-base text-[var(--color-text)] sm:text-[1.05rem] lg:text-[1.64rem] lg:leading-none">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/*
          Photo: the tan panel sits behind its bottom-right corner (in % of this block, the design's 823 × 629 area),
          so the group keeps the design's layout on every screen.
        */}
        <div data-reveal className="relative aspect-[823/629] w-full shrink-0 lg:-ml-[0.06rem] lg:mt-[4.45rem] lg:w-[51.44rem]">
          <span aria-hidden="true" className="absolute bottom-0 left-[40.95%] right-0 top-[13.5%] bg-[var(--color-tan-panel)]" />
          <div className="absolute left-0 top-0 h-[93.96%] w-[95.5%] overflow-hidden border-2 border-[var(--color-white)] bg-[var(--color-white)] lg:border-[0.1875rem]">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 41vw, (min-width: 640px) 42rem, 92vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
