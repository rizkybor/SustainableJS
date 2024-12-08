"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/authContext";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const session = localStorage.getItem("session");
    setIsAuthenticated(!!session);
  }, [pathname, setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("session");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  return (
    <nav className="bg-zinc-900 dark:bg-gray-800 p-4 shadow-lg">
      <div className="flex justify-between items-center container mx-auto">
        <Link href="/">
          <h1 className="font-bold text-xl text-white dark:text-gray-200 cursor-pointer">
            JSystem
          </h1>
        </Link>
        <ul className="flex items-center gap-x-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  href="/dashboard/profile"
                  className={`text-white dark:text-gray-200 hover:text-gray-300 dark:hover:text-gray-400 transition ${
                    isActive("/dashboard/profile") ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/events"
                  className={`text-white dark:text-gray-200 hover:text-gray-300 dark:hover:text-gray-400 transition ${
                    isActive("/dashboard/events") ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  Main Event
                </Link>
              </li>
              <li>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            pathname === "/" && (
              <li>
                <Link
                  href="/login"
                  className={`text-white dark:text-gray-200 hover:text-gray-300 dark:hover:text-gray-400 transition ${
                    isActive("/login") ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  Login
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;