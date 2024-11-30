import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*"); // Sesuaikan domain Anda di sini
  response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  return response;
}

export const config = {
  matcher: "/api/:path*",
};