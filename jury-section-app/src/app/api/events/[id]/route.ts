import { NextResponse } from "next/server";

const mockData = {
  id: "1",
  eventName: "River Race Championship",
  riverName: "Amazon River",
  description: "A thrilling race along the Amazon River.",
  image: "https://example.com/image.jpg",
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = await params.id;
  console.log(id,'<< cek')
  if (id === mockData.id) {
    return NextResponse.json(mockData);
  }
  return NextResponse.json({ message: "Event not found" }, { status: 404 });
}