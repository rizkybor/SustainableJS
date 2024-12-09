import { connectToMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request, context: any) {
  try {
    const {params} = await context;
    const id = params.id;

    await connectToMongoDB();

    if (!mongoose.connection.db) {
      return NextResponse.json({ error: "DB not connected" }, { status: 404 });
    }

    const event = await mongoose.connection.db
      .collection("eventsCollection")
      .findOne({ id: id });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
