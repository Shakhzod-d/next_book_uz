import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = false; // Replace with real auth check

  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/profile/:path*"],
};
