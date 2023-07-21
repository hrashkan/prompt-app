import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";
import { redirect } from "next/navigation";
import ProfilePage from "@/components/ProfilePage";

function Profile() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log(token);
  if (!token) redirect("/signin");
  const result = verifyToken(token.value, process.env.SECRET_KEY);
  console.log("result =>>>", result);
  if (!result) redirect("/signin");

  
  return <ProfilePage userEmail={result?.email} />;
}

export default Profile;
