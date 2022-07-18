import React from "react";
import './css_components/modAziendaAdmin.css'


export default function modAziendaAdmin(){

  return(
    <>

      <div className='cont_01 mt-5'>
        <div id="azienda_temp">
          <h3>Info Azienda</h3>
          <div className="form-control"></div>
          <div className="form-control"></div>
          <div className="form-control"></div>
          <div className="form-control"></div>
          <div className="form-control"></div>
          <div className="form-control"></div>
        </div>
        <div id='main_body'>
          <h3>Modifica Azienda</h3>
          <input type="text" className="form-control" placeholder='nome'/>
          <input type="text" className="form-control" placeholder='p_iva'/>
          <input type="text" className="form-control" placeholder='iban'/>
          <input type="text" className="form-control" placeholder='indirizzo'/>
          <input type="text" className="form-control" placeholder='telefono'/>
          <input type="text" className="form-control" placeholder='email'/>
          <button>Modifica Azienda</button>
        </div>
        
      </div>
    </>
  )
}