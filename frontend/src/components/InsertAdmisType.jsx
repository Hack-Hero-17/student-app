import React, { useState } from "react";
import axios from "axios";

export default function InsertAdmisType() {
  const [admisTypeData, setAdmisTypeData] = useState({
    typeid: "",
    typename: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAdmisTypeData({ ...admisTypeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/insert-admis-type",
        admisTypeData
      );
      setMessage(response.data.message);
      setAdmisTypeData({ typeid: "", typename: "" });
    } catch (error) {
      console.error("Error inserting data:", error);
      setMessage("Failed to insert record.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Insert into Admis_Type Table</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type ID:</label>
          <input
            type="number"
            className="form-control"
            name="typeid"
            value={admisTypeData.typeid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type Name:</label>
          <input
            type="text"
            className="form-control"
            name="typename"
            value={admisTypeData.typename}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Insert Record
        </button>
      </form>
    </div>
  );
}
