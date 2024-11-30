import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongoDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

interface AppUser {
  id: string;
  username: string;
  role: string;
  jury_number: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.username || !credentials.password) {
            throw new Error("Both username and password are required");
          }

          // Connect to MongoDB
          await connectToMongoDB();

          // Find user in database
          const userFound = await User.findOne({ username: credentials.username }).select("+password");
          if (!userFound) {
            throw new Error("Invalid username or password");
          }

          // Verify password
          const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);
          if (!passwordMatch) {
            throw new Error("Invalid username or password");
          }

          // Return user object
          return {
            id: userFound._id.toString(),
            username: userFound.username,
            role: userFound.role,
            jury_number: userFound.jury_number,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as AppUser;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
    maxAge: 30 * 24 * 60 * 60, // JWT validity
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };