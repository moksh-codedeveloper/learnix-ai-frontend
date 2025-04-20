"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader"; // Placeholder for the upcoming loader component
// import axios from "axios";
import { useAuthStore } from "@/store/authStore";
export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {signup, loading} = useAuthStore();
  const [loadings, setLoadings] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadings(true);

    try {
      await signup(formData)
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoadings(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <Card className="w-full max-w-md p-6 shadow-lg bg-gray-900 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-center text-2xl font-semibold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
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
              {loadings ? <Loader /> : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
// This code represents a signup page for a web application built with Next.js and React.