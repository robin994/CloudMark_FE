import { useState } from "react"
import { styled } from '@mui/system'
import { Box, Grid } from "@mui/material"
import Calendar from "react-calendar"
import CardCommessa from '../../components/CardCommessa'
import PresenceTable from "./components/PresenceTable"

import 'react-calendar/dist/Calendar.css';
import './styles/calendar.css';
import './styles/dashboard.css';

const Widget = styled(Box, {})({
  margin: '20px',
});

const StyledPresenceTable = styled(PresenceTable, {})({
    border: '0',
    borderRadius: '15px',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    height: "90vh",
    "& .actions": {
        color: "text.secondary",
    },
    "& .textPrimary": {
        color: "text.primary",
    },
});

const StyledCalendar = styled(Calendar, {})({
  width: '100%',
  border: '0',
  borderRadius: '15px',
  paddingTop: '5px',
  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  '.react-calendar__navigation': {
    borderRadius: '12px',
    marginTop: '10px',
    marginLeft: '15px',
    marginRight: '10px',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  },
  '.react-calendar__viewContainer': {
    padding: '15px',
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

const StyledCommesse = styled(CardCommessa, {})({
  border: '0',
  borderRadius: '15px',
  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
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
    <StyledCommesse id_lavoro={sessionStorage.id_employee}/>
  )
  
  return (
    <>
      <Grid container spacing={0} style={{ flexDirection: 'row-reverse' }}>
        <Grid item xs={12} lg={3}>
          <Widget>
            {calendarWidget}
          </Widget>
          <Widget>
            {commesseWidget}
          </Widget>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Widget>
            {presenzeWidget}
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}
