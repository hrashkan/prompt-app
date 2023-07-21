"use client";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const signInHandler = async (e) => {
    e.preventDefault();
    const req = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await req.json();
    if(res.ok) {router.push("/")};
    if(!res.ok) {
      setError(res.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="head_text">Sign In</h1>
      <form className="flex flex-col gap-3" onSubmit={signInHandler}>
        <input
          type="text"
          className="email search_input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="password search_input"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="black_btn">
          Login
        </button>
      </form>
      {error.length >= 1 ? (
      <p className="error text-red-700">{error.length >= 1 ? error : ""}</p>
      ) : ""}
      <p className="desc">
        Don`t have an account?
        <Link href="/register" className="font-semibold text-blue-600">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;
