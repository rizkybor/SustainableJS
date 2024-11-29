'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation"; // Tambahkan usePathname
import Link from "next/link";

function Navbar() {
  const { data: session, status } = useSession(); // Gunakan useSession untuk mendeteksi sesi secara real-time
  const router = useRouter();
  const pathname = usePathname(); // Ambil path saat ini

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Mencegah redirect otomatis dengan callbackUrl
    router.push("/login"); // Redirect manual ke halaman login
  };

  return (
    <nav className="bg-zinc-900 p-4">
      <div className="flex justify-between container mx-auto">
        {/* Brand/Logo */}
        <Link href="/">
          <h1 className="font-bold text-xl text-white">JSystem</h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-x-4">
          {status === "loading" ? (
            <li className="px-3 py-1 text-gray-400">Loading...</li>
          ) : session ? (
            <>
              {/* Profile Link */}
              <li>
                <Link
                  href="/dashboard/profile"
                  className="text-white hover:text-gray-300"
                >
                  Profile
                </Link>
              </li>
               {/* Main Event */}
               <li>
                <Link
                  href="/dashboard/main-event"
                  className="text-white hover:text-gray-300"
                >
                  Main Event
                </Link>
              </li>
              {/* Logout Button */}
              <li>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            pathname !== "/login" && (
              <>
                {/* Login Link */}
                <li>
                  <Link
                    href="/login"
                    className="text-white hover:text-gray-300"
                  >
                    Login
                  </Link>
                </li>
              </>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;