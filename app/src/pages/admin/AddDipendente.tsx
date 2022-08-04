import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AddDipendente = () => {
  return (
    <>
    <div>

    <Card style={{ width: '18rem' }}>
     
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
            <div style={{display: 'flex'}}>
            <input placeholder="First Name" className="form-control" ></input>
            <input placeholder="Last Name"className="form-control"></input>
            </div>

            <div style={{display: 'flex'}}>
            <input placeholder="Cf"className="form-control"></input>
            <input placeholder="Iban"className="form-control"></input>
            </div>

            <div style={{display: 'flex'}}>
            <input placeholder="id Contratto"className="form-control"></input>
            <input placeholder="Email"className="form-control"></input>
            </div>

            <div style={{display: 'flex'}}>
            <input placeholder="Telefono"className="form-control"></input>
            <input placeholder="id Dipendente"className="form-control"></input>
            </div>

            <div style={{display: 'flex'}}>
            <input placeholder="User"className="form-control"></input>
            <input placeholder="Password"className="form-control"></input>
            </div>

            <div style={{display: 'flex'}}>
            <input placeholder="Abilitato"className="form-control"></input>
            <input placeholder="id Tipo Account"className="form-control"></input>
            </div>

            <div style={{display: 'flex'}}>
            <input placeholder="Id Account"className="form-control"></input>
            <input placeholder="Id Business"className="form-control"></input>
            </div>

            <div style={{display: 'flex'}}>
            <input placeholder="Start Date"className="form-control"></input>
            <input placeholder="End Date"className="form-control"></input>  
            </div>

            <div style={{display: 'flex'}}>
            <input placeholder="Serial Num"className="form-control"></input>
            </div>
        </Card.Text>
        <Button variant="primary" style={{width:"100%"}}>Conferma </Button>
      </Card.Body>
    </Card>
 
        
    </div>
    </>
  )
}

export default AddDipendente