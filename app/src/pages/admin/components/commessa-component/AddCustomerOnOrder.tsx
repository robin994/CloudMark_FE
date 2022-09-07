import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Alert, Modal } from "react-bootstrap";
import Select from "react-select";

interface EditToolbarProps {
  customer: []
  handleClose: any
}

function AddCustomerOnOrders(props: EditToolbarProps) {
  const { customer, handleClose } = props;
  const [employees, setEmployees] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [idOrder, setIdOrder] = React.useState("");
  const [idEmployee, setIdEmployee] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [confirmed, setConfirmed] = React.useState(false)

  React.useEffect(() => {
    getEmployees()
    getOrders()
  }, []);

  function getEmployees() {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/employee/business/${sessionStorage.getItem("business_id")}`).then((res) => {
      let arr: any = [];
      Object.values(res.data.data).forEach((el: any) => {
        arr.push({
          value: el.id_employee,
          label: `${el.first_name.charAt(0).toUpperCase() + el.first_name.slice(1)
            } ${el.last_name.charAt(0).toUpperCase() + el.last_name.slice(1)} (${el.email
            })`,
        });
      });
      setEmployees(arr);
    });
  }

  function getOrders() {
    axios.post(`${process.env.REACT_APP_FASTAPI_URL}/orders/business/${sessionStorage.getItem("business_id")}`).then((res) => {
      let arr: any = [];
      Object.values(res.data.data).forEach((el: any) => {
        arr.push({
          value: el.id_order,
          label: `${el.id_order}(${el.description})`,
        });
      });
      setOrders(arr);
    });
  }

  function Success() {
    return (
      <div className="container">
      <div className="row">
          <a className="btn btn-primary" data-toggle="modal" href="#ignismyModal">open Popup</a>
          <div className="modal fade" id="ignismyModal" role="dialog">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal" aria-label=""><span>×</span></button>
                       </div>
            
                      <div className="modal-body">
                         
              <div className="thank-you-pop">
                <img src="http://goactionstations.co.uk/wp-content/uploads/2017/03/Green-Round-Tick.png" alt=""/>
                <h1>Thank You!</h1>
                <p>Your submission is received and we will contact you soon</p>
                <h3 className="cupon-pop">Your Id: <span>12345</span></h3>
                
               </div>
                           
                      </div>
            
                  </div>
              </div>
          </div>
      </div>
  </div>
    )
  }

  function createOrderOnCustomer() {

    handleClose();
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/order/employee/create/`, {
        id_order: idOrder,
        id_employee: idEmployee,
        rate: Number(rate),
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Lega un dipendente ad una commessa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-2">
          <Select
            hideSelectedOptions={false}
            placeholder="Seleziona Commessa"
            isSearchable
            onChange={(e: any) => {
              setIdOrder(e.value);
            }}
            options={orders}
          />
        </div>
        <div className="mb-2">
          <Select
            hideSelectedOptions={false}
            placeholder="Seleziona Dipendente"
            isSearchable
            onChange={(e: any) => {
              setIdEmployee(e.value);
            }}
            options={employees}
          />
        </div>
        <div className="mb-2">
          <input
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            id="rate"
            className="form-control"
            type="number"
            placeholder="Inserisci Rate"
          ></input>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={createOrderOnCustomer}>
          Conferma
        </Button>
        <Button onClick={handleClose}>Annulla</Button>
      </Modal.Footer>
      <div>
      {confirmed ? (
      <Success/>
      ) : (<></>)}
      </div>
    </>

  );
}

export default AddCustomerOnOrders;


