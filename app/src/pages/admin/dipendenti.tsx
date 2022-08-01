
import axios from 'axios'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './components/css_components/TabellaDipendenti.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'



const ListaDipendenti=(props:any)=> {
  const [dipendenti, setDipendenti] = useState([])
 



  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [cf, setCf] = useState('')
  const [iban, setIban] = useState('')
  const [id_contractType, setId_contractType] = useState('')
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/employee`).then( resp => {
      const data = resp.data.data
      setDipendenti(Object.values(data))
  }).catch( err => { throw err })
  },[])
  console.log(dipendenti)
  
  function handleSubmit(){
      axios.post(`${process.env.REACT_APP_FASTAPI_URL}/employee/create/`,{
          first_name:first_name,
          last_name:last_name,
          cf:cf,
          iban:iban,
          id_contractType:id_contractType,
          email:email,
          phoneNumber:phoneNumber,
          
        }).then(res => { console.log(res) }).catch(err => { console.log(err) })
      

      
      console.log(first_name,last_name,cf,iban,id_contractType,email,phoneNumber)

    }

  let list = dipendenti.map(el => {
    return {
        first_name: el['first_name'],
        last_name:el['last_name'],
        cf: el['cf'],
        iban: el['iban'],
        id_contractType: el['id_contractType'],
        email: el['email'],
        phoneNumber: el['phoneNumber'],
        id: el['id_employee']
    }
})
const rows = list
const columns: GridColDef[] = [
    { field: 'first_name', headerName: 'First name', width: 279, editable: true },
    { field: 'last_name', headerName: 'Last name', width: 279, editable: true },
    { field: 'cf', headerName: 'Codice Fiscale', type: 'string', width: 279, editable: true },
    { field: 'iban', headerName: 'iban', width: 279, editable: true },
    { field: 'id_contractType', headerName: 'Tipo Contratto', width: 279, editable: true },
    { field: 'email', headerName: 'email', width: 279, editable: true },
    { field: 'phoneNumber', headerName: 'Telefono', width: 279, editable: true },  
]
return (
<>
<div style={{marginTop:"2vh",backgroundColor:"#ffffff",borderBottom:"1px solid black",borderTop:"1px solid black",padding:"0.5rem",marginBottom:"2vh"}}>

  <button className="btn btn-primary"  style={{marginTop:"2vh"}}>Salva</button>
  <Button variant="secondary" onClick={handleShow}  style={{marginTop:"2vh",marginLeft:"10px"}}>
                + Aggiungi Dipendente
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Dipendente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  
                  
                                   
                  <input value={first_name} onChange={(e) => setFirstName(e.target.value)} id="first_name" type="text"className="form-control" placeholder="nome"  style={{marginTop:"1vh"}} required></input>
                   <input value={last_name}  onChange={(e) => setLastName(e.target.value)} id="last_name" type="text"  className="form-control" placeholder="cognome" style={{marginTop:"1vh"}} required></input>
                   <input value={cf}  onChange={(e) => setCf(e.target.value)}  id="cf"className="form-control" type="text" placeholder="codice fiscale" style={{marginTop:"1vh"}} required></input>
                   <input  value={iban} onChange={(e) => setIban(e.target.value)} id="iban"className="form-control" type="text" placeholder="iban" style={{marginTop:"1vh"}} required></input>
                   <input  value={id_contractType} onChange={(e) => setId_contractType(e.target.value)} id="id_contractType"className="form-control" type="text" placeholder="tipo contratto" style={{marginTop:"1vh"}}required></input>
                   <input  value={email} onChange={(e) => setEmail(e.target.value)} id="email"className="form-control" type="email" placeholder="email" style={{marginTop:"1vh"}}required></input>
                   <input  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} id="phoneNumber" type="tel"className="form-control" placeholder="telefono" style={{marginTop:"1vh"}}required></input>
                 
                 
                 
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" type="submit" onClick={handleSubmit}>
                        Conferma
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Annulla
                    </Button>
                </Modal.Footer>
            </Modal>
  
</div>

<motion.div initial={{x : 100}} animate={{x : 0}} style={{ height: 400, width: '100%' }} className='custom-grid'>
            <DataGrid
                // components={{
                //     LoadingOverlay: LinearProgress
                // }}
                // loading
                rows={rows}
                columns={columns}
                pageSize={5}
                editMode='row'
                rowsPerPageOptions={[5]}
                checkboxSelection
                sx={{
                    boxShadow: 20
                }}
            />
  </motion.div>
  </>
    )
  }
  export default ListaDipendenti


