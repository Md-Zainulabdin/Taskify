"use client";
import CreateProjectForm from "@/app/components/CreateProjectForm/page";
import Modal from "@/app/components/Modal/page";
import ProjectTable from "@/app/components/ProjectTable/page";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const ProjectBoard = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleProjectForm = () => setShowForm(!showForm);
  return (
    <div className="w-full">
      <>
        <Modal isVisible={showForm} />
        <CreateProjectForm
          isVisible={showForm}
          toggleProjectForm={toggleProjectForm}
          setShowForm={setShowForm}
        />
      </>

      <div className="filter-search w-full flex items-center justify-between gap-3 md:gap-6">
        <div className="search w-[90%] flex items-center gap-3 flex-row-reverse border px-3 py-2 rounded-md">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            className="w-full outline-none text-sm"
          />
          <BiSearch className="text-xl text-[#999]" />
        </div>
        <div className="btn w-[130px]">
          <button
            onClick={() => {
              toggleProjectForm();
            }}
            className="border w-full p-2 rounded-md outline-none bg-[#111] text-white font-medium"
          >
            Create
          </button>
        </div>
      </div>

      <div className="projects mt-4">
        <ProjectTable />
      </div>
    </div>
  );
};

export default ProjectBoard;
