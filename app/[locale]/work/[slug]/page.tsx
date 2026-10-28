import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import SplitTitle from "@/components/SplitTitle";
import { Title } from "@/components/LocaleProvider";
import { Contact, Footer } from "@/components/Sections";
import { Cursor, ScrollProgress } from "@/components/Effects";
import { Arrow, Check, Motif } from "@/components/Icons";
import { getContent, projectGradients, projectSlugs } from "@/data/content";
import { ui } from "@/data/ui";
import { isLocale, localize } from "@/lib/i18n";

type Props = PageProps<"/[locale]/work/[slug]">;

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = getContent(locale).projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${getContent(locale).profile.name}`,
    description: p.overview,
    alternates: { languages: { en: `/en/work/${slug}`, ar: `/ar/work/${slug}` } },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const { projects } = getContent(locale);
  const t = ui[locale].caseStudy;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const gradient = projectGradients[i % projectGradients.length];

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        {/* ---------- Intro ---------- */}
        <section className="section cs-hero">
          <div className="container">
            <Reveal>
              <Link href={localize(locale, "/work")} className="cs-back">
                {t.back}
              </Link>
            </Reveal>
            <div className="cs-hero-grid">
              <Reveal delay={0.05}>
                <span className="eyebrow">
                  {p.kind} · {p.year}
                </span>
                <h1 className="h2 cs-title">
                  <SplitTitle text={p.title} />
                </h1>
                <p className="lead" style={{ marginTop: 22 }}>
                  {p.overview}
                </p>
              </Reveal>
              <Reveal delay={0.15} y={60}>
                <div className="cs-art">
                  <div className="bg" style={{ background: gradient }} />
                  <span className="card-num">0{i + 1}</span>
                  <Motif name={p.motif} />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <dl className="cs-facts glass">
                <div>
                  <dt>{t.role}</dt>
                  <dd>{p.role}</dd>
                </div>
                <div>
                  <dt>{t.timeline}</dt>
                  <dd>{p.duration}</dd>
                </div>
                <div>
                  <dt>{t.team}</dt>
                  <dd>{p.team}</dd>
                </div>
                <div className="cs-facts-stack">
                  <dt>{t.stack}</dt>
                  <dd className="tags">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ---------- Story ---------- */}
        <section className="section cs-section">
          <div className="container cs-story">
            <Reveal>
              <div className="cs-note glass">
                <span className="eyebrow">{t.challenge}</span>
                <p>{p.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="cs-note glass">
                <span className="eyebrow">{t.approach}</span>
                <p>{p.approach}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- Features ---------- */}
        <section className="section cs-section">
          <div className="container">
            <Reveal>
              <span className="eyebrow">{t.featuresEyebrow}</span>
              <h2 className="h2">
                <Title parts={t.featuresTitle} />
              </h2>
            </Reveal>
            <div className="cs-features">
              {p.features.map((f, fi) => (
                <Reveal key={f.title} delay={fi * 0.08}>
                  <div className="cs-feature glass">
                    <span className="bed-num">0{fi + 1}</span>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Data model ---------- */}
        <section className="section cs-section">
          <div className="container">
            <Reveal>
              <span className="eyebrow">{t.dataEyebrow}</span>
              <h2 className="h2">
                <Title parts={t.dataTitle} />
              </h2>
              <p className="lead" style={{ marginTop: 18 }}>
                {t.dataLead}
              </p>
            </Reveal>
            <div className="cs-schema">
              {p.schema.map((table, ti) => (
                <Reveal key={table.table} delay={ti * 0.06}>
                  <div className="cs-table glass">
                    <div className="cs-table-head">{table.table}</div>
                    <ul>
                      <li className="pk">id</li>
                      {table.fields.map((f) => (
                        <li key={f} className={f.endsWith("→") ? "fk" : ""}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Process + learned ---------- */}
        <section className="section cs-section">
          <div className="container cs-split">
            <Reveal>
              <div>
                <span className="eyebrow">{t.stepsEyebrow}</span>
                <h2 className="h2">
                  <Title parts={t.stepsTitle} />
                </h2>
                <ol className="cs-steps">
                  {p.steps.map((s, si) => (
                    <li key={s}>
                      <span>{si + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="cs-learned glass">
                <h3>{t.learned}</h3>
                {p.learned.map((l) => (
                  <div className="course" key={l}>
                    <span className="ribbon">
                      <Check />
                    </span>
                    <div>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- Next ---------- */}
        <section className="section cs-section">
          <div className="container">
            <Reveal>
              <Link href={localize(locale, `/work/${next.slug}`)} className="cs-next glass" data-cursor="hover">
                <span className="eyebrow">{t.next}</span>
                <span className="cs-next-title">
                  <span>
                    <SplitTitle text={next.title} />
                  </span>
                  <Arrow size={34} />
                </span>
                <span className="cs-next-kind">{next.kind}</span>
              </Link>
            </Reveal>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
