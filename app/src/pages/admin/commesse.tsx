import React, { useEffect, useState } from 'react'
import DataTable from '../../components/DataTable'
import Axios from 'axios'

const heading = {
  id_order: "ID commessa",
  id_customer: "ID cliente",
  id_business: "ID azienda",
  description: "Descrizione",
  startDate: "Data inizio",
  endDate: "Data fine"
}

export default function Commesse() {
  const [commesse, setCommesse] = useState([])
  useEffect( () => {
    Axios("http://localhost:8000/orders").then( resp => {
      const data = resp.data.data
      setCommesse(Object.values(data))
  }).catch( err => { throw err })
  }, [])
  return (
    <DataTable id="id_order" col={heading} rows={commesse} />
  )
}
