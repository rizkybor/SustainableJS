import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";

export async function POST(request: Request) {
  const { username, password, role = "jury", jury_number = "1" } = await request.json();

  // Validasi input
  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  try {
    // Koneksi ke database
    await connectDB();

    // Periksa apakah username sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Buat user baru
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      jury_number,
    });

    // Simpan user ke database
    const savedUser = await newUser.save();

    // Kembalikan respon sukses tanpa mengirimkan password
    const responseUser = {
      _id: savedUser._id,
      username: savedUser.username,
      role: savedUser.role,
      jury_number: savedUser.jury_number,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };

    return NextResponse.json(responseUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}