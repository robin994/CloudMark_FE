import DatePicker from 'sassy-datepicker';

export default function MyCalendar() {
  const onChange = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    console.log(year, month)
  };

  return (
    <DatePicker onChange={onChange} />
  );
}