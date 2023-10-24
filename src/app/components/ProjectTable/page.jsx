"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrFormEdit } from "react-icons/gr";
import { PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";

const ProjectTable = ({
  search,
  setIsUpdated,
  setShowForm,
  setUpdatedProjectId,
  isCreated,
}) => {
  const [projects, setProjects] = useState([]);
  const [filterProject, setFilterProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!filterProject) return;
        const res = await axios.get("/api/projects");
        setProjects(res.data);

        // Filter projects when data is fetched
        filterProjects(res.data);
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while fetching data");
      }
    };

    fetchData();
  }, [isCreated, filterProject]);

  useEffect(() => {
    // When the search prop changes, filter the projects
    filterProjects(projects);
  }, [search, filterProject]);

  const filterProjects = (data) => {
    if (!search) {
      setFilterProject(data);
      return;
    }

    const filteredProjects = data.filter((proj) =>
      proj.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterProject(filteredProjects);
  };
  const onDeleteHandler = async (projectId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#222",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete("/api/project-board", {
            data: { projectId },
          });
    
          // Handle the response as needed, e.g., show a success message
          toast.success(response.data.statusText);
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.error);
        }
      }
    });
  };


  return (
    <div className="w-full flex flex-wrap justify-center md:justify-start items-center md:items-start gap-6 py-8">
      {filterProject.map((project) => (
        <div
          key={project.id}
          className="w-full md:w-[350px] relative px-4 py-3 border flex flex-col gap-2 rounded-md shadow-sm hover:border-[#ccc] hover:shadow-md transition cursor-pointer"
        >
          <div
            className="edit absolute top-3 right-3 border-2 p-1 rounded-full transtion hover:border-indigo-400"
            onClick={() => {
              setIsUpdated(true);
              setShowForm(true);
              setUpdatedProjectId(project.id);
            }}
          >
            <GrFormEdit className="text-[#999] text-2xl" />
          </div>

          <div className="name">
            <Link
              href={`/projects/${project.slug}`}
              className="font-semibold text-xl hover:underline"
            >
              {project.name}
            </Link>
          </div>

          <div className="desc">
            <p className="text-[#999]">{project.description}</p>
          </div>

          <div className="date-time flex justify-between items-center mt-3">
            <span className="text-xs text-purple-800 bg-purple-200 px-[8px] py-[3px] rounded-[4px]">
              {project.createdAt.slice(0, 10).split("-").reverse().join("-")}
            </span>

            <button
              onClick={() => onDeleteHandler(project.id)}
              className="text-sm bg-red-200 text-red-800 px-[8px] py-[3px] rounded-[4px]"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTable;
