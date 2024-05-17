import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import Navbar from "../components/Navbar";

const StudentTable = () => {
  // Mock student data for testing
  const [students, setStudents] = useState<any[]>([]); // State for students data = useState();

  const [editMode, setEditMode] = useState(null); // State to track the student being edited
  const [filterRollNumber, setFilterRollNumber] = useState(""); // State for roll number filter
  const [selectedClass, setSelectedClass] = useState("ClassA");
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://192.168.1.13:5082/api/Student"); // Replace 'http://your-api-url/api/student' with your actual API endpoint
      if (response.ok) {
        const data = await response.json();
        console.log(data, "Data");
        setStudents(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSaveMarks = (studentId: number) => {
    setStudents((prevStudents: any) =>
      prevStudents?.map((student: any) =>
        student.id === studentId
          ? {
              ...student,
              marks: {
                maths: parseInt(student.maths),
                science: parseInt(student.science),
                english: parseInt(student.english),
                hindi: parseInt(student.hindi),
                sst: parseInt(student.sst),
              },
            }
          : student
      )
    );
    setEditMode(null);
    handleUpdate(studentId);
  };

  const handleUpdate = async (studentId: number) => {
    // alert(studentId);
    try {
      console.log(students, "students");
      const student = await students.find((s) => s.id == studentId);
      if (!student) {
        console.error("Student not found");
        return;
      }

      // Make the API call to update the student
      const response = await fetch(
        `http://192.168.1.13:5082/api/Student/${student.id}`,
        {
          method: "PUT", // Use the appropriate HTTP method for updating (PUT, PATCH, POST, etc.)
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        }
      );

      if (response.ok) {
        console.log("Student updated successfully");
        // Perform any additional actions after successful update if needed
      } else {
        console.error("Failed to update student");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleAttendanceChange = (studentId: number, value: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              attendance: student.attendance.map((record: any) =>
                record.month === currentMonth
                  ? { ...record, presents: parseInt(value) }
                  : record
              ),
            }
          : student
      )
    );
  };
  // Function to handle roll number filter change
  const handleFilterChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFilterRollNumber(e.target.value);
  };

  // Function to toggle edit mode for all students

  // Filter students based on roll number
  const filteredStudents = students?.filter((student) =>
    student.rollNumber.toLowerCase().includes(filterRollNumber.toLowerCase())
  );

  const handleClassChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedClass(event.target.value);
  };

  const handleMarksChangeEnglish = (studentId: any, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, english: parseInt(value) }
          : student
      )
    );
  };

  const handleMarksChangeMaths = (studentId: any, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, maths: parseInt(value) }
          : student
      )
    );
  };

  const handleMarksChangeScience = (studentId: any, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, science: parseInt(value) }
          : student
      )
    );
  };

  const handleMarksChangeSST = (studentId: any, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, sst: parseInt(value) }
          : student
      )
    );
  };

  const handleMarksChangeHindi = (studentId: any, value: string) => {
    setStudents((prevStudents) =>
      prevStudents?.map((student) =>
        student.id === studentId
          ? { ...student, hindi: parseInt(value) }
          : student
      )
    );
  };

  return (
    <div>
      <Navbar />
      <Container
        maxWidth="lg"
        style={{ marginTop: "80px", marginBottom: "20px" }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              label="Filter by Roll Number"
              variant="outlined"
              value={filterRollNumber}
              onChange={handleFilterChange}
              style={{ marginBottom: "20px" }}
            />
            {/* 
            <Select value={selectedClass} onChange={handleClassChange} displayEmpty>
              <MenuItem value="" disabled>
                Select Class
              </MenuItem>
              <MenuItem value="ClassA">Class A</MenuItem>
              <MenuItem value="ClassB">Class B</MenuItem>
            </Select> */}
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>English Marks</TableCell>
                  <TableCell>Hindi Marks</TableCell>
                  <TableCell>SST Marks</TableCell>
                  <TableCell>Maths Marks</TableCell>
                  <TableCell>Sceince Marks</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents?.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    {/* {Object.keys(student.marks).map((subject) => ( */}
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.english}
                          onChange={(e) =>
                            handleMarksChangeEnglish(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.english
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.hindi}
                          onChange={(e) =>
                            handleMarksChangeHindi(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.hindi
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.sst}
                          onChange={(e) =>
                            handleMarksChangeSST(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.sst
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.science}
                          onChange={(e) =>
                            handleMarksChangeScience(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.science
                      )}
                    </TableCell>
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={student.maths}
                          onChange={(e) =>
                            handleMarksChangeMaths(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.maths
                      )}
                    </TableCell>

                    {/* ))} */}
                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <TextField
                          type="number"
                          value={
                            student.attendance.find(
                              (item: { month: string }) =>
                                item.month === currentMonth
                            )?.presents || 0
                          }
                          onChange={(e) =>
                            handleAttendanceChange(student.id, e.target.value)
                          }
                        />
                      ) : (
                        student.attendance.find(
                          (item: { month: string }) =>
                            item.month === currentMonth
                        )?.presents || 0
                      )}
                    </TableCell>

                    <TableCell>
                      {editMode === student.id || editMode === "all" ? (
                        <Button
                          variant="contained"
                          onClick={() => handleSaveMarks(student.id)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => setEditMode(student.id)}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </div>
  );
};

export default StudentTable;
