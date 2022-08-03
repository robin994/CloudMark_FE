import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Fade, Typography } from "@mui/material";
import Box from "@mui/material/Box";
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
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [tipiPresenza, setTipiPresenza] = React.useState([]);
  const [aziende, setAziende] = React.useState([]);

  async function getCommesse() {
    axios
    .get(
      `${process.env.REACT_APP_FASTAPI_URL}/orders`
    )
    .then((res) => {
      setRows(
        Object.values(res.data.data).map((el: any) => {
          return {
            id: el["id_order"],
            description: el["descrption"],
            id_customer: el["id_customer"],
            id_business: el["id_business"],
            startDate: el["startDate"],
            endDate: el["endDate"],
          };
        })
      );
    });
}

 
 console.log(rows)
  React.useEffect(() => {
    getCommesse()
  }, []);
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

  const handleDeleteClick = () => () => {
    let id: GridRowId = "";
    if (IDRowToDelete !== undefined) {
      id = IDRowToDelete;

      axios
        .request({
          url: `${process.env.REACT_APP_FASTAPI_URL}/orders/delete/`,
          method: "post",
          params: {
            id_order: id,
          }
        })
        .then(() => {
          setRows(rows.filter((row) => row.id !== id));
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
      .post(`${process.env.REACT_APP_FASTAPI_URL}/orders/update`, {
        description: updatedRow.description,
        id_customer: updatedRow.id_customer,
        id_business: updatedRow.id_business,
        startDate: updatedRow.startDate.toISOString().split("T")[0],
        endDate: updatedRow.endDate.toISOString().split("T")[0],
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
      field: "id",
      headerName: "Id Commessa",
      width: 279,
      editable: false,
      hide: true,
    },
    {
      field: "description",
      headerName: "Descrizione",
      width: 279,
      editable: true,
      hide: false,
    },
    {
      field: "id_employee",
      headerName: "Id Dipendente",
      width: 279,
      editable: false,
      hide: true,
    },
    {
      field: "id_business",
      headerName: "Id Azienda",
      width: 279,
      editable: false,
    },
    {
      field: "startDate",
      type:"date",
      headerName: "Data Inizio",
      width: 279,
      editable: true,
    },
    {
      field: "endDate",
      type :"date",
      headerName: "Data Fine",
      width: 279,
      editable: true,    
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleOpen(id)}
            color="inherit"
          />,
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

  const [open, setOpen] = React.useState<any>(false);
  const [IDRowToDelete, setIDRowToDelete] = React.useState<GridRowId>();
  const handleOpen = (id: GridRowId) => {
    setOpen(true);
    setIDRowToDelete(id);
  };

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
        style={{height: '89vh'}}
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          // Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel, rows, tipiPresenza, aziende },
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
                component="h2"
              >
                Vuoi cancellarlo?
              </Typography>
              <div style={{ display: "flex" }}>
                <Button
                  onClick={handleDeleteClick()}
                  style={{ margin: "10px", height: "40px", width: "90px" }}
                  variant="outlined"
                >
                  SI
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  style={{ margin: "10px", height: "40px", width: "90px" }}
                  variant="outlined"
                >
                  NO
                </Button>
              </div>
            </Box>
          </Fade>
        </div>
      )}
    </Box>
  );
}
