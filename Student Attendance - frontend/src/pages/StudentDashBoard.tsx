import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import Navbar from "../components/Navbar";
import "./studentDashboard.css";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import PiePercentage from "../components/PiePercentage";
import AttendanceBar from "../components/AttendanceBar"; // Import the AttendanceBar component

const StudentDashboard = ({ stud }: { stud: any }) => {
  return (
    <div>
      <Navbar />
      <Container
        maxWidth="lg"
        style={{ marginTop: "80px", marginBottom: "20px" }}
      >
        <h2>
          Hi Rohan, Welcome back
          <span className="handWaveIcon">
            <WavingHandIcon />
          </span>
        </h2>
        <Grid container spacing={3}>
          {/* First row */}
          {/* <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Paper style={{ backgroundColor: 'lightblue', padding: '10px', textAlign: 'center' }}>
                  Div 1
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper style={{ backgroundColor: 'lightgreen', padding: '10px', textAlign: 'center' }}>
                  Div 2
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper style={{ backgroundColor: 'lightyellow', padding: '10px', textAlign: 'center' }}>
                  Div 3
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper style={{ backgroundColor: 'lightpink', padding: '10px', textAlign: 'center' }}>
                  Div 4
                </Paper>
              </Grid>
            </Grid>
          
          </Grid> */}
          {/* Second row */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    boxShadow: "2px 5px 100px rgb(0 0 0 / 10%)",
                  }}
                >
                  <AttendanceBar stud={stud} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    boxShadow: "2px 5px 100px rgb(0 0 0 / 10%)",
                  }}
                >
                  <h4>Percentage Of Every Subject</h4>
                  <PiePercentage stud={stud} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default StudentDashboard;
