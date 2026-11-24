/**
 * Space between sections. Every section keeps exactly the same empty space between its content and the next
 * section's content, on every screen:
 *   phones 40px · tablets 48px · from 1024px up 8rem (scales with the design: 128px on a 1920px screen,
 *   96px at 1440px, 68px at 1024px).
 * Two white sections each add half of it (`sectionSpace`). The hero adds its half as an outer margin
 * (`sectionMarginBottom`, its picture must end at its own bottom edge), and the last section before the maroon
 * footer carries the whole gap on its own (`sectionGapBottom`), so the space is the same there too.
 */
export const sectionSpace = "py-5 sm:py-6 lg:py-[4rem]";

/** Only the half gap above (a section whose bottom is handled on its own) */
export const sectionSpaceTop = "pt-5 sm:pt-6 lg:pt-[4rem]";

/** Half gap as an outer margin below (the hero: its picture must end at its own bottom edge) */
export const sectionMarginBottom = "mb-5 sm:mb-6 lg:mb-[4rem]";

/** The whole gap below, for the last section before the maroon footer */
export const sectionGapBottom = "pb-10 sm:pb-12 lg:pb-[8rem]";

/** The fixed header's height, so a menu link scrolls its section to just below the header */
export const scrollMargin = "scroll-mt-[4.5rem] sm:scroll-mt-[5.5rem] lg:scroll-mt-[6.5rem]";

/** Side space of the content on phones and tablets (from 1024px up each section follows the design) */
export const sidePadding = "px-4 sm:px-6 md:px-8";
