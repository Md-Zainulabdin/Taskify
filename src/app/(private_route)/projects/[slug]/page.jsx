"use client";
import AddBoardForm from "@/app/components/AddBoardForm/page";
import Modal from "@/app/components/Modal/page";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProjectPage = ({ params }) => {
  const [project, setProject] = useState(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  const toggleForm = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await axios.get(`/api/projects/${params.slug}`);
      setProject(data);
    };

    fetchProject();
  }, [params.slug]);

  // console.log("projects", project);

  return (
    <div>
      <Modal isVisible={isVisible} />
      <AddBoardForm isVisible={isVisible} toggleForm={toggleForm} />
    </div>
  );
};

export default ProjectPage;
