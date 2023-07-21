"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "./Form";

function CreatePromptPage({userEmail}) {
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();

  const createPromptHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("/api/prompt/new", {
                method: 'POST',
                body: JSON.stringify({
                    prompt: posts.prompt,
                    tag: posts.tag,
                    userEmail:userEmail
                })
            })

            if(res.ok){
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally{
            setSubmitting(false)
        }
  };

  return (
    <Form
      type="Create"
      posts={posts}
      setPosts={setPosts}
      submitting={submitting}
      handleSubmit={createPromptHandler}
    />
  );
}

export default CreatePromptPage;
