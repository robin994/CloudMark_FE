import Container from "react-bootstrap/Container"
import{ Row, Col } from "react-bootstrap"
import Commesse from "./commesse"
import Presenze from "./presenze"
import CalendarMY from "./calender"
import { useState, useEffect } from "react"
import Calendar from "react-calendar"

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  const presenzeWidget = (
    <Presenze id_employee={sessionStorage.id_employee} year='2022' month='01'/>
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
        <Calendar
          className={'calendar'}
          value={date}
          onChange={setDate}
          maxDetail='year'
        />
          {/* {calendarWidget} */}
          {commesseWidget}
        </Col>
        </Row>
      </Container>
    </>
  )
}
