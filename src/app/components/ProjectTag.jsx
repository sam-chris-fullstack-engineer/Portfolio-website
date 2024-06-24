import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 border-none"
    : "text-[#ADB7BE] border-slate-600 hover:border-yellow-400";

  return (
    <button
      className={`${buttonStyles} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
