import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "bg"] as const;
const DEFAULT_LOCALE = "en";
const LOCALE_COOKIE = "chargeme-lang";

function detectLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && (LOCALES as readonly string[]).includes(cookie)) {
    return cookie;
  }

  const accept = request.headers.get("accept-language") ?? "";
  if (/\bbg\b/i.test(accept)) {
    return "bg";
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  // "/ia" was the old landing page URL — fold it into the locale root so
  // existing links keep working.
  const rest = pathname === "/ia" ? "" : pathname === "/" ? "" : pathname;
  url.pathname = `/${locale}${rest}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Everything except Next internals, API routes, and static files.
    "/((?!api|_next|.*\\..*).*)",
  ],
};
