"use client";
import AddBoardForm from "@/app/components/AddBoardForm/page";
import Modal from "@/app/components/Modal/page";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProjectBoard from "@/app/components/ProjectBoard/page";
import FeatureCard from "@/app/components/FeatureCard/page";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRouter } from "next/navigation";
import { PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";

const ProjectPage = ({ params }) => {
  const [project, setProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isFeatureAdded, setIsFeatureAdded] = useState(false);

  const { back } = useRouter();
  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await axios.get(`/api/projects/${params.slug}`);
      setProject(data);
    };

    fetchProject();
  }, [params.slug, isCreated, isFeatureAdded]);

  // console.log(project);

  const onDragEnd = async (result) => {
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

      try {
        const { statusText } = await axios.patch("/api/project-board", {
          projectId: project.id,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          type,
        });
        toast.success(statusText);
      } catch (error) {
        console.log(error);
        setProject({
          ...project,
          ProjectBoard: project.projectBoard,
        });
        toast.error("Updated not Successfull");
      }
    }
  };

  if (!project)
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <PacmanLoader color="#333" />
      </div>
    );
  return (
    <div>
      <Modal isVisible={isVisible} />
      <AddBoardForm
        isVisible={isVisible}
        toggleForm={toggleForm}
        project={project}
        isCreated={isCreated}
        setIsCreated={setIsCreated}
      />

      <div className="navigation w-full pb-4 flex gap-2 items-center">
        <span className="text-[#333] cursor-pointer hover:text-[#555]">
          ● Home {">"}
        </span>
        <span
          onClick={() => back()}
          className="text-[#333] cursor-pointer hover:text-[#555]"
        >
          Project Board {">"}
        </span>
        <span className="font-semibold">{project?.name}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="title my-6 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#222]">
            {project?.name}
          </h1>
          <p className="text-lg text-[#999]">{project?.description}</p>
        </div>

        <button
          onClick={toggleForm}
          className="text-lg border px-6 py-3 rounded-md border-dashed"
        >
          Add Board
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board-items" direction="horizontal" type="status">
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
                          setIsFeatureAdded={setIsFeatureAdded}
                          isFeatureAdded={isFeatureAdded}
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
    </div>
  );
};

export default ProjectPage;
