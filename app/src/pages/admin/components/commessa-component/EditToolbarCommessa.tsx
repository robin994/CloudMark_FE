import { Button } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

interface EditToolbarProps {
  customer: []
  getCommesse: any,
  business: [];
}

function EditToolbarCommesse(props: EditToolbarProps) {
  const { business, getCommesse, customer } = props;
  const [show, setShow] = React.useState(false);
  const [idCustomer, setIdCustomer] = React.useState("");
  const [idBusiness, setIdBusiness] = React.useState("");
  const [startDate, setStartDate] = React.useState<any>("");
  const [endDate, setEndDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const handleClose = () => setShow(false);
  let handleShow = () => {
    createOrder();
    setShow(true);
  };
  React.useEffect(() => {
    getCommesse();
  }, []);

  function createOrder() {
    handleClose();
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/orders/create/`, {
        id_customer: idCustomer,
        id_business: idBusiness,
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
      <Button onClick={handleShow} style={{ height: "29.33px" }}>
        <span style={{ fontSize: "30px", marginRight: "5px" }}>+</span>Aggiungi
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Presenza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
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
            <div>
              <Select
                hideSelectedOptions={false}
                placeholder="Seleziona Azienda"
                isSearchable
                onChange={(e: any) => {
                  setIdBusiness(e.value);
                }}
                options={business}
              />
            </div>
            <div>
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
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default EditToolbarCommesse;
