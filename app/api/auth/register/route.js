import { NextResponse } from "next/server";
import { connectDB } from "@/utils/database";
import User from "@/models/user";
import { hashPassword } from "@/utils/auth";

export async function POST(req, res){
    
    try {
        await connectDB();
    } catch (error) {
        return NextResponse.json({ error: 'failed connect to database' }, { status: 500 });
    }

    const {email, password} = await req.json();

    if(!email || !password){
        return NextResponse.json({ok:false, status:421, message:'invalid data'});
    }

    const isUserExist = await User.findOne({email: email});

    if(isUserExist){
        return NextResponse.json({ok:false, status:401, message:'user already exist'});
    }

    const hashedPassword = await hashPassword(password);

    try {
        await User.create({email:email, password:hashedPassword});
        return NextResponse.json({ ok: true }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'failed to register new user' }, { status: 500 });
    }

}