import React, { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import InstagramIcon from "../../../public/Instagram-icon.svg";
import styled from "styled-components";

const Container = styled.div`
  background: linear-gradient(135deg, #282c34 0%, #3a3f47 100%);
  color: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #ffd700;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #444851;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background-color: #555b66;
    box-shadow: 0 0 10px #ffd700;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #444851;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background-color: #555b66;
    box-shadow: 0 0 10px #ffd700;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #ffd700;
  color: #282c34;
  font-size: 1.25rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff9900;
  }

  &:disabled {
    background-color: #666666;
    cursor: not-allowed;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

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
    <Container ref={ref}>
      <Title>Contact Me</Title>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your Email"
          className={errors.email && "error"}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "0.875rem" }}>
            *{errors.email}
          </p>
        )}
        <Input
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Subject"
          className={errors.subject && "error"}
        />
        {errors.subject && (
          <p style={{ color: "red", fontSize: "0.875rem" }}>
            *{errors.subject}
          </p>
        )}
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your Message"
          rows="6"
          className={errors.message && "error"}
        />
        {errors.message && (
          <p style={{ color: "red", fontSize: "0.875rem" }}>
            *{errors.message}
          </p>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <SocialIcons>
        <a href="https://github.com/sam-chris-fullstack-engineer" target="_blank" rel="noopener noreferrer">
          <Image src={GithubIcon} alt="Github" width={32} height={32} />
        </a>
        <a href="https://www.linkedin.com/in/sam-chris-full-stack-engineer/" target="_blank" rel="noopener noreferrer">
          <Image src={LinkedinIcon} alt="LinkedIn" width={32} height={32} />
        </a>
        <a href="https://www.instagram.com/code._.bruh/" target="_blank" rel="noopener noreferrer">
          <Image src={InstagramIcon} alt="Instagram" width={32} height={32} />
        </a>
      </SocialIcons>
      {emailSubmitted && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully.</p>
        </div>
      )}
    </Container>
  );
});

EmailSection.displayName = "EmailSection";
export default EmailSection;
