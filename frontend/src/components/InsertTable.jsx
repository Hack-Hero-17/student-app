import React from "react";
import { useNavigate } from "react-router-dom";

export default function InsertTable() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h2>Select Table to Insert Data</h2>
      <div className="mt-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => navigate("/insert-stud")}
        >
          Insert into Stud Table
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => navigate("/insert-admis-type")}
        >
          Insert into Admis_Type Table
        </button>
      </div>
    </div>
  );
}
