import Container from "react-bootstrap/Container"
import{ Row, Col } from "react-bootstrap"
import DataTable from "../../components/DataTable"

// Mock imports (For development purpouses)
import { getMockPresenzeHeading, getMockPresenzeDate } from "../../data_mock.js"

export default function Dashboard() {

  const tableWidget = (
    <DataTable id='date' col={getMockPresenzeHeading()} rows={getMockPresenzeDate()} setInputField={()=> false}/>
  )

  return (
    <>
      <Container>
        <Col>
          {tableWidget}
        </Col>
        <Col>
        </Col>
      </Container>
    </>
  )
}
