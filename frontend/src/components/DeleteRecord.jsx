import React, { useState } from "react";
import DeleteStud from "./DeleteStud";
import DeleteAdmisType from "./DeleteAdmisType";

export default function DeleteRecord() {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <div className="container mt-5">
      <h2>Delete Record</h2>
      <div className="d-flex gap-3">
        <button
          className="btn btn-danger"
          onClick={() => setSelectedTable("stud")}
        >
          Delete Student Record
        </button>
        <button
          className="btn btn-warning"
          onClick={() => setSelectedTable("admis_type")}
        >
          Delete Admission Type
        </button>
      </div>

      {selectedTable === "stud" && <DeleteStud />}
      {selectedTable === "admis_type" && <DeleteAdmisType />}
    </div>
  );
}
