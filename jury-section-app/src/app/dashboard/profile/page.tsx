"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

function ProfilePage() {
  const { data: session, status } = useSession();

  const user = session?.user || {}; // Data user dari sesi

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        {/* Card Header */}
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-2 border-black">
            <img
              src="/assets/avatar-profile.jpg" // Ganti dengan path avatar default Anda
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Username */}
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {user.username || "Guest User"}
          </h1>
          <p className="text-gray-500 mt-1 capitalize">{user.role || "N/A"}</p>
        </div>

        {/* Card Content */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Jury Number:</span>
            <span className="text-gray-800">{user.jury_number || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Status:</span>
            <span className="text-gray-800 capitalize">{status}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Session Expires:</span>
            <span className="text-gray-800">
              {session?.expires
                ? new Date(session.expires).toLocaleString()
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            onClick={() => signOut()}
          >
            Logout
          </button>
          <Link
            href="/main-event"
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
