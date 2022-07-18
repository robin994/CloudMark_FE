import React, {useState} from "react";
import './css_components/ModAziendaAdmin.css'



function ModAziendaAdmin(){
  const [nome, setNome] = useState('')
  const [p_iva, setP_iva] = useState('')
  const [iban, setIban] = useState('')
  const [indirizzo, setIndirizzo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [pop, setPop] = useState(true)
  const [error, setError] = useState("")
  function controlInfo(){
    
  }
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
          <input type="text" className="form-control" placeholder='nome' id="nome" onChange={(val)=>{setNome(val.target.value)}}/>
          <input type="text" className="form-control" placeholder='p_iva' id="p_iva" onChange={(val)=>{setP_iva(val.target.value)}}/>
          <input type="text" className="form-control" placeholder='iban' id="iban" onChange={(val)=>{setIban(val.target.value)}}/>
          <input type="text" className="form-control" placeholder='indirizzo' id="indirizzo" onChange={(val)=>{setIndirizzo(val.target.value)}}/>
          <input type="text" className="form-control" placeholder='telefono' id="telefono" onChange={(val)=>{setTelefono(val.target.value)}}/>
          <input type="text" className="form-control" placeholder='email' id="email" onChange={(val)=>{setEmail(val.target.value)}}/>
          <button className="btn btn-primary" onClick={controlInfo}>Modifica Azienda</button>
        </div>
        <div id="pop_back" hidden={pop}>
          <div id="pop_body">
            <h1>Errore: {error}</h1>
            <button className="btn btn-primary">ok</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModAziendaAdmin