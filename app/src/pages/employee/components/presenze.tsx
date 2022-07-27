import { useState, useEffect } from 'react'
import DataTable from "../../../components/DataTable"
import axios from 'axios'

interface PresenzeProps {
  id_employee: string,
  year: string,
  month: string
}

const heading = {
  id_employee: "ID dipendente",
  date_presence: "Data",
  id_tipoPresenza: "ID Tipo presenza",
  id_order: "ID ordine",
  hours: "ore",
  id_presence: "ID presenza"
}

export default function Presenze(props: PresenzeProps) {
  const [presenze, setPresenze] = useState([])

  async function getPresenze() {
    try {
      const response = await axios.post(`${process.env.REACT_APP_FASTAPI_URL}/presence/load`,{
        id_employee: sessionStorage.id_employee,
        year: 2022,
        month: 1
      }, { 
        headers: {accept: "application/json", "Content-Type": "application/json" }
      })
      console.log(response.data.data)
      setPresenze(response.data.data)
    } catch(error) {
      throw error
    }
  }

  useEffect(()=> {
    getPresenze()
  }, [])

  // Trigger EDIT BUTTON
  function callEdit(id_presence: string) {
    alert(id_presence)
  }

  return (
    <DataTable id='id_presence' col={heading} rows={presenze} btnCallback={callEdit} />
  )
}
