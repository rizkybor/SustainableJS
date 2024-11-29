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
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-8">Main Event</h2>
      <p className="text-center mb-8">Silahkan pilih Event</p>

      <div className="relative flex gap-8 overflow-x-scroll scrollbar-hide">
        {events.map((event, index) => (
          <Link key={index} href={event.href} className="hover:no-underline">
            <div
              className="min-w-[400px] bg-white shadow-md rounded-2xl overflow-hidden flex-shrink-0 transform transition-all duration-300 hover:bg-gray-200 cursor-pointer"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl text-gray-700 font-semibold mb-4">
                  {event.title}
                </h3>
                <p className="text-gray-700 text-lg">{event.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CardSlider;