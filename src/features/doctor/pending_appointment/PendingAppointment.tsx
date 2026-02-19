import { useEffect } from "react";
import useToastMessage from "@/hooks/useToastMessage";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/services/state/redux/store";
import { fetchAppointmentListAsync, updateAppointmentAsync } from "@/services/state/redux/slice/appointmentSlice";
import {  postAppointmentSchema, type parseAppointmentModel } from "@/model/Appointment.model";
import GridTable from "@/components/ui/GridTable";
import Spinner from "@/components/ui/Spinner";
import { convertDateTimeString } from "@/utils/utilities";
import { Box, Grid } from "@mui/material";
import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import { FcCheckmark } from "react-icons/fc";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import WEB_ROUTES from "@/routes/routes";

const PendingAppointment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state: RootState) => state.appointment,shallowEqual,);
  const { ToastError, ToastSuccess } = useToastMessage();
 
  const handleUpdateAppointment = async (value:parseAppointmentModel) => { 
    const updateRecord = { ...value, status: "Y" };
    const result = await dispatch(updateAppointmentAsync(postAppointmentSchema.parse(updateRecord)));
      if (!updateAppointmentAsync.fulfilled.match(result)) {
        ToastError(`Try again ${result.payload as string}` || "Something went wrong");
        return;
      }
      ToastSuccess("Appointment has been scheduled!");
      navigate(`${WEB_ROUTES.ADMIN.DOCTOR_PENDING}`)
  };

  const columnsField: GridColDef[] = [
    {
      field: "slot",
      headerName: "Slot",
      minWidth: 250,
      sortable: false,
      renderCell: (params) => {
        const paginationModel = params.api.state.pagination.paginationModel;
        const { page, pageSize } = paginationModel;
        const localIndex = params.api.getRowIndexRelativeToVisibleRows(
          params.id,
        );
        return page * pageSize + localIndex + 1;
      },
    },

    { field: "name", headerName: "Name", minWidth: 300 },
    {
      field: "date",
      headerName: "Date",
      minWidth: 250,
      valueGetter: (value: any) => {
        return convertDateTimeString(dayjs(value), "MM/DD/YYYY");
      },
    },
    {
      field: "time",
      headerName: "Visit Time",
      minWidth: 150,
      valueGetter: (value: any) => {
        return convertDateTimeString(dayjs(value), "hh:mm a");
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      minWidth: 300,
      cellClassName: "actions",
      renderCell: (params: any) => {
        return (
          <>
            <div className="mx-5">
              <GridActionsCellItem
                icon={<FcCheckmark size={"30px"} />}
                label="Accept"
                className="textPrimary"
                onClick={() => handleUpdateAppointment(params.row as parseAppointmentModel)}
                color="inherit"
              />
            </div>

            <GridActionsCellItem
              icon={
                <EditCalendarIcon
                  sx={{ color: "gray", width: "30px", height: "30px" }}
                />
              }
              label="Accept"
              className="textPrimary"
              onClick={() => {
                navigate(`${WEB_ROUTES.ADMIN.DOCTOR_BOOK_PATIENT}/${params.row.id}`)
              }}
              color="inherit"
            />
          </>
        );
      },
    },
  ];

  useEffect(()=>{
    if (!data.length){
      dispatch(fetchAppointmentListAsync('Appointment'))
    }
  },[dispatch])

  if (loading) {
    return <Spinner isDefault height={300} width={300} />;
  }
  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div className="max-w-full!">
      <Box>
        <h1 className="mb-8 text-sm md:text-4xl text-center font-bold">
          PENDING APPOINTMENTS
        </h1>
      </Box>
      <Grid container spacing={2} justifyContent={"space-between"}>
        <Grid size={12}>
          <GridTable rows={data} columns={columnsField} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PendingAppointment;
