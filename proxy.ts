import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

// Language for a URL without a locale prefix: the visitor's last choice, then their browser language.
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get("NEXT_LOCALE")?.value;
  if (saved && isLocale(saved)) return saved;

  const accepted = (req.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = accepted.find((a) => isLocale(a.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const prefix = pathname.split("/")[1] ?? "";
  if (isLocale(prefix)) {
    // not-found.tsx gets no params, so tell it the language this way
    const headers = new Headers(req.headers);
    headers.set("x-locale", prefix);
    return NextResponse.next({ request: { headers } });
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // skip Next internals and files like /favicon.svg
  matcher: ["/((?!_next|.*\\..*).*)"],
};
