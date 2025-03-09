import React, { useState } from "react";
import axios from "axios";

export default function UpdateStud() {
  const [stdid, setStdid] = useState("");
  const [stdname, setStdname] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/update-stud", { stdid, stdname });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error updating student name");
    }
  };

  return (
    <div>
      <h3>Update Student Name</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="number"
          placeholder="Student ID"
          value={stdid}
          onChange={(e) => setStdid(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Student Name"
          value={stdname}
          onChange={(e) => setStdname(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
