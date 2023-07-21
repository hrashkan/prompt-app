"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const isUserLogin = async () => {
    const req = await fetch("/api/auth");
    if (req.status === 500) {
      setIsLoggedIn(false);
    }
    if (req.status === 200) {
      setIsLoggedIn(true);
    }
  };

  const signOutHandler = async () => {
    const req = await fetch("/api/auth/signout");
    const res = await req.json();
    if (res.ok) {
      setIsLoggedIn(false);
      router.replace("/");
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    isUserLogin();
  }, [pathName]);

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex gap-x-1">
          <Link href="/profile" className="black_btn">
            Profile
          </Link>
          <Link href="/create-prompts" className="black_btn">
            create prompts
          </Link>
          <button onClick={signOutHandler} className="outline_btn">
            sign out
          </button>
        </div>
      ) : (
        <Link href="/register" className="black_btn">
          Register | Login
        </Link>
      )}
    </div>
  );
}

export default Navigation;
