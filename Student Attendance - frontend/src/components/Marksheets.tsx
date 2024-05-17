import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: "auto",
    marginTop: 20,
    padding: 20,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  tableContainer: {
    marginTop: 20,
    maxHeight: 400,
    overflowY: "auto",
  },
});

type MarksSheetProps = {
  studentName: string;
  rollNumber: string;
  marks: Record<string, number>;
};

const MarksSheet: React.FC<MarksSheetProps> = ({
  studentName,
  rollNumber,
  marks,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Student's Mark Sheet
      </Typography>
      <Typography variant="subtitle1">Name: {studentName}</Typography>
      <Typography variant="subtitle1">Roll Number: {rollNumber}</Typography>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell align="right">Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(marks).map(([subject, mark]) => (
              <TableRow key={subject}>
                <TableCell>{subject}</TableCell>
                <TableCell align="right">{mark}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MarksSheet;
