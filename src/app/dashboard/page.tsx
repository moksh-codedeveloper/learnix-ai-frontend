"use client";

import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Headers";
import { toast } from "sonner";
export default function Dashboard() {
  const { user, fetchUser } = useUserStore();
  const { logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) fetchUser();
  }, [user, fetchUser]);

  const handleLogout = async () => {
    await logout();
    toast("Logged out successfully", {
      icon: "🚪",
      style: {
        backgroundColor: "#1f2937",
        color: "#fff",
      },
      duration: 3000,
    })
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 p-5 bg-gray-800 flex flex-col">
        <nav className="mt-5">
          <ul>
            <li>
              <button className="text-white hover:text-gray-300">🏠 Dashboard</button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 mt-2">💬 Chat</button>
            </li>
            <li>
              <button className="text-white hover:text-gray-300 mt-2">⚙ Settings</button>
            </li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="mt-auto py-2 px-4 bg-red-600 hover:bg-red-700 rounded">
          🚪 Logout
        </button>
      </aside>

      {/* Main Content Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header /> 

        {/* Main Dashboard Content */}
        <main className="flex-1 p-10">
          <h1 className="text-3xl font-bold">Welcome, {user?.username || "User"}!</h1>
          <div className="mt-5 flex gap-4">
            <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded">🚀 Start Chat</button>
            <button className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded">⚙ Profile Settings</button>
          </div>
        </main>
      </div>
    </div>
  );
}
