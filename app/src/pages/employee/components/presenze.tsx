import React from 'react'
import DataTable from "../../../components/DataTable"

// Mock imports (For development purpouses)
import { getMockPresenzeHeading, getMockPresenzeDate } from "../../../data_mock.js"

export default function Presenze() {
  return (
    <DataTable id='date' col={getMockPresenzeHeading()} rows={getMockPresenzeDate()} setInputField={()=> false}/>
  )
}
