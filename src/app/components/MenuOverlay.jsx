import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <ul className="flex flex-col items-center space-y-6">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              href={`#${link.path}`}
              title={link.title}
              onClick={(e) => onClick(e, link.path)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuOverlay;