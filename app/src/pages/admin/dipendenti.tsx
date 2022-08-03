import axios from "axios";
import { useState, useEffect } from "react";


import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./components/css_components/TabellaDipendenti.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ListaDipendenti = (props: any) => {
  const [dipendenti, setDipendenti] = useState([]);

 


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [cf, setCf] = useState("");
  const [iban, setIban] = useState("");
  const [id_contractType, setId_contractType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [abilitato, setAbilitato] = useState(0);
  const [id_tipo_account, setid_tipo_account] = useState("");

  const [id_business, setid_business] = useState("");
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");
  const [serial_num, setserial_num] = useState(0);


  const [id_employee, setId_employee] = useState("");



  const [updatefirst_name, updatesetFirstName] = useState("");
  const [updatelast_name, updatesetLastName] = useState("");
  const [updatecf, updatesetCf] = useState("");
  const [updateiban, updatesetIban] = useState("");
  const [updateid_contractType, updatesetId_contractType] = useState("");
  const [updateemail, updatesetEmail] = useState("");
  const [updatephoneNumber, updatesetPhoneNumber] = useState("");
  const [updateid_employee, updatesetId_employee] = useState("");





  const [deleteshow, deletesetShow] = useState(false);
  const DeleteModalClose = () => deletesetShow(false);
  const DeleteModalShow = () => deletesetShow(true);



  const [updateshow, updatesetShow] = useState(false);
  const UpdateModalClose = () => updatesetShow(false);
  const UpdateModalShow = () => updatesetShow(true);


  const types: any = {
    '198ef11d-cf73-4245-8469-2ddfa9979acf': 'Indeterminato',
    '52fbe812-08f6-11ed-861d-0242ac120002': 'Determinato',
  
}

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_FASTAPI_URL}/employee/account/1614c896-ae46-42e4-b31a-ae395cd198cf`)
      .then((resp) => {
        const data = resp.data.data;
        setDipendenti(Object.values(data));
      })
      .catch((err) => {
        throw err;
      });

 
  }, []);






  console.log(dipendenti);

  function CreateEmployee() {
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/employee/create/account`, {
        first_name: first_name,
        last_name: last_name,
        cf: cf,
        iban: iban,
        id_contractType: id_contractType,
        email: email,
        phoneNumber: phoneNumber,
        user: user,
        password: password,
        abilitato: abilitato,
        id_tipo_account: id_tipo_account,
        id_business:id_business,
        start_date:start_date,
        end_date:end_date ,
        serial_num:serial_num
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

  
  }



  function DeleteEmployee(id_employee:any) {
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/employee/delete/?id_employee=${id_employee}`, {
        id:id_employee
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  function UpdateEmployee() {
    axios
      .post(`${process.env.REACT_APP_FASTAPI_URL}/employee/update/`, {
        first_name: updatefirst_name,
        last_name: updatelast_name,
        cf: updatecf,
        iban: updateiban,
        id_contractType: updateid_contractType,
        email: updateemail,
        phoneNumber: updatephoneNumber,
        id_employee:updateid_employee
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  let list = dipendenti.map((el:any,key:number) => {
    return {
      first_name: el["first_name"],
      last_name: el["last_name"],
      cf: el["cf"],
      iban: el["iban"],
      id_contractType:types[el["id_contractType"]],
      email: el["email"],
      phoneNumber: el["phoneNumber"],
      id_employee: el["id_employee"],

      user:el["user"],
      password: el["password"],
      abilitato: el["abilitato"],
      id_tipo_account: el["id_tipo_account"],
      id_account: el["id_account"],
      id_business: el["id_business"],
      start_date: el["start_date"],
      end_date: el["end_date"],
      serial_num: el["serial_num"]

    };
  });
  const rows = list;



  
  const columns: GridColDef[] = [
    {
      field: "serial_num",
      headerName: "serial_num",
      hide:true,
      width: 279,
      editable: true,
      
      
    },
    {
      field: "end_date",
      headerName: "end_date",
      hide:true,
      width: 279,
      editable: true,
      
    },
    {
      field: "start_date",
      headerName: "start_date",
      hide:true,
      width: 279,
      editable: true,
    },
    {
      field: "id_business",
      headerName: "id_business",
      hide:true,
      width: 279,
      editable: true,
    },
    {
      field: "id_account",
      headerName: "id_account",
      hide:true,
      width: 279,
      editable: true,
    },
    
    {
      field: "id_tipo_account",
      headerName: "id_tipo_account",
      hide:true,
      width: 279,
      editable: true,
    },
    {
      field: "abilitato",
      headerName: "abilitato",
      hide:true,
      width: 279,
      editable: true,
    },
    {
      field: "password",
      headerName: "Password",
      hide:true,
      width: 279,
      editable: true,
    },
    {
      field: "user",
      headerName: "User",
      hide:true,
      width: 279,
      editable: true,
    },
    {
      field: "id",
      headerName: "id employee",
      hide:true,
      width: 279,
      editable: true,
    },
    {
      field: "first_name",
      headerName: "First name",
      width: 279,
      editable: true,
    },
    { field: "last_name", headerName: "Last name", width: 279, editable: true },
    {
      field: "cf",
      headerName: "Codice Fiscale",
      type: "string",
      width: 279,
      editable: true,
    },
    { field: "iban", headerName: "iban", width: 279, editable: true },
    {
      field: "id_contractType",
      headerName: "Tipo Contratto",
      width: 279,
      editable: true,
    },
    { field: "email", headerName: "email", width: 279, editable: true },
    {
      field: "phoneNumber",
      headerName: "Telefono",
      width: 279,
      editable: true,
      
    },
    
    {
      field: "Actions",
      width: 279,
      renderCell: () => {
        return (
            <DeleteIcon onClick={() => {
              DeleteModalShow();
            }}
            >

            </DeleteIcon>
         
        );
      }
    },

    {
      field: "Update",
      width: 279,
      renderCell: () => {
        return (
        
            <EditIcon  onClick={() => {
              UpdateModalShow();
            }}
            >

            </EditIcon>
         
        );
      }
    }
    
    
  ];
  return (
    <>
      <div
        style={{
          marginTop: "2vh",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
          padding: "0.5rem",
          marginBottom: "2vh",
        }}
      >






        <Modal show={updateshow} onHide={UpdateModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Aggiorna Dipendente</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <input
              value={updateid_employee}
              onChange={(e) =>  updatesetId_employee(e.target.value)}
              id="id_employees"
              type="text"
              className="form-control"
              placeholder="id dipendente"
              style={{ marginTop: "1vh" }}
              
             
            ></input>
          <input
              value={updatefirst_name}
              onChange={(e) => updatesetFirstName(e.target.value)}
              id="first_names"
              type="text"
              className="form-control"
              placeholder="nome"
              style={{ marginTop: "1vh" }}
              required
            ></input>
            <input
              value={updatelast_name}
              onChange={(e) => updatesetLastName(e.target.value)}
              id="last_names"
              type="text"
              className="form-control"
              placeholder="cognome"
              style={{ marginTop: "1vh" }}
              required
            ></input>
            <input
              value={updatecf}
              onChange={(e) => updatesetCf(e.target.value)}
              id="cfs"
              className="form-control"
              type="text"
              placeholder="codice fiscale"
              style={{ marginTop: "1vh" }}
              required
            ></input>
            <input
              value={updateiban}
              onChange={(e) => updatesetIban(e.target.value)}
              id="ibans"
              className="form-control"
              type="text"
              placeholder="iban"
              style={{ marginTop: "1vh" }}
              required
            ></input>
            <input
              value={updateid_contractType}
              onChange={(e) => updatesetId_contractType(e.target.value)}
              id="id_contractTypes"
              className="form-control"
              type="text"
              placeholder="tipo contratto"
              style={{ marginTop: "1vh" }}
              required
            ></input>
            <input
              value={updateemail}
              onChange={(e) => updatesetEmail(e.target.value)}
              id="emails"
              className="form-control"
              type="email"
              placeholder="email"
              style={{ marginTop: "1vh" }}
              required
            ></input>
            <input
              value={updatephoneNumber}
              onChange={(e) => updatesetPhoneNumber(e.target.value)}
              id="telefono"
              type="tel"
              className="form-control"
              placeholder="telefono"
              style={{ marginTop: "1vh" }}
              required
            ></input>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={() => {
          UpdateEmployee();
          UpdateModalClose();
        }}>
              Aggiorna
            </Button>
            <Button variant="secondary" onClick={UpdateModalClose}>
              Annulla
            </Button>
          </Modal.Footer>
        </Modal>






        
        <Modal show={deleteshow} onHide={DeleteModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Elimina Dipendente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <input
              value={id_employee}
              onChange={(e) =>  setId_employee(e.target.value)}
              id="id_employee"
              type="text"
              className="form-control"
              placeholder="id_employee"
              style={{ marginTop: "1vh" }}
              required
            ></input>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" type="submit" onClick={() => {
          DeleteEmployee(id_employee);
          DeleteModalClose();
        }}>
              Elimina
            </Button>
            <Button variant="secondary" onClick={DeleteModalClose}>
              Annulla
            </Button>
          </Modal.Footer>
        </Modal>









        <Button
          variant="secondary"
          onClick={handleShow}
          style={{ marginTop: "2vh", marginLeft: "10px" }}
        >
          + Aggiungi Dipendente
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Aggiungi Dipendente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{display: "flex"}}>
            <input
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              id="first_name"
              type="text"
              className="form-control"
              placeholder="nome"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
            <input
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              id="last_name"
              type="text"
              className="form-control"
              placeholder="cognome"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
            </div>

            <div style={{display: "flex"}}>
            <input
              value={cf}
              onChange={(e) => setCf(e.target.value)}
              id="cf"
              className="form-control"
              type="text"
              placeholder="codice fiscale"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
            <input
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              id="iban"
              className="form-control"
              type="text"
              placeholder="iban"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
            </div>
            
            
            <div style={{display: "flex"}}>
              <input
              value={id_contractType}
              onChange={(e) => setId_contractType(e.target.value)}
              id="id_contractType"
              className="form-control"
              type="text"
              placeholder="tipo contratto"
              style={{ marginTop: "1vh" ,width: "50%"}}
              required
            ></input>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="form-control"
              type="email"
              placeholder="email"
              style={{ marginTop: "1vh" ,width: "50%"}}
              required
            ></input>
            </div>
            <div style={{display: "flex"}}>
              <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="phoneNumber"
              type="tel"
              className="form-control"
              placeholder="telefono"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
              <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              id="user"
              type="text"
              className="form-control"
              placeholder="user"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
            </div>
            
            <div style={{display: "flex"}}>
              <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              className="form-control"
              placeholder="password"
              style={{ marginTop: "1vh" ,width: "50%"}}
              required
            ></input>
            <input
              value={abilitato}
              onChange={(e) => setAbilitato(e.target.valueAsNumber)}
              id="abilitato"
              type="text"
              className="form-control"
              placeholder="abilitato"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
            </div>
            
            <div style={{display: "flex"}}>
              <input
              value={id_tipo_account}
              onChange={(e) => setid_tipo_account(e.target.value)}
              id="id_tipo_account"
              type="text"
              className="form-control"
              placeholder="id_tipo_account"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
             <input
              value={id_business}
              onChange={(e) => setid_business(e.target.value)}
              id="id_business"
              type="text"
              className="form-control"
              placeholder="id_business"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
            </div>
            
            
            <div style={{display: "flex"}}>
              <input
              value={start_date}
              onChange={(e) => setstart_date(e.target.value)}
              id="start_date"
              type="date"
              className="form-control"
              placeholder="start date"
              style={{ marginTop: "1vh",width: "50%" }}
              required
            ></input>
             <input
              value={end_date}
              onChange={(e) => setend_date(e.target.value)}
              id="end_date"
              type="date"
              className="form-control"
              placeholder="end date"
              style={{ marginTop: "1vh" ,width: "50%"}}
              required
            ></input>
            </div>
                  
            
             <input
              value={serial_num}
              onChange={(e) => setserial_num(e.target.valueAsNumber)}
              id="serial_num"
              type="text"
              className="form-control"
              placeholder="serial num"
              style={{ marginTop: "1vh" ,width: "100%"}}
              required
            ></input>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit" onClick={() => {
          CreateEmployee();
          handleClose();
        }}>
              Conferma
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Annulla
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div style={{ height: "80vh", width: "100%" }} className="custom-grid">
      
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          
          
          editMode="row"
          rowsPerPageOptions={[5]}
          checkboxSelection

          
          sx={{
            boxShadow: 20,
            
          }}
          
        />
      </div>
    </>
  );
};
export default ListaDipendenti;
