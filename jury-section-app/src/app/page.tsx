'use client';

import React, { useEffect, useState } from 'react';

type Event = {
  eventName: string;
  levelName?: string;
  riverName?: string;
};

function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Unable to load events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/background-image.jpg')`,
        backgroundAttachment: 'fixed', // Tambahkan jika ingin latar belakang tetap
      }}
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 bg-opacity-90 shadow-lg rounded-lg p-8 text-center">
        {/* Jumbotron Content */}
        <h3 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          © Jendela Kode
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-6">
          Jury System with Sustainable Timing System
        </p>

        {/* Daftar Events */}
        <div className="text-left">
          <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Upcoming Events
          </h4>
          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading events...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : events.length > 0 ? (
            <ul className="list-disc pl-6">
              {events.map((event, index) => (
                <li
                  key={index}
                  className="text-gray-800 dark:text-gray-100 text-lg mb-2 hover:underline"
                >
                  {event.eventName}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No events found</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
            Get Started
          </button>
          <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;