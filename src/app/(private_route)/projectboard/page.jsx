import Modal from "@/app/components/Modal/page";
import ProjectTable from "@/app/components/ProjectTable/page";
import React from "react";

const ProjectBoard = async () => {
  return (
    <div>
      <Modal isVisible={true}/>
      <ProjectTable />
    </div>
  );
};

export default ProjectBoard;
