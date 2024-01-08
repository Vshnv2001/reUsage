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
  const columnHeaders = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Final Data and Scores</h1>
      <p className="records-count">{jsonData.length} rows</p>
      <div className="csv-table-container">
        <TableContainer component={Paper} style={{ overflowX: "auto" }}>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {" "}
            {/* Scrollable container */}
            <Table className="csv-table" aria-label="csv table" stickyHeader>
              <TableHead>
                <TableRow>
                  {columnHeaders.map((header, index) => (
                    <TableCell key={index} style={{ fontWeight: "bold" }}>
                      {header}
                    </TableCell>
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
          </div>
        </TableContainer>
      </div>
    </div>
  );
}

export default JsonToCSV;
