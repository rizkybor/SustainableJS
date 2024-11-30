import { connectToMongoDB } from "@/lib/mongodb"; // Fungsi koneksi MongoDB
import User from "@/models/user"; // Model user Anda
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    await connectToMongoDB();

    // Cari user berdasarkan username
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // Login berhasil
    return NextResponse.json({
      status: 200,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
