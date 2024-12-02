import { connectToMongoDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId untuk menggunakan MongoDB ID

export async function GET(req: Request) {
  try {
    // Hubungkan ke MongoDB
    await connectToMongoDB();

    // Dapatkan ID dari parameter query
    const { searchParams } = new URL(req.url);
    console.log(searchParams,'<< CEK')
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 } // Bad Request
      );
    }

    // Periksa koneksi
    if (!mongoose.connection.db) {
      throw new Error("MongoDB connection does not have a valid `db` object.");
    }
    console.log('HELOBOR')
    // Query berdasarkan ID
    const event = await mongoose.connection.db
      .collection("eventsCollection")
      .findOne({ _id: new ObjectId(id) });

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 } // Not Found
      );
    }

    // Kembalikan data sebagai respons
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}