import React, { useState } from "react";
import axios from "axios";

export default function DeleteStud() {
  const [stdid, setStdid] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete-stud/${stdid}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error deleting student record");
    }
  };

  return (
    <div>
      <h3>Delete Student Record</h3>
      <input
        type="number"
        placeholder="Student ID"
        value={stdid}
        onChange={(e) => setStdid(e.target.value)}
        required
      />
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
}
