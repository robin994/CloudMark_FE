
import Axios from 'axios'
import { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'







const heading = {
  first_name: "Nome",
  last_name: "Cognome",
  cf: "Codice Fiscale",
  iban: "Iban",
  id_contractType: "Tipo Contratto",
  email: "email",
  phoneNumber: "Telefono",

}



export default function ListaDipendenti() {

  
  const [dipendenti, setDipendenti] = useState([])

  useEffect( () => {
    Axios.get(`${process.env.REACT_APP_FASTAPI_URL}/employee`).then( resp => {
      const data = resp.data.data
      setDipendenti(Object.values(data))
  }).catch( err => { throw err })
  },[])
  console.log(dipendenti)

  function addRow(){
    alert('ciao')


  }

  /*function SavePost(){
    useEffect( () => {
      Axios.post(`${process.env.REACT_APP_FASTAPI_URL}/employee/create/`).then( resp => {
        const data = resp.data.data
        setDipendenti(Object.values(data))
    }).catch( err => { throw err })
    },[])
  }*/

  function Modify(){

    

  }
  return (
    <>
    <div style={{borderBottom: "1px solid black",borderTop: "1px solid black",padding:"0.5rem",backgroundColor:"gainsboro",marginTop:"2vh"}}>
      <input placeholder="cerca dipendente" className="form-control"></input>
      <div style={{marginTop:"2vh"}}>
      <button className="btn btn-outline-success" onClick={addRow} >+ </button>
      <button className="btn btn-primary"  >Salva Modifiche</button>
      <button className="btn btn-secondary" onClick={Modify} >Modifica</button>
      </div>
     
    </div> 
      <div className="container">
           
            <table className='table table-striped' id="myTable">
                <thead>
                <tr>
                    <th>{heading.first_name}</th>
                    <th>{heading.last_name}</th>
                    <th>{heading.cf}</th>
                    <th>{heading.iban}</th>
                    <th>{heading.id_contractType}</th>
                    <th>{heading.email}</th>
                    <th>{heading.phoneNumber}</th>
                   
                </tr>
                </thead>
                <tbody>
                    {
                        dipendenti.map((item) => (
                            <tr key={item.id}>
                              <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.cf}</td>
                                <td>{item.iban}</td>
                                <td>{item.id_contractType}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                
                                <td/>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

  
    </>
    )
  }