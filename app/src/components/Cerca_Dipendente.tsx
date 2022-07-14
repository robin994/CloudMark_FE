import React from 'react'
//import {Button} from 'react-bootstrap';

const CercaDipendente = () => {
  return (
    <>
  
        <div>
            <p>
            <input type="text" className="form-control cerca"placeholder="Search.."/>
            </p>
           

            <p>
            <input type="text" className="form-control nome"placeholder="Nome"/>
            </p>
            <p>
            <input type="text" className="form-control cognome"placeholder="Cognome"/>
            </p>
           <button className = "btn btn-primary" type="submit">Conferma</button>

        </div>
    </>
  )
}

export default CercaDipendente