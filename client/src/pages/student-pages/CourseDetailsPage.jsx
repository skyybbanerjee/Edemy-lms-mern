import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

function CourseDetailsPage() {
  const [courseData, setCourseData] = useState(null);
  const {
    allCourses,
    calculateAvgRating,
    calculateCourseChapterTime,
    calculateCourseDuration,
    calculateLectureCount,
  } = useContext(AppContext);
  const { id } = useParams();

  async function fetchCourseData() {
    const foundCourse = allCourses.find((course) => course._id === id);
    setCourseData(foundCourse);
  }

  useEffect(() => {
    fetchCourseData();
  }, []);

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-[500px] -z-1 bg-gradient-to-b from-cyan-100/70"></div>

        {/* left column */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-4xl text-2xl font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}></p>
          {/* REVIEW AND RATING */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateAvgRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, idx) => {
                return (
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
                );
              })}
            </div>
            <p className="text-gray-500">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings > 1 ? "ratings" : "rating"})
            </p>
            <p className="text-blue-600">
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "students"}
            </p>
          </div>
          <p className="text-sm">
            Course by <span className="text-blue-600 underline">Skyy</span>
          </p>
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chap, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 bg-white mb-2 rounded">
                  <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                    <div className="flex items-center gap-2">
                      <img src={assets.down_arrow_icon} alt="down-arrow_icon" />
                      <p className="font-medium md:text-base text-sm">
                        {chap.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-[15px]">
                      {chap.chapterContent.length} lectures -{" "}
                      {calculateCourseChapterTime(chap)}
                    </p>
                  </div>
                  {/* CHAPTERS */}
                  <div className="overflow-hidden transition-all duration-300 max-h-96">
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chap.chapterContent.map((lecture, idx) => {
                        return (
                          <li key={idx} className="flex items-start gap-2 py-1">
                            <img
                              src={assets.play_icon}
                              alt="h-4 mt-1play_icon"
                              className="w-4 "
                            />
                            <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-[15px]">
                              <p>{lecture.lectureTitle}</p>
                              <div className="flex gap-2">
                                {lecture.isPreviewFree && <p>Preview</p>}
                                <p className="text-blue-500 cursor-pointer">
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60000,
                                    { units: ["h", "m"] }
                                  )}
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right column */}
        <div></div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default CourseDetailsPage;
