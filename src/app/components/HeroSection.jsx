"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import styled, { keyframes } from "styled-components";

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

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 642);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-600">
              Hey👋, I'm {""}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Sam Christopher",
                1000,
                "Software Developer",
                1000,
                "UI Designer",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            accusantium dolores temporibus neque ipsa maxime. Minus voluptate
            cumque ab rem.
          </p>
          <div>
            <button className="px-6 py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 hover:bg-slate-200 text-[#1C2833] font-extrabold">
              Team Up
            </button>
            <button className="px-1 py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 hover:bg-slate-800 text-white mt-3">
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Get My Resume
              </span>
            </button>
          </div>
        </div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
          {isMobile ? (
            <AnimatedImage
              src="/images/hero-mobile2.png"
              alt="hero image mobile"
              width={900}
              height={900}
            />
          ) : (
            <AnimatedImage
              src="/images/hero-desktop.png"
              alt="hero image"
              width={600}
              height={500}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
