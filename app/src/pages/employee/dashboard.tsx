import Container from "react-bootstrap/Container"
import{ Row, Col } from "react-bootstrap"
import MyCalendar from "./myCalendar"
import Commesse from "./commesse"
import Presenze from "./components/presenze"

export default function Dashboard() {

  const presenzeWidget = (
    <Presenze id_employee='b867b283-38a0-4eb3-8df1-55ccb5f310df' year='2022' month='01'/>
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
          {presenzeWidget}
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
