
import axios from 'axios'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './components/css_components/TabellaDipendenti.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'



const ListaDipendenti=(props:any)=> {


const [createdipendenti, setCreateDipendenti] = useState({
  
  first_name:'',
  last_name:'',
  cf: '',
  iban: '',
  id_contractType:'' ,
  email: '',
  phoneNumber: '',
  
})

  
  const [dipendenti, setDipendenti] = useState([])
 



  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  useEffect( () => {
    axios.get(`${process.env.REACT_APP_FASTAPI_URL}/employee`).then( resp => {
      const data = resp.data.data
      setDipendenti(Object.values(data))
  }).catch( err => { throw err })
  },[])
  console.log(dipendenti)
  
  
  function submit(e:any) {
      e.preventDefault();
      axios.post(`${process.env.REACT_APP_FASTAPI_URL}/employee/create/`,{
        first_name:createdipendenti.first_name,
        last_name:createdipendenti.last_name,
        cf:createdipendenti.cf,
        iban:createdipendenti.iban,
        id_contractType:createdipendenti.id_contractType,
        email:createdipendenti.email,
        phoneNumber:createdipendenti.phoneNumber,
        
      })
      .then(res=>{
        console.log(res.data)
      })
    }
   

    function handle(e:any){
      const newdata={...createdipendenti}
      newdata[e.target.id] = e.target.value
      setCreateDipendenti(newdata)
      console.log(newdata)
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
                  <form onSubmit={(e)=>submit(e)}>
                  <input onChange={(e)=>handle(e)} id="first_name" value={createdipendenti.first_name}className="form-control" placeholder="nome"  style={{marginTop:"1vh"}}></input>
                   <input onChange={(e)=>handle(e)} id="last_name"value={createdipendenti.last_name}className="form-control" placeholder="cognome" style={{marginTop:"1vh"}}></input>
                   <input onChange={(e)=>handle(e)} id="cf"value={createdipendenti.cf}className="form-control" placeholder="codice fiscale" style={{marginTop:"1vh"}}></input>
                   <input onChange={(e)=>handle(e)} id="iban"value={createdipendenti.iban}className="form-control" placeholder="iban" style={{marginTop:"1vh"}}></input>
                   <input onChange={(e)=>handle(e)} id="id_contractType"value={createdipendenti.id_contractType}className="form-control" placeholder="tipo contratto" style={{marginTop:"1vh"}}></input>
                   <input onChange={(e)=>handle(e)} id="email"value={createdipendenti.email}className="form-control" placeholder="email" style={{marginTop:"1vh"}}></input>
                   <input onChange={(e)=>handle(e)} id="phoneNumber"value={createdipendenti.phoneNumber}className="form-control" placeholder="telefono" style={{marginTop:"1vh"}}></input>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" type="submit">
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


