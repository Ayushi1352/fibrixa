import Image from "next/image";
import type { CompanyData, FooterData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

/**
 * A contact detail longer than this (the address) is set a little smaller, like the design, so it stays on one line in
 * the footer's last column.
 */
const LONG_CONTACT_VALUE = 24;

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

/** The lighter maroon waves of the design: one over the top-left corner, two rising from the bottom on the right */
const FooterWaves = () => (
  <svg aria-hidden="true" viewBox="0 0 1920 602" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full">
    <defs>
      <linearGradient id="footer-wave-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--color-footer-wave)" stopOpacity="0.95" />
        <stop offset="1" stopColor="var(--color-footer-wave)" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="footer-wave-bottom" x1="1" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="var(--color-footer-wave)" stopOpacity="0.85" />
        <stop offset="1" stopColor="var(--color-footer-wave)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0 0H300C230 25 150 40 95 75 55 100 25 125 0 150Z" fill="url(#footer-wave-top)" />
    <path d="M0 0H260C190 20 120 45 70 80 40 100 18 118 0 128Z" fill="var(--color-footer-wave)" opacity="0.35" />
    <path d="M1920 300C1810 330 1700 380 1610 450 1530 512 1480 560 1440 602H1920Z" fill="url(#footer-wave-bottom)" />
    <path d="M860 602C900 560 980 540 1060 550 1140 560 1200 585 1230 602Z" fill="var(--color-footer-wave-soft)" opacity="0.7" />
  </svg>
);

// On maroon: the white logo, a thin line, two columns of links and the contact details (each heading with a short tan
// line under it), then a line across and the copyright, centred.
export const Footer = async ({ data, company }: { data?: FooterData; company: CompanyData }) => {
  if (!data) return null;
  const copyright = fill(data.copyrightText, { year: await currentYear() });

  const heading = "font-sans text-[1.25rem] font-bold leading-none text-[var(--color-white)] lg:text-[2.22rem]";
  const headingLine = <span aria-hidden="true" className="mt-3 block h-[0.2rem] w-12 rounded-full bg-[var(--color-tan-footer)] lg:mt-[1.14rem] lg:h-[0.25rem] lg:w-[4.375rem]" />;

  return (
    <footer className="relative overflow-hidden bg-[var(--color-bg-footer)] text-[var(--color-white)]">
      <FooterWaves />
      <div className="relative px-4 pb-6 pt-12 sm:px-6 md:px-8 lg:px-0 lg:pb-0 lg:pt-[7.6rem]">
        {/*
          phones: the logo, then Quick Links and Industries side by side, then the contact details;
          tablets: the logo, then Quick Links, Industries and the contact details in one row (the contact column wider,
          so the address stays on one line)
        */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[0.8fr_1fr_1.6fr] lg:flex lg:items-start lg:gap-0 lg:pl-[4.44rem]">
          <a href={data.logoUrl} aria-label={data.homeLabel} className="col-span-2 inline-block self-start justify-self-start md:col-span-3 lg:mt-[2.15rem]">
            <Image
              src={data.logo}
              alt={company.logoAlt}
              width={data.logoWidth}
              height={data.logoHeight}
              quality={90}
              sizes="(min-width: 1024px) 26vw, 260px"
              className="h-auto w-[15rem] sm:w-[17rem] lg:w-[31.06rem]"
            />
          </a>
          <span aria-hidden="true" className="hidden h-[8.75rem] w-[0.125rem] shrink-0 bg-[var(--color-white-15)] lg:ml-[4.19rem] lg:mt-[0.35rem] lg:block" />

          {data.linkGroups.map((group, index) => (
            <nav key={group.id} aria-label={group.title} className={index === 0 ? "lg:ml-[4.81rem] lg:w-[20.94rem]" : "lg:w-[21.94rem]"}>
              <h2 className={heading}>{group.title}</h2>
              {headingLine}
              <ul className="mt-4 flex flex-col gap-2.5 lg:mt-[1.35rem] lg:gap-0">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="font-sans text-[0.98rem] text-[var(--color-white-90)] transition-colors hover:text-[var(--color-tan-footer)] lg:block lg:text-[1.77rem] lg:leading-[3.125rem]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-1">
            <h2 className={heading}>{data.contactTitle}</h2>
            {headingLine}
            <ul className="mt-4 flex flex-col gap-3 lg:mt-[2.1rem] lg:gap-[1.15rem]">
              {company.contactItems.map((item) => {
                const external = item.url.startsWith("http");
                return (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={`${item.title}: ${item.value}`}
                      className="group flex items-center gap-4 lg:min-h-[2.4rem] lg:gap-[2.3rem]"
                    >
                      <Icon name={item.footerIcon} className="size-5 shrink-0 text-[var(--color-tan-footer)] lg:size-[2rem]" />
                      <span
                        className={`font-sans text-[var(--color-white-90)] transition-colors group-hover:text-[var(--color-tan-footer)] ${
                          item.value.length > LONG_CONTACT_VALUE ? "text-[0.92rem] lg:text-[1.46rem]" : "text-[0.98rem] lg:text-[1.65rem]"
                        }`}
                      >
                        {item.value}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-white-35)] pt-5 text-center lg:mx-[5.375rem] lg:ml-[5.375rem] lg:mr-[4.94rem] lg:mt-[4.25rem] lg:border-t-[0.125rem] lg:pb-[3.96rem] lg:pt-[2.65rem]">
          <p className="font-sans text-[0.9rem] text-[var(--color-white)] lg:text-[1.59rem] lg:leading-none">{copyright}</p>
        </div>
      </div>
    </footer>
  );
};
