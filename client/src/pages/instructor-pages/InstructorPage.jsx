import React from "react";
import { Outlet } from "react-router-dom";

function InstructorPage() {
  return (
    <div>
      <h1>Instructor Page</h1>
      <Outlet />
    </div>
  );
}

export default InstructorPage;
