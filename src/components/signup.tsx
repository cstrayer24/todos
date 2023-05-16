"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";

const SignUp: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const req = await fetch("/api/makeUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, pass }),
    });
    const res = await req.json();
    if (req.ok) {
      router.push(`/Home/${res.user.id}`);
    }
  }
  return (
    <div className=" bg-black text-green-700 font-mono h-screen w-screen grid place-items-center">
      <div>
        <h1>Sign up</h1>
        <h2>and track your life</h2>
        <div>
          <form action="" onSubmit={handleSubmit} className=" grid grid-rows-4">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-black border border-white"
            />
            <label htmlFor="mail">Mail:</label>
            <input
              type="email"
              name="mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-black border border-white"
            />
            <label htmlFor="pass">pass:</label>
            <input
              type="password"
              name="pass"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              className="bg-black border border-white"
            />
            <button type="submit">sign up</button>
          </form>
          <span>
            Already have an account{" "}
            <Link href={"/signin"} className=" font-bold">
              sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
//pQ9IJM0EcBtrQJMwv3m1QQ
