'use client';

import React, { useEffect, useState } from 'react';

function HomePage() {
  const [events, setEvents] = useState([]); // State untuk menyimpan daftar event

  // Ambil data dari API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events'); // Memanggil API di /api/events
        const data = await response.json();
        console.log(data);
        setEvents(data); // Simpan hasil ke state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/background-image.jpg')`,
      }}
    >
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 shadow-lg rounded-lg p-8 text-center">
        {/* Jumbotron Content */}
        <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          © Jendela Kode
        </h3>
        <p className="text-gray-600 text-lg md:text-xl mb-6">
          Jury System with Sustainable Timing System
        </p>

        {/* Daftar Events */}
        <div className="text-left">
          <h4 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Events</h4>
          <ul className="list-disc pl-6">
            {events.length > 0 ? (
              events.map((event, index) => (
                <li key={index} className="text-gray-800 text-lg mb-2">
                  {event.eventName}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No events found</p>
            )}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
            Get Started
          </button>
          <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;