import React from "react";
import { IoCloseOutline } from "react-icons/io5";

interface DrawerProps {
  isOpen: boolean;
  heading?: string;
  closeModal: () => void;
  content: React.ReactNode;
  className?: string;
  position?: "left" | "right";
}

const Drawer = ({
  isOpen,
  heading,
  closeModal,
  content,
  className,
  position,
}: DrawerProps) => {
  const DrawerContent = (
    <div
      className="bg-white text-black w-full h-full max-w-[300px] overflow-y-auto"
      style={{ boxShadow: "var(--box-shadow)" }}
    >
      <div className="relative py-2 px-5 border-b-[1px]">
        {heading && <h2 className="text-lg font-normal">{heading}</h2>}
        <button
          onClick={closeModal}
          className="hover:text-[rgb(var(--second-rgb))] absolute top-[50%] -translate-y-[50%] right-2"
        >
          <IoCloseOutline size={20} />
        </button>
      </div>
      <div className="p-5">{content}</div>
    </div>
  );

  return (
    <>
      {position === "left" ? (
        <div
          className={`fixed top-0 right-0 bottom-0 transition-all duration-500 bg-[rgb(var(--bg-canvas)/20%)] flex flex-wrap justify-start z-10 ${
            isOpen ? "left-0" : "opacity-0 invisible -left-[100%]"
          }${className ? " " + className : ""}`}
        >
          {DrawerContent}
        </div>
      ) : (
        <div
          className={`fixed top-0 right-0 bottom-0 transition-all duration-500 bg-[rgb(var(--bg-canvas)/20%)] flex flex-wrap justify-end z-10 ${
            isOpen ? "left-0" : "opacity-0 invisible left-[100%]"
          }${className ? " " + className : ""}`}
        >
          {DrawerContent}
        </div>
      )}
    </>
  );
};

export default Drawer;
