import type { ServiceItem, ServicesData } from "@/types/templates.types";
import { Eyebrow, introSize, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";
import { CornerArcs } from "@/components/ui/LineArt";
import { CardPhoto, serviceCardBackground } from "@/components/ui/CardPhoto";

/*
  A soft-pink card in the design's shape: the product photo on its right, the icon, the two-line title and the tan line
  on its left. On phones and tablets every piece is sized in % of the card's width (cqw, from the design's 856px-wide
  card), so the card keeps the design's layout at any width; from 1024px up the design's sizes in rem.
*/

// The cards' shape in the 1920px design, in px: the left column is 872 wide and the right one 841 (the grid below uses
// the same 872fr/841fr), and each row has its own height. A card past the fourth row repeats the rows from the top.
const columnWidths = [872, 841];
const rowHeights = [553, 581, 514, 499];

const ServiceCard = ({ item, index }: { item: ServiceItem; index: number }) => (
  <li
    data-reveal
    data-reveal-delay={(index % 2) * 90}
    className={`group relative isolate overflow-hidden [container-type:inline-size] ${serviceCardBackground}`}
    style={{ aspectRatio: `${columnWidths[index % 2]} / ${rowHeights[Math.floor(index / 2) % rowHeights.length]}` }}
  >
    <CardPhoto src={item.image} alt={item.imageAlt} sizes="(min-width: 1024px) 31vw, (min-width: 768px) 33vw, 66vw" widthClassName="w-[66%]" />
    <div className="absolute left-[4.67cqw] top-[5.84cqw] lg:left-[2.5rem] lg:top-[3.125rem]">
      <Icon name={item.icon} className="size-[14.4cqw] text-[var(--color-maroon-bright)] lg:size-[7.7rem]" strokeWidth={1.1} />
    </div>
    <div className="absolute left-[6.2cqw] top-[21cqw] lg:left-[3.31rem] lg:top-[11.22rem]">
      <h3 className="whitespace-pre-line font-card text-[5.6cqw] font-semibold leading-[5.84cqw] text-[var(--color-ink-black)] lg:text-[3rem] lg:leading-[3.125rem]">
        {item.title}
      </h3>
      <span aria-hidden="true" className="mt-[3cqw] block h-[max(2px,0.7cqw)] w-[11.45cqw] bg-[var(--color-tan-light)] lg:mt-[1.6rem] lg:h-[0.375rem] lg:w-[6.125rem]" />
    </div>
  </li>
);

/** The label, the two-line title, a thin line and the text beside it; then the eight service cards, two per row */
export const ServicesSection = ({ data }: { data?: ServicesData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`relative bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <CornerArcs className="pointer-events-none absolute right-0 top-0 h-auto w-40 text-[var(--color-arc)] sm:w-56 lg:w-[25rem]" />

      <div data-reveal className={`relative mx-auto flex max-w-[44rem] flex-col ${sidePadding} lg:max-w-none lg:flex-row lg:items-start lg:px-0 lg:pl-[8.19rem]`}>
        <div className="lg:w-[54.25rem] lg:shrink-0">
          <Eyebrow
            label={data.label}
            lines="before"
            className={`font-services font-medium text-[var(--color-maroon-label)] ${labelSize} lg:text-[1.96rem]`}
            trackClassName="tracking-[0.24em] -mr-[0.24em]"
            lineClassName="h-[0.2rem] w-10 sm:w-12 lg:h-[0.3125rem] lg:w-[4.875rem]"
            gapClassName="gap-4 lg:gap-[2.44rem]"
          />
          <h2 className={`mt-4 font-services font-medium text-[var(--color-ink-black)] ${titleSize} lg:mt-[2.33rem] lg:text-[4.8125rem] lg:leading-[5.75rem]`}>
            {data.titleTop} <span className="font-bold text-[var(--color-maroon-bright)] lg:block lg:text-[5.02rem]">{data.titleAccent}</span>
          </h2>
        </div>
        <span aria-hidden="true" className="hidden h-[8.25rem] w-[0.125rem] shrink-0 bg-[var(--color-divider-services)] lg:mt-[5.45rem] lg:block" />
        {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
        <p className={`mt-4 font-services text-[var(--color-text-muted)] ${introSize} lg:ml-[4.94rem] lg:mt-[5.4rem] lg:whitespace-pre-line lg:text-[1.9rem] lg:leading-[3.16rem]`}>
          {data.description}
        </p>
      </div>

      <ul className={`relative mx-auto mt-10 grid max-w-[44rem] gap-4 ${sidePadding} sm:max-w-none md:grid-cols-2 lg:mt-[6.79rem] lg:grid-cols-[872fr_841fr] lg:gap-x-[2.19rem] lg:gap-y-[1.56rem] lg:pl-[5.44rem] lg:pr-[5.31rem]`}>
        {data.items.map((item, index) => (
          <ServiceCard key={item.id} item={item} index={index} />
        ))}
      </ul>
    </section>
  );
};
