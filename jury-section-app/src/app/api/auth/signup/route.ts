import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";

export async function POST(request: Request) {
  const { username, password, role = "jury", jury_number = "1" } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      jury_number,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(savedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}