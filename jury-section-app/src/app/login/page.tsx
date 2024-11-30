"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Impor dari next/navigation

function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Gunakan useRouter dari next/navigation

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.status != 200) {
        const { message } = await response.json();
        setError(message);
        return;
      }

      const { user } = await response.json();

      // Simpan user ke localStorage
      localStorage.setItem("session", JSON.stringify(user));

      // Redirect ke dashboard
      router.push("/dashboard/profile"); // Redirect menggunakan router
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded">{error}</div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        {/* Username Field */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-gray-900"
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-gray-900"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;