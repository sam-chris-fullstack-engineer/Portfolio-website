"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import styled, { keyframes } from "styled-components";
import { Exo } from "next/font/google";
import { motion, useInView } from "framer-motion";

const exo = Exo({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const upDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledImage = styled(Image)`
  animation: ${upDown} 2s ease-in-out infinite;
`;

const GradientText = styled.span`
  background: linear-gradient(90deg, #ffd700, #ff8c00);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${gradientAnimation} 3s ease infinite;
`;

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const inViewAbout = useInView(aboutRef, { once: true });
  const inViewSkills = useInView(skillsRef, { once: true });

  const handleTabChange = (id) => {
    setTab(id);
  };

  const TAB_DATA = [
    {
      title: "Skills",
      id: "skills",
      content: (
        <motion.ul
          key="skills"
          ref={skillsRef}
          initial={{ x: -100, opacity: 0 }}
          animate={inViewSkills ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent list-disc list-inside text pl-2 ${exo.className}`}
        >
          <li className="text-2xl">Java</li>
          <li className="text-2xl">HTML5</li>
          <li className="text-2xl">CSS3</li>
          <li className="text-2xl">Javascript</li>
          <li className="text-2xl">SQL</li>
          <li className="text-2xl">SpringBoot</li>
          <li className="text-2xl">React JS</li>
          <li className="text-2xl">Next JS</li>
        </motion.ul>
      ),
    },
    {
      title: "Education",
      id: "education",
      content: (
        <motion.ul
          key="education"
          initial={{ x: -100, opacity: 0 }} // Changed x value for left to right animation
          animate={tab === "education" ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent list-disc pl-2 "
        >
          <li className="text-2xl">Master of Computer Application,</li>
          <li>Kgisl institute of information management, Coimbatore</li>
          <br />
          <li className="text-2xl">Bachelor of Computer Application,</li>
          <li>Karunya institute of Technology and Sciences, Coimbatore</li>
        </motion.ul>
      ),
    },
    {
      title: "Certifications",
      id: "certifications",
      content: (
        <motion.ul
          key="certifications"
          initial={{ x: -100, opacity: 0 }} // Changed x value for left to right animation
          animate={tab === "certifications" ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent list-disc pl-2"
        >
          <li className="text-2xl">Java Full Stack Development</li>
          <br />
          <a href="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Walmart%20USA/oX6f9BbCL9kJDJzfg_Walmart%20USA_DG6KEnhsrkr2GcE3t_1710050024918_completion_certificate.pdf">
            <li className="text-2xl">
              Walmart USA - Advanced Software Engineering Job Simulation
            </li>
          </a>
        </motion.ul>
      ),
    },
  ];

  return (
    <section id="about" ref={aboutRef} className="text-white">
      <style jsx>{`
        .about-title {
          font-size: 2rem;
          margin-bottom: 1rem;
          margin-top: 2rem;
          background: linear-gradient(90deg, #ffd700, #ff8c00);
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
          display: inline-block;
        }
        .about-title::before,
        .about-title::after {
          content: "";
          position: absolute;
          left: 0;
          background: linear-gradient(90deg, #ffd700, #ff8c00);
        }
        .about-title::before {
          width: 100px; /* Adjust the width as needed */
          height: 4px;
          bottom: -10px; /* Adjust as needed */
        }
        .about-title::after {
          width: 120px;
          height: 4px;
          bottom: -5px; /* Adjust as needed */
        }
      `}</style>
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={inViewAbout ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <StyledImage
            src="/images/about-image1.png"
            width={500}
            height={400}
            alt="About Image"
          />
        </motion.div>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <motion.h2
            variants={container(0)}
            initial="hidden"
            animate={inViewAbout ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-yellow-400 mb-4 about-title" // Applied the about-title class here
          >
            About Me
          </motion.h2>
          <motion.p
            variants={container(0.5)}
            initial="hidden"
            animate={inViewAbout ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            className={`text-base lg:text-lg ${exo.className}`}
          >
            Hi, I&apos;m Sam Christopher. I obtained my MCA from KGISL Institute
            of Information Management in Coimbatore, Tamil Nadu. I have also
            finished Java Full Stack Development, specializing in Java backend
            development. I enjoy creating user-interactive visual designs and
            developing websites that are both functional and aesthetically
            pleasing. I love transforming ideas into captivating online
            experiences while staying updated with the latest design trends.
            Explore my portfolio to see the range of projects I&apos;ve worked
            on and how I&apos;ve applied my skills to deliver exceptional user
            experiences.{" "}
          </motion.p>
          <motion.div
            variants={container(1)}
            initial="hidden"
            animate={inViewAbout ? "visible" : "hidden"}
            transition={{ duration: 0.5 }}
            className="flex flex-row justify-start mt-8"
          >
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
              Certifications
            </TabButton>
          </motion.div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
