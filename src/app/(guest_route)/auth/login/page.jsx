"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();

  console.log("session", session);
  const authHandler = async () => {
    try {
      const res = await signIn("github");
      console.log(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <button onClick={authHandler}>Continue with Github</button>
      </div>
    </div>
  );
};

export default Login;
