import { useState, useEffect } from 'react'
import DataTable from "../../../components/DataTable"
import axios from 'axios'
import Card from 'react-bootstrap/esm/Card'

const heading = {
  id_employee: "ID dipendente",
  date_presence: "Data",
  id_tipoPresenza: "ID Tipo presenza",
  id_order: "ID ordine",
  hours: "ore",
  id_presence: "ID presenza"
}

export default function Presenze() {
  const [presenze, setPresenze] = useState([])

  async function getPresenze() {

    try {
      let payload =  "124e4567-e85b-1fd3-a456-333322233412";
      let res = await axios.get('http://localhost:8000/presence/load_employee='+ payload)
      console.log(res);
      setPresenze(res.data.data);

      
    } catch(error) {
      throw error
    }
  }

  useEffect(()=> {
    getPresenze()
  }, [])

  return (
    <Card>
      <Card.Body>
        <DataTable id='id_presence' col={heading} rows={presenze} />
      </Card.Body>
    </Card>
  )
}
