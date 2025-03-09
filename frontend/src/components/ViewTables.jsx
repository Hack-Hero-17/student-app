import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ViewTables() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/tables")
      .then((response) => setTables(response.data))
      .catch((error) => {
        console.error("Error fetching tables:", error);
        setError("Failed to load tables.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Available Tables</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <ul className="list-group mt-3">
        {tables.length > 0 ? (
          tables.map((table, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {table}
              <Link
                to={`/view-table/${table}`}
                className="btn btn-primary btn-sm"
              >
                View
              </Link>
            </li>
          ))
        ) : (
          <li className="list-group-item">No tables found.</li>
        )}
      </ul>
    </div>
  );
}
