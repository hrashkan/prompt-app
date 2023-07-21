"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log(`start register`)

    const req = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const res = await req.json();
    if(res.ok) {
      fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(() => {
        router.push("/");
      })

  }
    if(!res.ok) setError(res.message);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="head_text">Register</h1>
      <form className="flex flex-col gap-3" onSubmit={registerHandler}>
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
          Register
        </button>
      </form>
      <p className="error text-red-700">
        {error.length >=1 ? 
          error
        :""}
      </p>
      <p className="desc">
        have an account?
        <Link href="/signin" className="font-semibold text-blue-600">
          sign in
        </Link>
      </p>

    </div>
  );
}

export default Register;
