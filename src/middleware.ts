import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    session &&
    !req.nextUrl.pathname.startsWith("/home") &&
    !req.nextUrl.pathname.startsWith("/history") &&
    !req.nextUrl.pathname.startsWith("/profile")
  ) {
    return Response.redirect(new URL("/home", req.url));
  }

  if (!session && !req.nextUrl.pathname.startsWith("/authentication")) {
    return Response.redirect(new URL("/authentication", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
