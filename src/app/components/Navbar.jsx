"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";

const navLinks = [
  {
    title: "About",
    path: "about",
  },
  {
    title: "Projects",
    path: "projects",
  },
  {
    title: "Contact",
    path: "contact",
  },
];

const Navbar = ({ onProjectsClick, onContactClick }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavLinkClick = (e, path) => {
    e.preventDefault();
    setNavbarOpen(false);
    if (path === "projects") {
      onProjectsClick();
    } else if (path === "contact") {
      onContactClick();
    }
  };

  const navbarStyle = {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    maxWidth: "960px",
    border: "2px solid transparent",
    zIndex: 1000,
    background: "#121212",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    animation: "animateBorder 5s linear infinite",
    display: navbarOpen ? "none" : "block",
  };

  const keyframesStyle = `
    @keyframes animateBorder {
      0% {
        border-color: #FFD700; /* Gold */
      }
      50% {
        border-color: #FF8C00; /* Dark Orange */
      }
      100% {
        border-color: #FFD700; /* Gold */
      }
    }
    .nav-link {
      position: relative;
      color: #fff;
      text-decoration: none;
    }
    .nav-link::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #FFD700, #FF8C00); /* Gold gradient */
      border-radius: 5px;
      bottom: 0;
      left: 0;
      transform: scaleX(0);
      transition: all 0.6s ease;
    }
    .nav-link:hover::before {
      transform: scaleX(1);
    }
    .nav-link-logo {
      transition: 0.35s ease;
    }
    .nav-link-logo:hover {
      opacity: 0.5;
    }
    .menu-title {
      font-size: 2rem;
      margin-bottom: 1rem;
      margin-top: 2rem;
      background: linear-gradient(90deg, #FFD700, #FF8C00);
      -webkit-background-clip: text;
      color: transparent;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      position: relative;
      display: inline-block;
    }
    .menu-title::before, .menu-title::after {
      content: '';
      position: absolute;
      left: 0;
      background: linear-gradient(90deg, #FFD700, #FF8C00);
    }
    .menu-title::before {
      width: 40px; /* Increased width for the first underline */
      height: 4px;
      bottom: -10px; /* Adjust as needed */
    }
    .menu-title::after {
      width: 52px;
      height: 4px;
      bottom: -5px; /* Adjust as needed */
    }
    .text-gradient {
      background: linear-gradient(90deg, #FFD700, #FF8C00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `;

  const sidebarStyle = {
    position: "fixed",
    top: "0",
    right: navbarOpen ? "0" : "-100%",
    width: "250px",
    height: "100vh",
    backgroundColor: "#000", // i created here Simple black background
    padding: "20px",
    transition: "right 0.3s ease",
    zIndex: 1050,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    border: "2px solid transparent",
    animation: "animateSidebarBorder 5s linear infinite",
    borderRadius: "8px", // for Rounded corners
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const sidebarKeyframesStyle = `
    @keyframes animateSidebarBorder {
      0% {
        border-color: #FFD700; /* Gold */
      }
      50% {
        border-color: #FF8C00; /* Dark Orange */
      }
      100% {
        border-color: #FFD700; /* Gold */
      }
    }
  `;

  const overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1040,
    display: navbarOpen ? "block" : "none",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    backgroundColor: "#FFD700",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  };

  const navItemStyle = {
    opacity: navbarOpen ? 1 : 0,
    transform: navbarOpen ? "translateX(0)" : "translateX(100px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  };

  if (!isMounted) return null; // for Render nothing on the server

  return (
    <>
      <style>{keyframesStyle}</style>
      <style>{sidebarKeyframesStyle}</style>
      <nav
        style={navbarStyle}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 w-4/5 max-w-[960px] border z-10 bg-[#121212] bg-opacity-100 rounded-lg shadow-lg"
      >
        <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2 h-16">
          <Link href="/" className="flex items-center h-full nav-link-logo">
            <img src="/alter-logo7.png" alt="Logo" className="h-980 md:h-970" />{" "}
            {/* this one is for Maintain the height of the logo */}
          </Link>
          <div className="mobile-menu block md:hidden">
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              {navbarOpen ? (
                <XMarkIcon className="h-5 w-5 text-gradient" />
              ) : (
                <Bars3Icon className="h-5 w-5 text-gradient" />
              )}
            </button>
          </div>
          <div className="menu hidden md:block md:w-auto" id="navbar">
            <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    href={`#${link.path}`}
                    title={link.title}
                    onClick={(e) => handleNavLinkClick(e, link.path)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {navbarOpen && (
        <div style={overlayStyle} onClick={() => setNavbarOpen(false)} />
      )}
      <div style={sidebarStyle}>
        <button onClick={() => setNavbarOpen(false)} style={closeButtonStyle}>
          <XMarkIcon className="h-6 w-6 text-black" />
        </button>
        <div className="menu-title">Menu</div>
        <ul className="flex flex-col items-start space-y-6 mt-6">
          {navLinks.map((link, index) => (
            <li key={index} style={navItemStyle} className="text-white text-xl">
              <NavLink
                href={`#${link.path}`}
                title={link.title}
                onClick={(e) => handleNavLinkClick(e, link.path)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
