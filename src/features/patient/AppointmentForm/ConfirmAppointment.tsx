import { memo } from "react";
import type { AppointmentModel } from "@/model/Appointment.model";

type AppointmentProps = {
  data: AppointmentModel;
  onSubmit: () => void;
};

const ConfirmAppointment = ({ data, onSubmit }: AppointmentProps) => {
  console.log(data);
  return (
    <>
      <button onClick={onSubmit}>CLICK ME</button>
    </>
  );
};

export default memo(ConfirmAppointment);
