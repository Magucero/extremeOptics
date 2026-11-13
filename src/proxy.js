import { NextResponse } from "next/server";

// Protected routes: every page under /dashboard requires an active session.
export function proxy(request) {
  if (!request.cookies.get("access_token")?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
