import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const prompts = await Prompt.find({ creator: params.email });

    return new Response(JSON.stringify(prompts), { status: 200 });

    
  } catch (error) {
    console.log(`error`);
    return new Response("failed to get posts", { status: 500 });
  }
}
