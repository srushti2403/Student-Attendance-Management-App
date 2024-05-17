import React, { FC, ChangeEvent, MouseEvent, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

type Student = {
  id: number;
  name: string;
  rollNumber: string;
  marks: { [key: string]: number };
  attendance: number;
};

type AttendanceFormProps = {
  onUpdateAttendance: (attendanceData: Student[]) => void;
};

/**
 * Renders a form to update attendance for a list of students.
 *
 * @param {AttendanceFormProps} props - Object with a function to handle attendance update.
 * @return {JSX.Element} A JSX element containing a form to update attendance.
 */
const AttendanceForm: FC<AttendanceFormProps> = ({
  onUpdateAttendance,
}): JSX.Element => {
  const students: Student[] = [
    {
      id: 1,
      name: "John Doe",
      rollNumber: "Roll1",
      marks: { Maths: 85, Science: 90, English: 75, Hindi: 80, SST: 85 },
      attendance: 90,
    },
    {
      id: 2,
      name: "Jane Doe",
      rollNumber: "Roll2",
      marks: { Maths: 80, Science: 88, English: 82, Hindi: 75, SST: 90 },
      attendance: 95,
    },
    {
      id: 3,
      name: "Alice Smith",
      rollNumber: "Roll3",
      marks: { Maths: 92, Science: 85, English: 88, Hindi: 90, SST: 85 },
      attendance: 88,
    },
    {
      id: 4,
      name: "Bob Johnson",
      rollNumber: "Roll4",
      marks: { Maths: 78, Science: 90, English: 75, Hindi: 85, SST: 82 },
      attendance: 92,
    },
    {
      id: 5,
      name: "Emily Brown",
      rollNumber: "Roll5",
      marks: { Maths: 85, Science: 92, English: 90, Hindi: 78, SST: 88 },
      attendance: 85,
    },
  ];

  const [attendanceData, setAttendanceData] = useState<Student[]>(students);

  const handleAttendanceChange = (
    studentId: number,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === studentId
          ? { ...student, attendance: Number(event.target.value) }
          : student
      )
    );
  };

  const handleUpdateAttendance = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    onUpdateAttendance(attendanceData);
  };

  return (
    <Grid container spacing={2}>
      {attendanceData.map((student) => (
        <Grid item xs={12} key={student.id}>
          <TextField
            label={student.name}
            type="number"
            value={String(student.attendance)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleAttendanceChange(student.id, e)
            }
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={(e) => handleUpdateAttendance(e)}>
          Update Attendance
        </Button>
      </Grid>
    </Grid>
  );
};

export default AttendanceForm;
