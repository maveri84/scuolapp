
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

// Import pages
import Index from "./pages/Index";
import Attendance from "./pages/Attendance";
import Grades from "./pages/Grades";
import Students from "./pages/Students";
import Assignments from "./pages/Assignments";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Classes from "./pages/Classes"; // Add new Classes page

import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout
              open={sidebarOpen}
              setOpen={setSidebarOpen}
            >
              <Index />
            </DashboardLayout>
          }
        />
        <Route
          path="/attendance"
          element={
            <DashboardLayout
              open={sidebarOpen}
              setOpen={setSidebarOpen}
            >
              <Attendance />
            </DashboardLayout>
          }
        />
        <Route
          path="/grades"
          element={
            <DashboardLayout
              open={sidebarOpen}
              setOpen={setSidebarOpen}
            >
              <Grades />
            </DashboardLayout>
          }
        />
        <Route
          path="/students"
          element={
            <DashboardLayout
              open={sidebarOpen}
              setOpen={setSidebarOpen}
            >
              <Students />
            </DashboardLayout>
          }
        />
        <Route
          path="/assignments"
          element={
            <DashboardLayout
              open={sidebarOpen}
              setOpen={setSidebarOpen}
            >
              <Assignments />
            </DashboardLayout>
          }
        />
        <Route
          path="/messages"
          element={
            <DashboardLayout
              open={sidebarOpen}
              setOpen={setSidebarOpen}
            >
              <Messages />
            </DashboardLayout>
          }
        />
        <Route
          path="/classes"
          element={
            <DashboardLayout
              open={sidebarOpen}
              setOpen={setSidebarOpen}
            >
              <Classes />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout
              open={sidebarOpen}
              setOpen={setSidebarOpen}
            >
              <Settings />
            </DashboardLayout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
