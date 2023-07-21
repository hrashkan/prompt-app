import { connectDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export async function GET(req){
try {
    await connectDB();
    const prompts =  await Prompt.find({});

    return new Response(JSON.stringify(prompts), {status: 200})

} catch (error) {
    console.log(error)
    return new Response("failed to get prompts", {status: 500})
}
}