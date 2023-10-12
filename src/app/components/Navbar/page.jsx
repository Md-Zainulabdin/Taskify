"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  // console.log(session);
  return (
    <div className="w-full h-[70px] fixed top-0 left-0 z-[60] bg-white transtion border-b flex items-center justify-between px-[20px] md:px-[50px]">
      <div className="logo">
        <h1 className="text-2xl font-bold">
          <Link href={"/"}>taskify</Link>
        </h1>
      </div>

      <div className="menu relative">
        {session && show && (
          <div className="drop-down absolute bottom-[-290%] right-0 z-50 flex flex-col gap-3 w-[200px] transtion overflow-hidden p-4 rounded-md bg-white shadow-md">
            <div className="name">
              <h2 className="font-medium ">
                {session?.user?.name?.length > 8
                  ? `Hey, ${(session?.user?.name).toString().slice(0, 8)}`
                  : ""}
              </h2>
            </div>

            <div className="logout w-full">
              <button
                onClick={signOut}
                className="w-full p-2 border hover:border-[#222] transtion"
              >
                Logout
              </button>
            </div>
          </div>
        )}
        {!session ? (
          <Link
            href={"/auth/login"}
            className="p-6 py-[6px] font-medium border border-[#222] transtion rounded-md hover:bg-[#222] hover:text-white"
          >
            Login
          </Link>
        ) : (
          <div onClick={() => setShow(!show)} className="cursor-pointer">
            <Image
              width={45}
              height={45}
              src={session?.user?.image}
              alt="profile-pic"
              className="rounded-full border-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
