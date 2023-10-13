"use client";
import AddBoardForm from "@/app/components/AddBoardForm/page";
import Modal from "@/app/components/Modal/page";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProjectBoard from "@/app/components/ProjectBoard/page";
import FeatureCard from "@/app/components/FeatureCard/page";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;
    if (type === "status") {
      const movedBoard = project.projectBoards[source.index];
      const updatedProjectBoard = Array.from(project.projectBoards);

      updatedProjectBoard.splice(source.index, 1);
      updatedProjectBoard.splice(destination.index, 0, movedBoard);

      setProject({
        ...project,
        projectBoards: updatedProjectBoard.map((board, index) => ({
          ...board,
          order: index + 1,
        })),
      });
    }
  };

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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board-5" direction="horizontal" type="status">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-row gap-6"
            >
              {project?.projectBoards
                ?.sort((a, b) => a.order - b.order)
                .map((project, idx) => (
                  <Draggable
                    index={idx}
                    draggableId={project.id}
                    key={project.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className="bg-[#f5f5f5] w-[354px] rounded-2xl py-3 px-6"
                      >
                        <ProjectBoard
                          boardHeading={project.status}
                          boardId={project.id}
                          numFeatures={project.feature.length}
                          setSelectedBoardId={setSelectedBoardId}
                        />

                        <div>
                          {project.feature.map((elm) => (
                            <FeatureCard key={elm.id} features={elm} />
                          ))}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={toggleForm}>Create</button>
    </div>
  );
};

export default ProjectPage;
