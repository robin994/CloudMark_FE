import Card from 'react-bootstrap/Card';
import DatePicker from 'sassy-datepicker';
import { Container } from 'react-bootstrap';


export default function MyCalendar() {
  const onChange = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    console.log(year, month)
  };

  return (
    <>
      <Card>
          <DatePicker onChange={onChange}/>
      </Card>
    </>

  );
}