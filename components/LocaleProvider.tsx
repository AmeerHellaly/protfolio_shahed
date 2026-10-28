"use client";

import { createContext, useContext } from "react";
import { getContent } from "@/data/content";
import { ui } from "@/data/ui";
import { localize, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Current locale plus its content (c), UI strings (t) and a link helper. */
export function useLocale() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    c: getContent(locale),
    t: ui[locale],
    href: (path = "") => localize(locale, path),
  };
}

/** Renders a [before, highlight, after] title with the highlight in <em>. */
export function Title({ parts }: { parts: [string, string, string?] }) {
  return (
    <>
      {parts[0]}
      <em>{parts[1]}</em>
      {parts[2]}
    </>
  );
}
