import { MouseEvent } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useNavigationState } from "../AppWrapper";

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
  const { toggleOpen } = useNavigationState();
  const navigate = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    toggleOpen();
  };

  return (
    <div className="flex flex-1 px-4">
      <motion.div variants={variants} className="flex flex-col space-y-8">
        <motion.div className="flex flex-col" variants={variants2}>
          <motion.h5 className="text-3xl font-bold">Services</motion.h5>
          <button name="services" className="self-start" onClick={navigate}>
            Service List
          </button>
          <Link to="/book">Book Appointment</Link>
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
