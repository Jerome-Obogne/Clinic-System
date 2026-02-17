import GridTable from "@/components/ui/GridTable";
import Spinner from "@/components/ui/Spinner";
import { fetchAppointmentListAsync } from "@/services/state/redux/slice/appointmentSlice";
import type { AppDispatch, RootState } from "@/services/state/redux/store";
import { convertDateTimeString } from "@/utils/utilities";
import { Grid } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DashboardCard } from "./Components";


  const columnsField: GridColDef[] = [
    { field: "name", headerName: "Name", minWidth: 250 },
    { field: "guardian_name", headerName: "Guardian name", minWidth: 250 },
    { field: "concerns", headerName: "Reason", minWidth: 250 },
    { field: "contact_no", headerName: "Contact Information", minWidth: 200 },
    {
      field: "date",
      headerName: "Date",
      minWidth: 200,
      valueGetter: (value: any) => {
        return convertDateTimeString(dayjs(value), "MM/DD/YYYY");
      },
    },
    {
      field: "time",
      headerName: "Visit Time",
      minWidth: 100,
      valueGetter: (value: any) => {
        return convertDateTimeString(dayjs(value), "hh:mm a");
      },
    },
  ];
  
const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {data,loading,error} = useSelector((state:RootState)=> state.appointment,shallowEqual)

  const dashBoardRecords = useMemo(() => {
    const actualAppointmentRecords: Record<string, boolean> = {};
    
    const appointmentCount = data.filter((records) => {
      
      const identity = `${records.user_id}-${convertDateTimeString(dayjs(records.date), "MM/DD/YYYY")}`;
      if (actualAppointmentRecords[identity]) return false;
        actualAppointmentRecords[identity] = true;
        return true;
    }).length;

    const patientCount = data.filter((record) => !record.user_id,).length;
    return {
      totalAppointment: appointmentCount,
      totalPatient:  appointmentCount + patientCount,
    };
  },[data])

   useEffect(() => {
     dispatch(fetchAppointmentListAsync("Appointment"));
   }, []);


  if (loading) {
    return <Spinner isDefault height={300} width={300} />;
  }
  if (error) {
    return <h1>ERROR</h1>;
  }
  return (
 
      <div className="max-w-full!">
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <DashboardCard 
              imagePath="./image/wave.svg" 
              value={dashBoardRecords.totalAppointment}
              title="Total Appointment" />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <DashboardCard 
              imagePath="./image/wave_2.svg" 
              value={dashBoardRecords.totalPatient}
              title="Total Patients" />
          </Grid>

          <Grid size={12}>
            <GridTable rows={data} columns={columnsField} />
          </Grid>
        </Grid>
      </div>
  );
} 

export default Dashboard;