"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionGlobalConfig, animate, motion, useReducedMotion } from "motion/react";
import { useLocale } from "./LocaleProvider";
import { SKIP_INTRO_KEY, restoreSpot } from "@/lib/intro";

const IntroContext = createContext(true);
/** False while the welcome screen is up — entrance animations wait for it. */
export const useIntroDone = () => useContext(IntroContext);

const ease = [0.2, 0.8, 0.2, 1] as const;
const DURATION = 2.6; // seconds the welcome screen stays before lifting

export default function Intro({ children }: { children: React.ReactNode }) {
  const { c, t } = useLocale();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(true);
  const counter = useRef<HTMLSpanElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SKIP_INTRO_KEY)) {
        sessionStorage.removeItem(SKIP_INTRO_KEY);
        document.documentElement.classList.add("no-intro"); // hide at once, no exit animation
        // a language switch should feel like swapping the text in place:
        // no entrance animations, and land back where the reader was
        MotionGlobalConfig.instantAnimations = true;
        setOpen(false);
        requestAnimationFrame(() => requestAnimationFrame(restoreSpot));
        setTimeout(() => (MotionGlobalConfig.instantAnimations = false), 800);
        return;
      }
    } catch {}
    const total = reduce ? 1.2 : DURATION;
    const count = animate(0, 100, {
      duration: total - 0.3,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => counter.current && (counter.current.textContent = String(Math.round(v)).padStart(2, "0")),
    });
    const timer = setTimeout(close, total * 1000);
    const onKey = () => close();
    window.addEventListener("keydown", onKey);
    return () => {
      count.stop();
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [close, reduce]);

  useEffect(() => {
    document.documentElement.classList.toggle("intro-lock", open);
  }, [open]);

  return (
    <IntroContext.Provider value={!open}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="intro"
            data-intro
            onClick={close}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0 round 0 0 40% 40%)" }}
            initial={{ clipPath: "inset(0 0 0% 0 round 0 0 0% 0%)" }}
            transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="intro-glow" aria-hidden />

            <motion.div
              className="intro-inner"
              exit={{ y: reduce ? 0 : -60, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
            >
              <motion.svg
                className="intro-flower"
                viewBox="0 0 24 24"
                aria-hidden
                initial={{ rotate: -90 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 1.6, ease }}
              >
                {[0, 72, 144, 216, 288].map((r, i) => (
                  <g key={r} transform={`rotate(${r} 12 12)`}>
                    <motion.ellipse
                      cx="12"
                      cy="6.5"
                      rx="3.2"
                      ry="5.2"
                      fill="currentColor"
                      style={{ originX: 0.5, originY: 1 }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.9 }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.09, ease }}
                    />
                  </g>
                ))}
                <motion.circle
                  cx="12"
                  cy="12"
                  r="2.4"
                  fill="var(--bg)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease }}
                />
              </motion.svg>

              <h2 className="intro-name">
                <span className="line">
                  <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.55, ease }}>
                    {c.profile.firstName}
                  </motion.span>
                </span>{" "}
                <span className="line">
                  <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.68, ease }}>
                    <em>{c.profile.lastName}</em>
                  </motion.span>
                </span>
              </h2>

              <motion.p
                className="intro-role"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {c.profile.role} · {c.profile.stack}
              </motion.p>

              <div className="intro-bar" aria-hidden>
                <motion.i
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: (reduce ? 1.2 : DURATION) - 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <span className="intro-count" aria-hidden>
                <span ref={counter}>00</span>
              </span>
            </motion.div>

            <button
              className="intro-skip"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              {t.intro.skip}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
