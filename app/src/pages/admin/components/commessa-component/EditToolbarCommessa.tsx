import { Button, Tooltip } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import AddCustomerOnOrders from "./AddCustomerOnOrder";

interface EditToolbarProps {
  customer: []
  getCommesse: any,
  business: [];
}

function EditToolbarCommesse(props: EditToolbarProps) {
  const { business, getCommesse, customer } = props;
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [idCustomer, setIdCustomer] = React.useState("");
  const [employees, setEmployees] = React.useState([]);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  let handleShow = () => {
    setShow(true);
  };
  let handleShow2 = () => {
    setShow2(true);
  };
  React.useEffect(() => {
    getCommesse();
  }, []);

  function createOrder() {
    handleClose();
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/orders/create/`, {
        id_customer: idCustomer,
        id_business: sessionStorage.getItem("business_id"),
        startDate: startDate,
        endDate: endDate,
        description: description,
      })
      .then((newRows) => {
        getCommesse()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <GridToolbarContainer>
      <Tooltip title="Aggiungi una Commessa">
        <Button onClick={handleShow} style={{ height: "29.33px" }}>
          <span style={{ fontSize: "30px", marginRight: "5px" }}>+</span>Aggiungi
        </Button>
      </Tooltip>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Commessa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-2">
              <Select
                hideSelectedOptions={false}
                placeholder="Seleziona Cliente"
                isSearchable
                onChange={(e: any) => {
                  setIdCustomer(e.value);
                }}
                options={customer}
              />
            </div>
            <div className="mb-2">
            </div>
            <div className="mb-2">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="form-control"
                type="text"
                placeholder="Inserisci Descrizione"
              ></input>
            </div>
            <div>
              <label htmlFor="startDate">Data Inizio</label>
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                id="startDate"
                className="form-control"
                type="date"
                placeholder="Data Inizio Commessa"
              ></input>
            </div>
            <div>
              <label htmlFor="endDate">Data Fine </label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                id="endDate"
                className="form-control"
                placeholder="Data Fine Commessa"
                type="date"
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={createOrder}>
            Conferma
          </Button>
          <Button onClick={handleClose}>Annulla</Button>
        </Modal.Footer>
      </Modal>
      <Tooltip title="Esporta File">
        <GridToolbarExport />
      </Tooltip>
      <Tooltip title="Lega Dipendente su una Commessa">
      <Button onClick={handleShow2} style={{ height: "29.33px" }}>
        <span style={{ fontSize: "30px", marginRight: "5px", marginBottom: "4px" }}><PersonAddAlt1Icon style={{ fontSize: "20px" }} /></span>Lega Dipendente
      </Button>
      </Tooltip>
      <Modal show={show2} onHide={handleClose2}>
        <AddCustomerOnOrders
          customer={customer}
          handleClose={handleClose2}
        />
      </Modal>
    </GridToolbarContainer>

  );
}
export default EditToolbarCommesse;
