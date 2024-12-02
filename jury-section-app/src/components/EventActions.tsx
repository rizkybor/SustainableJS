"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  eventName: string;
};

export default function EventActions({ eventName }: Props) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an option before submitting.");
      return;
    }
    setIsOpen(true);
  };

  const confirmSubmission = () => {
    setIsOpen(false);
    alert(`Penalties "${selectedOption}" submitted successfully for ${eventName}!`);
    router.push("/dashboard/main");
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden p-6">
      <div className="flex flex-col gap-4 mb-8">
        {["Penalties 0", "Penalties 5", "Penalties 50"].map((option, index) => (
          <div
            key={index}
            className={`w-full px-4 py-6 border rounded-lg cursor-pointer transition ${
              selectedOption === option ? "border-blue-500 bg-blue-100" : "border-gray-300"
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

      {isOpen && (
        <div className="mt-4 p-4 bg-blue-100 border border-blue-400 rounded">
          <p>Are you sure you want to submit?</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2" onClick={confirmSubmission}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}