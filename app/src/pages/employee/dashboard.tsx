import DataTable from "../../components/DataTable"
import { getMockPresenzeHeading, getMockPresenzeDate } from "../../data_mock.js"

export default function Dashboard() {

  const tableWidget = (
    <DataTable id='date' col={getMockPresenzeHeading()} rows={getMockPresenzeDate()} setInputField={()=> false}/>
  )

  return (
    <>
      {tableWidget}
    </>
  )
}
