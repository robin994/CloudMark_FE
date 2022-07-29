import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./css_components/TabellaPresenze.css";

const TabellaPresenze = (props: any) => {
  const [presenze, setPresenze] = useState([]);
  const [editPresenze, setEditPresenze] = useState([]);
  const [editRowData, setEditRowData] = React.useState({});
  const [editRowsModel, setEditRowsModel] = React.useState({});

  async function getPresenze() {
    axios
      .get(
        `${process.env.REACT_APP_FASTAPI_URL}/presence/all/first_name/last_name/`
      )
      .then((res) => {
        setPresenze(res.data.data);
      });
  }

  async function editGetPresenze() {
    axios
      .get(`${process.env.REACT_APP_FASTAPI_URL}/presence/employee/`)
      .then((res) => {
        setEditPresenze(res.data.data);
      });
  }

  useEffect(() => {
    getPresenze();
    editGetPresenze();
  }, []);

  let list = presenze.map((el) => {
    return {
      date_presence: el["date_presence"],
      first_name: el["first_name"],
      hours: el["hours"],
      id: el["id_employee"],
      last_name: el["last_name"],
      nome_azienda: el["nome_azienda"],
      tipoPresenza: el["tipoPresenza"],
    };
  });

  const rows = list;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id_employee",
      width: 279,
      editable: true,
      hide: true,
    },
    {
      field: "first_name",
      headerName: "First name",
      width: 279,
      editable: true,
    },
    { field: "last_name", headerName: "Last name", width: 279, editable: true },
    {
      field: "tipoPresenza",
      headerName: "tipoPresenza",
      type: "string",
      width: 279,
      editable: true,
    },
    { field: "hours", headerName: "Ore", width: 279, editable: true },
    {
      field: "nome_azienda",
      headerName: "Commessa",
      width: 279,
      editable: true,
    },
    { field: "date_presence", headerName: "Data", width: 279, editable: true },
  ];

  const handleEditRowsModelChange = React.useCallback(
    (model: any) => {
      const editedIds = Object.keys(model);

      if (editedIds.length === 0) {
        alert(JSON.stringify(editRowData, null, 4));
        // update on firebase
      } else {
        setEditRowData(model[editedIds[0]]);
      }
      setEditRowsModel(model);
    },
    [editRowData]
  );

  console.log(editRowData);

  return (
    <div style={{ height: "89vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
      />
    </div>
  );
};

export default TabellaPresenze;
