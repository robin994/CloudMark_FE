import Container from "react-bootstrap/Container"
import{ Row, Col } from "react-bootstrap"
// import MyCalendar from "./myCalendar"
import Commesse from "./commesse"
import Presenze from "./components/presenze"
import CalendarMY from "./calender"

export default function Dashboard() {

  const presenzeWidget = (
    <Presenze />
  )
  const getDate = (month: any,year:any)=>{
    console.log(`month:${month+1} year : ${year}`)
  }

  const calendarWidget = (
    <CalendarMY 
    callbackData = {getDate}
    />
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
