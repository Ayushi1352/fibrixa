/**
 * Maroon button (header "Contact Us", form "Send Message"): on hover it turns white with maroon text and a maroon
 * border (a fading layer, so the colour changes smoothly)
 */
export const buttonClass =
  "group relative isolate inline-flex items-center justify-center overflow-hidden border-2 border-[var(--color-maroon)] bg-[var(--color-maroon)] text-[var(--color-white)] shadow-[0_0.6rem_1.4rem_-0.8rem_var(--color-shadow-maroon)] transition-[transform,color] duration-300 before:absolute before:inset-0 before:-z-10 before:bg-[var(--color-white)] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-0.5 hover:text-[var(--color-maroon)] hover:before:opacity-100 disabled:cursor-wait disabled:opacity-80";

/** arrow inside a button that moves a little to the right on hover */
export const buttonArrow = "shrink-0 transition-transform duration-300 group-hover:translate-x-1";
