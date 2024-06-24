"use client";
import React from "react";
import { CodeBracketIcon, EyeIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl, videoUrl }) => {
  return (
    <div className="relative group">
      <div
        className="h-52 md:h-72 rounded-t-xl"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
      >
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-yellow-400 flex items-center justify-center"
            style={{ marginTop: '-4px' }} // i Moved the icon up slightly
          >
            <CodeBracketIcon className="h-10 w-10 text-yellow-300" />
          </Link>

          <Link
            href={videoUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-yellow-400 flex items-center justify-center"
            style={{ marginTop: '-4px' }} // i Moved the icon up slightly
          >
            <VideoCameraIcon className="h-10 w-10 text-yellow-300" />
          </Link>

          <Link
            href={previewUrl}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-yellow-400 flex items-center justify-center"
            style={{ marginTop: '-4px' }} // i Moved the icon up slightly
          >
            <EyeIcon className="h-10 w-10 text-yellow-300" />
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl mt-3 bg-[#181818] py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
