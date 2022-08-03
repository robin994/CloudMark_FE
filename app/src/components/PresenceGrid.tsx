import axios from "axios";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { makeStyles } from "@mui/material";

export default function PresenceGrid() {
  const [presenze, setPresenze] = useState([]);

  async function getPresenze() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FASTAPI_URL}/presence/load`,
        {
          id_employee: sessionStorage.id_employee,
          year: 2022,
          month: 1,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("PRESENZE: -->", response.data.data);
      setPresenze(response.data.data);
    } catch (error) {
      throw error;
    }
  }

  const interpolateRows = () => {};
  const rows: GridRowsProp = [
    { id: 1, col1: "Hello", col2: "World" },
    { id: 2, col1: "DataGridPro", col2: "is Awesome" },
    { id: 3, col1: "MUI", col2: "is Amazing" },
  ];
  const columns: GridColDef[] = [
    { field: "col1", headerName: "Data", width: 300 },
    { field: "col2", headerName: "Ore", width: 150 },
    { field: "col3", headerName: "Column 2", width: 150 },
    { field: "col4", headerName: "Column 2", width: 150 },
    { field: "col5", headerName: "Column 2", width: 150 },
    { field: "col6", headerName: "Column 2", width: 150 },
  ];

  useEffect(() => {
    getPresenze();
  }, []);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid autoHeight rows={rows} columns={columns} />
    </div>
  );
}
