import { useState, useEffect } from 'react'
// import DataTable from "../../../components/DataTable"
import TabellaPresenze from './TabellaPresenze';
import axios from 'axios'
import Card from 'react-bootstrap/esm/Card'
import ModalePresenza from './modalePresenza'

// const heading = {
//   first_name: "nome",
//   last_name: "cognome",
//   date_presence: "data presenza",
//   tipoPresenza: "tipo presenza",
//   nome_azienda: "nome azienda",
//   hours: "ore"
// }

// interface DataTableProps {
//   id: string,
//   col: DynamicObject,
//   rows: DynamicObject,
//   baseSlug?: string,
//   btnCallback?: Function
// }

// interface DynamicObject {
//   [key: string]: any
// }

export default function Presenze() {
  // const [presenze, setPresenze] = useState([])


  // async function getPresenze() {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_FASTAPI_URL}/presence/all`)
  //     console.log(response.data.data)
  //     setPresenze(response.data.data)
  //   } catch(error) {
  //     throw error
  //   }
  // }

  // function callbackEdit(id_dipendente: string,date:string,id_type_presence:string,id_order:string,hour:number,id_presence:string) {
  //   alert(id_presence)
  // }


  // useEffect(()=> {
  //   getPresenze()
  // }, [])
  



  return (
    <Card>
      <Card.Body>
        {/* <DataTable id='id_presence' col={heading} rows={presenze} btnCallback={callbackEdit} /> */}
        <TabellaPresenze />
      </Card.Body>
    </Card>
  )
}