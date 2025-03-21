
import React from "react";
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
import Classes from "./pages/Classes"; 
import Faculty from "./pages/Faculty";
import Calendar from "./pages/Calendar";
import Customization from "./pages/Customization";
import Administration from "./pages/Administration";
import Career from "./pages/Career";
import ClassRegister from "./pages/ClassRegister";
import LeaveRequests from "./pages/LeaveRequests";
import Database from "./pages/Database";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Index />
            </DashboardLayout>
          }
        />
        <Route
          path="/attendance"
          element={
            <DashboardLayout>
              <Attendance />
            </DashboardLayout>
          }
        />
        <Route
          path="/grades"
          element={
            <DashboardLayout>
              <Grades />
            </DashboardLayout>
          }
        />
        <Route
          path="/students"
          element={
            <DashboardLayout>
              <Students />
            </DashboardLayout>
          }
        />
        <Route
          path="/assignments"
          element={
            <DashboardLayout>
              <Assignments />
            </DashboardLayout>
          }
        />
        <Route
          path="/calendar"
          element={
            <DashboardLayout>
              <Calendar />
            </DashboardLayout>
          }
        />
        <Route
          path="/messages"
          element={
            <DashboardLayout>
              <Messages />
            </DashboardLayout>
          }
        />
        <Route
          path="/classes"
          element={
            <DashboardLayout>
              <Classes />
            </DashboardLayout>
          }
        />
        <Route
          path="/personnel"
          element={
            <DashboardLayout>
              <Faculty />
            </DashboardLayout>
          }
        />
        <Route
          path="/career"
          element={
            <DashboardLayout>
              <Career />
            </DashboardLayout>
          }
        />
        <Route
          path="/customization"
          element={
            <DashboardLayout>
              <Customization />
            </DashboardLayout>
          }
        />
        <Route
          path="/administration"
          element={
            <DashboardLayout>
              <Administration />
            </DashboardLayout>
          }
        />
        <Route
          path="/class-register"
          element={
            <DashboardLayout>
              <ClassRegister />
            </DashboardLayout>
          }
        />
        <Route
          path="/leave-requests"
          element={
            <DashboardLayout>
              <LeaveRequests />
            </DashboardLayout>
          }
        />
        <Route
          path="/database"
          element={
            <DashboardLayout>
              <Database />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
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
