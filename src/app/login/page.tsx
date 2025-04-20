"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader"; // Using the dots loader
// import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import {toast } from "sonner";
export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      toast("Login successful!", {
        description: "You are now logged in.",
        duration: 3000,
        // Optional: Add a loading icon
          action: {
            label: "Success",
            onClick: () => router.push("/dashboard"), // Redirect to dashboard or home
          },
      }); // Redirect to dashboard or home
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <Card className="w-full max-w-md p-6 shadow-lg bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-center text-2xl font-semibold">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all"
              disabled={loading}
            >
              {loading ? <Loader /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
