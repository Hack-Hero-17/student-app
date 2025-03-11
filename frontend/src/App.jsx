import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ViewTables from "./components/ViewTables";
import UpdateRecord from "./components/UpdateRecord";
import ViewTable from "./components/ViewTable";
import DeleteRecord from "./components/DeleteRecord";
import "bootstrap/dist/css/bootstrap.min.css"; 
import InsertTable from "./components/InsertTable";
import InsertStud from "./components/InsertStud";
import InsertAdmisType from "./components/InsertAdmisType";

export default function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tables" element={<ViewTables />} />
        <Route path="/insert" element={<InsertTable />} />
        <Route path="/update" element={<UpdateRecord />} />
        <Route path="/delete" element={<DeleteRecord />} />
        <Route path="/insert-stud" element={<InsertStud />} />
        <Route path="/insert-admis-type" element={<InsertAdmisType />} />
        <Route path="/view-table/:tableName" element={<ViewTable />} />
      </Routes>
    </div>
  );
}
