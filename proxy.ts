import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = /^\/es(?:\/|$)/.test(pathname)
    ? "es"
    : /^\/en(?:\/|$)/.test(pathname)
      ? "en"
      : "pt-BR";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-portfolio-locale", locale);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/", "/en/:path*", "/es/:path*", "/shiptrack/:path*"],
};
