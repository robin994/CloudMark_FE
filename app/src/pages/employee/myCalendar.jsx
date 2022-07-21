import DatePicker from 'sassy-datepicker';

export default function MyCalendar() {
  const onChange = (date) => {
    console.log(date.toString());
  };

  return (
    <DatePicker onChange={onChange} />
  );
}