import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

function Companies() {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <motion.div
      className="pt-16"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}>
      <motion.p className="text-base text-gray-500" variants={fadeUp}>
        Trusted by learners from
      </motion.p>
      <motion.div
        className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5"
        variants={staggerContainer}>
        <motion.img
          src={assets.microsoft_logo}
          alt="microsoft_logo"
          className="w-20 md:w-28"
          variants={fadeUp}
        />
        <motion.img
          src={assets.walmart_logo}
          alt="walmart_logo"
          className="w-20 md:w-28"
          variants={fadeUp}
        />
        <motion.img
          src={assets.accenture_logo}
          alt="accenture_logo"
          className="w-20 md:w-28"
          variants={fadeUp}
        />
        <motion.img
          src={assets.adobe_logo}
          alt="adobe_logo"
          className="w-20 md:w-28"
          variants={fadeUp}
        />
        <motion.img
          src={assets.paypal_logo}
          alt="paypal_logo"
          className="w-20 md:w-28"
          variants={fadeUp}
        />
      </motion.div>
    </motion.div>
  );
}

export default Companies;
