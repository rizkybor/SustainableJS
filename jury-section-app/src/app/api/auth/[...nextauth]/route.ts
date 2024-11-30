import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import { connectToMongoDB } from '@/libs/mongodb';
import User from "@/models/user";
import bcrypt from "bcryptjs";

interface AppUser {
  id: string;
  username: string;
  role: string;
  jury_number: string;
  name?: string | null;
}

// Konfigurasi NextAuth
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials): Promise<AppUser | null> {
        try {
          // Validasi input
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
        } catch (error) {
          console.error("Error during authentication:", (error as Error)?.message || error);
          throw new Error("An error occurred during authentication");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      console.log("JWT Callback:", { token, user });
      if (user) {
        token.user = user; // Tambahkan user ke token
      }
      return token;
    },
    session({ session, token }) {
      console.log("Session Callback:", { session, token });

      if (token.user) {
        session.user = token.user as AppUser; // Gunakan tipe AppUser
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET as string, // Pastikan ada di .env.local
    maxAge: 30 * 24 * 60 * 60, // JWT berlaku 30 hari
  },
  pages: {
    signIn: "/login", // Redirect ke halaman login
    error: "/login", // Redirect ke halaman login jika ada error
  },
  debug: process.env.NODE_ENV === "development", // Aktifkan debug mode di lokal
} as NextAuthOptions);

export { handler as GET, handler as POST };