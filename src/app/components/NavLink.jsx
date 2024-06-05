import Link from "next/link";
import { Exo } from "next/font/google";

const exo = Exo({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const NavLink = ({ href, title }) => {
  return (
    <Link href={href} legacyBehavior>
      <a
        className={`block py-3 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-yellow-400 ${exo.className}`}
      >
        {title}
      </a>
    </Link>
  );
};

export default NavLink;
