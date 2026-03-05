import {
  type PickersDayProps,
} from "@mui/x-date-pickers";

type CustomDayProps = PickersDayProps & {
  dateRecords?: Set<string>;
};

type AppointmentProps = {
  appointmentDates: any;
  onSubmit: (data: any) => void;
  records?: any; // this will  identify if edit and add mode
};

type InfoItemProps = { 
    icon : React.ReactNode,
    title:string,
    subtitle:string
}
type AppointmentInputProps ={
    children: React.ReactNode
}

export type {
  AppointmentProps,
  CustomDayProps,
  InfoItemProps,
  AppointmentInputProps,
};