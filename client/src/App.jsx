import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
//Importing all pages and components:
import HomePage from "./pages/student-pages/HomePage";
import CoursesListPage from "./pages/student-pages/CoursesListPage";
import CourseDetailsPage from "./pages/student-pages/CourseDetailsPage";
import MyEnrollmentsPage from "./pages/student-pages/MyEnrollmentsPage";
import MediaPlayerPage from "./pages/student-pages/MediaPlayerPage";
import Loading from "./components/student/Loading"; //loading component
import InstructorPage from "./pages/instructor-pages/InstructorPage";
import Dashboard from "./pages/instructor-pages/Dashboard";
import AddCoursePage from "./pages/instructor-pages/AddCoursePage";
import MyCoursesPage from "./pages/instructor-pages/MyCoursesPage";
import StudentsEnrolledPage from "./pages/instructor-pages/StudentsEnrolledPage";
import Navbar from "./components/student/Navbar";

function App() {
  const isInstructor = useMatch("/instructor/*");

  return (
    <div className="text-default min-h-screen bg-white">
      {!isInstructor && <Navbar />}
      <Routes>
        {/* STUDENT ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/course-list" element={<CoursesListPage />} />
        <Route path="/course-list/:input" element={<CoursesListPage />} />
        <Route path="/course/:id" element={<CourseDetailsPage />} />
        <Route path="/my-enrollments" element={<MyEnrollmentsPage />} />
        <Route path="/media-player/:courseId" element={<MediaPlayerPage />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* INSTRUCTOR ROUTES */}
        <Route path="/instructor" element={<InstructorPage />}>
          <Route path="instructor" element={<Dashboard />} />
          <Route path="add-course" element={<AddCoursePage />} />
          <Route path="my-courses" element={<MyCoursesPage />} />
          <Route path="students-enrolled" element={<StudentsEnrolledPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
