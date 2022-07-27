import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import Axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const heading = {
  id_order: "ID commessa",
  id_customer: "ID cliente",
  id_business: "ID azienda",
  description: "Descrizione",
  startDate: "Data inizio",
  endDate: "Data fine"
}



export default function Commesse() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commesse, setCommesse] = useState([])

  useEffect( () => {
    Axios("http://localhost:8000/orders").then( resp => {
      const data = resp.data.data
      setCommesse(Object.values(data))
  }).catch( err => { throw err })
  }, [])

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  return (
    <>

    <div style={{backgroundColor:"gainsboro",borderBottom: "1px solid black",borderTop: "1px solid black",padding:"0.5rem",marginTop: "5vh",display: "flex"}}>
    <div>
      <h1>Commessa</h1>
     
      <Button variant="primary" onClick={handleShow}>
      Aggiungi Commessa
    </Button>
    
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Inserisci Commessa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input id="id_order"   type="text" placeholder="ID Commessa" className="form-control"></input>
        <input id="id_customer"  type="text" placeholder="ID Cliente" className="form-control" style={{marginTop:"1vh"}} required></input>
        <input id="id_business"  type="text" placeholder="ID Azienda" className="form-control" style={{marginTop:"1vh"}} required></input>
        <input id="description"   type="text" placeholder="Descrizione" className="form-control" style={{marginTop:"1vh"}} required></input>
        <input id="startDate"  type="date" placeholder="Data Inizio" className="form-control" style={{marginTop:"1vh"}} required></input>
        <input id="endDate"  type="date" placeholder="Data Fine" className="form-control" style={{marginTop:"1vh"}} required></input>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose} type="submit" style={{width:"100%"}}>
            Inserisci Dati
          </Button>
        
        </Modal.Footer>
      </Modal>
     
  
    </div>

    </div>

       <DataTable id="id_order" col={heading} rows={commesse} />
       
    </>
 

    
  )
}
