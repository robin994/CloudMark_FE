import { Business } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

interface EditToolbarProps {
  customer:[]
  getCommesse : any,
  business: [];
  rows: any;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbarCommesse(props: EditToolbarProps) {
  const { setRows, rows, business,getCommesse,customer } = props;
  const [show, setShow] = React.useState(false);
  const [idCustomer, setIdCustomer] = React.useState("");
  const [idBusiness, setIdBusiness] = React.useState("");
  const [startDate, setStartDate] = React.useState<any>("");
  const [endDate, setEndDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  const handleClose = () => setShow(false);
  let handleShow = () => {
    getCommesse();
    setShow(true);
  };

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
      .then((newRow) => {
        getCommesse
          .then((res:any) => {
            setRows(
              res.data.data?.map((el: any) => {
                return {
                  date_presence: el["date_presence"],
                  first_name: el["first_name"],
                  hours: el["hours"],
                  id: el["id_presence"],
                  id_employee: el["id_employee"],
                  id_order: el["id_order"],
                  last_name: el["last_name"],
                  nome_azienda: el["id_business"],
                  tipoPresenza: el["id_type_presence"],
                };
              })
            );
          });
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
