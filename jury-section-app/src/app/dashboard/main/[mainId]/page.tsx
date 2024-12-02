"use client";

import { useEffect, useState } from "react";

interface Event {
  id: string;
  eventName: string;
  riverName: string;
  image: string;
}

function EventDetail() {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const storedEvent = localStorage.getItem("selectedEvent");
    if (storedEvent) {
      setEvent(JSON.parse(storedEvent));
    }
  }, []);

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{event.eventName}</h1>
      <p>{event.riverName}</p>
      <img src={event.image} alt={event.eventName} />
    </div>
  );
}

export default EventDetail;