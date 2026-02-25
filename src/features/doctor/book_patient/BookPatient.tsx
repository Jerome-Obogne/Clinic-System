import { generateTimeSlots } from '@/utils/utilities';
import { Badge } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, type PickersDayProps  } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

type CustomDayProps = PickersDayProps & {
  dateRecords?: string[] ;
};

const highlightedDates = ["2026-02-10", "2026-02-15", "2026-02-20"]; // let say backend data 

  function CustomDay(props: CustomDayProps) {
    const { day, dateRecords, ...other } = props;
    const isHighlighted = dateRecords?.includes(dayjs(day).format("YYYY-MM-DD"));
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isHighlighted ? "📍" : undefined}
      >
        <PickersDay
          {...other}
          day={day}
          sx={{
            ...(isHighlighted && {
              color: "black",
              "&:hover": {
                backgroundColor: "var(--color-quarternary)",
              },
            }),
          }}
        />
      </Badge>
    );
  }

const BookPatient = () => { 
    const [date,setDate] = useState<Dayjs |null>(null)
    const handleChange = (newValue: Dayjs | null) => {
      setDate(newValue);
    };

    const valueAm = generateTimeSlots(6,11);
    const valuePm = generateTimeSlots(13,18)
    console.log(valueAm);
    console.log(valuePm);

  return (
    <>
      <div>
        <DateCalendar
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            day: { dateRecords: highlightedDates } as any,
          }}
          onChange={handleChange}
          value={date}
        />
      </div>
    </>
  );
}

export default BookPatient