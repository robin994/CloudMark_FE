import { useState } from "react";
import './addAzienda.css'

const AddAziendaComponent=()=>{
  const [inv, setInv] = useState(true)
  function okPop(){
    if(inv == true){
      setInv(false)
    }
  }
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
      <div id="alert_back">
        <div id="alert_container" hidden={inv}>
          <h1 onClick={okPop}>Hai sbagliato</h1>
          <button className="btn btn-primary">Ok</button>
        </div>
      </div>
    </>
  )
}

export default AddAziendaComponent