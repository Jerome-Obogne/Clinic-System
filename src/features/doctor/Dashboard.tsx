import Spinner from "@/components/ui/Spinner";
import type { AppointmentModel } from "@/model/Appointment.model";
import { getAppointmentListAsync } from "@/services/state/redux/slice/appointmentSlice";
import type { AppDispatch, RootState } from "@/services/state/redux/store";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {data,loading,error} = useSelector((state:RootState)=> state.appointment)
  useEffect(() => {
    dispatch(getAppointmentListAsync("Appointment"));
  },[dispatch])

  if (loading) {
    return <Spinner isDefault height={300} width={300} />; 
  }
  if (error) {
    return (
      <h1>ERROR</h1>
    )
  }

  return (
    <>
      <div>data</div>
      <div>
        {data.map((record:AppointmentModel)=>(
          <div>{dayjs(record.date).format("MM/DD/YYYY")}   
            <p>{record.created_at}</p>
          </div>

        ))}

      </div>
    </>
  );
} 

export default Dashboard;