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
      const response = await axios.get('http://localhost:8000/presence/all')
      console.log(response.data.data)
      setPresenze(response.data.data)
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
        <DataTable id='date' col={heading} rows={presenze} />
      </Card.Body>
    </Card>
  )
}
