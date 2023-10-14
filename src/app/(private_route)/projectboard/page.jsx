"use client";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import useSearchFilter from "@/Store/searchFilter";
import ProjectForm from "@/app/components/ProjectForm/page";
import Modal from "@/app/components/Modal/page";
import ProjectTable from "@/app/components/ProjectTable/page";
import { useRouter } from "next/navigation";

const ProjectBoard = () => {
  const { back } = useRouter();
  // Initialize the searchStore state using the useSearchFilter hook
  const searchStore = useSearchFilter((state) => state);

  // State variables to manage the form visibility and search input
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatedProjectId, setUpdatedProjectId] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  // Function to toggle the project form visibility
  const toggleProjectForm = () => setShowForm(!showForm);

  // Function to handle search input change and update the searchStore
  const onSearchChange = (e) => {
    e.preventDefault();
    searchStore.addSearch(search);
  };

  return (
    <div className="w-full">
      {/* Modal for creating a project */}
      <Modal isVisible={showForm} />

      {/* Create Project Form */}
      <ProjectForm
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        isVisible={showForm}
        toggleProjectForm={toggleProjectForm}
        setShowForm={setShowForm}
        updatedProjectId={updatedProjectId}
        setUpdatedProjectId={setUpdatedProjectId}
        isCreated={isCreated}
        setIsCreated={setIsCreated}
      />

      <div className="navigation w-full pb-6 flex gap-2 items-center">
        <span onClick={() => back()} className="text-[#333] cursor-pointer hover:text-[#555]">
          ● Home {">"}
        </span>
        <span className="font-semibold">Project Board</span>
      </div>

      {/* Search and Create buttons */}
      <div className="filter-search w-full flex items-center justify-between gap-3 md:gap-6">
        <div className="search w-[90%] flex items-center gap-3 flex-row-reverse border px-3 py-2 rounded-md">
          <form className="w-full" onSubmit={onSearchChange}>
            <input
              type="search"
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full outline-none text-sm"
            />
          </form>
          <BiSearch className="text-xl text-[#999]" />
        </div>
        <div className="btn w-[130px]">
          {/* Button to toggle project form visibility */}
          <button
            onClick={toggleProjectForm}
            className="border w-full p-2 transtion rounded-md outline-none bg-[#111] hover:bg-[#222] text-white font-medium"
          >
            Create
          </button>
        </div>
      </div>

      {/* Project Table */}
      <div className="projects mt-4">
        <ProjectTable
          search={searchStore.search}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          setShowForm={setShowForm}
          setUpdatedProjectId={setUpdatedProjectId}
          isCreated={isCreated}
        />
      </div>
    </div>
  );
};

export default ProjectBoard;
