"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GrFormClose } from "react-icons/gr";
import slugify from "slugify";

const AddBoardForm = ({ isVisible, toggleForm, project }) => {
  const [status, setStatus] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const handleBoardSubmit = async (e) => {
    e.preventDefault();
    setIsCreated(true);

    const slug = slugify(status);

    try {
      const { statusText } = await axios.post("/api/project-board", {
        status,
        projectId: project?.id,
        slug,
      });

      toast.success(statusText);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      setStatus("");
      setIsCreated(false);
      toggleForm();
    }
  };

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
          <h1 className="text-xl font-semibold">Add Project Board</h1>
        </div>

        <div className="border-t"></div>

        <div className="w-full">
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleBoardSubmit}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="status">
                Board Status <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="status"
                placeholder="Enter status"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
