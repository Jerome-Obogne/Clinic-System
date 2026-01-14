import z from "zod";
import { Timestamp } from "firebase/firestore";
import dayjs from 'dayjs'
const phRegexNumber = /^\+63(?:9\d{9}|2\d{8}|[3-8]\d{8})$/;

export const validationMsg  = {
  name: "Name must be atleast 2 characters",
  guardian_name : "Guardian name must be atleast 2 character",
  contact_no : "The number you entered is not valid. Please try again"
}

const fireBaseTimeStampSchema =  z.custom<Timestamp>((val) => val instanceof Timestamp,{
        message: 'Expected Timestamp error'
    }).transform((timestamp) => timestamp.toDate())

const Appointment = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  name: z.string().min(2, { error: validationMsg.name }),
  guardian_name: z.string().min(2, { error: validationMsg.guardian_name }),
  contact_no: z.string().refine((val) => phRegexNumber.test(val), {
    error: validationMsg.contact_no,
  }),
  concerns: z.string().optional(),
  date: z.string(),
  time: z.string(),
  status: z.string().optional(),
  created_at: z.string(),
  update_at: z.string(),
});

const getAppointmentSchema =  z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  guardian_name: z.string().min(2, { error: validationMsg.guardian_name }),
  name: z.string(),
  concerns: z.string().optional(),
  contact_no: z.string(),
  date: fireBaseTimeStampSchema,
  time: fireBaseTimeStampSchema,
  status: z.string().optional(),
  created_at: fireBaseTimeStampSchema,
});


const postAppointmentSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  name: z.string().min(2, { error: validationMsg.name }),
  guardian_name: z.string().min(2, { error: validationMsg.guardian_name}),
  contact_no: z.string().refine((val) => phRegexNumber.test(val), {
    error: validationMsg.contact_no,
  }),
  concerns: z.string().optional(),
  date: z.string().transform((val) => {
    const date = dayjs(val).startOf("day").toDate();
    return Timestamp.fromDate(date);
  }),
  time: z.string().transform((val) => {
    const now = dayjs().format("YYYY-MM-DD");
    const dateTime = dayjs(`${now} ${val}`, "YYYY-MM-DD hh:mm:A");

    return Timestamp.fromDate(dateTime.toDate());
  }),
  status: z.string().optional(),
  created_at: z.union([z.string(), z.date()]).transform((val) => {
    if (typeof val === "string") {
      return Timestamp.fromDate(new Date(val));
    }
    return Timestamp.fromDate(val);
  }),
  update_at: z.union([z.string(), z.date()]).transform((val) => {
    if (typeof val === "string") {
      return Timestamp.fromDate(new Date(val));
    }
    return Timestamp.fromDate(val);
  }),
});

type AppointmentModel = z.infer<typeof Appointment>
type AppointmentDoctor = z.infer<typeof Appointment>;

type parseAppointmentModel = z.infer<typeof postAppointmentSchema>;
const defaultAppointment: AppointmentModel = {
  id: "", 
  user_id: "", 
  name: "", 
  guardian_name: "", 
  contact_no: "", 
  concerns: "", 
  date: "", 
  time: "", 
  status: "",
  created_at: new Date().toISOString(), 
  update_at: new Date().toISOString(), 
};

export {
  Appointment,
  postAppointmentSchema,
  defaultAppointment,
  getAppointmentSchema,
};
export type { AppointmentModel, parseAppointmentModel, AppointmentDoctor };