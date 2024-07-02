import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { match } from "path-to-regexp";

import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  redirects,
} from "@/utils/constants";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = cookies().get("menu@session")?.value ?? null;
  const isLoggedIn = !!session;
  const res = NextResponse.next();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.some((route) => {
    const matchRoute = match(route, { decode: decodeURIComponent });
    return !!matchRoute(nextUrl.pathname);
  });

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(redirects.dashboard, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  const qrocde = nextUrl.searchParams.get("qrcode");
  if (qrocde) {
    res.cookies.set("menu@qrcode", qrocde);
    return NextResponse.redirect(new URL(nextUrl.pathname, nextUrl), {
      status: 303,
      headers: {
        "Set-Cookie": res.cookies.toString(),
      },
    });
  }

  return NextResponse.next();
}
