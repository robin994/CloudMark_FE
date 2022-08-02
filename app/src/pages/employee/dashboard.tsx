import Container from "react-bootstrap/Container"
import{ Row, Col } from "react-bootstrap"
import Commesse from "./commesse"
import Presenze from "./presenze"
import CalendarMY from "./calender"
import { useState, useEffect } from "react"
import Calendar from "react-calendar"

import Card from 'react-bootstrap/Card';
import 'react-calendar/dist/Calendar.css';
import './styles/calendar.css';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  console.log('DASHBOARD RENDER !!', date)

  const presenzeWidget = (
    <Presenze
      id_employee={sessionStorage.id_employee} 
        year={date.getFullYear().toString()}
        month={(date.getMonth() + 1).toString()}
    />
  )
  
  const getDate = (month: any,year:any)=>{
    console.log(`month:${month+1} year : ${year}`)
  }

  const calendarWidget = (
    <Calendar
      className={'calendar'}
      value={date}
      onChange={setDate}
      maxDetail='year'
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
