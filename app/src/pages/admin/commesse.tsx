import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PeopleIcon from '@mui/icons-material/People';
import { Button, Fade, Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
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
import EditToolbarCommesse from "./components/commessa-component/EditToolbarCommessa";
import { Container, Row } from "react-bootstrap";

const initialRows: GridRowsProp = [];

export default function FullFeaturedCrudGrid() {

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [business, setBusiness] = React.useState([]);
  const [customer, setCustomer] = React.useState([]);
  const navigate = useNavigate();
  const [employees, setEmployees] = React.useState([]);
  const id_business = sessionStorage.getItem("business_id")

  async function getCommesse() {
    axios.post(`${process.env.REACT_APP_FASTAPI_URL}/orders/business/${id_business}`).then((res) => {
      setRows(
        Object.values(res.data.data).map((el: any) => {
          return {
            id: el["id_order"],
            description: el["description"],
            id_customer: el["id_customer"],
            id_business: el["id_business"],
            startDate: el["startDate"],
            endDate: el["endDate"],
          };
        })
      );
    });
  }
  function getCustomers() {
    axios.post(`${process.env.REACT_APP_FASTAPI_URL}/customer/business/${id_business}`).then((res) => {
      let arr: any = [];
      Object.values(res.data.data).forEach((el: any) => {
        arr.push({
          value: el.id_customer,
          label: `${el.name.charAt(0).toUpperCase() + el.name.slice(1)
            } (p.iva: ${el.p_iva.charAt(0).toUpperCase() + el.p_iva.slice(1)})`,
        });
      });
      setCustomer(arr);
    });
  }
  function getBusiness() {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/business`).then((res) => {
      let arr: any = [];
      Object.values(res.data.data).forEach((el: any) => {
        arr.push({
          value: el.id_business,
          label: `${el.name.charAt(0).toUpperCase() + el.name.slice(1)
            } (p.iva:${el.p_iva.charAt(0).toUpperCase() + el.p_iva.slice(1)})`,
        });
      });
      setBusiness(arr);
    });
  }

  React.useEffect(() => {
    getCommesse();
    getBusiness();
    getCustomers();
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

  const updateError = () => {
    return "Errore";
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    let startData = updatedRow.startDate.toString().split("T")[0];
    let endDate = updatedRow.endDate.toString().split("T")[0];
    let payload = {
      id_order: updatedRow.id,
      description: updatedRow.description,
      id_customer: updatedRow.id_customer,
      id_business: updatedRow.id_business,
      startDate: startData,
      endDate: endDate,
    };
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/orders/update/`, payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  function openDipendenti(id: GridRowId) {
    navigate(`/commesse/dipendenti/${id}`)
  }
  const columns: GridColumns = [
    {
      field: "id",
      headerName: "Id Commessa",
      width: 279,
      editable: false,
      hide: true,
      flex: 0.3,
    },
    {
      field: "description",
      renderHeader() {
        return (
          <strong className=""> Descrizione </strong>
        )
      },
      width: 279,
      editable: true,
      hide: false,
      flex: 0.3,
    },
    {
      field: "id_customer",
      renderHeader() {
        return (
          <strong className=""> Cliente </strong>
        )
      },
      type: "singleSelect",
      width: 279,
      editable: true,
      hide: false,
      valueOptions: customer,
      valueFormatter: ({ value, field, api }) => {
        const colDef = api.getColumn(field);
        // eslint-disable-next-line array-callback-return
        const option = colDef.valueOptions.find((el: any) => {
          if (el.value === value) {
            return el;
          }
        });
        return option && option.label ? option.label : null;
      },
      flex: 0.3,
      renderCell: (el) => (
        <Container>
          <Row justify-center>
            <div className="col-8">
              <strong>{el.formattedValue}</strong>
            </div>
            <div className="col-2 offset-1">
              <Tooltip title="Apri Cliente">
                <Button
                  onClick={() => navigate(`/clienti/${el.row.id_customer}`)}
                  variant="contained"
                  size="small"
                  style={{ marginLeft: 0, blockSize: 25 }}
                >
                  Open
                </Button>
              </Tooltip>
            </div>
          </Row>
        </Container>
      ),
    },
    {
      field: "startDate",
      type: "date",
      renderHeader() {
        return (
          <strong className=""> Data Inizio </strong>
        )
      },
      width: 279,
      editable: true,
      flex: 0.3,
    },
    {
      field: "endDate",
      type: "date",
      renderHeader() {
        return (
          <strong className="">Data Fine </strong>
        )
      },
      width: 279,
      editable: true,
      flex: 0.3,
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
      flex: 0.1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Tooltip title="salva">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
            <Tooltip title="Annulla Modifiche">
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
          <Tooltip title="Modifica Commessa">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          </Tooltip>,
          <Tooltip title="Elimina Commessa">
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleOpen(id)}
              color="inherit"
            />
          </Tooltip>,
          <Tooltip title="Mostra Dipendenti su questa commessa">
            <GridActionsCellItem
              icon={<PeopleIcon />}
              label="View"
              className="textPrimary"
              onClick={() => openDipendenti(id)}
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
        style={{ height: "89vh" }}
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={updateError}
        components={{
          Toolbar: EditToolbarCommesse,
        }}
        componentsProps={{
          toolbar: { getCommesse, business, customer, getCustomers, employees },
          row: {
            style: { cursor: "context-menu" },
          },
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
