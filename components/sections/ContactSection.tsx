import Image from "next/image";
import type { CompanyData, ContactData, EnquiryFormData } from "@/types/templates.types";
import { Eyebrow, labelSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionGapBottom, sectionSpaceTop, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";
import { EnquiryForm } from "@/components/sections/EnquiryForm";

/**
 * On the left the label, the big "Get In Touch" title ("Touch" in tan), the text, the phone, e-mail and address
 * (maroon squares with a short maroon line beside them) and the packaging photo; on the right the "Send Us a Message"
 * form in a card with a thin maroon border. Phones and tablets: the form under the details. The footer follows after
 * the whole gap between sections.
 */
type Props = {
  data?: ContactData;
  form?: EnquiryFormData;
  company: CompanyData;
};

export const ContactSection = ({ data, form, company }: Props) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpaceTop} ${sectionGapBottom}`}>
      <div className={`mx-auto flex max-w-[44rem] flex-col gap-10 ${sidePadding} lg:max-w-none lg:flex-row lg:items-start lg:gap-0 lg:px-0 lg:pl-[5.75rem] lg:pr-[5.125rem]`}>
        <div className="min-w-0 lg:w-[51.44rem] lg:shrink-0">
          <div data-reveal>
            <Eyebrow
              label={data.label}
              lines="before"
              className={`font-sans font-bold text-[var(--color-ink-black)] ${labelSize} lg:text-[1.88rem]`}
              trackClassName="tracking-[0.32em] -mr-[0.32em] lg:tracking-[0.35em] lg:-mr-[0.35em]"
              lineClassName="h-[0.2rem] w-10 sm:w-12 lg:h-[0.3125rem] lg:w-[5rem]"
              gapClassName="gap-4 lg:gap-[1.5rem]"
            />
            <h2 className="mt-3 font-title text-[length:min(3.4rem,calc((100vw-2rem)/6.4))] font-black leading-[1.05] tracking-[-0.015em] text-[var(--color-maroon-deep)] sm:text-[4.4rem] lg:mt-[1.3rem] lg:text-[6.25rem] lg:leading-[6.25rem]">
              {data.titleTop} <span className="text-[var(--color-tan-title)]">{data.titleAccent}</span>
            </h2>
            {/* the design's line breaks (\n in the JSON) are kept from 640px up */}
            <p className="mt-3 font-sans text-base leading-[1.6] text-[var(--color-text-grey)] sm:whitespace-pre-line lg:mt-[1.05rem] lg:text-[1.406rem] lg:leading-[2rem]">
              {data.description}
            </p>
          </div>

          <ul data-reveal className="mt-7 flex flex-col gap-5 lg:ml-[0.31rem] lg:mt-[2.6rem] lg:gap-[1.97rem]">
            {company.contactItems.map((item) => {
              const external = item.url.startsWith("http");
              return (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={`${item.title}: ${item.value}`}
                    className="group flex items-center"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-[var(--color-maroon)] text-[var(--color-white)] transition-[transform,background-color] duration-300 group-hover:scale-105 group-hover:bg-[var(--color-tan)] lg:h-[3.94rem] lg:w-[4.125rem] lg:rounded-[0.5rem]">
                      <Icon name={item.icon} className="size-5 lg:size-[2.25rem]" strokeWidth={2.2} />
                    </span>
                    <span aria-hidden="true" className="ml-5 h-10 w-[0.15rem] shrink-0 bg-[var(--color-maroon)] lg:ml-[2.94rem] lg:h-[3.75rem] lg:w-[0.19rem]" />
                    <span className="ml-4 min-w-0 break-words lg:ml-[2.175rem]">
                      <span className="block font-card text-[1.05rem] font-bold leading-tight text-[var(--color-ink-black)] transition-colors group-hover:text-[var(--color-maroon)] lg:text-[1.78rem] lg:leading-none">{item.title}</span>
                      <span className="mt-1 block font-card text-[0.98rem] tracking-[-0.01em] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-maroon)] lg:mt-[0.55rem] lg:text-[1.625rem] lg:leading-none lg:tracking-normal">
                        {item.value}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div data-reveal className="relative mx-auto mt-6 aspect-[700/345] w-full max-w-[34rem] lg:mx-0 lg:ml-[6.75rem] lg:mt-[0.79rem] lg:w-[43.75rem] lg:max-w-none">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 37vw, (min-width: 640px) 34rem, 92vw" className="object-contain" />
          </div>
        </div>

        {form && (
          <div
            data-reveal
            className="w-full rounded-2xl border-2 border-[var(--color-border-form)] bg-[var(--color-white)] p-5 sm:p-8 lg:ml-[0.25rem] lg:mt-[4.94rem] lg:w-[57.69rem] lg:shrink-0 lg:rounded-[1.125rem] lg:border-[0.125rem] lg:pb-[2.88rem] lg:pl-[2.75rem] lg:pr-[2.75rem] lg:pt-[2.3rem]"
          >
            <h3 className="font-title text-[2rem] font-black leading-none tracking-[-0.01em] text-[var(--color-maroon-deep)] sm:text-[2.4rem] lg:text-[3.82rem]">
              {data.formTitleTop} <span className="text-[var(--color-tan-title)]">{data.formTitleAccent}</span>
            </h3>
            <span aria-hidden="true" className="mt-3 block h-1 w-20 bg-[var(--color-maroon)] lg:mt-[1.53rem] lg:h-[0.375rem] lg:w-[7.875rem]" />
            <EnquiryForm data={form} />
          </div>
        )}
      </div>
    </section>
  );
};
