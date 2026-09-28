import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/uploads/")) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/api${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/uploads/:path*"],
};
