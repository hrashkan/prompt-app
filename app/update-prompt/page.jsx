"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

function UpdatePrompt() {
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  //get prompts
  useEffect(() => {
    const getPromptsDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPosts({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptsDetails();
  }, []);

  //update prompt
  const updatePromptHandler = async (e) => {
    e.preventDefault();
    if (!promptId) alert("Error: prompt id not found");

    try {
        setSubmitting(true)
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: posts.prompt,
          tag: posts.tag,
        }),
      });

      if(res.ok) {
        router.replace('/profile')
      }
    } catch (error) {
      console.log(error);
    }finally{
        setSubmitting(false)
    }
  };

  return (
    <Form
      type="Edit"
      posts={posts}
      setPosts={setPosts}
      submitting={submitting}
      handleSubmit={updatePromptHandler}
    />
  );
}

export default UpdatePrompt;
