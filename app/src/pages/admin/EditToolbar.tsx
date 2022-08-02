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
  tipiPresenza: [];
  rows: any;
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, rows, tipiPresenza } = props;
  const [show, setShow] = React.useState(false);
  const [idEmployee, setIdEmployee] = React.useState("");
  const [employee, setEmployee] = React.useState([])
  const [datePresence, setDatePresence] = React.useState(
    new Date().toDateString()
  );
  const [idTipoPresenza, setIdTipoPresenza] = React.useState<any>("");
  const [idOrder, setIdOrder] = React.useState("");
  const [hours, setHours] = React.useState("");
  const handleClose = () => setShow(false);
  let handleShow = () => {
    getEmployees()
    console.log(employee)
    setShow(true);
  };
  
    function getEmployees() {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/employee`).then((res) => {
      let arr: any = [];
      Object.values(res.data.data).forEach((el: any) => {
        arr.push({ value : el.id_employee, label : `${el.first_name.charAt(0).toUpperCase() + el.first_name.slice(1)} ${el.last_name.charAt(0).toUpperCase() + el.last_name.slice(1)}`});
        console.log(arr)
      });
      setEmployee(arr);
    });
  }

  function createPresence() {
    handleClose();
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/presence/create/`, {
        id_employee: idEmployee,
        date_presence: datePresence,
        id_tipoPresenza: idTipoPresenza,
        id_order: idOrder,
        hours: hours,
      })
      .then((newRow) => {
        axios
          .get(
            `${process.env.REACT_APP_FASTAPI_URL}/presence/all/first_name/last_name/`
          )
          .then((res) => {
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
        <Select
            hideSelectedOptions={false}
            placeholder="Seleziona Dipendente"
            isSearchable
            onChange={(e: any) => {
              setIdEmployee(e.value);
            }}
            options={employee}
          />
          {/* <input
            name="id"
            value={idEmployee}
            onChange={(e) => setIdEmployee(e.target.value)}
            id="id_dipendente"
            type="text"
            className="form-control"
            placeholder="id dipendente"
            style={{ marginTop: "1vh" }}
          ></input> */}
          <input
            value={datePresence}
            onChange={(e) => setDatePresence(e.target.value)}
            id="dataPresenza"
            type="date"
            className="form-control"
            placeholder="data presenza"
            style={{ marginTop: "1vh" }}
          ></input>
          <Select
            hideSelectedOptions={false}
            placeholder="Seleziona Tipo Presenza"
            isSearchable
            onChange={(e: any) => {
              setIdTipoPresenza(e.value);
            }}
            options={tipiPresenza}
          />
          <input
            value={idOrder}
            onChange={(e) => setIdOrder(e.target.value)}
            id="idCommessa"
            className="form-control"
            type="text"
            placeholder="Id Commessa"
            style={{ marginTop: "1vh" }}
          ></input>
          <input
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            id="hours"
            className="form-control"
            type="number"
            placeholder="Ore"
            style={{ marginTop: "1vh" }}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={createPresence}>
            Conferma
          </Button>
          <Button onClick={handleClose}>Annulla</Button>
        </Modal.Footer>
      </Modal>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default EditToolbar;