import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(req) {
  const serialized = serialize("token", "", {
    maxAge: 0,
    path: "/",
  });

  const response = {
    ok: true,
    message: "log out",
  };
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": `${serialized}` },
  });
}
