"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProjectPage = ({ params }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await axios.get(`/api/projects/${params.slug}`);
      setProject(data);
    };

    fetchProject();
  }, [params.slug]);

  console.log("projects", project);

  return <div>ProjectPage</div>;
};

export default ProjectPage;
