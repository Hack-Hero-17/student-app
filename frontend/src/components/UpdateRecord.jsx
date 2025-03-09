import React, { useState } from "react";
import UpdateStud from "./UpdateStud";
import UpdateAdmisType from "./UpdateAdmisType";

export default function UpdateRecord() {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <div className="container mt-5">
      <h2>Update Record</h2>
      <div className="d-flex gap-3">
        <button
          className="btn btn-primary"
          onClick={() => setSelectedTable("stud")}
        >
          Update Student Type
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setSelectedTable("admis_type")}
        >
          Update Admission Type
        </button>
      </div>

      {selectedTable === "stud" && <UpdateStud />}
      {selectedTable === "admis_type" && <UpdateAdmisType />}
    </div>
  );
}
