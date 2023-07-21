import { connectDB } from "@/utils/database";
import { NextResponse } from "next/server";
import Prompt from "@/models/prompt";

export async function POST(req, res) {

  const { userEmail, prompt, tag } = await req.json();

  try {
    await connectDB();

    const newPrompt = new Prompt({
      creator: userEmail,
      tag,
      prompt,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {status: 201})


  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      status: 500,
      message: "failed create new prompt",
    });
  }
}
