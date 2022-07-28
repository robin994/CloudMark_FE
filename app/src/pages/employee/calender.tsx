import Calendar from 'react-calendar';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import './styles/calendar.css';

interface CalendarProps{
    callbackData : Function
}

function CalendarMY(props:CalendarProps) {

    const [date, setDate] = useState(new Date());
    
    useEffect(()=> {
        props.callbackData(
            date.getMonth(),
            date.getFullYear()
        )
    },[props,date])

    return (
        <>
        <Card>  
            <Calendar className={'calendar'} value={date} onChange={setDate} maxDetail='year'/> 
        </Card>
        </>
    );
}
export default CalendarMY