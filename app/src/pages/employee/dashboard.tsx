import Container from "react-bootstrap/Container"
import { useState, useEffect } from "react"
import { styled } from '@mui/system'
import Calendar from "react-calendar"
import Commesse from "./commesse"
import PresenceTable from "./components/PresenceTable"

import Card from 'react-bootstrap/Card';
import 'react-calendar/dist/Calendar.css';
import './styles/calendar.css';
import './styles/dashboard.css';

const StyledCalendar = styled(Calendar, {})({
  borderRadius: '15px',
  border: '0',
  boxShadow: '10px 10px 10px',
  margin: '20px',
  '.react-calendar__navigation': {
    borderRadius: '10px',
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  '.react-calendar__tile': {
    borderRadius: '10px'
  },
  '.react-calendar__navigation__label__labelText': {
    color: 'white'
  },
  '.react-calendar__tile--now': {
    backgroundColor: 'grey'
  }
})

const StyledPresenceTable = styled(PresenceTable, {})({
  '.MuiDataGrid-root': {
    borderRadius: '15px',
    border: '0',
    boxShadow: '10px 10px 10px',
    margin: '20px',
    height: "90vh"
  }
});

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  const presenzeWidget = (
    <StyledPresenceTable 
      year={date.getFullYear().toString()} 
      month={(date.getMonth() + 1).toString()}/>
  )
  
  const getDate = (month: any,year:any)=>{
    console.log(`month:${month+1} year : ${year}`)
  }

  const calendarWidget = (
    <StyledCalendar
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
          <div className ='calendario'>
            {calendarWidget}
          </div>
          <div className='presenze'>
            {presenzeWidget}
          </div>
          <div className='commesse'>
            {commesseWidget}
          </div>
      </Container>
    </>
  )
}
