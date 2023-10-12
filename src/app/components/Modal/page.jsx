import React from "react";

const Modal = ({ isVisible }) => {
  const modalJSX = (
    <div className="fixed left-0 top-0 z-[60] place-content-center p-4 w-full h-screen bg-[#99999962]" />
  );

  return isVisible ? modalJSX : <></>;
};

export default Modal;
