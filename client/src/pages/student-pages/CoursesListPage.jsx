import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";
import { motion } from "framer-motion"; // Import Framer Motion

function CoursesListPage() {
  const { navigate, allCourses } = useContext(AppContext);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { input } = useParams();

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = input
        ? allCourses.filter((item) =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        : allCourses;

      setFilteredCourses(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      {/* Apply motion.div for page animation */}
      <motion.div
        className="relative md:px-36 px-8 pt-20 text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }} // Subtle fade-in effect
      >
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}>
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 hover:text-gray-800 text-gray-600">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="cross_icon"
              className="cursor-pointer"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )}

        {/* Wrap filtered courses grid in motion.div */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}>
          {filteredCourses.map((item, idx) => (
            <CourseCard key={idx} course={item} />
          ))}
        </motion.div>
      </motion.div>

      {/* Footer remains unaffected, no animation */}
      <Footer />
    </>
  );
}

export default CoursesListPage;
