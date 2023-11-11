import { Link } from "react-router-dom";
import * as FaIcon from "react-icons/fa";
import { useNavigationState } from "../AppWrapper";
import { useLocation } from "react-router-dom";

const paths: string[] = ["/signup", "/login"];

const Nav = () => {
  const { toggleOpen } = useNavigationState();
  const location = useLocation();

  return (
    <nav
      className={`flex items-center justify-between w-full py-4 px-4 ${
        paths.includes(location.pathname) ? "bg-[#f1efe7]" : ""
      }`}
    >
      <div className="flex items-center space-x-2 text-amber-6 neotoric">
        <div className="md:flex space-x-2 py-2 opacity-0 md:opacity-100 transition-all duration-300 ">
          <Link
            className="cursor-pointer hover:bg-yellow-700 hover:text-white hover:shadow-2xl  px-2 rounded transiton-colors duration-300 pointer-events-none md:pointer-events-auto"
            to="/about"
          >
            About
          </Link>
          <Link
            className="cursor-pointer hover:bg-yellow-700 hover:text-white hover:shadow-2xl  px-2 rounded transiton-colors duration-300 pointer-events-none md:pointer-events-auto"
            to="/services"
          >
            Services
          </Link>
          <Link
            className="cursor-pointer hover:bg-yellow-700 hover:text-white hover:shadow-2xl  px-2 rounded transiton-colors duration-300 pointer-events-none md:pointer-events-auto"
            to="/contact"
          >
            Contact
          </Link>
          <Link
            className="cursor-pointer hover:bg-yellow-700 hover:text-white hover:shadow-2xl  px-2 rounded transiton-colors duration-300 pointer-events-none md:pointer-events-auto"
            to="/book"
          >
            Book
          </Link>
        </div>
      </div>
      <button
        onClick={() => {
          toggleOpen();
        }}
        className="grid place-content-center h-10 w-10 opacity-100 duration-300 rounded-full hover:bg-amber-100 shadow-2xl md:opacity-0 transition-all pointer-events-auto md:pointer-events-none"
      >
        <FaIcon.FaBars className="text-2xl text-amber-800" />
      </button>
    </nav>
  );
};

export default Nav;
