import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { match } from "path-to-regexp";

import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  redirects,
} from "@/lib/constants";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = cookies().get("session")?.value ?? null;

  const isLoggedIn = !!session;

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
      return Response.redirect(new URL(redirects.afterSignIn, nextUrl));
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
