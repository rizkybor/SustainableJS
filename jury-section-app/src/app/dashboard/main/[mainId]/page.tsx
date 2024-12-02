"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Link from "next/link";

type Event = {
  eventName: string;
  riverName: string;
  levelName: string;
};

const MainDetailPage = () => {
  const { mainId } = useParams(); // Mengambil ID dari URL
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!mainId) {
          throw new Error("Invalid event ID.");
        }

        const response = await fetch(`/api/events/${mainId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details.");
        }

        const data: Event = await response.json();
        setEvent(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [mainId]);

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
      router.push("/dashboard/main");
    }, 2000);
  };

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
        <h1 className="text-3xl font-bold text-gray-800">Event Not Found</h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Link
          href="/dashboard/main"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Main Events
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">{event.eventName}</h1>
      <p className="text-center text-gray-700 mb-4">{event.riverName}</p>
      <p className="text-center text-gray-700 mb-8">{event.levelName}</p>

      {successMessage && (
        <div className="mb-6 text-center">
          <p className="text-green-600 font-semibold">{successMessage}</p>
        </div>
      )}

      <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6">
        <div className="flex flex-col gap-4 mb-8">
          {["Penalties 0", "Penalties 5", "Penalties 50"].map((option, index) => (
            <div
              key={index}
              className={`w-full px-4 py-6 border rounded-lg cursor-pointer transition ${
                selectedOption === option
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedOption(option)}
            >
              <p
                className={`font-medium text-lg text-center ${
                  selectedOption === option ? "text-blue-600" : "text-gray-700"
                }`}
              >
                {option}
              </p>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition"
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

export default MainDetailPage;