import { MouseEvent } from "react";
import * as FaIcon from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigationState } from "../AppWrapper";
import NavigationLinks from "./NavigationLinks";

const variants = {
  open: {
    left: "0%",
  },
  closed: {
    left: "100%",
  },
};

const SideNav = () => {
  const { isOpen, toggleOpen } = useNavigationState();

  const goTo = (e: MouseEvent<HTMLButtonElement>) => {};
  return (
    <motion.nav
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      className={"absolute w-full h-full bg-white left-full"}
    >
      <motion.div className="flex items-center justify-between w-full py-4 px-4">
        <p className="spartan">brownSugar</p>
        <div className="flex space-x-6">
          <div className="space-x-2">
            <button
              name="login"
              onClick={goTo}
              className="bg-black text-white rounded-full px-4 py-2"
            >
              Login
            </button>
            <button
              name="signup"
              onClick={goTo}
              className="bg-black text-white rounded-full px-4 py-2"
            >
              Register
            </button>
          </div>
          <motion.button
            className="rounded-full flex justify-center items-center bg-black w-10"
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
