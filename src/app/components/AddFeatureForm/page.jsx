"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GrFormClose } from "react-icons/gr";

const AddFeatureForm = ({
  isVisible,
  toggleForm,
  boardId,
  setIsFeatureAdded,
  isFeatureAdded,
}) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const AddFeatureHandler = async (e) => {
    e.preventDefault();
    setIsCreated(true);

    try {
      const { statusText } = await axios.post("/api/features", {
        name,
        description: desc,
        finishDate,
        projectBoardId: boardId,
      });

      toast.success(statusText);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    } finally {
      // Reset form fields and state variables
      setName("");
      setDesc("");
      setFinishDate("");
      setIsCreated(false);
      toggleForm();
      setIsFeatureAdded(!isFeatureAdded);
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
        onClick={() => toggleForm()}
      >
        <GrFormClose className="text-2xl" />
      </button>

      <div className="px-6 py-6 w-full flex flex-col gap-3">
        <div className="title">
          <h1 className="text-xl font-semibold">Add Card</h1>
        </div>

        <div className="border-t"></div>

        <div className="w-full">
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={AddFeatureHandler}
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

            <div className="flex flex-col gap-1">
              <label htmlFor="Finish Date">
                Finish Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="Finish Date"
                placeholder="Enter Finish Date"
                required
                value={finishDate}
                onChange={(e) => setFinishDate(e.target.value)}
                className="border rounded-md px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={isCreated}
              className="w-full mt-2 transtion border p-2 rounded text-white bg-[#111] font-medium hover:bg-[#222] disabled:bg-[#333]"
            >
              {!isCreated ? "Add Card" : "Adding..."}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeatureForm;
