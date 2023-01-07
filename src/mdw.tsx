import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

/**
 * This middleware is currently PUT ON HOLD.
 * Doesn't find a suitable use case for this one yet
 */
export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const baseUrl = req.nextUrl.origin;
  const authCheck = await fetch(`${baseUrl}/api/auth-check`, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (authCheck.status !== 200) {
    return NextResponse.redirect(new URL("/", req.url), req);
  }
  return;
}

export const config = {
  matcher: "/user/:path*",
};
