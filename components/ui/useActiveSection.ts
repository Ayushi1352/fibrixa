"use client";

import { useEffect, useState } from "react";

/** id of the landing page section a link points to ("#about" → "about") */
export const sectionId = (url: string) => url.replace(/^#/, "");

/**
 * Keeps track of the section in the middle of the screen, so its link is shown as the current one.
 * On every scroll (once per frame) it measures the sections: the current one is the lowest section whose top has
 * passed 45% of the screen height; at the very bottom of the page it is the lowest section on screen (the last one
 * may be too short to ever reach that line).
 */
export const useActiveSection = (urls: string[]) => {
  // a string, so the effect below re-runs whenever the list really changes (also after a hot reload in dev)
  const key = urls.map(sectionId).join(" ");
  const [active, setActive] = useState(() => sectionId(urls[0] ?? ""));

  useEffect(() => {
    const ids = key.split(" ").filter(Boolean);
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = ids[0];
      let currentTop = -Infinity;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top === undefined || top > (atBottom ? window.innerHeight : line) || top < currentTop) continue;
        current = id;
        currentTop = top;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return active;
};
