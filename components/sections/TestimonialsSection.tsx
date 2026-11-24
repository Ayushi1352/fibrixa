import Image from "next/image";
import type { TestimonialsData } from "@/types/templates.types";
import { Eyebrow, introSize, labelSize, TitleWords, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

/**
 * Centred heading ("Clients Say" in maroon), then three white cards with a rounded border: the tan quote mark, the
 * quote, five stars, a thin line, and the client's round photo with their name and role.
 */
export const TestimonialsSection = ({ data }: { data?: TestimonialsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div data-reveal className={`text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          className={`justify-center font-sans text-[var(--color-maroon-label)] ${labelSize} lg:text-[2.06rem]`}
          trackClassName="tracking-[0.32em] -mr-[0.32em] lg:tracking-[0.382em] lg:-mr-[0.382em]"
          lineClassName="h-[0.125rem] w-10 sm:w-14 lg:h-[0.19rem] lg:w-[6.06rem]"
          gapClassName="gap-4 lg:gap-[1.44rem]"
        />
        <h2 className={`mt-3 font-sans font-bold tracking-[-0.02em] text-[var(--color-ink)] ${titleSize} lg:mt-[1.7rem] lg:text-[5rem] lg:leading-none lg:tracking-[-0.01em]`}>
          <TitleWords data={data} accentClassName="text-[var(--color-maroon-bright)]" />
        </h2>
        <p className={`mx-auto mt-4 max-w-[40rem] font-sans text-[var(--color-text-grey)] ${introSize} lg:mt-[1.66rem] lg:max-w-none lg:text-[1.8rem] lg:leading-none`}>
          {data.description}
        </p>
      </div>

      <ul className={`mx-auto mt-10 grid max-w-[40rem] gap-5 ${sidePadding} sm:max-w-none md:grid-cols-2 lg:mt-[4.15rem] lg:grid-cols-3 lg:gap-[1.31rem] lg:pl-[5.19rem] lg:pr-[5.06rem]`}>
        {data.items.map((item, index) => (
          <li
            key={item.id}
            data-reveal
            data-reveal-delay={index * 90}
            className="rounded-[1.25rem] border-2 border-[var(--color-border)] bg-[var(--color-white)] px-6 pb-6 pt-5 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_1.4rem_2.6rem_-1.6rem_var(--color-shadow-strong)] lg:rounded-[1.5rem] lg:border-[0.125rem] lg:pb-[1.31rem] lg:pl-[3.5rem] lg:pr-[2rem] lg:pt-[1.1rem]"
          >
            <figure className="flex h-full flex-col">
              <Icon name="RiDoubleQuotesL" className="-ml-2 size-12 text-[var(--color-tan-quote)] lg:-ml-[0.6rem] lg:-mt-[0.1rem] lg:size-[4.9rem]" />
              {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
              <blockquote className="mt-1 font-sans text-[0.98rem] leading-[1.55] text-[var(--color-text-soft)] lg:mt-[0.35rem] lg:whitespace-pre-line lg:text-[1.43rem] lg:leading-[2.09rem]">
                {item.quote}
              </blockquote>
              <span className="mt-4 flex gap-1.5 text-[var(--color-star)] lg:mt-[1.35rem] lg:gap-[0.875rem]" role="img" aria-label={fill(data.ratingLabel, { stars: item.stars })}>
                {Array.from({ length: item.stars }, (_, n) => (
                  <Icon key={n} name="FaStar" className="size-4 lg:size-[1.3rem]" />
                ))}
              </span>
              <span aria-hidden="true" className="mt-4 block h-px bg-[var(--color-divider-quote)] lg:mr-[1.5rem] lg:mt-[1.79rem] lg:h-[0.125rem]" />
              <figcaption className="mt-4 flex items-center gap-4 lg:mt-[0.93rem] lg:gap-[2.6rem]">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-full lg:ml-[0.1rem] lg:size-[6.875rem]">
                  <Image src={item.image} alt={item.name} fill quality={90} sizes="(min-width: 1024px) 6vw, 64px" className="object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block font-sans text-[1.1rem] font-bold leading-tight text-[var(--color-ink-black)] lg:text-[1.75rem] lg:leading-none">{item.name}</span>
                  <span className="mt-1 block font-sans text-[0.95rem] text-[var(--color-text-grey)] lg:mt-[0.95rem] lg:text-[1.45rem] lg:leading-none">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
};
