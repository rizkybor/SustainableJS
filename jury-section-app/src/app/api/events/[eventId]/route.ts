import { connectToMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request, context: any) {
  try {
    const { params } = context;
    const id = params.eventId;

    // Hubungkan ke MongoDB
    await connectToMongoDB();

    if (!mongoose.connection.db) {
      throw new Error("MongoDB connection does not have a valid `db` object.");
    }

    // // Query data berdasarkan ID
    const event = await mongoose.connection.db
      .collection("eventsCollection")
      .findOne({ id: id });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // // Kembalikan data sebagai JSON
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 } // Internal Server Error
    );
  }
}
