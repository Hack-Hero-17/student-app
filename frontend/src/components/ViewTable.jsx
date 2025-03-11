import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewTable() {
  const { tableName } = useParams();
  const [columns, setColumns] = useState([]); 
  const [rows, setRows] = useState([]); 
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/table/${tableName}`)
      .then((response) => {
        setColumns(response.data.columns);
        setRows(response.data.rows);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
        setError("Failed to load table data.");
      });
  }, [tableName]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Table: {tableName}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {rows.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead className="thead-dark">
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  );
}
