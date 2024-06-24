import { Link as ScrollLink } from "react-scroll";
import { Exo } from "next/font/google";

const exo = Exo({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const NavLink = ({ href, title, onClick }) => {
  return (
    <ScrollLink
      to={href.substring(1)} // Remove the '#' from the href
      smooth={true}
      duration={500}
      className={`nav-link block py-3 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-yellow-400 cursor-pointer ${exo.className}`}
      onClick={onClick}
    >
      {title}
    </ScrollLink>
  );
};

export default NavLink;
