"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrFormEdit } from "react-icons/gr";

const ProjectTable = ({
  search,
  isUpdated,
  setIsUpdated,
  setShowForm,
  setUpdatedProjectId,
}) => {
  const [projects, setProjects] = useState([]);
  const [filterProject, setFilterProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, []);

  useEffect(() => {
    // When the search prop changes, filter the projects
    filterProjects(projects);
  }, [search, projects]);

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

  if (projects.length === 0) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-wrap justify-center md:justify-start items-center md:items-start gap-6 py-8">
      {filterProject.length === 0 ? (
        <div className="w-full h-[400px] border border-dashed flex justify-center items-center rounded-md">
          <h1 className="text-2xl text-red-500">Not Found!</h1>
        </div>
      ) : (
        filterProject.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="w-[350px] relative px-4 py-3 border flex flex-col gap-2 rounded-md shadow-sm hover:border-[#ccc] hover:shadow-md transition cursor-pointer"
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
              <h2 className="font-semibold text-xl">{project.name}</h2>
            </div>

            <div className="desc">
              <p className="text-[#999]">{project.description}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ProjectTable;
