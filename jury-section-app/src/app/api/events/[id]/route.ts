import { connectToMongoDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Hubungkan ke MongoDB
    await connectToMongoDB();
    
    // Ambil ID dari `params` (dynamic route)
    const id = params.id;
    console.log(id,'<< cek id dari params')

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