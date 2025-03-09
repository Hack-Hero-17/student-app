import React, { useState } from "react";
import axios from "axios";

export default function InsertStud() {
  const [studData, setStudData] = useState({
    stdid: "",
    stdname: "",
    gender: "",
    ad_year: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStudData({ ...studData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/insert-stud", studData)
      .then((response) => {
        setMessage(response.data.message);
        setStudData({ stdid: "", stdname: "", gender: "", ad_year: "" });
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        setMessage("Failed to insert record.");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Insert into Stud Table</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="number"
            className="form-control"
            name="stdid"
            value={studData.stdid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="stdname"
            value={studData.stdname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            className="form-control"
            name="gender"
            value={studData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Admission Year:</label>
          <input
            type="number"
            className="form-control"
            name="ad_year"
            value={studData.ad_year}
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
