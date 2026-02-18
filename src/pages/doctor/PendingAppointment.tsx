import GridTable from "@/components/ui/GridTable";
import type { RootState } from "@/services/state/redux/store";
import { convertDateTimeString } from "@/utils/utilities";
import { Box,Grid } from "@mui/material";
import { GridActionsCellItem, type GridColDef,  } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { shallowEqual, useSelector } from "react-redux";
import { FcCheckmark } from "react-icons/fc";

import EditCalendarIcon from "@mui/icons-material/EditCalendar";
const PendingAppointment = () => {
  const {data,loading,error} = useSelector((state:RootState)=> state.appointment,shallowEqual)
  
  const handleUpdateAppointment = async (id:number)=> {
      alert(`Update appointment with id ${id}`)
  }
  
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
      renderCell: (params:any) => {
        return (
          <>
            <div className="mx-5">
              <GridActionsCellItem
                icon={<FcCheckmark size={"30px"} />}
                label="Accept"
                className="textPrimary"
                onClick={() => {
                  alert("Approve appointment");
                }}
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
              onClick={()=>handleUpdateAppointment(params.id)}
              color="inherit"
            />
          </>
        );
      },
    }
  ];
 
  return (
    <div className="max-w-full!">
      <Box>
        <h1 className="mb-8 text-sm md:text-4xl text-center font-bold">PENDING APPOINTMENTS</h1>
      </Box>
      <Grid container spacing={2} justifyContent={"space-between"}>
          <Grid size={12}>
             <GridTable rows={data} columns={columnsField} />
          </Grid>
      </Grid>
    </div>
  );
}

export default PendingAppointment;