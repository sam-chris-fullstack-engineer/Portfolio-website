"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import styled, { keyframes } from "styled-components";
import { Exo } from "next/font/google"; // Import Roboto font

const exo = Exo({
  subsets: ["latin"],
  weight: "400", // Available weights for Roboto
  styles: ["normal"],
});

const upDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
`;

// Create a styled component for the animated image
const AnimatedImage = styled(Image)`
  animation: ${upDown} 2s ease-in-out infinite;
`;

const TAB_DATA = [
  {
    title: "skills",
    id: "skills",
    content: (
      <ul
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent list-disc list-inside text pl-2 ${exo.className}`}
      >
        <li className="text-2xl">Java</li>
        <li className="text-2xl">HTML5</li>
        <li className="text-2xl">CSS3</li>
        <li className="text-2xl">Javascript</li>
        <li className="text-2xl">SQL</li>
        <li className="text-2xl">SpringBoot</li>
        <li className="text-2xl">React</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent list-disc pl-2 ">
        <li className="text-2xl ">Master of Computer Application,</li>
        <li>Kgisl institute of information management, Coimbatore</li>
        <br />
        <li className="text-2xl ">Bachelor of Computer Application,</li>
        <li>Karunya institute of Technology and Sciences, Coimbatore</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent list-disc pl-2">
        <li className="text-2xl">Java Full Stack Developement</li>
        <br></br>
        <a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Walmart%20USA/oX6f9BbCL9kJDJzfg_Walmart%20USA_DG6KEnhsrkr2GcE3t_1710050024918_completion_certificate.pdf">
          <li className="text-2xl">
            Walmart USA - Advanced Software Engineering Job Simulation
          </li>
        </a>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <AnimatedImage
          src="/images/about-image1.png"
          width={500}
          height={400}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold  text-yellow-400  mb-4">
            About Me
          </h2>
          <p className={`text-base lg:text-lg ${exo.className}`}>
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Redux, Node.js, Express, PostgreSQL,
            Sequelize, HTML, CSS, and Git. I am a quick learner and I am always
            looking to expand my knowledge and skill set. I am a team player and
            I am excited to work with others to create amazing applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>

            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              Certications
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;