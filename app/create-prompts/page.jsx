"use server"
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";
import { redirect } from 'next/navigation'
import CreatePromptPage from "@/components/CreatePromptPage";

async function CreatePrompts() {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    console.log(token)
    if(!token) redirect('/signin')
    const result = verifyToken(token.value, process.env.SECRET_KEY);
    console.log('result =>>>', result)
    if(!result) redirect('/signin');

  return (
    <CreatePromptPage userEmail={result?.email} />
  )
}

export default CreatePrompts