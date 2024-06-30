"use client";
import React, { useState, forwardRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    id: 1,
    title: "Tune-Hub Music Stream Website",
    description:
      "TuneHub is a music streaming platform designed to provide a seamless and enjoyable music listening experience. With TuneHub, users can listen to their favorite songs, create new tracks, and add songs to their personal playlists, offering comprehensive music streaming functionality.",
    imageUrl: "/images/projects/project-1.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/sam-christopher07/Tune-Hub-WebApp",
    previewUrl: "https://tune-hubwebapp.netlify.app/",
    videoUrl: "https://youtu.be/ZPh_y4l2Sb8",
  },
  {
    id: 2,
    title: "Portfolio-Website",
    description:
      "My personal portfolio website is a comprehensive showcase of my skills, projects, and professional journey, meticulously developed using Next.js and Tailwind CSS.",
    imageUrl: "/images/projects/project-2.png",
    tag: ["All", "Web", "UI"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Guess My Number",
    description:
      "Guess My Number is a fun game where players try to guess a randomly generated number. This project showcases my skills in JavaScript, HTML, and CSS.",
    imageUrl: "/images/projects/project-3.png",
    tag: ["All", "Web", "Games"],
    gitUrl: "https://github.com/sam-christopher07/Guess-My-Number-Game",
    previewUrl: "https://guess-my-number-web-game.netlify.app",
  },
];

const ProjectsSection = forwardRef((props, ref) => {
  const [tag, setTag] = useState("All");
  const inView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const renderTagButton = (name) => (
    <button
      key={name}
      onClick={() => handleTagChange(name)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        tag === name ? "bg-yellow-600 text-black" : "bg-gray-700 text-white"
      } hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
      style={{
        width: "70px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {name}
    </button>
  );

  return (
    <div ref={ref} className="container mx-auto px-4 py-8">
      <h2 className="text-center text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-8 ">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-start gap-2 py-4">
        {["All", "Web", "UI", "Games"].map(renderTagButton)}
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.imageUrl}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              videoUrl={project.videoUrl}
              showVideoIcon={index === 0} // Only show video icon on the first project
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
});

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
