import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
export async function POST(request : NextRequest){
    try {
        await connectDB();
        const {username, email, password} = await request.json();
        const isUser = await User.findOne({username, email});
        if(isUser){
            return NextResponse.json(
                {message: "User already exists"},
                {status: 400}
            )
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save();
        return NextResponse.json(
            {message: "User created successfully", data: user},
            {status: 201}
        )
    } catch (error:any) {
        return NextResponse.json(
            {message: "Something went wrong", error: error.message},
            {status: 500}
        )
    }
}