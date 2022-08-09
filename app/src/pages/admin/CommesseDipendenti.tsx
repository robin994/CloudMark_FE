import { Box } from '@mui/material';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';
import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const initialRows: GridRowsProp = [];
function CommesseDipendenti() {
  const [rows, setRows] = React.useState(initialRows);
  const navigate = useNavigate()
  let params = useParams()
  let id_commessa = params.id_commessa
  React.useEffect(() => {
    getEmployeesFromOrder()
  }, []);

  function getEmployeesFromOrder() {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/employee/order/${id_commessa}`).then((res) => {
      if (res.data.data.length === 0) navigate("/commesse/dipendenti/noEmployees")
      else {
        return setRows(
          Object.values(res.data.data).map((el: any) => {
            return {
              id: el["id_order"],
              first_name: el["first_name"],
              last_name: el["last_name"],
              cf: el["cf"],
              email: el["email"],
              phoneNumber: el["phone_number"],
              id_employee: el["id_employee"],
            };
          })
        );
      }
    })
  }

  const columns: GridColumns = [
    { field: 'id', hide: true, headerName: 'id_commessa', editable: false, width: 279, flex: 0.3 },
    {
      field: 'first_name',
      headerName: 'Nome',
      width: 279,
      editable: false,
      flex: 0.3
    },
    {
      field: 'last_name',
      headerName: 'Cognome',
      width: 279,
      editable: false,
      flex: 0.3
    },
    {
      field: 'cf',
      headerName: 'Codice Fiscale',
      width: 279,
      editable: false,
      flex: 0.3
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 279,
      editable: false,
      flex: 0.3
    },
    {
      field: 'phoneNumber',
      headerName: 'Numero Telefono',
      width: 279,
      editable: false,
      flex: 0.3
    },
    {
      field: 'id_employee',
      headerName: 'Id Dipendente',
      width: 279,
      hide: true,
      editable: false
    },
  ];

  return (
    <Box
      sx={{
        height: "89vh",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
      />
    </Box>
  );
}

export default CommesseDipendenti
