import { connectDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { verifyPassword } from "@/utils/auth";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { error: "failed connect to database" },
      { status: 500 }
    );
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({
      ok: false,
      status: 421,
      message: "Email and password must be filled",
    });
  }

  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    return NextResponse.json({
      ok: false,
      status: 421,
      message: "email have incorrect format",
    });

  const user = await User.findOne({ email: email });

  if (!user) {
    return NextResponse.json({
      ok: false,
      status: 404,
      message: "user dosnt exist",
    });
  }

  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({
      ok: false,
      status: 421,
      message: "password is incorrect",
    });
  }

  const token = sign({ email }, process.env.SECRET_KEY, {
    expiresIn: process.env.COOKIE_EXPIRATION,
  });

  const serialized = serialize("token", token, {
    httpOnly: true,
    maxAge: process.env.COOKIE_EXPIRATION,
    path: "/",
  });


  const response = {
    ok: true,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": `${serialized}` },
  });
}
