import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

//GET
export async function GET(req, { params }) {
  try {
    await connectDB();
    console.log(`params =>>`, params.id)
    const prompt = await Prompt.findById(params.id);
    console.log('prompt =>>', prompt)
    if (!prompt) return new Response("post not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
    console.log(error);
    return new Response("failed to get posts", { status: 500 });
  }
}

//PATCH
export async function PATCH(req, { params }) {
  const { prompt, tag } = await req.json();

  try {
    await connectDB();

    const existPrompt = await Prompt.findById(params.id);

    if (!existPrompt) return new Response("prompt not exist", { status: 404 });

    existPrompt.prompt = prompt;
    existPrompt.tag = tag;

    await existPrompt.save();

    return new Response(JSON.stringify(existPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("failed to Update posts", { status: 500 });
  }
}

//DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    await Prompt.findByIdAndRemove(params.id);
    return new Response("prompt delete successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to Delete posts", { status: 500 });
  }
}
