"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface EventDetail {
  id: string;
  eventName: string;
  riverName: string;
  description: string;
  image: string;
}

export default function EventDetailPage() {
  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams(); // Hook to access dynamic route params
  const router = useRouter();

  const id = params.id; // Extract `id` from the dynamic route
  console.log(id, "<< id from params");

  useEffect(() => {
    if (!id) {
      setError("Invalid event ID. Please provide a valid event ID.");
      setIsLoading(false);
      return;
    }

    const fetchEventDetail = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
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

    fetchEventDetail();
  }, [id]);

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
      <h1 className="text-3xl font-bold mb-4">{eventDetail.eventName}</h1>
      <p className="text-lg text-gray-600 mb-4">{eventDetail.riverName}</p>
      <img
        src={eventDetail.image}
        alt={eventDetail.eventName}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-700">{eventDetail.description}</p>
    </div>
  );
}