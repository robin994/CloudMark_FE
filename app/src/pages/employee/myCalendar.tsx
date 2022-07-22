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
    <Container>
      <Card>
        <Card.Body>
        <DatePicker onChange={onChange} style={{width: '100%',height: '100%'}}/>
        </Card.Body>
      </Card>
    </Container>
    
   
    </>

  );
}