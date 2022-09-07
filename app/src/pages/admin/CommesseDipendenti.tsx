import { Box, Button, Fade, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColumns, GridRowId, GridRowsProp } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import axios from 'axios';
import React from 'react'
import { Link, useParams } from "react-router-dom";

const initialRows: GridRowsProp = [];
function CommesseDipendenti() {
  const [rows, setRows] = React.useState(initialRows);
  const [deleteRows, setDeleteRows] = React.useState<GridRowId>()
  const [open, setOpen] = React.useState<any>(false);
  const [empty, isEmpty] = React.useState(false)
  let params = useParams()
  let id_commessa = params.id_commessa
  React.useEffect(() => {
    getEmployeesFromOrder()
  }, []);

  function handleOpen(id: GridRowId) {
    setOpen(true);
    setDeleteRows(id)
  }

  function getEmployeesFromOrder() {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/employee/order/${id_commessa}`).then((res) => {

      if (res.data.data.length === 0) isEmpty(true)
      else {
        setRows(
          Object.values(res.data.data).map((el: any) => {
            return {
              id: el["id_employee"],
              first_name: el["first_name"],
              last_name: el["last_name"],
              cf: el["cf"],
              email: el["email"],
              phoneNumber: el["phone_number"],
            }
          })
        )
      }
    })
  }

  const handleDeleteClick = () => () => {
    let id: GridRowId = "";
    if (deleteRows !== undefined) {
      id = deleteRows;
      let payload = {
        id_order: String(id_commessa),
        id_employee: String(id),
      }

      axios
        .post(`${process.env.REACT_APP_FASTAPI_URL}/order/employee/delete/`, payload)
        .then((res) => {
          console.log(res)
          setRows(rows.filter((row) => row.id !== id));
          setOpen(false);
        });
    }
  };

  const columns: GridColumns = [
    { field: 'id', hide: true, headerName: 'id_commessa', editable: false, width: 279, flex: 0.2 },
    {
      field: 'first_name',
      renderHeader() {
        return (
          <strong className="">Nome </strong>
        )
      },
      width: 279,
      editable: false,
      flex: 0.3
    },
    {
      field: 'last_name',
      renderHeader() {
        return (
          <strong className=""> Cognome </strong>
        )
      },
      width: 279,
      editable: false,
      flex: 0.3
    },
    {
      field: 'cf',
      renderHeader() {
        return (
          <strong className=""> Codice Fiscale </strong>
        )
      },
      width: 279,
      editable: false,
      flex: 0.3
    },
    {
      field: 'email',
      renderHeader() {
        return (
          <strong className=""> Email </strong>
        )
      },
      width: 279,
      editable: false,
      flex: 0.3
    },
    {
      field: 'phoneNumber',
      renderHeader() {
        return (
          <strong className=""> Numero Telefono </strong>
        )
      },
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
    {
      field: 'actions',
      renderHeader() {
        return (
          <strong className=""> Actions </strong>
        )
      },
      type: 'actions',
      width: 279,
      flex: 0.1,
      hide: false,
      editable: false,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <Tooltip title = "Cancella dipendente su questa commessa">
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleOpen(id)}
            color="inherit"
          />
          </Tooltip>,
        ]
      }
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
  if (empty === true) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="error-template">
                <h1>
                  Oops!</h1>
                <h2>
                  Nessun Dipendente è su questa commessa</h2>
                <div className="error-details">
                  Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">

                  <Link to="/commesse" className="btn btn-link btn-lg">
                    <span className="glyphicon glyphicon-home"></span>
                    Vai a Commesse
                  </Link>
                </div>
                <div>
                  <Link to="/clienti" className="btn btn-link btn-lg">
                    <span className="glyphicon glyphicon-home"></span>
                    Vai a Clienti
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  else {
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
        <div className="error-actions">
          <Link to="/commesse" className="btn btn-link" style={{ fontSize: "15px", borderRadius: "0px" }}><span className=""></span>
            Vai a Commesse </Link>
          <Link to="/clienti/" className="btn btn-link" style={{ fontSize: "15px", borderRadius: "0px" }}><span className=""></span>
            Vai a Clienti </Link>
        </div>

        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
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
}

export default CommesseDipendenti

