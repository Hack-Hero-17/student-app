import React, { useState } from "react";
import axios from "axios";

export default function DeleteAdmisType() {
  const [typeid, setTypeid] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete-admis-type/${typeid}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error deleting admission type record");
    }
  };

  return (
    <div>
      <h3>Delete Admission Type</h3>
      <input
        type="number"
        placeholder="Type ID"
        value={typeid}
        onChange={(e) => setTypeid(e.target.value)}
        required
      />
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
}
