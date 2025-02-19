import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";
import { motion } from "framer-motion"; // Import Framer Motion

function MediaPlayerPage() {
  const { enrolledCourses, calculateCourseChapterTime } =
    useContext(AppContext);
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const { courseId } = useParams();

  function getCourseData() {
    enrolledCourses.map((course, idx) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  }

  function toggleSection(idx) {
    setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* LEFT-COLUMN */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData &&
              courseData.courseContent.map((chap, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className="border border-gray-300 bg-white mb-2 rounded">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(idx)}>
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        alt="down-arrow_icon"
                        className={`transform transition-transform ${
                          openSections[idx] ? "rotate-180" : ""
                        }`}
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chap.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-[15px]">
                      {chap.chapterContent.length} lectures -{" "}
                      {calculateCourseChapterTime(chap)}
                    </p>
                  </div>

                  {/* Collapsible Section with Framer Motion */}
                  <motion.div
                    initial={false}
                    animate={{ height: openSections[idx] ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden">
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chap.chapterContent.map((lecture, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.9, delay: idx * 0.1 }}
                          className="flex items-start gap-2 py-1">
                          <img
                            src={
                              false ? assets.blue_tick_icon : assets.play_icon
                            }
                            alt="player_icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-[15px]">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.lectureUrl && (
                                <p
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chap: idx + 1,
                                      lecture: idx + 1,
                                    })
                                  }>
                                  Watch
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
          </div>

          {/* COURSE-RATING with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this Course:</h1>
            <Rating initialRating={0} />
          </motion.div>
        </div>

        {/* RIGHT-COLUMN */}
        <div className="md:mt-10">
          {playerData ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between items-center mt-1">
                <p className="">
                  {playerData.chap}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                {/* {false} - Will change this when building the BE */}
                <button className="text-blue-600 hover:text-blue-500">
                  {false ? "Completed" : "Mark Completed"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={courseData ? courseData.courseThumbnail : ""}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MediaPlayerPage;
