import Image from "next/image";
import type { ProductsData } from "@/types/templates.types";
import { Eyebrow, introSize, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";

/** Centred heading ("Packaging Products" in maroon), then five white cards: the product photo, its two-line name and a maroon line
 *  (phones: two per row; tablets: three per row; the cards of a shorter last row start on the left; from 1024px up: all
 *  five in one row) */
export const ProductsSection = ({ data }: { data?: ProductsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div data-reveal className={`text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          className={`justify-center font-display font-medium text-[var(--color-maroon-label)] ${labelSize} lg:text-[2.14rem]`}
          trackClassName="tracking-[0.273em] -mr-[0.273em]"
          lineClassName="h-[0.15rem] w-10 sm:w-12 lg:h-[0.25rem] lg:w-[5.125rem]"
          gapClassName="gap-4 lg:gap-[2.06rem]"
        />
        <h2 className={`mt-3 font-display text-[var(--color-ink-black)] ${titleSize} lg:mt-[1.53rem] lg:text-[4.86rem] lg:leading-none`}>
          {data.titleTop} <span className="font-bold text-[var(--color-maroon-bright)]">{data.titleAccent}</span>
        </h2>
        <p className={`mx-auto mt-4 max-w-[40rem] font-sans text-[var(--color-text-grey)] ${introSize} lg:mt-[1.67rem] lg:max-w-none lg:text-[1.65rem] lg:leading-none`}>
          {data.description}
        </p>
      </div>

      <ul className={`mx-auto mt-10 grid max-w-[44rem] grid-cols-2 gap-3 ${sidePadding} sm:max-w-none sm:grid-cols-3 sm:gap-4 lg:mt-[5.3rem] lg:grid-cols-5 lg:gap-[0.81rem] lg:pl-[4.44rem] lg:pr-[4.25rem]`}>
        {data.items.map((item, index) => (
          <li
            key={item.id}
            data-reveal
            data-reveal-delay={index * 70}
            className="group flex flex-col items-center rounded-md border-2 border-[var(--color-border-card)] bg-[var(--color-white)] p-[0.2rem] pb-4 text-center transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_1.2rem_2.2rem_-1.4rem_var(--color-shadow-strong)] lg:rounded-[0.375rem] lg:border-[0.125rem] lg:p-[0.19rem] lg:pb-[1.69rem]"
          >
            {/* the whole product on white, like the design (the photos have pure white backgrounds, so no edge or fade shows) */}
            <span className="relative block aspect-square w-full overflow-hidden lg:aspect-auto lg:h-[21.25rem]">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                quality={90}
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 31vw, 46vw"
                className="object-contain"
              />
            </span>
            <h3 className="mt-3 whitespace-pre-line font-card text-[1rem] font-semibold leading-[1.12] text-[var(--color-ink-black)] sm:text-[1.1rem] lg:mt-[1.15rem] lg:text-[1.94rem] lg:leading-[2.19rem]">
              {item.title}
            </h3>
            <span aria-hidden="true" className="mt-2.5 block h-[0.2rem] w-12 bg-[var(--color-maroon-bright)] lg:mt-[1.09rem] lg:h-[0.28rem] lg:w-[5.25rem]" />
          </li>
        ))}
      </ul>
    </section>
  );
};
