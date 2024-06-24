"use client";

import React, { useRef } from "react";
import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";

export default function Home() {
  const projectsRef = useRef(null);
  const emailRef = useRef(null);

  const handleScrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToEmail = () => {
    if (emailRef.current) {
      emailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar onProjectsClick={handleScrollToProjects} onContactClick={handleScrollToEmail} />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection emailRef={emailRef} />
        <AboutSection />
        <ProjectsSection ref={projectsRef} />
        <EmailSection ref={emailRef} />
      </div>
      <Footer />
    </main>
  );
}
