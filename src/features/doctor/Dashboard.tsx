import GridTable from "@/components/ui/GridTable";
import Spinner from "@/components/ui/Spinner";
import { fetchAppointmentListAsync } from "@/services/state/redux/slice/appointmentSlice";
import type { AppDispatch, RootState } from "@/services/state/redux/store";
import { convertDateTimeString } from "@/utils/utilities";
import { Grid } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {data,loading,error} = useSelector((state:RootState)=> state.appointment)
  useEffect(() => {
    dispatch(fetchAppointmentListAsync("Appointment"));
  },[dispatch])

  if (loading) {
    return <Spinner isDefault height={300} width={300} />; 
  }
  if (error) {
    return (
      <h1>ERROR</h1>
    )
  }


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
        return convertDateTimeString(dayjs(value),"MM/DD/YYYY");
      },
    },
    {
      field: "time",
      headerName: "Visit Time",
      minWidth: 100,
      valueGetter: (value: any) => {
   
        return convertDateTimeString(dayjs(value), "hh:mm:a");
      },
    },
  ];

  return (
    <>
      <div className="max-w-full!">
        <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <div className="shadow-2xl/60 p-3 rounded-md">
              <div className="h-80 bg-[url('./image/wave.svg')] bg-cover bg-top-right p-4 font-bold">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-md sm:text-xl md:text-xl lg:text-2xl mb-4">
                      Total Appointment
                    </h3>
                  </div>

                  <div className="items-end text-[12px]">
                    <span className="text-green-500">5.9%</span>
                    <span className="text-gray-300"> within the day</span>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl px-2">
                  60
                </p>
              </div>
            </div>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <div className="shadow-2xl/60 p-3 rounded-md">
              <div className="h-80 bg-[url('./image/wave_2.svg')] bg-top-right bg-cover p-4 font-bold ">
                
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-md sm:text-xl md:text-xl lg:text-2xl mb-4">
                      Total Patients
                    </h3>
                  </div>

                  <div className="items-end text-[12px]">
                    <span className="text-green-500">5.9%</span>
                    <span className="text-gray-300"> within the day</span>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl px-2">
                  210
                </p>
              </div>
            </div>
          </Grid>

          <Grid size={12}>
            <GridTable rows={data} columns={columnsField} />
          </Grid>
        </Grid>
      </div>
    </>
  );
} 

export default Dashboard;