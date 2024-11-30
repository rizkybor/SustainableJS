"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

function ProfilePage() {
  const [user, setUser] = useState<{
    id: string;
    username: string;
    role: string;
    jury_number: string;
  } | null>(null);
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Ambil data sesi dari localStorage
    const sessionData = localStorage.getItem("session");
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      setUser(parsedData);
    } else {
      // Redirect ke login jika session tidak ada
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    // Hapus session dari localStorage
    localStorage.removeItem("session");
    setUser(null);
    setIsAuthenticated(false); // Update context
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))]">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-md w-full p-6">
        {/* Card Header */}
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-black dark:border-white">
            <img
              src="/assets/avatar-profile.jpg"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Username */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-4">
            {user?.username || "Guest User"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 capitalize">
            {user?.role || "N/A"}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
          <Link
            href="/dashboard/main-event"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition text-center"
          >
            Main Event
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;