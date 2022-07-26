import Calendar from 'react-calendar';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';

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
        <Card style={{ height: '40%' }}>
            <div style={{width: '100%', height: '100%'}}>
            <Calendar  value={date} onChange={setDate} maxDetail='year'/>
            </div>
        </Card>
        </>
    );
}
export default CalendarMY