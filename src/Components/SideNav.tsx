import * as FaIcon from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigationState } from "../AppWrapper";
import NavigationLinks from "./NavigationLinks";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { useContext } from "react";

const variants = {
  open: {
    left: "0%",
  },
  closed: {
    left: "100%",
  },
};

const SideNav = () => {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isOpen, toggleOpen } = useNavigationState();

  const goTo = (path: string) => {
    navigate(path);
    toggleOpen();
  };

  const logOff = () => {};
  return (
    <motion.nav
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      className={"absolute w-full h-full bg-white left-full"}
    >
      <motion.div className="flex items-center justify-between w-full py-4 px-4">
        <p className="spartan">brownSugar</p>
        <div className="flex items-center space-x-6">
          {!authUser ? (
            <div className="space-x-2">
              <Link
                to="/login"
                onClick={() => goTo("/login")}
                className="bg-black text-white rounded-full px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => goTo("/signup")}
                className="bg-black text-white rounded-full px-4 py-2"
              >
                Register
              </Link>
            </div>
          ) : (
            <div>
              <button
                onClick={() => logOff()}
                className="bg-black text-white rounded-full px-4 py-2"
              >
                Log out
              </button>
            </div>
          )}

          <motion.button
            className="rounded-full flex justify-center items-center bg-black w-10 h-10"
            onClick={() => toggleOpen()}
          >
            <FaIcon.FaTimes className="text-white" />
          </motion.button>
        </div>
      </motion.div>

      <NavigationLinks />
    </motion.nav>
  );
};

export default SideNav;
