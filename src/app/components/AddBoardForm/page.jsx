"use client";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";

const AddBoardForm = ({ isVisible, toggleForm }) => {
  const [title, setTitle] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const handleBoardSubmit = () => {};

  return (
    <div
      className={`absolute w-[350px] z-[55] bg-white shadow rounded-lg ${
        isVisible
          ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500"
          : "-translate-y-[600%] left-1/2 -translate-x-1/2"
      }`}
    >
      <button
        type="button"
        className="absolute top-3 right-4"
        onClick={() => toggleForm()}
      >
        <GrFormClose className="text-2xl" />
      </button>

      <div className="px-6 py-6 w-full flex flex-col gap-3">
        <div className="title">
          <h1 className="text-xl font-semibold">
            Project
          </h1>
        </div>

        <div className="border-t"></div>

        <div className="w-full">
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleBoardSubmit}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-md px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={isCreated}
              className="w-full mt-2 transtion border p-2 rounded text-white bg-[#111] font-medium hover:bg-[#222] disabled:bg-[#333]"
            >
              {isCreated ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBoardForm;
