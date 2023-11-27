import { Link } from "react-router-dom";
import * as FaIcon from "react-icons/fa";
import { useNavigationState } from "../AppWrapper";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AuthUser from "../interfaces/AuthUser";
import { AuthContext } from "../App";

const paths: string[] = ["/signup", "/login"];

const Nav = () => {
  const { toggleOpen } = useNavigationState();
  const location = useLocation();
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 50); // Adjust the offset as needed
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(authUser);

  return (
    <nav
      className={`z-10 top-0 flex items-center justify-between w-full py-4 px-4 ${
        paths.includes(location.pathname) ? "bg-white" : ""
      }`}
    >
      {" "}
      {location.pathname === "/" ? null : (
        <Link to="/" className="spartan text ">
          brownSugar
        </Link>
      )}
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
      {paths.includes(location.pathname) ? (
        location.pathname === "/signup" ? (
          <Link to="/login">LOG IN</Link>
        ) : (
          <Link to="/signup">SIGN UP</Link>
        )
      ) : (
        <div className="flex space-x-4 items-center">
          {authUser ? (
            <Link
              to="/profile"
              className="rounded-full bg-gray-800 text-white p-2 text-sm font-bold hover:opacity-80 transition"
            >
              {authUser.profile?.firstName[0]} {authUser.profile?.lastName[0]}
            </Link>
          ) : null}
          <button
            onClick={() => {
              toggleOpen();
            }}
            className="grid place-content-center h-10 w-10 opacity-100 duration-300 rounded-full hover:bg-amber-100 shadow-2xl md:opacity-0 transition-all pointer-events-auto md:pointer-events-none"
          >
            <FaIcon.FaBars className="text-2xl text-amber-800" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
