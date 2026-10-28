"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { useLocale } from "./LocaleProvider";
import { useIntroDone } from "./Intro";
import { Arrow, Download } from "./Icons";

// three.js only on the client, loaded after first paint
const BlossomScene = dynamic(() => import("./three/BlossomScene"), {
  ssr: false,
  loading: () => <div className="scene-loading" />,
});

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function Hero() {
  const { c, t } = useLocale();
  const { profile } = c;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    import("./three/BlossomScene"); // start loading the 3D scene while the welcome screen plays
  }, []);
  // entrance animations (and the flower's bloom) start once the welcome screen lifts
  const introDone = useIntroDone();
  const go = <T,>(target: T) => (introDone ? target : undefined);
  // pause the WebGL loop when the hero is off-screen (saves battery on phones)
  const canvasRef = useRef<HTMLDivElement>(null);
  const inView = useInView(canvasRef, { margin: "100px" });

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-text">
          <motion.div
            className="badge glass"
            initial={{ opacity: 0, y: 20 }}
            animate={go({ opacity: 1, y: 0 })}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            <span className="pulse" /> {t.hero.badge}
          </motion.div>

          <h1 className="hero-title">
            <span className="line">
              <motion.span initial={{ y: "110%" }} animate={go({ y: 0 })} transition={{ duration: 1.1, delay: 0.4, ease }}>
                {profile.firstName}
              </motion.span>
            </span>
            <span className="line">
              <motion.span initial={{ y: "110%" }} animate={go({ y: 0 })} transition={{ duration: 1.1, delay: 0.55, ease }}>
                <em>{profile.lastName}</em>
              </motion.span>
            </span>
          </h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={go({ opacity: 1 })}
            transition={{ duration: 1, delay: 1 }}
          >
            <span>{profile.role}</span>
            <span className="dot" />
            <span>{profile.stack}</span>
            <span className="dot hide-sm" />
            <span className="soft hide-sm">{profile.location}</span>
          </motion.div>

          <motion.p
            className="lead"
            style={{ marginTop: 18 }}
            initial={{ opacity: 0, y: 16 }}
            animate={go({ opacity: 1, y: 0 })}
            transition={{ duration: 0.9, delay: 1.1, ease }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={go({ opacity: 1, y: 0 })}
            transition={{ duration: 0.9, delay: 1.25, ease }}
          >
            <a href="#projects" className="btn btn-primary">
              {t.hero.seeWork} <Arrow />
            </a>
            <a href={profile.cv} download className="btn btn-ghost">
              <Download /> {t.hero.cv}
            </a>
          </motion.div>
        </div>

        <motion.div
          ref={canvasRef}
          className="hero-canvas"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={go({ opacity: 1, scale: 1 })}
          transition={{ duration: 1.6, delay: 0.2, ease }}
        >
          {mounted && introDone && <BlossomScene dark={resolvedTheme === "dark"} active={inView} />}

          <div className="chip-float glass" style={{ top: "14%", left: "2%" }}>
            <span className="sw" style={{ background: "var(--rose)" }}>L</span>
            <span>Laravel<small>{t.hero.chips.framework}</small></span>
          </div>
          <div className="chip-float glass" style={{ top: "30%", right: "0%", animationDelay: "-2s" }}>
            <span className="sw" style={{ background: "var(--lilac)" }}>{"</>"}</span>
            <span>PHP<small>{t.hero.chips.backend}</small></span>
          </div>
          <div className="chip-float glass" style={{ bottom: "16%", left: "8%", animationDelay: "-4s" }}>
            <span className="sw" style={{ background: "var(--peach)" }} dir="ltr">C#</span>
            <span>{t.hero.chips.csharp}<small>{t.hero.chips.language}</small></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
