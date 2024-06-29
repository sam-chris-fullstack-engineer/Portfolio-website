import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    box-shadow: none;
    max-width: 95%; /* Increased width for mobile */
    border-radius: 20px;
    padding: 0 20px;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background: url('/path/to/your/image.jpg') no-repeat center center;
  background-size: cover;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  @media (max-width: 768px) {
    height: 180px; /* Reduced height for mobile */
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 40px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  @media (max-width: 1024px) {
    padding: 30px;
  }

  @media (max-width: 768px) {
    padding: 20px 10px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
  }
`;

const FormSubtitle = styled.p`
  margin-bottom: 20px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 14px;
    text-align: center;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px; /* Reduced padding for mobile */
  margin: 10px 0; /* Reduced margin for mobile */
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;

  @media (max-width: 768px) {
    height: 45px; /* Adjusted height for mobile */
    font-size: 16px; /* Increased font size for better readability */
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px; /* Reduced padding for mobile */
  margin: 10px 0; /* Reduced margin for mobile */
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
  resize: none;

  @media (max-width: 768px) {
    height: 80px; /* Reduced height for mobile */
    font-size: 16px; /* Increased font size for better readability */
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px; /* Reduced padding for mobile */
  border: none;
  border-radius: 5px;
  background: #6200ea;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #3700b3;
  }

  @media (max-width: 768px) {
    height: 50px; /* Adjusted height for mobile */
    font-size: 18px; /* Increased font size for better readability */
  }
`;

const EmailSection = forwardRef((props, ref) => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    } else if (name === "name") {
      if (!value.trim()) {
        formErrors.name = "Name is required.";
      } else {
        delete formErrors.name;
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

    if (!formData.name.trim()) {
      formErrors.name = "Name is required.";
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
      name: formData.name,
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
    <div ref={ref} className="py-12 px-4">
      <FormWrapper>
        <LeftPanel />
        <RightPanel>
          <FormTitle>Let’s talk!</FormTitle>
          <FormSubtitle>
            Do you have a project in mind? We’re all ears.
          </FormSubtitle>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <TextArea
              name="message"
              placeholder="Tell us about your project"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              required
            />
            <SubmitButton type="submit">
              {isLoading ? <div className="spinner"></div> : "Send"}
            </SubmitButton>
          </form>
        </RightPanel>
      </FormWrapper>
      {emailSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-opacity-75 bg-gray-900">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Hooray!🎉</h2>
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
