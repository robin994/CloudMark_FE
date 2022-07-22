import React, {useState, Component, useEffect} from "react";
import './css_components/ModAziendaAdmin.css'
import datafake from './data_mock.json'
import axios, {Axios, AxiosResponse} from "axios";




function ModAziendaAdmin() {
  const [oggetto, setOggetto] = useState([{nome:""},{p_iva:""},{iban:""},{indirizzo:""},{cap:""},{telefono:""},{email:""}, {pec:""}, {fax:""}])
  const [pop, setPop] = useState(true)
  const [error, setError] = useState("")
  const [countErr, setCountErr] = useState(0)
  const [data, setData] = useState({})

  function controlInfo(){
    if(oggetto[0].nome !== undefined && oggetto[1].p_iva !== undefined && oggetto[2].iban !== undefined && oggetto[3].indirizzo !== undefined && oggetto[4].cap !== undefined && oggetto[5].telefono !== undefined && oggetto[6].email !== undefined && oggetto[7] !== undefined && oggetto[8].fax !== undefined){
      if(oggetto[2].iban.trim().length < 15){
        setPop(false)
        setError("l'iban deve avere almeno 15 caratteri")
        setCountErr(countErr + 1)
      }
      if(countErr > 1){
        setError("ci sono " +countErr+ " errori")
      }
    }
  }
  const GetAziendaData = async ()=>{
    useEffect(()=>{
    axios.get('http://127.0.0.1:8000/business')
    .then((res: AxiosResponse)=>{
      let dat = res.data
      setData(dat)
    })
  },[])
  }
  GetAziendaData()

  return(
    <>
      <div className='cont_01 mt-5'>
        <div id="azienda_temp">
          <h3>Info Azienda</h3>
          <div className="form-control">{datafake.nome_azienda}</div>
          <div className="form-control">{datafake.p_iva_azienda}</div>
          <div className="form-control">{datafake.iban_azienda}</div>
          <div className="form-control">{datafake.cap_azienda}</div>
          <div className="form-control">{datafake.indirizzo}</div>
          <div className="form-control">{datafake.telefono}</div>
          <div className="form-control">{datafake.email}</div>
          <div className="form-control">{datafake.pec}</div>
          <div className="form-control">{datafake.fax}</div>
        </div>
        <div id='main_body'>
          <h3>Modifica Azienda</h3>
          <input type="text" className="form-control" placeholder='nome' id="nome" required onChange={(val)=>{setOggetto([{nome:val.target.value}])}}/>
          <input type="text" className="form-control" placeholder='p_iva' id="p_iva" required onChange={(val)=>{setOggetto([{email:val.target.value}])}}/>
          <input type="text" className="form-control" placeholder='iban' id="iban" required onChange={(val)=>{setOggetto([{iban:val.target.value}])}}/>
          <input type="text" className="form-control" placeholder="cap" id="cap" required onChange={(val)=>{setOggetto([{cap:val.target.value}])}}/>
          <input type="text" className="form-control" placeholder='indirizzo' id="indirizzo" required onChange={(val)=>{setOggetto([{indirizzo:val.target.value}])}}/>
          <input type="text" className="form-control" placeholder='telefono' id="telefono" required onChange={(val)=>{setOggetto([{telefono:val.target.value}])}}/>
          <input type="email" className="form-control" placeholder='email' id="email" required onChange={(val)=>{setOggetto([{email:val.target.value}])}}/>
          <input type="email" className="form-control" placeholder='pec' id="pec" required onChange={(val)=>{setOggetto([{pec:val.target.value}])}}/>
          <input type="text" className="form-control" placeholder="fax" id="fax" required onChange={(val)=>{setOggetto([{fax:val.target.value}])}}/>
          <button className="btn btn-primary" onClick={controlInfo}>Modifica Azienda</button>
          <span className="alert alert-danger mt-3" hidden={pop}>{error}</span>
        </div>
      </div>
    </>
  )
}

export default ModAziendaAdmin;