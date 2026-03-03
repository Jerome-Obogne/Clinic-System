import { Dayjs } from "dayjs";

const getHostName = () => {
    return `localhost:5173`;
}

const convertDateTimeString = (dayjsObject: Dayjs | null, dataFormat:string ): string =>{
    return dayjsObject ? dayjsObject.format(dataFormat) : "";
} 


const  generateTimeSlots = (startHour = 0, endHour = 23) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const start = formatHour(hour);
    slots.push(`${start}`);
  }
  return slots;
}

const formatHour = (hour24:number) => {
  const ampm = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:00 ${ampm}`;
}
export { getHostName, convertDateTimeString,generateTimeSlots };
