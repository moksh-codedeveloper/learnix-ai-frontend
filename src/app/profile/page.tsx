"use client";

// import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export default function ProfilePage() {
    const { user, fetchUser } = useUserStore();

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user, fetchUser]);

    return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl text-black font-bold mb-4">
            {user ? `Hello, ${user.username}! 👋` : "Loading..."}
        </h2>
    </div>
    )
}
