import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
// fonts are self-hosted (no network needed at build time)
import "@fontsource-variable/fraunces/soft.css";
import "@fontsource-variable/fraunces/soft-italic.css";
import "@fontsource-variable/manrope/index.css";
// Arabic fonts — only downloaded by the browser when Arabic text is on the page
import "@fontsource-variable/readex-pro/index.css";
import "@fontsource/aref-ruqaa/arabic-400.css";
import "@fontsource/aref-ruqaa/arabic-700.css";
import "../globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";
import Intro from "@/components/Intro";
import { SKIP_INTRO_KEY } from "@/lib/intro";
import { ui } from "@/data/ui";
import { dirOf, isLocale, locales } from "@/lib/i18n";

const skipIntroScript = `try{if(sessionStorage.getItem("${SKIP_INTRO_KEY}"))document.documentElement.classList.add("no-intro")}catch(e){}`;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = ui[locale].meta;
  return {
    title: t.title,
    description: t.description,
    keywords: ["Shahed Al Rina", "شهد الرينا", "Web Developer", "Laravel", "PHP", "Aleppo", "Portfolio"],
    openGraph: {
      title: t.title,
      description: t.ogDescription,
      type: "website",
      locale: locale === "ar" ? "ar_SY" : "en_US",
    },
    alternates: { languages: { en: "/en", ar: "/ar" } },
    icons: { icon: "/favicon.svg" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#120a14" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={dirOf(locale)} suppressHydrationWarning>
      <head>
        {/* hide the welcome screen before first paint when the visitor just switched language */}
        <script dangerouslySetInnerHTML={{ __html: skipIntroScript }} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <LocaleProvider locale={locale}>
            <div className="aurora" aria-hidden />
            <div className="grain" aria-hidden />
            <Intro>{children}</Intro>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
