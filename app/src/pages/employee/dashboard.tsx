import Container from "react-bootstrap/Container"
import{ Row, Col } from "react-bootstrap"
import DataTable from "../../components/DataTable"
import MyCalendar from "./myCalendar"
import Commesse from "./commesse"

// Mock imports (For development purpouses)
import { getMockPresenzeHeading, getMockPresenzeDate } from "../../data_mock.js"

export default function Dashboard() {

  const tableWidget = (
    <DataTable id='date' col={getMockPresenzeHeading()} rows={getMockPresenzeDate()} setInputField={()=> false}/>
  )

  const calendarWidget = (
    <MyCalendar />
  )

  const commesseWidget = (
    <Commesse />
  )

  return (
    <>
      <Container fluid>
        <Row>
        <Col xs={9}>
          {tableWidget}
        </Col>
        <Col xs={3}>
          {calendarWidget}
          {commesseWidget}
        </Col>
        </Row>
      </Container>
    </>
  )
}
