import { notFound } from "next/navigation";
import EventActions from "@/components/EventActions";

// Tipe Event
type Event = {
  eventName: string;
  riverName: string;
  levelName: string;
};

async function fetchEvent(mainId: string): Promise<Event | null> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/events/${mainId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default async function MainDetailPage({ params }: { params: { mainId: string } }) {
  const event = await fetchEvent(params.mainId);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">{event.eventName}</h1>
      <p className="text-center text-gray-700 mb-4">{event.riverName}</p>
      <p className="text-center text-gray-700 mb-8">{event.levelName}</p>

      {/* Panggil Client Component */}
      <EventActions eventName={event.eventName} />
    </div>
  );
}