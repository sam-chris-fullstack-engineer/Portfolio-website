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
    console.log("Email:", email, "Subject:", subject, "Message:", message);

    const username = extractUsername(email);

    // Log environment variables to ensure they are set correctly
    console.log("GMAIL_USER:", process.env.GMAIL_USER);
    console.log("GMAIL_PASS:", process.env.GMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New message from ${username}: ${subject}`,
      text: message,
    };

    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Thank you for reaching out!",
      text: `Hi ${username},\n\nI appreciate you reaching out!. I'll get back to you as soon as possible\n\nBest regards,\nSam Christopher`,
    };

    console.log("Sending email to self...");
    await transporter.sendMail(mailOptions);
    console.log("Email to self sent successfully");

    console.log("Sending confirmation email to user...");
    await transporter.sendMail(userMailOptions);
    console.log("Confirmation email sent successfully");

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
