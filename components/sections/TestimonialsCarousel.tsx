"use client";

import { useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

type Labels = { carouselLabel: string; previousLabel: string; nextLabel: string; slideStatus: string };

/** Cards shown side by side: phones 1, from 768px 2, from 1024px 3 (the same breakpoints as the CSS below) */
const viewQueries = ["(min-width: 1024px)", "(min-width: 768px)"];
const subscribeView = (onChange: () => void) => {
  const lists = viewQueries.map((query) => window.matchMedia(query));
  for (const list of lists) list.addEventListener("change", onChange);
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
};
const readView = () => (window.matchMedia(viewQueries[0]).matches ? 3 : window.matchMedia(viewQueries[1]).matches ? 2 : 1);

/**
 * The testimonial cards in a row that slides one card per arrow press (or swipe on touch screens), endlessly:
 * after the last card the first one follows again. Phones see one card at a time, tablets two, desktops three.
 * The cards are rendered three times (copy | real | copy); after a slide into a copy the row jumps back, without
 * animation, to the same spot among the real cards, so it never runs out.
 */
export const TestimonialsCarousel = ({ cards, labels }: { cards: ReactNode[]; labels: Labels }) => {
  const count = cards.length;
  const looping = count > 1;
  const view = Math.min(useSyncExternalStore(subscribeView, readView, () => 1), count);

  const [index, setIndex] = useState(looping ? count : 0);
  const [animate, setAnimate] = useState(false);
  const moving = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const slides = looping ? [...cards, ...cards, ...cards] : cards;
  const current = (((index - (looping ? count : 0)) % count) + count) % count;

  const move = (step: 1 | -1) => {
    if (moving.current) return;
    moving.current = true;
    setAnimate(true);
    setIndex((value) => value + step);
  };

  const settle = (event: React.TransitionEvent<HTMLUListElement>) => {
    // the cards' own hover transitions bubble up here too
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    moving.current = false;
    if (index >= 2 * count || index < count) {
      setAnimate(false);
      setIndex(index >= 2 * count ? index - count : index + count);
    }
  };

  const onPointerUp = (event: React.PointerEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(event.clientY - start.y)) move(dx < 0 ? 1 : -1);
  };

  const arrowClass =
    "grid size-12 place-items-center rounded-full border-2 border-[var(--color-maroon)] text-[var(--color-maroon)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-maroon)] hover:text-[var(--color-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-maroon)] lg:size-[4.5rem] lg:border-[0.1875rem]";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={labels.carouselLabel}>
      {/* clips only sideways, so a card lifted on hover and its shadow below still show */}
      <div
        className="touch-pan-y overflow-x-clip [overflow-clip-margin:1rem]"
        onPointerDown={(event) => {
          if (looping && event.pointerType !== "mouse") touchStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (touchStart.current = null)}
      >
        <ul
          onTransitionEnd={settle}
          onTransitionCancel={() => (moving.current = false)}
          style={{ "--count": count, "--index": index, transform: "translateX(calc(var(--index) * -100% / min(var(--view), var(--count))))" } as CSSProperties}
          className={`-mx-2.5 flex [--view:1] md:[--view:2] lg:-mx-[0.655rem] lg:[--view:3] ${
            animate ? "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
          }`}
        >
          {slides.map((card, n) => {
            const shown = n >= index && n < index + view;
            return (
              <li
                key={n}
                aria-hidden={shown ? undefined : true}
                inert={!shown}
                style={{ flexBasis: "calc(100% / min(var(--view), var(--count)))" }}
                className="flex shrink-0 px-2.5 lg:px-[0.655rem]"
              >
                {card}
              </li>
            );
          })}
        </ul>
      </div>

      {looping && (
        <div className="mt-7 flex items-center justify-center gap-4 lg:mt-[3rem] lg:gap-[1.5rem]">
          <button type="button" onClick={() => move(-1)} aria-label={labels.previousLabel} className={arrowClass}>
            <Icon name="TbChevronLeft" className="size-6 lg:size-[2.25rem]" strokeWidth={2.4} />
          </button>
          <button type="button" onClick={() => move(1)} aria-label={labels.nextLabel} className={arrowClass}>
            <Icon name="TbChevronRight" className="size-6 lg:size-[2.25rem]" strokeWidth={2.4} />
          </button>
          <p className="sr-only" aria-live="polite">
            {fill(labels.slideStatus, { current: current + 1, total: count })}
          </p>
        </div>
      )}
    </div>
  );
};
