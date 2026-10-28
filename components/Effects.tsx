"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";
import { ArrowUp } from "./Icons";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

/** Works on every page (not only where #top exists) and respects reduced motion. */
export const scrollToTop = () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
};

/**
 * Section links: on the home page they glide to the section in place (no route change, no re-render);
 * on other pages they fall back to a normal link to "/{locale}#id".
 */
export function useSectionNav() {
  const { href } = useLocale();
  const onHome = usePathname().split("/").filter(Boolean).length <= 1;

  const go = (id: string, after?: () => void) => (e: React.MouseEvent) => {
    const el = onHome && document.getElementById(id);
    if (!el || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    after?.();
    // the mobile menu locks body scroll — release it before scrolling
    document.body.style.overflow = "";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(history.state, "", `#${id}`);
  };

  return { onHome, go, sectionHref: (id: string) => href(`#${id}`) };
}

/** Floating button that appears after the first screen; its ring fills with scroll progress. */
export function BackToTop() {
  const { t } = useLocale();
  const { scrollY, scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [show, setShow] = useState(false);
  const check = (y: number) => setShow(y > window.innerHeight * 0.8);

  useEffect(() => check(window.scrollY), []);
  useMotionValueEvent(scrollY, "change", check);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          onClick={scrollToTop}
          aria-label={t.footer.top}
          title={t.footer.top}
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <svg className="to-top-ring" viewBox="0 0 48 48" aria-hidden>
            <circle cx="24" cy="24" r="22" className="track" />
            <motion.circle cx="24" cy="24" r="22" className="bar" style={{ pathLength }} />
          </svg>
          <ArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/** Soft dot + trailing ring cursor; grows over links, buttons and cards. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const t = e.target as HTMLElement;
      const hover = !!t.closest("a, button, [data-cursor='hover']");
      ring.current?.classList.toggle("hover", hover);
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden />
      <div className="cursor-dot" ref={dot} aria-hidden />
    </>
  );
}
