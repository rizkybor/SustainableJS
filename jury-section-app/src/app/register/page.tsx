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
    const role = formData.get("role") || "jury";
    const jury_number = formData.get("jury_number") || "1";

    try {
      const signupResponse = await axios.post("/api/auth/signup", {
        username,
        password,
        role,
        jury_number,
      });

      console.log("Signup response:", signupResponse.data);

      const signinResponse = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (signinResponse?.ok) {
        return router.push("/dashboard/profile");
      }

      console.log("Signin response:", signinResponse);
    } catch (error) {
      console.error("Error during signup:", error);
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded">
            {error}
          </div>
        )}

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Signup
        </h1>

        {/* Username Field */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
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

        {/* Role Field */}
        <div className="space-y-2">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-gray-900"
          >
            <option value="jury">Jury</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Jury Number Field */}
        <div className="space-y-2">
          <label
            htmlFor="jury_number"
            className="block text-sm font-medium text-gray-700"
          >
            Jury Number
          </label>
          <input
            type="text"
            id="jury_number"
            name="jury_number"
            placeholder="Enter jury number"
            className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-gray-900"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
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
          Signup
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;