import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Halaman login
    error: "/login", // Halaman error
  },
});

export const config = {
  matcher: ["/api/auth/:path*", "/dashboard/:path*"],
};