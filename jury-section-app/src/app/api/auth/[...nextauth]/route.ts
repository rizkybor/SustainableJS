import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        try {
          // Validate incoming credentials
          if (!credentials || !credentials.username || !credentials.password) {
            throw new Error("Both username and password are required");
          }

          // Connect to the database
          await connectDB();

          // Find the user by username
          const userFound = await User.findOne({ username: credentials.username }).select("+password");
          if (!userFound) {
            throw new Error("Invalid username or password");
          }

          // Compare the given password with the hashed password
          const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);
          if (!passwordMatch) {
            throw new Error("Invalid username or password");
          }

          // Return the user object for NextAuth
          return {
            id: userFound._id,
            username: userFound.username,
            role: userFound.role,
            jury_number: userFound.jury_number,
          };
        } catch (error) {
          console.error("Error during authentication:", error.message);
          throw new Error("An error occurred during authentication");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user; // Attach user data to JWT token
      }
      return token;
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as any; // Attach user data to session
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env.local
    maxAge: 30 * 24 * 60 * 60, // JWT token valid for 30 days
  },
  pages: {
    signIn: "/login", // Redirect to custom login page
    error: "/login", // Redirect to login page on error
  },
});

export { handler as GET, handler as POST };