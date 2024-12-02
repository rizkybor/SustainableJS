"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Link from "next/link";

const MainDetailPage = () => {
  const { mainId } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${mainId}`);
        console.log(response,'<< cek response')
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (mainId) {
      fetchEvent();
    }
  }, [mainId]);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))]">
        <h1 className="text-3xl font-bold text-[rgb(var(--foreground-rgb))]">
          Event Not Found
        </h1>
        <Link
          href="/dashboard/main"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Back to Main Events
        </Link>
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
      router.push("/dashboard/main");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))] min-h-screen">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[rgb(var(--foreground-rgb))] mb-8 text-center">
        {event.eventName}
      </h1>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
        {event.riverName}
      </p>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
        {event.levelName}
      </p>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 text-center">
          <p className="text-green-600 dark:text-green-400 font-semibold">
            {successMessage}
          </p>
        </div>
      )}

      {/* Selectable Options */}
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

        {/* Submit Button */}
        <button
          className="w-full bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 dark:hover:bg-green-700 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Confirmation Modal */}
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