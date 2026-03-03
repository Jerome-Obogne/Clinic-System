
import { AppointmentForm } from './Components';


const BookPatient = () => { 
    // const [date,setDate] = useState<Dayjs |null>(null)
    // const handleChange = (newValue: Dayjs | null) => {
    //   setDate(newValue);
    // };

  return (
    <>
      <div>
        <AppointmentForm/>
        {/* <DateCalendar
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            day: { dateRecords: highlightedDates } as any,
          }}
          onChange={handleChange}
          value={date}
        /> */}
      </div>
    </>
  );
}

export default BookPatient