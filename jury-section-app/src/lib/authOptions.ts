import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToMongoDB } from "./mongodb";
import User from "@/models/user";
import { AuthOptions, SessionStrategy } from "next-auth";

interface AppUser {
  id: string;
  username: string;
  role: string;
  jury_number: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required.");
        }

        // Connect to MongoDB
        await connectToMongoDB();

        // Find user in the database
        const user = await User.findOne({ username: credentials.username }).select("+password");
        if (!user) {
          throw new Error("Invalid username or password.");
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid username or password.");
        }

        // Return user data
        return {
          id: user._id.toString(),
          username: user.username,
          role: user.role,
          jury_number: user.jury_number,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...(session.user || {}),
          id: (token.user as AppUser).id,
          username: (token.user as AppUser).username,
          role: (token.user as AppUser).role,
          jury_number: (token.user as AppUser).jury_number,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          username: user.username,
          role: user.role,
          jury_number: user.jury_number,
        };
      }
      return token;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET || "default_secret",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy, // Explicitly cast to SessionStrategy
  },
};