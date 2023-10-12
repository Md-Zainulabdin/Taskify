"use client";
import AddBoardForm from "@/app/components/AddBoardForm/page";
import Modal from "@/app/components/Modal/page";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProjectBoard from "@/app/components/ProjectBoard/page";

const ProjectPage = ({ params }) => {
  const [project, setProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState("");

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await axios.get(`/api/projects/${params.slug}`);
      setProject(data);
    };

    fetchProject();
  }, [params.slug]);

  // console.log(project);

  return (
    <div>
      <Modal isVisible={isVisible} />
      <AddBoardForm
        isVisible={isVisible}
        toggleForm={toggleForm}
        project={project}
      />

      <div className="title my-6 flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#222]">
          {project?.name}
        </h1>
        <p className="text-lg text-[#999]">{project?.description}</p>
      </div>

      <div className="flex flex-row gap-6">
        {project?.projectBoards?.map((project) => (
          <div
            key={project.id}
            className="bg-[#f5f5f5] w-[354px] rounded-2xl py-3 px-6"
          >
            <ProjectBoard
              boardHeading={project.status}
              boardId={project.id}
              numFeatures={project.feature.length}
              setSelectedBoardId={setSelectedBoardId}
              toggleAddFeature={() => {}}
            />
          </div>
        ))}
      </div>

      <button onClick={toggleForm}>Create</button>
    </div>
  );
};

export default ProjectPage;
