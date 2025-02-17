import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, isEducator, setIsEducator } = useContext(AppContext);
  const isCourseListPage = location.pathname.includes("/course-list");
  //console.log(assets.user_icon);

  //clark setup
  const { openSignIn } = useClerk();
  const { user } = useUser();
  //console.log(user);

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}>
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        title="Home"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                onClick={() => navigate("/instructor")}
                className="cursor-pointer hover:text-gray-800">
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              |
              <Link to="/my-enrollments" className="hover:text-gray-800">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-5 py-2 rounded-full"
            onClick={() => openSignIn()}>
            Create Account
          </button>
        )}
      </div>
      {/* FOR PHONE-SCREENS */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button
                onClick={() => navigate("/instructor")}
                className="cursor-pointer hover:text-gray-800">
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              |<Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <>
            <UserButton />
          </>
        ) : (
          <>
            <button className="cursor-pointer" onClick={() => openSignIn()}>
              <img src={assets.user_icon} alt="user_icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
