"use client";

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const role = "jury"; // Set role to "jury" by default
    const jury_number = formData.get("jury_number") || "1";

    try {
      const signupResponse = await axios.post("/api/auth/signup", {
        username,
        password,
        role,
        jury_number,
      });

      if (signupResponse.status == 200) {
        return router.push("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message ||
            "Something went wrong during registration."
        );
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded">{error}</div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Signup
        </h1>

        {/* Username Field */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            required
          />
        </div>

        {/* Hidden Role Field */}
        <input type="hidden" id="role" name="role" value="jury" />

        {/* Jury Number Field */}
        <div className="space-y-2">
          <label
            htmlFor="jury_number"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Jury Number
          </label>
          <input
            type="text"
            id="jury_number"
            name="jury_number"
            placeholder="Enter jury number"
            className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
