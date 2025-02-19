import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import Loading from "../../components/student/Loading";
import { motion } from "framer-motion";
import YouTube from "react-youtube";

function CourseDetailsPage() {
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(true);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateAvgRating,
    calculateCourseChapterTime,
    calculateCourseDuration,
    calculateLectureCount,
    currency,
  } = useContext(AppContext);

  const { id } = useParams();

  async function fetchCourseData() {
    const foundCourse = allCourses.find((course) => course._id === id);
    setCourseData(foundCourse);
  }

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  function toggleSection(idx) {
    setOpenSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }

  return courseData ? (
    <>
      <motion.div
        className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <motion.div
          className="absolute top-0 left-0 w-full h-[500px] -z-1 bg-gradient-to-b from-cyan-100/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}></motion.div>

        {/* Left column */}
        <motion.div
          className="max-w-xl z-10 text-gray-500"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}>
          <h1 className="md:text-4xl text-2xl font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}></p>

          {/* Review and Rating */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateAvgRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <img
                  className="w-3.5 h-3.5"
                  key={idx}
                  src={
                    idx < Math.floor(calculateAvgRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star_icon"
                />
              ))}
            </div>
            <p className="text-gray-500">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>
            <p className="text-blue-600">
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>
          <p className="text-sm">
            Course by <span className="text-blue-600 underline">Skyy</span>
          </p>

          {/* Course Structure */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chap, idx) => (
                <div
                  key={idx}
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
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[idx] ? "max-h-96" : "max-h-0"
                    }`}>
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chap.chapterContent.map((lecture, idx) => (
                        <li key={idx} className="flex items-start gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            alt="play_icon"
                            className="w-4"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-[15px]">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }>
                                  Preview
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Description */}
          <div className="py-20 text-sm md:text-[15px]">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <div
              className="pt-3 space-y-4"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription
                  .replace(
                    /<h2>/g,
                    '<h2 class="text-2xl font-semibold text-gray-800 mb-4">'
                  )
                  .replace(
                    /<p>/g,
                    '<p class="text-gray-600 leading-relaxed mb-4">'
                  )
                  .replace(/<ul>/g, '<ul class="list-disc pl-6 space-y-2">')
                  .replace(/<li>/g, '<li class="text-gray-600 leading-snug">'),
              }}></div>
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div
          className="max-w-[424px] z-10 shadow-2xl rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}>
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="course-thumbnail" />
          )}

          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                src={assets.time_left_clock_icon}
                alt="time_left-clock-icon"
                className="w-3.5"
              />

              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {courseData.discount}% off
              </p>
            </div>
            <div className="flex items-center text-sm md:text-[17px] gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star-icon" />
                <p>{calculateAvgRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="time_clock_icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson_icon" />
                <p>{calculateLectureCount(courseData)} lessons</p>
              </div>
            </div>
            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium">
              {isEnrolled ? "Enrolled | Go To Course" : "Enroll Now"}
            </button>
            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                <li>Lifetime access with free updates 💖</li>
                <li>Step-by-step, hands-on project guidance 📈</li>
                <li>Downloadable resources and source-code 📂</li>
                <li>Quizes to test your knowledge 🧠</li>
                <li>Certificate of completion 🏆</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
}

export default CourseDetailsPage;
