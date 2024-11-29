"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const events = {
    event1: {
      title: "Kejurnas Arung Jeram DKI",
      description: "Kejuaraan arung jeram nasional DKI Jakarta",
    },
    event2: {
      title: "Porprov DKI",
      description: "Description for Event 2",
    },
  };

  const event = events[eventId];

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))]">
        <h1 className="text-3xl font-bold text-[rgb(var(--foreground-rgb))]">Event Not Found</h1>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an option before submitting.");
      return;
    }
    setIsOpen(true);
  };

  const confirmSubmission = () => {
    setIsOpen(false);
    setSuccessMessage(`Penalties "${selectedOption}" submitted successfully!`);
    setTimeout(() => {
      setSuccessMessage(null);
      router.push(`/dashboard/main-event/${eventId}`);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))] min-h-screen">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(var(--foreground-rgb))] mb-8 text-center">
        {event.title}
      </h1>

      {successMessage && (
        <div className="mb-6 text-center">
          <p className="text-green-600 font-semibold">{successMessage}</p>
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-[rgb(var(--foreground-rgb))]">
          <option value="">Select Option 1</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-[rgb(var(--foreground-rgb))]">
          <option value="">Select Option 2</option>
          <option value="optionA">Option A</option>
          <option value="optionB">Option B</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden p-6">
        <div className="flex flex-col gap-4 mb-8">
          {["Penalties 0", "Penalties 5", "Penalties 50"].map((option, index) => (
            <div
              key={index}
              className={`w-full px-4 py-6 border rounded-lg cursor-pointer transition ${
                selectedOption === option
                  ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
                  : "border-gray-300 bg-white dark:bg-gray-800"
              }`}
              onClick={() => setSelectedOption(option)}
            >
              <p
                className={`font-medium text-lg text-center ${
                  selectedOption === option
                    ? "text-blue-600 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {option}
              </p>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 dark:hover:bg-green-700 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <ConfirmationDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmation"
        description={`Are you sure you want to submit the selected option: "${selectedOption}"?`}
        onConfirm={confirmSubmission}
      />
    </div>
  );
};

export default EventDetailPage;