"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import ThemeToggle from "./ThemeToggle";
import { useLocale } from "./LocaleProvider";
import { useIntroDone } from "./Intro";
import { SKIP_INTRO_KEY, saveSpot } from "@/lib/intro";
import { Flower } from "./Icons";
import { switchLocalePath } from "@/lib/i18n";
import { useSectionNav } from "./Effects";

export const links = [
  { id: "about" },
  { id: "skills" },
  { id: "experience" },
  { id: "projects", path: "/work" },
  { id: "education" },
  { id: "contact" },
] as const;

export type NavLink = (typeof links)[number];

export default function Nav() {
  const { locale, t, href } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const onWork = pathname.split("/")[2] === "work";
  const other = locale === "ar" ? "en" : "ar";

  const { onHome, go, sectionHref } = useSectionNav();
  // on the home page every link (Work included) glides to its section in place
  const hrefOf = (l: NavLink) => (onHome || !("path" in l) ? sectionHref(l.id) : href(l.path));
  const isActive = (l: NavLink) => (onWork ? l.id === "projects" : active === l.id);
  const introDone = useIntroDone();
  // remembered by proxy.ts so "/" opens the chosen language next time
  const rememberLocale = () => {
    document.cookie = `NEXT_LOCALE=${other}; path=/; max-age=31536000; samesite=lax`;
    try {
      sessionStorage.setItem(SKIP_INTRO_KEY, "1");
    } catch {}
    saveSpot();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // the mobile menu blooms out of the menu button, which sits on the left in RTL
  const origin = locale === "ar" ? "8% 5%" : "92% 5%";

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -40, opacity: 0, x: "-50%" }}
        animate={introDone ? { y: 0, opacity: 1, x: "-50%" } : undefined}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Link href={sectionHref("top")} onClick={go("top")} className="logo" aria-label={t.nav.home}>
          <Flower size={22} className="logo-flower" />
          <span>
            {locale === "ar" ? "شهد" : "Shahed"}
            <i>.</i>
          </span>
        </Link>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.id}>
              <Link href={hrefOf(l)} onClick={go(l.id)} className={isActive(l) ? "active" : ""}>
                {t.nav[l.id]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <Link
            href={switchLocalePath(pathname, other)}
            onClick={rememberLocale}
            scroll={false}
            className="lang-btn"
            hrefLang={other}
            lang={other}
            aria-label={t.nav.switchLabel}
          >
            {t.nav.switchTo}
          </Link>
          <ThemeToggle />
          <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label={t.nav.menu} aria-expanded={open}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h10" />}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: `circle(0% at ${origin})` }}
            animate={{ clipPath: `circle(150% at ${origin})` }}
            exit={{ clipPath: `circle(0% at ${origin})` }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <Link
                  href={hrefOf(l)}
                  onClick={(e) => {
                    go(l.id)(e);
                    setOpen(false);
                  }}
                >
                  <span>0{i + 1}</span>
                  {t.nav[l.id]}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
