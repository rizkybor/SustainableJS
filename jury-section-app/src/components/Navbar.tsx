'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const isActive = (path: string) => {
    if (path === "/dashboard/main-event") {
      return pathname.startsWith(path);
    }
    return pathname === path;
  };

  if (status === "loading") {
    return (
      <nav className="bg-zinc-900 dark:bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto text-center text-gray-500">
          Loading...
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-zinc-900 dark:bg-gray-800 p-4 shadow-lg">
      <div className="flex justify-between items-center container mx-auto">
        <Link href="/">
          <h1 className="font-bold text-xl text-white dark:text-gray-200 cursor-pointer">
            JSystem
          </h1>
        </Link>

        <ul className="flex items-center gap-x-4">
          {session ? (
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
                  href="/dashboard/main-event"
                  className={`text-white dark:text-gray-200 hover:text-gray-300 dark:hover:text-gray-400 transition ${
                    isActive("/dashboard/main-event") ? "border-b-2 border-blue-500" : ""
                  }`}
                >
                  Main Event
                </Link>
              </li>
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