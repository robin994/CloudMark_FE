import { useState, useEffect } from 'react'
import DataTable from "../../../components/DataTable"
import axios from 'axios'

interface PresenzeProps {
  id_employee: string,
  year: string,
  month: string
}

const heading = {
  
}

export default function Presenze(props: PresenzeProps) {
  const [presenze, setPresenze] = useState({})

  async function getPresenze() {
    try {
      const response = await axios.post('http://localhost:8000/presence/',
      { params:
        {
          id_employee: props.id_employee,
          year: props.year,
          month: props.month
        }
      })
      console.log(response.data)
      setPresenze(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    getPresenze()
  }, [])

  return (
    <DataTable id='date' col={presenze} rows={heading} />
  )
}
