import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        // console.log("Request body", request.body);
        console.log("Login api hit");
        await connectDB();
        const body = await request.json();
        const {email, password} = body;
        if(!email || !password) {
            return NextResponse.json({error: "Missing email or password"}, {status: 400});
        }
        const isUser = await User.findOne({email})
        if(!isUser) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        const isMatch = await bcrypt.compare(password, isUser.password);
        if(!isMatch) {
            return NextResponse.json({error: "Invalid credentials"}, {status: 401});
        }
        const token = jwt.sign({userId: isUser._id}, process.env.JWT_SECRET!, {
            expiresIn: "7d"
        });
        const response = NextResponse.json({
            message: "Login successful!",
            token,  // ✅ Must be included
            user: {
              userId: isUser._id,
              username: isUser.username,
              email: isUser.email,
            },
          });
        await response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({message: "Something Went wrong with the server while login", error: error.message}, {status: 500});
    }
}