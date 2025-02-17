import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  const { currency, calculateAvgRating } = useContext(AppContext);
  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg">
      <img
        src={course.courseThumbnail}
        alt="course_thumbnail"
        className="w-full"
      />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">Skyy</p>
        <div className="flex items-center space-x-2">
          <p>{calculateAvgRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, idx) => {
              return (
                <img
                  className="w-3.5 h-3.5"
                  key={idx}
                  src={
                    idx < Math.floor(calculateAvgRating(course))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star_icon"
                />
              );
            })}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-gray-800">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default CourseCard;
