import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  console.log("Middleware invoked for:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};