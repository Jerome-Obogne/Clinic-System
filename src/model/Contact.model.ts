import { z } from 'zod';
import { Appointment } from './Appointment.model';


const Contacts= Appointment.pick({
  id:true,
  contact_no:true,
  concerns:true,
  name:true
})

type ContactModel = z.infer<typeof Contacts>

export type{
   ContactModel
}
export {
  Contacts
}