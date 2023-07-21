"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfile from "./UserProfile";

function ProfilePage({ userEmail }) {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${userEmail}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleEdit = (post) => router.push(`/update-prompt?id=${post._id}`);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('are you sure want to delete ths prompt?')
    console.log(post)
    if(hasConfirmed){
        try {
            await fetch(`/api/prompt/${post._id.toString()}`,{
                method: 'DELETE'
            })
            const filteredPosts = posts.filter(item => post._id !== item._id);
            setPosts(filteredPosts)
        } catch (error) {
            console.log(error)
        }
    }

  };

  return (
    <UserProfile
      name="my"
      desc="Welcome to you personalized profile page "
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;
