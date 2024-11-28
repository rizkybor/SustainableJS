import { connectToMongoDB } from "@/libs/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Hubungkan ke MongoDB
    await connectToMongoDB();
    const directQuery = await mongoose.connection.db.collection('eventsCollection').find({}).toArray();

    const events = directQuery

    // Kirimkan semua data sebagai respons JSON
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
