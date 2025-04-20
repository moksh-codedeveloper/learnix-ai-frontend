import {NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import { connectDB } from '@/lib/db';
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';

export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const token = request.cookies.get("token")?.value;
        if(!token) {
            return NextResponse.json(
                {message: "Unauthorized access"}, {status: 401}
            )
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = (decoded as {id:string}).id;
        const {username, password, email} = await request.json();
        const update:any = {};
        if(username) update.username = username;
        if(email) update.email = email;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(password, salt);
        }
        const user = User.findByIdAndUpdate(userId, update, {
            new: true,
            select: '-passwords'
        });

        return NextResponse.json(
            {message: "Profile updated successfully", user},
            {status: 200}
        )
    } catch (error:any) {
        return NextResponse.json(
            {
                message: "Something went wrong from the server side", 
                error: error.message
            }, {status: 500}
        )
    }
}