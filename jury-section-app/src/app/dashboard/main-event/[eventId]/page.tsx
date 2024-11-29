"use client";

import { useParams } from "next/navigation";
import React from "react";

const EventDetailPage = () => {
  const { eventId } = useParams(); // Access the dynamic route parameter

  // You can fetch event details based on eventId from an API or static data
  const events = {
    event1: {
      title: "Kejurnas Arung Jeram DKI",
      description: "Kejuaraan arung jeram nasional DKI Jakarta",
      image: "/assets/event1.jpg",
    },
    event2: {
      title: "Porprov DKI",
      description: "Description for Event 2",
      image: "/assets/event2.jpg",
    },
    // Add more events here
  };

  const event = events[eventId];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>
          <p className="text-gray-600 text-lg">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;