import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

function CallToAction() {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}>
      <motion.h1
        className="text-xl md:text-4xl text-gray-800 font-semibold"
        variants={fadeInUp}>
        Learn anything, anytime, anywhere
      </motion.h1>
      <motion.p
        className="text-gray-500 sm:text-sm text-center"
        variants={fadeInUp}>
        Edemy is an innovative online LMS platform offering personalized
        courses, interactive content, <br />
        and expert-led learning to help users achieve personal and professional
        growth.
      </motion.p>
      <motion.div
        className="flex items-center font-medium gap-6 mt-4"
        variants={fadeInUp}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-10 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-500 cursor-pointer">
          Get started
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 hover:text-gray-600 cursor-pointer">
          Learn more <img src={assets.arrow_icon} alt="arrow_icon" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default CallToAction;
