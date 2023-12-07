import { Link, useParams } from "react-router-dom";
import * as FaIcon from "react-icons/fa";
import { useNavigationState } from "../AppWrapper";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App";
import NavLinks from "./NavLinks";

const Nav = () => {
  const { toggleOpen } = useNavigationState();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const { authUser } = useContext(AuthContext);
  const paths: string[] = [
    "/signup",
    "/login",
    `/profile/${id}`,
    "/book",
    `/book/${id}`,
  ];
  const navLinks = ["about", "services", "contacts", "book"];
  const navLinkClass =
    "cursor-pointer hover:bg-yellow-700 hover:text-white hover:shadow-2xl  px-2 rounded transiton-colors duration-300 pointer-events-none md:pointer-events-auto";

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

  return (
    <nav
      className={`z-10 top-0 flex items-center justify-between w-full py-4 px-4 ${
        paths.includes(pathname) ? "bg-white" : ""
      }`}
    >
      {pathname === "/" ? null : (
        <Link to="/" className="spartan text md:hidden">
          brownSugar
        </Link>
      )}
      <div className="flex items-center space-x-2 text-amber-6 neotoric">
        <div className="hidden space-x-2 py-2 md:opacity-100 md:flex transition-all">
          {navLinks.map((link) => {
            return (
              <NavLinks key={link} title={`/${link}`}>
                {link.toUpperCase()}
              </NavLinks>
            );
          })}
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        {authUser && !pathname.startsWith("/profile") ? (
          <Link
            to={`/profile/${authUser.id}/appointments`}
            className="flex items-center justify-center rounded-full bg-gray-800 text-white w-10 h-10 text-sm font-bold hover:opacity-80 transition"
          >
            <span>{authUser.profile?.firstName[0]}</span>{" "}
            <span>{authUser.profile?.lastName[0]}</span>
          </Link>
        ) : null}
        <button
          onClick={() => {
            toggleOpen();
          }}
          className={`grid place-content-center h-10 w-10 opacity-100 duration-300 rounded-full  shadow-2xl md:opacity-0 transition-all pointer-events-auto md:pointer-events-none ${
            paths.includes(pathname)
              ? "hover:bg-gray-200"
              : "hover:bg-amber-100"
          }`}
        >
          <FaIcon.FaBars
            className={
              paths.includes(pathname)
                ? "text-2xl text-black"
                : "text-2xl text-amber-800"
            }
          />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
