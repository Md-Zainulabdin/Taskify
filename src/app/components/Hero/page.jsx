import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="w-[700px] flex justify-center items-center py-12 md:py-16 overflow-hidden relative">
      <div className="parent flex flex-col gap-8">
        <div className="title w-full flex flex-col gap-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold">Manage Your Task</h1>
          <h1 className="text-5xl md:text-7xl font-bold">
            With{" "}
            <span className="text-gradient_blue-purple font-bold">Taskify</span>
          </h1>
        </div>

        <div className="desc w-full flex items-center justify-center text-center mx-auto">
          <p className="text-lg md:text-xl text-[#999] bg-[#fafafa] font-normal p-4 rounded-md">
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
  );
};

export default Hero;
