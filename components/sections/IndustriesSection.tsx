import type { IndustriesData } from "@/types/templates.types";
import { Eyebrow, introSize, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { CornerArcs } from "@/components/ui/LineArt";
import { CardPhoto, industryCardBackground } from "@/components/ui/CardPhoto";

/**
 * Centred heading ("Diverse Industries" in maroon), then eight soft-pink cards in two rows of four: the product photo on
 * the right, the industry's name and a short maroon line on the left.
 * The text is sized in % of the card's width (cqw, from the design's 455px card) on phones and tablets, so the card keeps
 * the design's layout at any width; from 1024px up the design's sizes in rem.
 */
export const IndustriesSection = ({ data }: { data?: IndustriesData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`relative bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <CornerArcs className="pointer-events-none absolute right-0 top-0 h-auto w-40 text-[var(--color-arc)] sm:w-52 lg:w-[23rem]" />
      <CornerArcs className="pointer-events-none absolute bottom-0 left-0 hidden h-auto w-[19rem] -scale-100 text-[var(--color-arc)] lg:block" />

      <div data-reveal className={`relative text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          className={`justify-center font-sans font-medium text-[var(--color-maroon-label)] ${labelSize} lg:text-[1.97rem]`}
          trackClassName="tracking-[0.3em] -mr-[0.3em] lg:tracking-[0.346em] lg:-mr-[0.346em]"
          lineClassName="h-[0.15rem] w-10 sm:w-12 lg:h-[0.25rem] lg:w-[4.8rem]"
          gapClassName="gap-4 lg:gap-[2.25rem]"
        />
        <h2 className={`mt-3 font-sans font-semibold tracking-[-0.01em] text-[var(--color-ink-black)] ${titleSize} lg:mt-[1.86rem] lg:text-[4.275rem] lg:leading-none lg:tracking-normal`}>
          {data.titleTop} <span className="text-[var(--color-maroon-bright)]">{data.titleAccent}</span>
        </h2>
        <p className={`mx-auto mt-4 max-w-[40rem] font-sans text-[var(--color-text-grey)] ${introSize} lg:mt-[2rem] lg:max-w-none lg:text-[1.6875rem] lg:leading-none`}>
          {data.description}
        </p>
      </div>

      <ul className={`relative mx-auto mt-10 grid max-w-[44rem] gap-3 ${sidePadding} sm:max-w-none sm:grid-cols-2 sm:gap-4 lg:mt-[5.55rem] lg:grid-cols-4 lg:gap-x-[0.875rem] lg:gap-y-[1.31rem] lg:px-[1.875rem]`}>
        {data.items.map((item, index) => (
          <li
            key={item.id}
            data-reveal
            data-reveal-delay={(index % 4) * 70}
            className={`group relative isolate aspect-[455/250] overflow-hidden [container-type:inline-size] ${industryCardBackground}`}
          >
            <CardPhoto src={item.image} alt={item.imageAlt} sizes="(min-width: 1024px) 14vw, (min-width: 640px) 28vw, 56vw" widthClassName="w-[56%]" />
            {/* the name and line are centred in the card a little above the middle, so one- and two-line names sit like the design */}
            <div className="absolute inset-y-0 left-[7.5cqw] flex flex-col justify-center pb-[10.5cqw] lg:left-[2.125rem] lg:pb-[3rem]">
              <h3 className="whitespace-pre-line font-card text-[6.8cqw] font-semibold leading-[8.1cqw] tracking-[-0.01em] text-[var(--color-ink-black)] lg:text-[1.94rem] lg:leading-[2.3125rem]">
                {item.title}
              </h3>
              <span aria-hidden="true" className="mt-[4.7cqw] block h-[max(2px,0.66cqw)] w-[12.3cqw] bg-[var(--color-maroon-bright)] lg:mt-[1.33rem] lg:h-[0.1875rem] lg:w-[3.5rem]" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
