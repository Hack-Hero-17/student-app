import React, { useState } from "react";
import axios from "axios";

export default function UpdateAdmisType() {
  const [typeid, setTypeid] = useState("");
  const [typename, setTypename] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/update-admis-type", {
        typeid,
        typename,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error updating admission type record");
    }
  };

  return (
    <div>
      <h3>Update Admission Type</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="number"
          placeholder="Type ID"
          value={typeid}
          onChange={(e) => setTypeid(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Type Name"
          value={typename}
          onChange={(e) => setTypename(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
