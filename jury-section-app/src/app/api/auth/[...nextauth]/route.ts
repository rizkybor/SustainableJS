import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongoDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("Both username and password are required");
        }

        // Koneksi ke database
        await connectToMongoDB();

        // Cari user berdasarkan username
        const userFound = await User.findOne({ username: credentials.username }).select("+password");
        if (!userFound) {
          throw new Error("Invalid username or password");
        }

        // Cocokkan password
        const passwordMatch = await bcrypt.compare(credentials.password, userFound.password);
        if (!passwordMatch) {
          throw new Error("Invalid username or password");
        }

        // Kembalikan objek user
        return {
          id: userFound._id.toString(),
          username: userFound.username,
          role: userFound.role,
          jury_number: userFound.jury_number,
        };
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
        session.user = token.user;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});

export { handler as GET, handler as POST };