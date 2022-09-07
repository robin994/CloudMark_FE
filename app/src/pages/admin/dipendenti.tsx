import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Fade, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CustomToolbar from "./components/dipendenti-component/export"
import AggiungiDipendente from "./components/dipendenti-component/export"

import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  MuiEvent,
} from "@mui/x-data-grid";
import axios from "axios";
import * as React from "react";
// import "./css_components/TabellaPresenze.css";

const initialRows: GridRowsProp = [];

export default function FullFeaturedCrudGrid() {

  const [open, setOpen] = React.useState<any>(false);
  const [contractType, setContractType] = React.useState([]);
  const [pageSize, setPageSize] = React.useState<number>(14);//mettere a 14
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [dip, setDip] = React.useState([]);
  const [dipendentis, setdipendentis] = React.useState([]);

  React.useEffect(() => {
    getDipendenti();
    getContractType();
  }, [open]);

  function getContractType() {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/type/contract`).then((res) => {
      let arr: any = [];
      Object.values(res.data.data).forEach((el: any) => {
        console.log(el)
        arr.push({
          value: el.id_contract_type,
          label: `${el.name.charAt(0).toUpperCase() + el.name.slice(1)}`,
        });
      });
      setContractType(arr);
    });
  }

  const types: { [key: string]: string } = {

    "52fbe812-08f6-11ed-861d-0242ac120002": "determinato",
    "198ef11d-cf73-4245-8469-2ddfa9979acf": "indeterminato",
    "7e55494c-08f4-11ed-861d-0242ac120002": "administrator",
    "7e554b54-08f4-11ed-861d-0242ac120002": "dipendente",

    "124e4567-e85b-1fd3-a456-426614474000": "markup",
    "11111111-e85b-1fd3-a456-426614474000": "tamtung",
    "12455557-444b-1333-a886-426699994000": "pokia",
    "f565cec2-a3d9-4b9d-8600-0a3fd43dd5fb": "MARCO",
    "0": "Disabilitato",
    "1": "Abilitato"
  };
  
  async function getDipendenti() {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/all/employees/account/business/${sessionStorage.getItem("business_id")}`).then((res) => {
      setRows(
        Object.values(res.data.data).map((el: any) => {  //.employee , account, business
          return {
            id: el.employee["id_employee"],
            first_name: el.employee["first_name"],
            last_name: el.employee["last_name"],
            cf: el.employee["cf"],
            iban: el.employee["iban"],
            id_contractType: el.employee["id_contractType"],
            email: el.employee["email"],
            phoneNumber: el.employee["phoneNumber"],
            id_employee: el.employee["id_employee"],
            user: el.account["user"],
            password: el.account["password"],
            abilitato: el.account["abilitato"],
            id_tipo_account: el.account["id_tipo_account"],
            id_account: el.account["id_account"],
            id_business: el.business["id_business"],
            start_date: el.business["start_date"],
            end_date: el.business["end_date"],
            serial_num: el.business["serial_num"],
          };
        })
      );
    });
  }

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const Disabled = () => {

    let id: GridRowId = "";

    if (IDRowToDelete !== undefined) {
      id = IDRowToDelete;

      axios
        .request({
          url: `${process.env.REACT_APP_FASTAPI_URL}/employee/${id}/disabled`,
          method: "get",
          params: {
            id_employee: id,
          },
        })
        .then(() => {

          setOpen(false);
        });
    }
  };

  const Enable = () => {
    let id: GridRowId = "";
    if (IDRowToDelete !== undefined) {
      id = IDRowToDelete;

      axios
        .request({
          url: `${process.env.REACT_APP_FASTAPI_URL}/employee/${id}/enabled`,
          method: "get",
          params: {
            id_employee: id,
          },
        })
        .then(() => {

          setOpen(false);
        });
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log("aggiorno");
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/employee/update/`, {
        first_name: updatedRow.first_name,
        last_name: updatedRow.last_name,
        cf: updatedRow.cf,
        iban: updatedRow.iban,
        id_contractType: updatedRow.id_contractType,
        email: updatedRow.email,
        phoneNumber: updatedRow.phoneNumber,
        id_employee: updatedRow.id,

      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColumns = [
    {
      field: "first_name",
      renderHeader() {
        return (
          <strong className=""> Nome </strong>
        )
      },
      width: 150,
      editable: true,
    },
    {
      field: "last_name",
      renderHeader() {
        return (
          <strong className=""> Cognome </strong>
        )
      },
      width: 150,
      editable: true,
    },
    {
      field: "id_business",
      renderHeader() {
        return (
          <strong className=""> Nome Azienda </strong>
        )
      },
      width: 150,
      editable: false,
      hide:true,
      valueOptions: Object.keys(types).map((element) => {
        return { label: types[element], value: element };
      }),
      valueFormatter: ({ value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any, val: any) => {
          if (el.value === value) return el;
        });
        return option && option.label ? option.label : null;
      },
    },
    {
      field: "id_account",
      headerName: "Id Account",
      width: 200,
      editable: true,
      hide: true,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      type: "date",
      width: 200,
      editable: true,
      hide: true
    },
    {
      field: "end_date",
      headerName: "End Date",
      type: "date",
      width: 279,
      editable: true,
      hide: true
    },
    {
      field: "id_tipo_account",
      headerName: "Tipo Account",
      width: 150,
      flex: 0.3,
      editable: true,
      hide: true,
      valueOptions: Object.keys(types).map((element) => {
        return { label: types[element], value: element };
      }),
      valueFormatter: ({ value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any, val: any) => {
          if (el.value === value) return el;
        });
        return option && option.label ? option.label : null;
      },

    },
    {
      field: "abilitato",
      renderHeader() {
        return (
          <strong className=""> Abilitato </strong>
        )
      },
      type: "number",
      width: 100,
      editable: false,

      valueOptions: Object.keys(types).map((element) => {
        return { label: types[element], value: element };
      }),
      valueFormatter: ({ value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any, val: any) => {
          if (el.value === value) return el;
        });
        return option && option.label ? option.label : null;
      },

    },
    {
      field: "password",
      headerName: "Password",
      width: 200,
      flex: 0.3,
      editable: false,
      hide: true
    },

    {
      field: "user",
      renderHeader() {
        return (
          <strong className=""> User </strong>
        )
      },
      width: 200,
      flex: 0.3,
      editable: true,

    },
    {
      field: "id_employee",
      headerName: "Id Dipendente",
      width: 200,
      flex: 0.3,
      editable: false,
      hide: true,

    },
    {
      field: "cf",
      renderHeader() {
        return (
          <strong className=""> Codice Fiscale </strong>
        )
      },
      flex: 0.3,
      width: 200,
      editable: false,
    },
    {
      field: "iban",
      renderHeader() {
        return (
          <strong className=""> Iban </strong>
        )
      },
      width: 220,
      flex: 0.3,
      editable: true,
    },
    {
      field: "id_contractType",
      renderHeader() {
        return (
          <strong className=""> Tipo Contratto </strong>
        )
      },
      type:"singleSelect",
      width: 150,
      editable: true,
      valueOptions: contractType,
      valueFormatter: ({ value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any) => {
          if (el.value === value) return el;
        });
        return option && option.label ? option.label : null;
      },
    },
    {
      field: "email",

      renderHeader() {
        return (
          <strong className=""> Email</strong>
        )
      },
      width: 200,
      flex: 0.3,
      editable: true,
    },
    {
      field: "phoneNumber",

      renderHeader() {
        return (
          <strong className=""> Telefono </strong>
        )
      },
      width: 120,
      flex: 0.3,
      editable: true,
    },
    {
      field: "serial_num",
      headerName: "Serial Num",
      type: "number",
      width: 200,
      flex: 0.3,
      editable: true,
      hide: true

    },
    {
      field: "actions",
      type: "actions",
      renderHeader() {
        return (
          <strong className=""> Actions </strong>
        )
      },
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Tooltip title = "Salva">
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />
            </Tooltip>,
             <Tooltip title = "Annulla Modifiche">
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
            </Tooltip>,
          ];
        }

        return [
          <Tooltip title = "Modifica Dipendente">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />
          </Tooltip>,
           <Tooltip title = "Settings">
          <GridActionsCellItem
            icon={<SettingsIcon />}
            label="Enable"
            onClick={() => handleOpen(id)}
            color="inherit"
          />
          </Tooltip>,
        ];
      },
    },
  ];

  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "10px",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [IDRowToDelete, setIDRowToDelete] = React.useState<GridRowId>();
  const handleOpen = (id: GridRowId) => {
    setOpen(true);
    setIDRowToDelete(id);
  };

  return (
    <>
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[14]}
          pagination
          style={{ height: "89vh" }}
          autoHeight
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={
            {
              Toolbar: CustomToolbar
            }
          }
          componentsProps={{
            toolbar: { setRows, setRowModesModel, rows, dip, dipendentis },
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
        {open && (
          <div>
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2">
                  Il Dipendente non può essere Cancellato,
                  Vuoi Disabilitarlo?
                </Typography>
                <div style={{ display: "flex" }}>
                  <Button
                    onClick={() => Disabled()}
                    style={{ margin: "10px", height: "40px", width: "90px" }}
                    variant="outlined"
                  >
                    Disabilita
                  </Button>
                  <Button
                    onClick={() => Enable()}
                    style={{ margin: "10px", height: "40px", width: "90px" }}
                    variant="outlined"
                  >
                    Abilita
                  </Button>
                  <Button
                    onClick={() => setOpen(false)}
                    style={{ margin: "10px", height: "40px", width: "90px" }}
                    variant="outlined"
                  >
                    Annulla
                  </Button>
                </div>
              </Box>
            </Fade>
          </div>
        )}
      </Box>

    </>
  );
}