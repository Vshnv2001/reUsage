import React from "react";
import "./jsonToCSV.css";

function JsonToCSV({ jsonData }) {
  const columnHeaders = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

  return (
    <div className="csv-table-container">
      <table className="csv-table">
        <thead>
          <tr>
            <th>#</th> {/* Row number header */}
            {columnHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jsonData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td> {/* Row number */}
              {columnHeaders.map((header, index) => (
                <td key={index}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JsonToCSV;
