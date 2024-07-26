import React, { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import InstagramIcon from "../../../public/Instagram-icon.svg";
import { Exo } from "next/font/google";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

const exo = Exo({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const wave = keyframes`
  0%, 100% { transform: translateY(0); opacity: 1; }
  20% { transform: translateY(-10%); opacity: 1; }
  40% { transform: translateY(0); }
  60% { transform: translateY(-5%); }
  80% { transform: translateY(0); }
`;

const WaveText = styled.span`
  display: inline-block;
  animation: ${wave} 2s ease-in-out infinite;
  opacity: 1;
  margin-right: ${({ isSpace }) => (isSpace ? "0.5em" : "0")};
  background: linear-gradient(to right, #ffd700, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const StaggeredWaveText = ({ text }) => {
  const [isClient, setIsClient] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setIsClient(true);
    setDisplayedText(text);
  }, [text]);

  if (!isClient) {
    return <span>{text}</span>;
  }

  const charArray = displayedText.split(/( )/);

  return (
    <div>
      {charArray.map((char, index) => (
        <WaveText
          key={index}
          style={{ animationDelay: `${index * 0.1}s` }}
          isSpace={char === " "}
        >
          {char}
        </WaveText>
      ))}
    </div>
  );
};

const EmailSection = forwardRef((props, ref) => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = (name, value) => {
    let formErrors = { ...errors };

    if (name === "email") {
      if (!value) {
        formErrors.email = "Email is required.";
      } else if (!validateEmail(value)) {
        formErrors.email = "Please enter a valid email address.";
      } else {
        delete formErrors.email;
      }
    } else if (name === "subject") {
      if (!value.trim()) {
        formErrors.subject = "Subject is required.";
      } else {
        delete formErrors.subject;
      }
    } else if (name === "message") {
      if (!value.trim()) {
        formErrors.message = "Message is required.";
      } else {
        delete formErrors.message;
      }
    }

    setErrors(formErrors);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateForm(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formErrors = {};

    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      formErrors.subject = "Subject is required.";
    }
    if (!formData.message.trim()) {
      formErrors.message = "Message is required.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    const data = {
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      const response = await fetch(endpoint, options);
      const resData = await response.json();

      if (response.status === 200) {
        console.log("Message sent.");
        setEmailSubmitted(true);
        setErrors({});
      }
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateForm(name, value);
  };

  return (
    <div
      ref={ref}
      className="relative bg-gradient-to-r from-gray-800 to-black text-white py-6 px-4 sm:py-12 sm:px-6 md:px-12 rounded-lg shadow-2xl mt-12"
    >
      <div className="bg-black bg-opacity-50 rounded-lg p-4 sm:p-6 md:p-12">
        <section
          className={`grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 ${
            emailSubmitted ? "blur-sm" : ""
          }`}
        >
          <div className="z-10">
            <h5 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-8">
              Let&apos;s Connect
            </h5>
            <p className="text-gray-400 mb-4 sm:mb-6 overflow-hidden">
              <StaggeredWaveText text="I'm always open to new connections and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!" />
            </p>
            <div className="socials flex space-x-4 sm:space-x-6">
              <Link href="https://github.com/sam-christopher07" target="blank">
                <Image
                  src={GithubIcon}
                  alt="Github Icon"
                  className="w-8 h-8 sm:w-10 sm:h-10 hover:opacity-80 transition-opacity duration-300"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/sam-christopher07/"
                target="blank"
              >
                <Image
                  src={LinkedinIcon}
                  alt="Linkedin Icon"
                  className="w-8 h-8 sm:w-10 sm:h-10 hover:opacity-80 transition-opacity duration-300"
                />
              </Link>
              <Link
                href="https://www.instagram.com/code._.bruh/"
                target="blank"
              >
                <Image
                  src={InstagramIcon}
                  alt="Instagram Icon"
                  className="w-8 h-8 sm:w-10 sm:h-10 hover:opacity-80 transition-opacity duration-300"
                />
              </Link>
            </div>
          </div>
          <div>
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1 sm:mb-2"
                >
                  Enter Your Email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 sm:p-3 rounded-lg bg-gray-700 border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                  placeholder="your-email@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">*{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1 sm:mb-2"
                >
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 sm:p-3 rounded-lg bg-gray-700 border ${
                    errors.subject ? "border-red-500" : "border-gray-600"
                  } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                  placeholder="Just saying hi"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">*{errors.subject}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1 sm:mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 sm:p-3 rounded-lg bg-gray-700 border ${
                    errors.message ? "border-red-500" : "border-gray-600"
                  } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                  placeholder="Let's talk about..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">*{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 sm:py-3 rounded-lg bg-yellow-700 hover:bg-yellow-900 font-semibold transition-colors duration-300 flex items-center justify-center"
              >
                {isLoading ? <div className="spinner"></div> : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </div>
      {emailSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-opacity-75 bg-gray-900">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Hooray!🎉
            </h2>
            <p className="text-gray-600 mb-4">All set, your message is sent!</p>
            <button
              onClick={() => setEmailSubmitted(false)}
              className="w-full bg-yellow-700 hover:bg-yellow-900 text-white py-2 rounded-lg transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

EmailSection.displayName = "EmailSection";

export default EmailSection;
