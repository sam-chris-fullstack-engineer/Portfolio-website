// src/app/api/send/route.js

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Helper function to extract and format the username from the email
const extractUsername = (email) => {
  const username = email.split("@")[0];
  const formattedUsername = username
    .replace(/(\d+|[^\w\s])/g, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2");
  return (
    formattedUsername.charAt(0).toUpperCase() +
    formattedUsername.slice(1).toLowerCase()
  );
};

export async function POST(req) {
  try {
    const { email, subject, message } = await req.json();
    console.log(email, subject, message);

    const username = extractUsername(email);

    // Set up the transporter with your email service configuration
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or another email service
      auth: {
        user: process.env.GMAIL_USER, // your email address
        pass: process.env.GMAIL_PASS, // your email password
      },
    });

    // Email content for the recipient (your email)
    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New message from ${username}: ${subject}`,
      text: message,
    };

    // Email content for the sender (user)
    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Thank you for reaching out!",
      text: `Hi ${username},\n\nI appreciate you reaching out!. I'll get back to you as soon as possible\n\nBest regards,\nSam Christopher`,
    };

    // Send email to the recipient (your email)
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
