import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer border border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-10 flex justify-center">
        <span>{currentYear}</span>
        <p className="text-slate-300 ml-2">| All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
