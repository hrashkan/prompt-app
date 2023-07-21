import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function GET(req) {
  const cookieStore = cookies();
  const { value } = cookieStore.get("token");

  if (!value)
    return NextResponse.json({
      ok: false,
      status: 421,
      message: "user not logged in",
    });

  const result = verifyToken(value, process.env.SECRET_KEY);
  if (!result)
    return NextResponse.json({
      ok: false,
      status: 421,
      message: "token is not valid",
    });

  return NextResponse.json({ ok: true, status: 200 });
}
