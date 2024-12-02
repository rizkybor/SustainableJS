"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  id: string;
  eventName: string;
  riverName: string;
  image: string;
}

function Main() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Unable to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))] min-h-screen">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-[rgb(var(--foreground-rgb))]">
        Main Event
      </h2>
      <p className="text-center mb-8 text-[rgb(var(--foreground-rgb))]">
        Silahkan pilih Event
      </p>

      {isLoading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Loading events...
        </p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Tidak ada event yang tersedia saat ini.
        </p>
      ) : (
        <div className="relative flex gap-8 overflow-x-auto scrollbar-hide">
          {events.map((event, index) => (
            <Link
              key={index}
              href={`/dashboard/main/${event._id}`} // Menggunakan id sebagai bagian dari URL
              className="hover:no-underline"
              onClick={() => {
                window.history.replaceState({ event }, "");
              }}
            >
              <div className="min-w-[300px] md:min-w-[400px] bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden flex-shrink-0 transform transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                <img
                  src={event.image}
                  alt={event.eventName}
                  className="w-full h-48 md:h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-semibold mb-4">
                    {event.eventName}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-lg">
                    {event.riverName}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;