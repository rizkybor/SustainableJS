import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToMongoDB } from '@/lib/mongodb';
import User from "@/models/user";

export async function POST(request: Request) {
  try {
    const { username, password, role = "jury", jury_number = "1" } = await request.json();

    // Validasi input
    if (!username || !password || username.length < 5 || password.length < 6) {
      return NextResponse.json(
        { message: "Invalid input. Check username and password length." },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    // Periksa apakah username sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: "Username already exists." }, { status: 400 });
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

    console.log(newUser)

    // Simpan ke database
    const savedUser = await newUser.save();
    return NextResponse.json({
      status: 200,
      message: "User created successfully.",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
        jury_number: savedUser.jury_number,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
        console.error("Error while registering user:", error.message);
        console.error("Stack trace:", error.stack);
        if ("errors" in error) {
          console.error("Validation Errors:", error.errors);
        }
      } else {
        console.error("Unknown error:", error);
      }
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}