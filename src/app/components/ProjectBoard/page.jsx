"use client";
import React, { useState } from "react";
import Modal from "../Modal/page";
import AddFeatureForm from "../AddFeatureForm/page";

const ProjectBoard = ({
  boardHeading,
  boardId,
  numFeatures,
  setSelectedBoardId,
  setIsFeatureAdded,
  isFeatureAdded
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Modal isVisible={isVisible} />
      <AddFeatureForm
        setIsFeatureAdded={setIsFeatureAdded}
        isFeatureAdded={isFeatureAdded}
        isVisible={isVisible}
        toggleForm={toggleForm}
        boardId={boardId}
      />
      <div className="flex flex-row justify-between items-center pb-6 border-b-2 border-b-[#30e575]">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-[#30e575] rounded-full mr-2" />
          <p className="font-medium mr-3">{boardHeading}</p>
          <span className="w-6 h-6 rounded-full text-center flex items-center justify-center bg-[#e0e0e0] text-[#625f6d]">
            {numFeatures}
          </span>
        </div>

        <div className="add-btn">
          <button
            onClick={() => {
              toggleForm();
              setSelectedBoardId(boardId);
            }}
            className="text-white bg-[#30e757] px-3 py-1 rounded-lg font-medium text-lg"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectBoard;
