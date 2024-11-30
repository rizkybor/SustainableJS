"use client";

import React from "react";
import Link from "next/link";

function CardSlider() {
  const events = [
    {
      title: "Kejurnas Arung Jeram DKI",
      description: "Kejuaraan arung jeram nasional DKI Jakarta",
      image: "/assets/event1.jpg",
      href: "/dashboard/main-event/event1",
    },
    {
      title: "Porprov DKI",
      description: "Description for Event 2",
      image: "/assets/event2.jpg",
      href: "/dashboard/main-event/event2",
    },
    {
      title: "Kejurda Sumatera Selatan",
      description: "Description for Event 3",
      image: "/assets/event3.jpg",
      href: "/dashboard/main-event/event3",
    },
    {
      title: "PON XXX MALUKU",
      description: "Description for Event 4",
      image: "/assets/event4.jpg",
      href: "/dashboard/main-event/event4",
    },
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))] min-h-screen">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-[rgb(var(--foreground-rgb))]">
      Main Event
    </h2>
    <p className="text-center mb-8 text-[rgb(var(--foreground-rgb))]">
      Silahkan pilih Event
    </p>
  
    <div className="relative flex gap-8 overflow-x-auto scrollbar-hide">
      {events.length > 0 ? (
        events.map((event, index) => (
          <Link
            key={index}
            href={event.href}
            className="hover:no-underline"
          >
            <div className="min-w-[300px] md:min-w-[400px] bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden flex-shrink-0 transform transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-semibold mb-4">
                  {event.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-lg">
                  {event.description}
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No events available
        </p>
      )}
    </div>
  </div>
  );
}

export default CardSlider;