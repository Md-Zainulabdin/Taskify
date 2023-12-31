"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { AiOutlineGithub } from "react-icons/ai";
import Image from "next/image";

const Login = () => {
  const authHandler = async () => {
    try {
      const res = await signIn("github");
      console.log(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-12 justify-evenly items-center py-12">
      <div className="p-4 flex flex-col gap-6 justify-center items-center">
        <div className="heading">
          <h1 className="text-2xl md:text-4xl font-bold">
            Login to <span className="text-gradient_blue-purple">Taskify</span>
          </h1>
        </div>

        <div className="auth-options cursor-pointer">
          <div
            onClick={authHandler}
            className="github transtion border px-6 py-3 rounded-full flex items-center justify-center gap-3 hover:border-[#222]"
          >
            <AiOutlineGithub size={26} />
            <h1 className="text-xl">Continue with Github</h1>
          </div>
        </div>
      </div>

      <div className="img">
        <Image
          src={"/login.png"}
          alt="login-img"
          width={300}
          height={300}
          priority
        />
      </div>
    </div>
  );
};

export default Login;
