"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {ModeToggle} from "@/components/DarkMode";
export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 dark:bg-gray-900">
      <h1 className="text-white text-2xl font-bold">Learnix</h1>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/profile" className="text-white hover:underline">Profile</Link>
        <Link href="/settings" className="text-white hover:underline">Settings</Link>
        <Link href="/chat" className="text-white hover:underline">Chat</Link>
      </nav>

      {/* Right Section: Dark Mode Toggle + Profile Icon */}
      <div className="flex items-center space-x-4">
        <ModeToggle /> {/* ✅ Added Dark Mode Toggle Here */}

        {/* Profile Icon with Dropdown */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
            <Image 
              src="/images/profile-images.svg"
              alt="Profile"
              width={50} 
              height={50}
              className="rounded-full"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg">
              <Link href="/profile" className="block px-4 py-2 text-white hover:bg-gray-700">Profile</Link>
              <Link href="/settings" className="block px-4 py-2 text-white hover:bg-gray-700">Settings</Link>
              <Link href="/chat" className="block px-4 py-2 text-white hover:bg-gray-700">Chat</Link>
              <button 
                onClick={handleLogout} 
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
