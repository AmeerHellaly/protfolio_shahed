import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import SplitTitle from "@/components/SplitTitle";
import { Title } from "@/components/LocaleProvider";
import { Contact, Footer } from "@/components/Sections";
import { Cursor, ScrollProgress } from "@/components/Effects";
import { Arrow, Motif } from "@/components/Icons";
import { getContent, projectGradients } from "@/data/content";
import { ui } from "@/data/ui";
import { isLocale, localize } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: ui[locale].work.metaTitle,
    description: ui[locale].work.metaDescription,
    alternates: { languages: { en: "/en/work", ar: "/ar/work" } },
  };
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const { projects } = getContent(locale);
  const t = ui[locale].work;

  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <section className="section work-hero">
          <div className="container">
            <Reveal>
              <span className="eyebrow">{t.eyebrow}</span>
              <h1 className="h2 page-title">
                <Title parts={t.title} />
              </h1>
              <p className="lead" style={{ marginTop: 22 }}>
                {t.lead}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container work-list">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={0.05}>
                <Link href={localize(locale, `/work/${p.slug}`)} className="work-row glass" data-cursor="hover">
                  <div className="work-art">
                    <div className="bg" style={{ background: projectGradients[i % projectGradients.length] }} />
                    <Motif name={p.motif} />
                  </div>
                  <div className="work-info">
                    <div className="work-meta">
                      <span>0{i + 1}</span>
                      <span>{p.kind}</span>
                      <span>{p.year}</span>
                    </div>
                    <h2>
                      <SplitTitle text={p.title} />
                    </h2>
                    <p>{p.overview}</p>
                    <div className="tags">
                      {p.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <span className="work-go" aria-hidden>
                    <Arrow size={22} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
