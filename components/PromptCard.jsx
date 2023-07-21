"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  const [copied, setCopied] = useState("");

  const pathName = usePathname();

  const copyHandler = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">{post.creator}</h3>
          </div>
        </div>
        <div className="copy_btn" onClick={copyHandler}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy btn"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 text-sm text-gray-700">{post.prompt}</p>
      <p
        className="text-sm blue_gradient cursor-pointer"
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}
      >
        #{post.tag}
      </p>
      {
        (pathName === "/profile" ? (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        ) : null)
      }
    </div>
  );
}

export default PromptCard;
