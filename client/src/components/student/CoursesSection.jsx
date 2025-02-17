import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";

function CoursesSection() {
  const { allCourses } = useContext(AppContext);

  // Animation Variants
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }, // Smooth easing
    },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } }, // Even stagger
  };

  return (
    <motion.div
      className="py-16 md:px-40 px-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}>
      <motion.h2
        className="text-3xl font-medium text-gray-800"
        variants={slideInFromLeft}>
        Learn from the best
      </motion.h2>
      <motion.p
        className="text-sm md:text-base text-gray-500 mt-3"
        variants={slideInFromLeft}>
        Discover our top-rated courses across various categories. From coding
        and design to <br /> business and wellness, our courses are crafted to
        deliver results.
      </motion.p>

      <motion.div
        className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] px-4 md:px-0 md:my-16 my-10 gap-4"
        variants={staggerContainer}>
        {allCourses.slice(0, 4).map((item, idx) => (
          <motion.div
            key={idx}
            variants={idx % 2 === 0 ? slideInFromLeft : slideInFromRight}
            className="transform transition-transform duration-500 hover:scale-105 overflow-hidden box-border"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}>
            <CourseCard course={item} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={slideInFromLeft}>
        <Link
          to="/course-list"
          onClick={() => scrollTo(0, 0)}
          className="text-gray-500 hover:text-gray-800 px-10 py-3 hover:border-gray-800 rounded border border-gray-500/30 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105">
          Show all courses
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default CoursesSection;
