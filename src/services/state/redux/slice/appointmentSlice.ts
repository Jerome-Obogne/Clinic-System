import type { AppointmentDoctor } from "@/model/Appointment.model";
import { createSlice } from "@reduxjs/toolkit";


// create async thunk here and the api is in the api services

const initialState: AppointmentDoctor = {
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


const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers:{
        getAppointmentRecords : (state, action) => {
            
        },
    }
})

export const { getAppointmentRecords } = appointmentSlice.actions;

export default appointmentSlice.reducer