"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GrFormClose } from "react-icons/gr";
import slugify from "slugify";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProjectForm = ({
  isVisible,
  setShowForm,
  isUpdated,
  setIsUpdated,
  updatedProjectId,
}) => {
  // State variables to manage form inputs and submission status
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const router = useRouter();

  const createProjectHandler = async (slug) => {
    try {
      // Make a POST request to create a new project
      const { statusText } = await axios.post("/api/projects", {
        name,
        description: desc,
        slug,
      });

      // Show a success toast message
      toast.success(statusText);
    } catch (error) {
      console.log(error);
      // Handle any errors here and optionally show an error toast message
      toast.error(error?.response?.data);
    } finally {
      // Reset form fields and state variables
      setName("");
      setDesc("");
      setShowForm(false);
      setIsCreated(false);
    }
  };

  const updateProjectHandler = async (slug) => {
    try {
      const { statusText } = await axios.patch("/api/projects", {
        name,
        description: desc,
        slug,
        id: updatedProjectId,
      });

      // Show a success toast message
      toast.success(statusText);
    } catch (error) {
      console.log(error);
      // Handle any errors here and optionally show an error toast message
      toast.error(error?.response?.data);
    } finally {
      // Reset form fields and state variables
      setName("");
      setDesc("");
      setShowForm(false);
      setIsCreated(false);
      setIsUpdated(false);
    }
  };

  // Function to handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Set isCreated to true to show a loading message
    setIsCreated(true);

    // Generate a slug from the project name
    const slug = slugify(name);

    if (!name || !desc) return;

    if (isUpdated) {
      updateProjectHandler(slug);
    } else {
      createProjectHandler(slug);
    }
  };

  return (
    <div
      className={`absolute w-[350px] z-[65] bg-white shadow rounded-lg ${
        isVisible
          ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500"
          : "-translate-y-[600%] left-1/2 -translate-x-1/2"
      }`}
    >
      <button
        type="button"
        className="absolute top-3 right-4"
        onClick={() => setShowForm(false)}
      >
        <GrFormClose className="text-2xl" />
      </button>

      <div className="px-6 py-6 w-full flex flex-col gap-3">
        <div className="title">
          <h1 className="text-xl font-semibold">
            {isUpdated ? "Update" : "Create"} Project
          </h1>
        </div>

        <div className="border-t"></div>

        <div className="w-full">
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={onSubmitHandler}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="description"
                placeholder="Enter description"
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="border rounded-md px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={isCreated}
              className="w-full mt-2 transtion border p-2 rounded text-white bg-[#111] font-medium hover:bg-[#222] disabled:bg-[#333]"
            >
              {isUpdated
                ? isCreated
                  ? "Updating.."
                  : "Update"
                : isCreated
                ? "Creating.."
                : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
