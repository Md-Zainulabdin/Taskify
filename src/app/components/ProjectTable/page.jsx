"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrFormEdit } from "react-icons/gr";

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    };

    fetchData();
  }, []);

  if (projects.length === 0) return <div>Loading...</div>;
  // if (projects.length === 0) {
  //   return (
  //     <div className="w-full h-[40vh] flex justify-center items-center">
  //       <h1 className="text-2xl font-semibold text-[#333]">
  //         No Any Projects yet..
  //       </h1>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-6 py-8">
      {projects?.map((project) => (
        <div
          key={project.id}
          className="w-[350px] relative px-4 py-3 border flex flex-col gap-2 rounded-md shadow-sm hover:border-[#ccc] hover:shadow-md transtion cursor-pointer"
        >
          <div className="edit absolute top-3 right-3 border-2 p-1 rounded-full">
            <GrFormEdit className="text-[#999] text-2xl" />
          </div>

          <div className="name">
            <h2 className="font-semibold text-xl">{project.name}</h2>
          </div>

          <div className="desc">
            <p className="text-[#999]">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTable;
