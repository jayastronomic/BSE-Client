import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useNavigationState } from "../AppWrapper";
import { useContext } from "react";
import { AlertBoxContext, AuthContext } from "../App";

const variants = {
  open: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const variants2 = {
  open: {
    y: 50,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 0,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const NavigationLinks = () => {
  const navigate = useNavigate();
  const { toggleOpen } = useNavigationState();
  const { authUser } = useContext(AuthContext);
  const { setLoginAlert } = useContext(AlertBoxContext);
  const goTo = (path: string) => {
    if (path === "/book") {
      if (!authUser) setLoginAlert(true);
      navigate(path);
      toggleOpen();
    } else {
      navigate(path);
      toggleOpen();
    }
  };

  return (
    <div className="flex flex-1 px-4">
      <motion.div variants={variants} className="flex flex-col space-y-8">
        <motion.div className="flex flex-col" variants={variants2}>
          <motion.h5 className="text-3xl font-bold">Get Started</motion.h5>
          <Link
            to="/services"
            className="self-start"
            onClick={() => goTo("/services")}
          >
            Services
          </Link>
          <Link to="/book" onClick={() => goTo("/book")}>
            Book Appointment
          </Link>
        </motion.div>

        <motion.div className="flex flex-col" variants={variants2}>
          <motion.h5 className="text-3xl font-bold">Company</motion.h5>
          <motion.p>About</motion.p>
          <motion.p>Contact</motion.p>
          <motion.div>News</motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NavigationLinks;
