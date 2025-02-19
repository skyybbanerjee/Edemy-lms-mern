import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import Footer from "../../components/student/Footer";
import { Line } from "rc-progress";

function MyEnrollmentsPage() {
  const { enrolledCourses, navigate, calculateCourseDuration } =
    useContext(AppContext);

  // Dummy progress-data
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 }, //1
    { lectureCompleted: 3, totalLectures: 3 }, //2
    { lectureCompleted: 4, totalLectures: 4 }, //3
    { lectureCompleted: 2, totalLectures: 4 }, //4
    { lectureCompleted: 4, totalLectures: 5 }, //5
    { lectureCompleted: 6, totalLectures: 6 }, //6
    { lectureCompleted: 3, totalLectures: 5 }, //7
    { lectureCompleted: 2, totalLectures: 4 }, //8
    { lectureCompleted: 4, totalLectures: 5 }, //9
    { lectureCompleted: 2, totalLectures: 4 }, //10
    { lectureCompleted: 3, totalLectures: 5 }, //11
    { lectureCompleted: 2, totalLectures: 4 }, //12
    { lectureCompleted: 3, totalLectures: 5 }, //13
    { lectureCompleted: 2, totalLectures: 4 }, //14
  ]);

  return (
    <>
      <motion.div
        className="md:px-36 px-4 pt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        <h1 className="text-2xl font-semibold mb-6">My Enrollments</h1>
        <div className="overflow-auto md:overflow-visible">
          {" "}
          {/* Allow scroll only on small screens */}
          <table className="table-auto w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border border-gray-200">
                <th className="px-2 py-3 font-semibold border border-gray-200 text-sm md:text-base">
                  Course
                </th>
                <th className="px-2 py-3 font-semibold border border-gray-200 text-sm md:text-base">
                  Duration
                </th>
                <th className="px-2 py-3 font-semibold border border-gray-200 text-sm md:text-base">
                  Completed
                </th>
                <th className="px-2 py-3 font-semibold border border-gray-200 text-sm md:text-base">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((enrolledCourse, idx) => (
                <motion.tr
                  key={idx}
                  className="border border-gray-200"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}>
                  <td className="px-3 py-3 flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                    <img
                      src={enrolledCourse.courseThumbnail}
                      alt="course-thumbnail"
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md border border-gray-200"
                    />
                    <div className="w-full">
                      <p className="font-medium text-gray-800 truncate">
                        {enrolledCourse.courseTitle}
                      </p>
                      <Line
                        strokeWidth={4}
                        strokeColor="#2563eb"
                        trailColor="#e5e7eb"
                        percent={
                          progressArray[idx]
                            ? (progressArray[idx].lectureCompleted * 100) /
                              progressArray[idx].totalLectures
                            : 0
                        }
                        className="w-full h-2 rounded-full mt-2"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-3 text-gray-700 border border-gray-200 text-sm md:text-base text-center">
                    {calculateCourseDuration(enrolledCourse)}
                  </td>
                  <td className="px-2 py-3 text-gray-700 border border-gray-200 text-sm md:text-base text-center">
                    {progressArray[idx] &&
                      `${progressArray[idx].lectureCompleted} / ${progressArray[idx].totalLectures}`}{" "}
                    <span>Lectures</span>
                  </td>
                  <td className="px-2 py-3 text-center border border-gray-200">
                    <button
                      onClick={() =>
                        navigate("/media-player/" + enrolledCourse._id)
                      }
                      className="px-2 py-1 md:px-3 md:py-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm rounded-md shadow-md">
                      {progressArray[idx] &&
                      progressArray[idx].lectureCompleted /
                        progressArray[idx].totalLectures ===
                        1
                        ? "Completed"
                        : "Ongoing"}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

export default MyEnrollmentsPage;
