export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

/** "/work" → "/ar/work", "#about" → "/ar#about", "" → "/ar" */
export const localize = (locale: Locale, path = "") => `/${locale}${path}`;

/** Swap the locale prefix of a pathname, keeping the rest of the route. */
export const switchLocalePath = (pathname: string, to: Locale) => {
  const parts = pathname.split("/");
  if (isLocale(parts[1] ?? "")) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
};
