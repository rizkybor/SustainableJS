"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface EventDetail {
  id: string;
  eventName: string;
  riverName: string;
  description: string;
  image: string;
}

function EventDetailPage() {
  const searchParams = useSearchParams(); // Mengambil query parameters
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const eventId = searchParams.get("id"); // Ambil ID dari parameter
  const eventName = searchParams.get("eventName"); // Ambil nama event
  const riverName = searchParams.get("riverName"); // Ambil nama sungai

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch event details: ${response.statusText}`);
        }
        const data: EventDetail = await response.json();
        setEventDetail(data);
      } catch (err) {
        console.error("Error fetching event detail:", err);
        setError("Unable to load event details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetail(); // Fetch data berdasarkan ID
    }
  }, [eventId]);

  if (isLoading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!eventDetail) {
    return <p>Event not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{eventName || eventDetail.eventName}</h1>
      <p className="text-lg text-gray-600 mb-4">{riverName || eventDetail.riverName}</p>
      <img
        src={eventDetail.image}
        alt={eventDetail.eventName}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-700">{eventDetail.description}</p>
    </div>
  );
}

export default EventDetailPage;