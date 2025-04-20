import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db"; // Ensure DB is connected
import User from "@/models/User"; // Import your User model

export async function GET(req: NextRequest) {
  try {
    await connectDB(); // Ensure DB connection
    const token = req.cookies.get("token")?.value; // Get token from cookies

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    // 🔹 Decode Token Here Instead of Using a Separate Function
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("❌ Error in /me route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
