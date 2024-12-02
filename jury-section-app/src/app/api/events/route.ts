import { connectToMongoDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Hubungkan ke MongoDB
    await connectToMongoDB();

    // Periksa koneksi
    if (!mongoose.connection.db) {
      throw new Error("MongoDB connection does not have a valid `db` object.");
    }
    // Query langsung ke koleksi
    const directQuery = await mongoose.connection.db
      .collection("eventsCollection")
      .find({})
      .toArray();

    console.log(directQuery, "<< Direct Collection Query");

    // Kembalikan data sebagai respons
    return NextResponse.json(directQuery);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}