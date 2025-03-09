import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [message, setMessage] = useState("");

  const executeCursor = () => {
    axios
      .post("http://localhost:5000/api/run-cursor")
      .then((response) => setMessage(response.data.message))
      .catch((error) => setMessage("Failed to execute cursor"));
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Database Management</h1>
      <div className="d-flex flex-column gap-3">
        <Link to="/tables" className="btn btn-primary">
          View Tables
        </Link>
        <Link to="/insert" className="btn btn-success">
          Insert Record
        </Link>
        <Link to="/update" className="btn btn-warning">
          Update Record
        </Link>
        <Link to="/delete" className="btn btn-danger">
          Delete Record
        </Link>
        <button className="btn btn-primary mt-3" onClick={executeCursor}>
          "Run Cursor" to update the Type Column of Stud Table
        </button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
}
