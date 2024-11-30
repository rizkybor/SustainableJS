import NextAuth from "next-auth";

// Extend the default session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string;
      jury_number: string;
      // Keep the default fields
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    username: string;
    role: string;
    jury_number: string;
  }
}