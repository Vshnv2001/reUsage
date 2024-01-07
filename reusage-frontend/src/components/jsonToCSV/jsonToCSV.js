import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./jsonToCSV.css";

function JsonToCSV({ jsonData }) {
  // Extract column headers from the first object in the array
  const columnHeaders = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

  return (
    <div className="csv-table-container">
      <p>Number of Records: {jsonData.length}</p>{" "}
      {/* Display the number of records */}
      <TableContainer component={Paper}>
        <Table className="csv-table" aria-label="csv table">
          <TableHead>
            <TableRow>
              {columnHeaders.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columnHeaders.map((header, index) => (
                  <TableCell key={index}>{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default JsonToCSV;
