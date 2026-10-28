import Link from "next/link";
import { headers } from "next/headers";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { Title } from "@/components/LocaleProvider";
import { Footer } from "@/components/Sections";
import { Cursor } from "@/components/Effects";
import { Arrow, Flower, Petal } from "@/components/Icons";
import { ui } from "@/data/ui";
import { defaultLocale, isLocale, localize } from "@/lib/i18n";

// Note: only use client components that other pages also use. A client component that
// appears only here is left out of the build, the 404 fails to render, and Next shows
// its default page instead. For the same reason this file stays a server component.

// falling petals: [inline-start %, delay s, duration s, size px]
const petals = [
  [8, 0, 11, 18],
  [22, 3.5, 13, 12],
  [37, 1.2, 10, 16],
  [55, 5, 12, 11],
  [68, 2.2, 14, 20],
  [82, 0.6, 11, 13],
  [93, 4.2, 12, 15],
] as const;

export default async function NotFound() {
  // not-found.tsx gets no params; proxy.ts passes the language in this header
  const fromProxy = (await headers()).get("x-locale") ?? "";
  const locale = isLocale(fromProxy) ? fromProxy : defaultLocale;
  const n = ui[locale].notFound;

  return (
    <>
      <title>{n.metaTitle}</title>
      <Cursor />
      <Nav />
      <main>
        <section className="section nf">
          <div className="nf-petals" aria-hidden>
            {petals.map(([x, delay, dur, size], i) => (
              <span
                key={i}
                style={{ insetInlineStart: `${x}%`, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
              >
                <Petal />
              </span>
            ))}
          </div>

          <div className="container nf-inner">
            <Reveal>
              <div className="nf-code" aria-hidden>
                <span>4</span>
                <span className="nf-flower">
                  <Flower size={200} />
                </span>
                <span>4</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow">{n.eyebrow}</span>
              <h1 className="h2">
                <Title parts={n.title} />
              </h1>
              <p className="lead nf-lead">{n.lead}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="nf-actions">
                <Link href={localize(locale)} className="btn btn-primary" data-cursor="hover">
                  {n.home}
                </Link>
                <Link href={localize(locale, "/work")} className="btn btn-ghost" data-cursor="hover">
                  {n.work} <Arrow />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
