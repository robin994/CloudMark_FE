import React from "react";
import './addAzienda.css'




export function addAziendaComponent(){
    return(
      <>
        <div className='cont_01 mt-5'>
          <div id='main_body'>
            <h3>Aggiungi Azienda</h3>
            <input type="text" className="form-control" placeholder='nome'/>
            <input type="text" className="form-control" placeholder='p_iva'/>
            <input type="text" className="form-control" placeholder='iban'/>
            <input type="text" className="form-control" placeholder='indirizzo'/>
            <input type="text" className="form-control" placeholder='telefono'/>
            <input type="text" className="form-control" placeholder='email'/>
          </div>
        </div>
      </>
    )
  }