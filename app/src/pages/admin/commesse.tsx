import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import axios from 'axios'
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


  const [commesse, setCommesse] = useState([])

  useEffect( () => {
    axios(`${process.env.REACT_APP_FASTAPI_URL}/orders`).then( resp => {
      const data = resp.data.data
      setCommesse(Object.values(data))
  }).catch( err => { throw err })
  }, [])


  const[id_customer,setCustomer] = useState('')
  const[id_business,setBusiness] =useState('')
  const[description,setDescription] =useState('')
  const[startDate,setStartDate] = useState('')
  const[endDate,setEndDate] = useState('')

  function postData (){
   
    axios.post(`${process.env.REACT_APP_FASTAPI_URL}orders/create/`,{
      customer:id_customer,
      business:id_business,
      descrizione:description,
      startdate:startDate,
      enddate:endDate

    }).then(res=>{console.log(res)
    }).catch(err=>{console.log(err)})
    console.log('click funzia')
  }

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
      <form>
      <Modal.Body>
       

        <input onChange={(val)=> {setCustomer(val.target.value)}} type="text" placeholder="ID Cliente" className="form-control" style={{marginTop:"1vh"}} required></input>
        <input onChange={(val)=> {setBusiness(val.target.value)}} type="text" placeholder="ID Azienda" className="form-control" style={{marginTop:"1vh"}} required></input>
        <input onChange={(val)=>{setDescription(val.target.value)}} type="text" placeholder="Descrizione" className="form-control" style={{marginTop:"1vh"}} required></input>
        <input onChange={(val)=> {setStartDate(val.target.value)}} type="date" placeholder="Data Inizio" className="form-control" style={{marginTop:"1vh"}} required></input>
        <input onChange={(val)=> {setEndDate(val.target.value)}} type="date" placeholder="Data Fine" className="form-control" style={{marginTop:"1vh"}} required></input>
 
        </Modal.Body>
        
        <Modal.Footer>
          <Button onClick={postData} type="button">
            Inserisci Dati
          </Button>

        
        </Modal.Footer>
        </form>
      </Modal>
     
  
    </div>

    </div>

       <DataTable id="id_order" col={heading} rows={commesse} />
       
    </>
 

    
  )
}
