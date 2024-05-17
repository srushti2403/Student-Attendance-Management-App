import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginForm } from "./pages/LoginForm";
import SignUpTeacher from "./pages/SignUpTeacher";
import SignUpStudent from "./pages/SignUpStudent";
import StudentDashBoard from "./pages/StudentDashBoard";
import TeacherDashBoard from "./pages/TeacherDashBoard";
import AttendanceForm from "./components/AttendanceForm";

type AppProps = {
  // No props needed for this component
};

const App: React.FC<AppProps> = (): JSX.Element => {
  const [stud, setStud] = React.useState<string>("");

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginForm setStud={setStud} />} />
          <Route path="/signUpTeacher" element={<SignUpTeacher />} />
          <Route
            path="/signUpStudent"
            //@ts-ignore
            element={<SignUpStudent setStud={setStud} />}
          />
          <Route
            path="/studentDashboard"
            element={<StudentDashBoard stud={stud} />}
          />
          <Route path="/teacherDashboard" element={<TeacherDashBoard />} />
          <Route
            path="/attendanceFrom"
            element={
              <AttendanceForm
                onUpdateAttendance={function (
                  attendanceData: {
                    id: number;
                    name: string;
                    rollNumber: string;
                    marks: { [key: string]: number };
                    attendance: number;
                  }[]
                ): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
