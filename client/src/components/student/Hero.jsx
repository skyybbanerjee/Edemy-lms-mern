import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

function Hero() {
  // Light animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}>
      <motion.h1
        className="md:text-4xl text-2xl relative font-bold text-gray-800 max-w-3xl mx-auto"
        variants={fadeUp}>
        Empower your future with the courses designed to{" "}
        <span className="text-blue-600">
          <img
            src={assets.sketch}
            alt="sketch_effect"
            className="md:block hidden absolute -bottom-7 right-0"
          />
          fit your choice.
        </span>
      </motion.h1>

      {/* Desktop Text */}
      <motion.p
        className="md:block hidden text-gray-500 max-w-2xl mx-auto"
        variants={fadeUp}>
        We bring together world-class instructors, interactive content and a
        supportive community to help you achieve your personal and professional
        goals.
      </motion.p>

      {/* Mobile Text */}
      <motion.p
        className="md:hidden text-gray-500 max-w-sm mx-auto"
        variants={fadeUp}>
        We bring together world-class instructors, interactive content to help
        you achieve your personal and professional goals.
      </motion.p>

      {/* Search Bar */}
      <motion.div variants={fadeUp}>
        <SearchBar />
      </motion.div>
    </motion.div>
  );
}

export default Hero;
