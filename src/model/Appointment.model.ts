import z from "zod";


const Appointment = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  name: z.string().min(2, { error: "Name must be atleast 2 characters" }),
  guardian_name: z.string().min(2, { error: "Guardian name must be atleast 2 characters" }),
  contact_no: z.string(),
  concerns: z.string().optional(),
  date: z.string(),
  time: z.string(),
  status: z.string().optional(),
  created_at : z.string(), 
  update_at: z.string()
});

const parseAppointmentSchema = z.object({

})

type AppointmentModel = z.infer<typeof Appointment>


export { Appointment, parseAppointmentSchema };
export type { AppointmentModel };