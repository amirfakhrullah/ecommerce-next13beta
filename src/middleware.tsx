import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const baseUrl = req.nextUrl.origin;
  const path = req.nextUrl.pathname;
  const headers = {
    cookie: req.headers.get("cookie") || "",
  };

  let pass = false;
  if (path.startsWith("/admin")) {
    const adminCheck = await fetch(`${baseUrl}/api/admin-check`, {
      headers,
    });
    pass = adminCheck.status === 200;
  } else {
    const authCheck = await fetch(`${baseUrl}/api/auth-check`, {
      headers,
    });
    pass = authCheck.status === 200;
  }

  if (!pass) {
    return NextResponse.redirect(new URL("/404", req.url), req);
  }
  return;
}

export const config = {
  matcher: [
    "/user/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/admin/:path*",
  ],
};
