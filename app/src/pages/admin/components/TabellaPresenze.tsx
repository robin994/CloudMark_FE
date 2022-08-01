import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./css_components/TabellaPresenze.css";
import { Value } from "sass";

type rowModel = {
  date_presence: { value: string };
  first_name: { value: string };
  hours: { value: string };
  id: { value: string };
  last_name: { value: string };
  nome_azienda: { value: string };
  tipoPresenza: { value: string };
};

const TabellaPresenze = (props: any) => {
  const [presenze, setPresenze] = useState([]);
  const [editPresenze, setEditPresenze] = useState([]);
  const [editRowData, setEditRowData] = React.useState<rowModel>();
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [tipiPresenza, setTipiPresenza] = React.useState([])
  const [aziende, setAziende] = React.useState([])
  async function getPresenze() {
    axios
      .get(
        `${process.env.REACT_APP_FASTAPI_URL}/presence/all/first_name/last_name/`
      )
      .then((res) => {
        setPresenze(res.data.data);

      });
  }

  async function getTipiPresenza() {
    axios
      .get(
        `${process.env.REACT_APP_FASTAPI_URL}/type/presence`
      )
      .then((res) => {
        let arr: any = []
        res.data.data.forEach((el: any) => {
          arr.push({ value: el.id_presence_type, label: el.name })
          console.log(arr)
        });
        setTipiPresenza(arr);
      });
  }

  async function getAziende() {
    axios
      .get(
        `${process.env.REACT_APP_FASTAPI_URL}/business`
      )
      .then((res) => {
        let arr: any = []
        Object.values(res.data.data).forEach((el: any) => {
          arr.push({ value: el.id_business, label: el.name })
        });
        setAziende(arr);
      });
  }

  useEffect(() => {
    getPresenze();
    getTipiPresenza();
    getAziende();
  }, []);

  const rows = presenze.map((el) => {
    return {
      date_presence: el["date_presence"],
      first_name: el["first_name"],
      hours: el["hours"],
      id: el["id_employee"],
      last_name: el["last_name"],
      nome_azienda: el["id_business"],
      tipoPresenza: el["id_type_presence"],
    };
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id_employee",
      width: 279,
      editable: false,
      hide: true,
    },
    {
      field: "first_name",
      headerName: "First name",
      width: 279,
      editable: false,
    },
    { field: "last_name", headerName: "Last name", width: 279, editable: false },
    {
      field: "tipoPresenza",
      headerName: "tipoPresenza",
      type: "singleSelect",
      width: 279,
      editable: true,
      valueOptions: tipiPresenza,
      valueFormatter: ({value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any, val: any) => {
          if (el.value === value) return el
        });
        return option && option.label ? option.label : null;
      }
    },
    { field: "hours", headerName: "Ore", width: 279, editable: true, type: "number" },
    {
      field: "nome_azienda",
      headerName: "Commessa",
      width: 279,
      editable: true,
      type: "singleSelect",
      valueOptions: aziende,
      valueFormatter: ({value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any, val: any) => {
          if (el.value === value) return el
        });
        return option && option.label ? option.label : null;
      }
    },
    { field: "date_presence", headerName: "Data", width: 279, editable: true, type: "date", valueGetter: ({ value }) => value && new Date(value) },
  ];

  const handleEditRowsModelChange = React.useCallback(
    (model: any) => {
      console.log(model)
      const editedIds: any = Object.keys(model);
      // console.log(editedIds)
      if (editedIds.length === 0) {
        alert(JSON.stringify(editRowData, null, 4));
        // update on firebase
      } else {
        setEditRowData(model[editedIds[0]]);
      }
      setEditRowsModel(model);
      // console.log(model)
    },
    [editRowData]
  );
  console.log(aziende)
  const processRowUpdate = React.useCallback(
    (row: any) => {
      console.log(row)
      axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/insertUpdate`, {
        presences: [{
          id_employee: row.id,
          date_presence: row.date_presence,
          id_tipoPresenza: row.tipoPresenza,
          id_order: row.nome_azienda,
          hours: row.hours
        }]
      }).then(res => {
        console.log(res)
      }).catch(err => { console.log(err) })
    },
    []
  );

  const handleProcessRowUpdateError = React.useCallback(
    (error: any) => {
      console.log(error)
    },
    []
  );

  return (
    <div style={{ height: "89vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
};

export default TabellaPresenze;

