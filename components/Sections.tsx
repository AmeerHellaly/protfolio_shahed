"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView, useScroll } from "motion/react";
import { projectGradients } from "@/data/content";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";
import { Title, useLocale } from "./LocaleProvider";
import { Arrow, Cap, Check, Copy, Download, Flower, GitHub, Mail, Motif, Petal, Phone, Pin } from "./Icons";
import { BackToTop, useSectionNav } from "./Effects";
import { links as navLinks } from "./Nav";

/* ============================ Marquee ============================ */
export function Marquee() {
  const { t } = useLocale();
  const row = [...t.marquee, ...t.marquee];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-item" key={k}>
            {row.map((w, i) => (
              <span key={i} style={{ display: "contents" }}>
                {w} <Flower size={22} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ Counter ============================ */
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v).toString()),
    });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>0</span>;
}

/* ============================ About ============================ */
export function About() {
  const { c, t } = useLocale();
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div>
          <Reveal>
            <span className="eyebrow">{t.about.eyebrow}</span>
            <h2 className="h2">
              <Title parts={t.about.title} />
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="stats">
              {c.stats.map((s) => (
                <div className="stat glass" key={s.label}>
                  <div className="num">
                    <Counter to={s.value} />
                    <sup>{s.suffix}</sup>
                  </div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="facts">
              <span className="fact glass"><Pin /> {c.profile.location}</span>
              <span className="fact glass"><Cap /> {t.about.university}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={60}>
          <div className="letter glass">
            <div className="stamp" aria-hidden>
              <span>
                <b>{t.about.stampCity}</b>
                SY · 2026
              </span>
            </div>
            <p className="hello">{t.about.hello}</p>
            <p>{c.profile.summary}</p>
            <p>{t.about.extra}</p>
            <div className="signature">{t.about.signature}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ Skills ============================ */
export function Skills() {
  const { c, t } = useLocale();
  return (
    <section className="section" id="skills" style={{ paddingTop: 40 }}>
      <div className="container">
        <Reveal>
          <span className="eyebrow">{t.skills.eyebrow}</span>
          <h2 className="h2">
            <Title parts={t.skills.title} />
          </h2>
        </Reveal>

        <div className="beds">
          {c.skillGroups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.12}>
              <div className={`bed glass hue-${g.hue}`}>
                <div className="bed-glow" />
                <div className="bed-head">
                  <span className="bed-title">{g.title}</span>
                  <span className="bed-num">0{gi + 1}</span>
                </div>
                <div className="seeds">
                  {g.items.map((s, i) => (
                    <motion.span
                      className="seed"
                      key={s}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.25 + gi * 0.1 + i * 0.06 }}
                    >
                      <i /> {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="soft-row">
            {c.softSkills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ Experience ============================ */
export function Experience() {
  const { c, t } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <section className="section" id="experience">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{t.experience.eyebrow}</span>
          <h2 className="h2">
            <Title parts={t.experience.title} />
          </h2>
        </Reveal>

        <div className="thread" ref={ref}>
          <div className="thread-line">
            <motion.div style={{ scaleY: scrollYProgress }} />
          </div>
          {c.experience.map((job, i) => (
            <Reveal key={job.title} delay={i * 0.1}>
              <article className="job glass">
                <span className="job-knot" />
                <div>
                  <div className="job-period">{job.period}</div>
                </div>
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-place">{job.place}</div>
                  <ul>
                    {job.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ Projects ============================ */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current.style.transform = `perspective(1000px) rotateY(${(px - 0.5) * 12}deg) rotateX(${(0.5 - py) * 12}deg) translateY(-6px)`;
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <div className="card3d glass" ref={ref} onPointerMove={onMove} onPointerLeave={reset} data-cursor="hover">
      {children}
      <div className="card-shine" />
    </div>
  );
}

export function Projects() {
  const { c, t, href } = useLocale();
  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{t.projects.eyebrow}</span>
          <h2 className="h2">
            <Title parts={t.projects.title} />
          </h2>
          <p className="lead" style={{ marginTop: 18 }}>
            {t.projects.lead}
          </p>
        </Reveal>

        <div className="projects">
          {c.projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.1} className="project">
              <Link href={href(`/work/${p.slug}`)} className="card-link" aria-label={t.projects.readStoryOf(p.title)}>
                <TiltCard>
                  <div className="card-art">
                    <div className="bg" style={{ background: projectGradients[i % projectGradients.length] }} />
                    <span className="card-num">0{i + 1}</span>
                    <span className="card-kind">{p.kind}</span>
                    <Motif name={p.motif} />
                  </div>
                  <div className="card-body">
                    <h3>
                      <SplitTitle text={p.title} />
                    </h3>
                    <p>{p.desc}</p>
                    <div className="tags">
                      {p.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className="card-more">
                      {t.projects.readStory} <Arrow />
                    </span>
                  </div>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="projects-more">
            <Link href={href("/work")} className="btn btn-ghost">
              {t.projects.all} <Arrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ Education ============================ */
export function Education() {
  const { c, t } = useLocale();
  return (
    <section className="section" id="education">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{t.education.eyebrow}</span>
          <h2 className="h2">
            <Title parts={t.education.title} />
          </h2>
        </Reveal>

        <div className="edu-grid">
          <Reveal>
            <div className="edu-col glass">
              <h3>{t.education.education}</h3>
              {c.education.map((e) => (
                <div className="edu-item" key={e.title}>
                  <div className="edu-year">{e.year}</div>
                  <div>
                    <div className="edu-title">{e.title}</div>
                    {e.place && <div className="edu-place">{e.place}</div>}
                  </div>
                </div>
              ))}

              <div className="langs">
                {c.languages.map((l) => (
                  <div className="lang" key={l.name}>
                    <span>{l.name}</span>
                    <span className="petals" aria-label={t.education.outOf5(l.level)}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Petal key={i} className={i < l.level ? "on" : ""} />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="edu-col glass">
              <h3>{t.education.courses}</h3>
              {c.courses.map((course) => (
                <div className="course" key={course.title}>
                  <span className="ribbon">
                    <Check />
                  </span>
                  <div>
                    <b>{course.title}</b>
                    <small>{course.where}</small>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================ Contact ============================ */
const telOf = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;

export function Contact() {
  const { c, t } = useLocale();
  const { profile } = c;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal>
          <div className="contact-card glass">
            <div className="contact-orb" aria-hidden />
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 className="big-title">
              {t.contact.title[0]}
              <br />
              <em>{t.contact.title[1]}</em>
            </h2>
            <p className="lead" style={{ marginInline: "auto" }}>
              {t.contact.lead}
            </p>
            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                <Mail /> {t.contact.write} <Arrow />
              </a>
              <a className="btn btn-ghost" href={profile.cv} download>
                <Download /> {t.hero.cv}
              </a>
              <button className="btn btn-ghost" onClick={copy}>
                {copied ? <Check /> : <Copy />} {copied ? t.contact.copied : t.contact.copy}
              </button>
            </div>
            <div className="contact-lines">
              <span><Mail /> {profile.email}</span>
              <span><Phone /> <a href={telOf(profile.phone)} dir="ltr">{profile.phone}</a></span>
              <span><GitHub /> <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" dir="ltr">{profile.github}</a></span>
              <span><Pin /> {profile.location}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ Footer ============================ */
export function Footer() {
  const { c, t, href } = useLocale();
  const { onHome, go, sectionHref } = useSectionNav();
  const { profile } = c;
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden />
      <div className="container">
        <div className="foot-main">
          <div className="foot-brand">
            <Link href={sectionHref("top")} onClick={go("top")} className="foot-logo" aria-label={t.nav.home}>
              <Flower size={40} />
              <span>
                {profile.firstName}
                <i>.</i>
              </span>
            </Link>
            <p>{t.footer.tagline}</p>
            {profile.available && (
              <span className="badge glass">
                <span className="pulse" /> {t.hero.badge}
              </span>
            )}
          </div>

          <nav className="foot-col" aria-label={t.footer.explore}>
            <h3>{t.footer.explore}</h3>
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <Link href={onHome || !("path" in l) ? sectionHref(l.id) : href(l.path)} onClick={go(l.id)}>
                    {t.nav[l.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="foot-col">
            <h3>{t.footer.reach}</h3>
            <ul>
              <li>
                <a href={`mailto:${profile.email}`}><Mail /> {profile.email}</a>
              </li>
              <li>
                <a href={telOf(profile.phone)}><Phone /> <span dir="ltr">{profile.phone}</span></a>
              </li>
              <li>
                <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer"><GitHub /> <span dir="ltr">{profile.github}</span></a>
              </li>
              <li>
                <a href={profile.cv} download><Download /> {t.hero.cv}</a>
              </li>
              <li>
                <span><Pin /> {profile.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-bar">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
      </div>
      <BackToTop />
    </footer>
  );
}
