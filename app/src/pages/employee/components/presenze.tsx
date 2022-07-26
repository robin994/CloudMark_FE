import DataTable from "../../../components/DataTable"

// Mock imports (For development purpouses)
import { getMockPresenzeHeading, getMockPresenzeDate } from "../../../data_mock.js"

function callAlert(msg: string) {
  alert(msg)
}
export default function Presenze() {
  return (
    <DataTable id='date' col={getMockPresenzeHeading()} rows={getMockPresenzeDate()} btnCallback={callAlert} />
  )
}
