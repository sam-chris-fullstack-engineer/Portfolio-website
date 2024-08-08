"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const upDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
`;

const StyledImage = styled(Image)`
  animation: ${upDown} 2s ease-in-out infinite;
`;

const container = (delay) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: delay, ease: "easeInOut" },
  },
});

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const HeroSection = ({ emailRef }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 642);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollToEmail = () => {
    if (emailRef && emailRef.current) {
      emailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetResume = () => {
    window.open("/samchristopher-full-stack-engineer.pdf", "_blank");
  };

  return (
    <section className="lg:py-1">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-12"
      >
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <motion.h1
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-600">
              Hey👋, I&apos;m {""}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Sam Christopher",
                1000,
                "Fullstack Engineer",
                1000,
                "Software Developer",
                1000,
                "Content Creator",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.h1>
          <motion.p
            variants={container(0.5)}
            initial="hidden"
            animate="visible"
            className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl"
          >
            Hey There, Welcome to my portfolio! I am a passionate software
            developer with a knack for creating robust and scalable web
            applications. With expertise in front-end technologies like
            React.js, JavaScript, HTML, and CSS, I bring interactive and dynamic
            user interfaces to life, ensuring an intuitive and engaging user
            experience.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center">
            <motion.button
              onClick={handleScrollToEmail}
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="px-6 py-3 w-full sm:w-auto rounded-lg mr-4 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-[#1C2833] font-bold transform transition-transform duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, #FFD700, #FF8C00, #FF4500)",
                color: "#1C2833",
                fontWeight: "700",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(255, 140, 0, 0.8)";
                e.currentTarget.style.transform = "rotate(-2deg) scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
              }}
            >
              Hire Me
            </motion.button>
            <motion.button
              onClick={handleGetResume}
              variants={container(1.5)}
              initial="hidden"
              animate="visible"
              className="relative w-full sm:w-auto mt-3 sm:mt-0 px-1 py-1 rounded-lg bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-white font-bold transform transition-transform duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, #FFD700, #FF8C00, #FF4500)",
                color: "#FFFFFF",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(255, 140, 0, 0.8)";
                e.currentTarget.style.transform = "rotate(-2deg) scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.transform = "rotate(0deg) scale(1)";
              }}
            >
              <span className="block bg-[#1C2833] rounded-lg px-5 py-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-orange-400 hover:to-red-500">
                Get My Resume
              </span>
            </motion.button>
          </div>
        </div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
          {isMobile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
            >
              <StyledImage
                src="/images/hero-mobile4.png"
                alt="hero image mobile"
                width={950}
                height={950}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
            >
              <StyledImage
                src="/images/hero-desktop2.png"
                alt="hero image"
                width={500}
                height={600}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
