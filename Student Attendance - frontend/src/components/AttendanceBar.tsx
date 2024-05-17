import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";

interface AttendanceData {
  month: string;
  presents: number;
}

interface AttendanceBarProps {
  stud: {
    attendance: AttendanceData[];
  };
}

const AttendanceBar: React.FC<AttendanceBarProps> = ({ stud }) => {
  const data: AttendanceData[] = stud.attendance;

  return (
    <div
      style={{
        height: "420px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "40px",
      }}
    >
      <ResponsiveContainer width="90%" height="70%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="presents" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <h4>Attendance Percentage per Month</h4>
    </div>
  );
};

export default AttendanceBar;
