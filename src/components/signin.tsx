"use client";

import { useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";

const Signin: FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showed, setShowed] = useState("password");
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const req = await fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({ email, pass }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const res = await req.json();
    if (req.ok) {
      router.push(`/Home/${res.user.id}`);
    }
    console.log(pass);
  };
  return (
    <div className="  bg-black text-green-700 font-mono h-screen w-screen grid place-items-center">
      <div>
        <form action="" onSubmit={handleSubmit} className="grid grid-rows-3 ">
          <label htmlFor="mail">email:</label>
          <input
            type="email"
            name="mail"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-white border-solid bg-black mb-6 w-[12rem]"
          />
          <label htmlFor="pass">password:</label>
          <div className=" mb-4">
            <br />
            <input
              type={`${showed}`}
              name="pass"
              onChange={(e) => {
                setPass(e.target.value);
                console.log(pass);
              }}
              className="border-2 border-white border-solid bg-black mr-3"
            />
            <button onClick={() => setShowed("text")} type="button">
              Show password
            </button>
          </div>
          <button>Signin</button>
        </form>
      </div>
    </div>
  );
};
export default Signin;
