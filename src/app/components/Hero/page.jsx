import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="md:w-[700px] flex justify-center items-center py-8 md:py-16 overflow-hidden relative">
        <div className="parent flex flex-col gap-8">
          <div className="title w-full flex flex-col gap-6 text-center">
            <h1 className="text-5xl md:text-7xl font-semibold">
              Manage Your Task
            </h1>
            <h1 className="text-5xl md:text-7xl font-semibold">
              With{" "}
              <span className="text-gradient_blue-purple font-bold">
                Taskify
              </span>
            </h1>
          </div>

          <div className="desc md:w-[80%] flex items-center justify-center text-center mx-auto">
            <p className="text-lg text-[#999] bg-[#fafafa] font-normal p-4 rounded-md">
              Taskify is a versatile task management tool designed to help
              individuals and teams streamline their work
            </p>
          </div>

          <div className="get-started w-full flex justify-center items-center">
            <button className="px-8 py-3 border font-medium text-white bg-[#111] rounded-md transtion hover:bg-[#222]">
              <Link href={"/projectboard"}>Get Started</Link>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center">
        <Image
          src={"/smartpeople.png"}
          alt="hero image"
          width={400}
          height={400}
          priority
        />
      </div>
    </>
  );
};

export default Hero;
