import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  //fetch all courses
  async function fetchAllCourses() {
    setAllCourses(dummyCourses);
  }

  //Calculate avg. rating
  function calculateAvgRating(course) {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  }

  //Calculate course chapter-duration
  function calculateCourseChapterTime(chapter) {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60000, { units: ["h", "m"] }); // convert ms to seconds
  }

  //Calculate course-duration
  function calculateCourseDuration(course) {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60000, { units: ["h", "m"] }); // convert ms to seconds
  }

  //Calculate No. of lectures in a given course
  function calculateLectureCount(course) {
    let count = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        count += chapter.chapterContent.length;
      }
    });
    return count;
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const ctxtValue = {
    currency,
    allCourses,
    navigate,
    calculateAvgRating,
    isEducator,
    setIsEducator,
    calculateCourseChapterTime,
    calculateCourseDuration,
    calculateLectureCount,
  };
  return (
    <AppContext.Provider value={ctxtValue}>
      {props.children}
    </AppContext.Provider>
  );
};
