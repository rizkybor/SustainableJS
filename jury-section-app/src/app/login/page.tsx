"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const signinResponse = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (signinResponse?.error) {
      setError(signinResponse.error as string);
      return;
    }

    if (signinResponse?.ok) {
      // Simpan data ke localStorage
      const userData = {
        username: username as string,
        role: "jury", // Ubah sesuai data role yang Anda gunakan
        jury_number: "5", // Atau data lain yang relevan
      };
      localStorage.setItem("session", JSON.stringify(userData));

      // Redirect ke halaman profil
      router.push("/dashboard/profile");
    }

    console.log(signinResponse);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))]">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded text-center">
            {error}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center">
          Login Juri
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-200 dark:bg-gray-700"
              required
            />
          </div>

          {/* Password Field */}
          <div>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-200 dark:bg-gray-700"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;