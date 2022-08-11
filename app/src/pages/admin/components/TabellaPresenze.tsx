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
import { useNavigate } from "react-router-dom";
import "./css_components/TabellaPresenze.css";
import EditToolbar from "./presenze-components/EditToolbar";

const initialRows: GridRowsProp = [];

export default function FullFeaturedCrudGrid() {

  const [pageSize, setPageSize] = React.useState<number>(14);
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [tipiPresenza, setTipiPresenza] = React.useState([]);
  const [aziende, setAziende] = React.useState([]);
  const naviga = useNavigate()

  async function getPresenze() {
    axios
      .get(
        `${process.env.REACT_APP_FASTAPI_URL}/presence/all/first_name/last_name/`
      )
      .then((res) => {
        setRows(
          res.data.data?.map((el: any) => {
            return {
              date_presence: el["date_presence"],
              first_name:
                el["first_name"].charAt(0).toUpperCase() +
                el["first_name"].slice(1),
              hours: el["hours"],
              id: el["id_presence"],
              id_employee: el["id_employee"],
              id_order: el["id_order"],
              last_name:
                el["last_name"].charAt(0).toUpperCase() +
                el["last_name"].slice(1),
              nome_azienda: el["id_business"],
              tipoPresenza: el["id_type_presence"],
            };
          })
        );
      });
  }

  async function getTipiPresenza() {
    axios
      .get(`${process.env.REACT_APP_FASTAPI_URL}/type/presence`)
      .then((res) => {
        let arr: any = [];
        res.data.data.forEach((el: any) => {
          arr.push({ value: el.id_presence_type, label: el.name.charAt(0).toUpperCase() + el.name.slice(1) });
        });
        setTipiPresenza(arr);
      });
  }

  async function getAziende() {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/business`).then((res) => {
      let arr: any = [];
      Object.values(res.data.data).forEach((el: any) => {
        arr.push({ value: el.id_business, label: `${el.name.charAt(0).toUpperCase() + el.name.slice(1)}   (P.IVA: ${el.p_iva})` });
      });
      setAziende(arr);
    });
  }

  React.useEffect(() => {
    getPresenze();
    getTipiPresenza();
    getAziende();
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
    let id_employee = "";
    if (IDRowToDelete !== undefined) {
      id = IDRowToDelete;
      for (let row of rows) {
        if (row["id"] === id) {
          id_employee = row["id_employee"];
        }
      }
      axios
        .request({
          url: `${process.env.REACT_APP_FASTAPI_URL}/presence/delete/`,
          method: "post",
          params: {
            id_presence: id,
            id_employee: id_employee,
          },
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
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/presence/insertUpdate`, {
        id_presence: updatedRow.id,
        id_employee: updatedRow.id_employee,
        date_presence: updatedRow.date_presence.toISOString().split("T")[0],
        id_tipoPresenza: updatedRow.tipoPresenza,
        id_order: updatedRow.nome_azienda,
        hours: updatedRow.hours,
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
      headerName: "id_presence",
      width: 279,
      editable: false,
      hide: true,
    },
    {
      field: "id_employee",
      headerName: "id_employee",
      width: 279,
      editable: false,
      hide: true,
    },
    {
      field: "id_order",
      headerName: "id_order",
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
    {
      field: "last_name",
      headerName: "Last name",
      width: 279,
      editable: false,
    },
    {
      field: "tipoPresenza",
      headerName: "tipoPresenza",
      type: "singleSelect",
      width: 279,
      editable: true,
      valueOptions: tipiPresenza,
      valueFormatter: ({ value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any, val: any) => {
          if (el.value === value) return el;
        });
        return option && option.label ? option.label : null;
      },
    },
    {
      field: "hours",
      headerName: "Ore",
      width: 279,
      editable: true,
      type: "number",
    },
    {
      field: "nome_azienda",
      headerName: "Commessa",
      width: 279,
      editable: true,
      type: "singleSelect",
      valueOptions: aziende,
      valueFormatter: ({ value, field, api }) => {
        const colDef = api.getColumn(field);
        const option = colDef.valueOptions.find((el: any, val: any) => {
          if (el.value === value) return el;
        });
        return option && option.label ? option.label : null;
      },
    },
    {
      field: "date_presence",
      headerName: "Data",
      width: 279,
      editable: true,
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
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
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[14]}
        pagination
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
          Toolbar: EditToolbar,
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
